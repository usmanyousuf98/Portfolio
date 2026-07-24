import { useEffect, useRef } from "react";
import * as THREE from "three";
import { SKILLS } from "../data";

// Interactive particle constellation for the Orbit hero: a rotating point-cloud
// sphere wrapped in a sparse starfield, with gentle mouse parallax. A ring of
// brighter "skill nodes" sits on the globe — hovering one lights it up and
// floats a tooltip naming that part of the stack (raycast-picked, one dot →
// one skill). Purely decorative; if WebGL is unavailable the hero still reads
// on the CSS glow alone.
export default function OrbitCanvas() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "high-performance",
      });
    } catch {
      return; // No WebGL context — bail, CSS fallback covers it.
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const sizeOf = () => ({
      w: mount.clientWidth || window.innerWidth,
      h: mount.clientHeight || Math.round(window.innerHeight * 0.9),
    });

    let { w, h } = sizeOf();
    renderer.setPixelRatio(dpr);
    renderer.setSize(w, h);
    renderer.domElement.style.width = "100%";
    renderer.domElement.style.height = "100%";
    renderer.domElement.style.display = "block";
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(58, w / h, 0.1, 100);
    camera.position.z = 6.4;

    // Everything that spins together (cloud + skill nodes) lives in one group.
    const globe = new THREE.Group();
    scene.add(globe);

    // --- Sphere point cloud (Fibonacci distribution = even coverage) ---
    const SPHERE_COUNT = 1700;
    const radius = 2.7;
    const spherePos = new Float32Array(SPHERE_COUNT * 3);
    const golden = Math.PI * (1 + Math.sqrt(5));
    for (let i = 0; i < SPHERE_COUNT; i++) {
      const y = 1 - (i / (SPHERE_COUNT - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const theta = golden * i;
      spherePos[i * 3] = radius * Math.cos(theta) * r;
      spherePos[i * 3 + 1] = radius * y;
      spherePos[i * 3 + 2] = radius * Math.sin(theta) * r;
    }
    const sphereGeo = new THREE.BufferGeometry();
    sphereGeo.setAttribute("position", new THREE.BufferAttribute(spherePos, 3));
    const sphereMat = new THREE.PointsMaterial({
      color: 0x54e0ff,
      size: 0.032,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.9,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sphere = new THREE.Points(sphereGeo, sphereMat);
    globe.add(sphere);

    // --- Sparse background starfield for depth ---
    const STAR_COUNT = 520;
    const starPos = new Float32Array(STAR_COUNT * 3);
    for (let i = 0; i < STAR_COUNT; i++) {
      starPos[i * 3] = (Math.random() - 0.5) * 20;
      starPos[i * 3 + 1] = (Math.random() - 0.5) * 20;
      starPos[i * 3 + 2] = (Math.random() - 0.5) * 12 - 4;
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color: 0x8a93ad,
      size: 0.02,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.5,
      depthWrite: false,
    });
    const stars = new THREE.Points(starGeo, starMat);
    scene.add(stars);

    // --- Skill nodes: brighter dots on the globe, one per SKILLS item ---
    // A soft radial glow texture gives each a small bright core with a halo, so
    // the sprite quad can be generous (easy to hover) while the dot looks small.
    const makeGlow = () => {
      const size = 64;
      const c = document.createElement("canvas");
      c.width = c.height = size;
      const g = c.getContext("2d");
      const grd = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
      grd.addColorStop(0, "rgba(255,255,255,1)");
      grd.addColorStop(0.18, "rgba(190,242,255,0.95)");
      grd.addColorStop(0.45, "rgba(84,224,255,0.35)");
      grd.addColorStop(1, "rgba(84,224,255,0)");
      g.fillStyle = grd;
      g.fillRect(0, 0, size, size);
      const t = new THREE.CanvasTexture(c);
      t.needsUpdate = true;
      return t;
    };
    const glowTex = makeGlow();

    const skills = SKILLS.flatMap((g) => g.items);
    const nodeR = 2.74;
    const BASE_SCALE = 0.36;
    const nodes = [];
    const pickTargets = [];
    skills.forEach((name, i) => {
      const y = 1 - (i / (skills.length - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      const mat = new THREE.SpriteMaterial({
        map: glowTex,
        transparent: true,
        opacity: 0.85,
        depthWrite: false,
        depthTest: false,
        blending: THREE.AdditiveBlending,
      });
      const sprite = new THREE.Sprite(mat);
      sprite.position.set(nodeR * Math.cos(theta) * r, nodeR * y, nodeR * Math.sin(theta) * r);
      sprite.scale.set(BASE_SCALE, BASE_SCALE, 1);
      sprite.userData.index = i;
      globe.add(sprite);
      nodes.push({ sprite, mat, phase: i * 1.3, hover: 0 });
      pickTargets.push(sprite);
    });

    // --- Tooltip: a DOM pill anchored above the hovered node. Lives above the
    // hero content (mount's parent) so the headline never covers it. ---
    const parent = mount.parentElement || mount;
    const tip = document.createElement("div");
    tip.setAttribute("aria-hidden", "true");
    tip.style.cssText = [
      "position:absolute",
      "left:0",
      "top:0",
      "z-index:30",
      "pointer-events:none",
      "padding:6px 12px",
      "border-radius:9999px",
      'font:600 12px/1 "JetBrains Mono", ui-monospace, monospace',
      "letter-spacing:0.14em",
      "text-transform:uppercase",
      "color:#eef1fa",
      "background:rgba(12,16,32,0.85)",
      "border:1px solid rgba(84,224,255,0.5)",
      "box-shadow:0 0 22px -6px rgba(84,224,255,0.6)",
      "-webkit-backdrop-filter:blur(6px)",
      "backdrop-filter:blur(6px)",
      "white-space:nowrap",
      "opacity:0",
      "transform:translate(-50%,-150%) scale(0.9)",
      "transition:opacity .16s ease, transform .16s ease",
    ].join(";");
    parent.appendChild(tip);

    // --- Interaction state ---
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let pointerInside = false;
    const ndc = new THREE.Vector2(-2, -2);
    let hoveredIndex = -1;
    let tipIndex = -1;
    let spinCur = 0.09;

    const onMove = (e) => {
      targetX = e.clientX / window.innerWidth - 0.5;
      targetY = e.clientY / window.innerHeight - 0.5;
      const rect = mount.getBoundingClientRect();
      pointerInside =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
      ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    };
    const onLeaveWin = () => {
      pointerInside = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onLeaveWin);
    document.addEventListener("pointerleave", onLeaveWin);

    const raycaster = new THREE.Raycaster();
    const worldPos = new THREE.Vector3();
    const clock = new THREE.Clock();
    let raf = 0;
    const render = () => {
      raf = requestAnimationFrame(render);
      const dt = Math.min(clock.getDelta(), 0.05);
      const t = clock.elapsedTime;

      // Pick the front-most node under the cursor.
      if (pointerInside) {
        raycaster.setFromCamera(ndc, camera);
        const hits = raycaster.intersectObjects(pickTargets, false);
        hoveredIndex = hits.length ? hits[0].object.userData.index : -1;
      } else {
        hoveredIndex = -1;
      }

      // Rotation eases to near-stop while a node is hovered, so it's readable.
      if (!prefersReduced) {
        const spinTarget = hoveredIndex >= 0 ? 0.012 : 0.09;
        spinCur += (spinTarget - spinCur) * 0.05;
        globe.rotation.y += dt * spinCur;
        globe.rotation.x += dt * 0.022;
        stars.rotation.y += dt * 0.012;
      }

      // Node visuals: idle twinkle + a lit pop for the hovered one.
      for (let i = 0; i < nodes.length; i++) {
        const nd = nodes[i];
        nd.hover += ((hoveredIndex === i ? 1 : 0) - nd.hover) * 0.18;
        const tw = prefersReduced ? 0 : Math.sin(t * 1.4 + nd.phase);
        const sc = BASE_SCALE * (1 + tw * 0.08) * (1 + nd.hover * 0.7);
        nd.sprite.scale.set(sc, sc, 1);
        nd.mat.opacity = Math.min(1, 0.62 + tw * 0.12 + nd.hover * 0.5);
      }

      // Tooltip follows the hovered node's projected position.
      if (hoveredIndex >= 0) {
        nodes[hoveredIndex].sprite.getWorldPosition(worldPos);
        worldPos.project(camera);
        const x = (worldPos.x * 0.5 + 0.5) * w;
        const y = (-worldPos.y * 0.5 + 0.5) * h;
        tip.style.left = `${x}px`;
        tip.style.top = `${y}px`;
        if (tipIndex !== hoveredIndex) {
          tip.textContent = skills[hoveredIndex];
          tipIndex = hoveredIndex;
        }
        tip.style.opacity = "1";
        tip.style.transform = "translate(-50%,-150%) scale(1)";
      } else if (tipIndex !== -1) {
        tip.style.opacity = "0";
        tip.style.transform = "translate(-50%,-150%) scale(0.9)";
        tipIndex = -1;
      }
      mount.style.cursor = hoveredIndex >= 0 ? "pointer" : "";

      curX += (targetX - curX) * 0.045;
      curY += (targetY - curY) * 0.045;
      camera.position.x = curX * 1.3;
      camera.position.y = -curY * 1.3;
      camera.lookAt(scene.position);
      renderer.render(scene, camera);
    };
    render();

    const onResize = () => {
      const next = sizeOf();
      w = next.w;
      h = next.h;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeaveWin);
      document.removeEventListener("pointerleave", onLeaveWin);
      if (tip.parentNode) tip.parentNode.removeChild(tip);
      sphereGeo.dispose();
      sphereMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      nodes.forEach((nd) => nd.mat.dispose());
      glowTex.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
