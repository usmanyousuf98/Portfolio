import { useEffect, useRef } from "react";
import * as THREE from "three";
import { SKILLS } from "../data";

// Interactive particle constellation for the Orbit hero: a rotating point-cloud
// sphere wrapped in a sparse starfield, with gentle mouse parallax. Hovering
// the field "wakes" the globe — it expands, spins up and brightens, and the
// real tech stack emerges as labels orbiting the sphere (pulled from SKILLS).
// Purely decorative and sits behind the DOM content — if WebGL is unavailable
// the hero still reads fine on the CSS glow alone.
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
      opacity: 0.92,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    const sphere = new THREE.Points(sphereGeo, sphereMat);
    scene.add(sphere);

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

    // --- Skill labels orbiting the sphere (hidden until hover) ---
    // Each SKILLS item becomes a text sprite placed on an outer Fibonacci
    // shell. A cyan tick precedes the label so the stack reads at a glance.
    const labelGroup = new THREE.Group();
    scene.add(labelGroup);

    const skillItems = SKILLS.flatMap((g) => g.items);
    const labelR = 3.5;
    const sprites = [];

    const makeLabel = (text) => {
      const cvs = document.createElement("canvas");
      const ctx = cvs.getContext("2d");
      const fontPx = 34 * dpr;
      const font = `700 ${fontPx}px "JetBrains Mono", ui-monospace, monospace`;
      ctx.font = font;
      const dotR = fontPx * 0.16;
      const gap = fontPx * 0.4;
      const padX = fontPx * 0.3;
      const padY = fontPx * 0.5;
      const textW = ctx.measureText(text).width;
      cvs.width = Math.ceil(padX * 2 + dotR * 2 + gap + textW);
      cvs.height = Math.ceil(fontPx + padY * 2);

      // Re-set after resize clears the context.
      ctx.font = font;
      ctx.textBaseline = "middle";
      const cy = cvs.height / 2;
      // Cyan tick
      ctx.fillStyle = "#54e0ff";
      ctx.beginPath();
      ctx.arc(padX + dotR, cy, dotR, 0, Math.PI * 2);
      ctx.fill();
      // Label text (muted frost) with a soft glow for legibility. Kept dim so
      // the stack reads as an atmospheric layer behind the crisp headline.
      ctx.shadowColor = "rgba(6,8,16,0.9)";
      ctx.shadowBlur = 6 * dpr;
      ctx.fillStyle = "#c2cade";
      ctx.fillText(text, padX + dotR * 2 + gap, cy + fontPx * 0.03);

      const texture = new THREE.CanvasTexture(cvs);
      texture.minFilter = THREE.LinearFilter;
      texture.anisotropy = renderer.capabilities.getMaxAnisotropy?.() || 1;
      const material = new THREE.SpriteMaterial({
        map: texture,
        transparent: true,
        opacity: 0,
        depthTest: false,
        depthWrite: false,
      });
      const sprite = new THREE.Sprite(material);
      const H = 0.34;
      const baseW = H * (cvs.width / cvs.height);
      sprite.scale.set(baseW, H, 1);
      return { sprite, material, texture, baseW, baseH: H };
    };

    const n = skillItems.length;
    skillItems.forEach((text, i) => {
      const built = makeLabel(text);
      const y = 1 - (i / (n - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = golden * i;
      built.sprite.position.set(labelR * Math.cos(theta) * r, labelR * y, labelR * Math.sin(theta) * r);
      built.baseY = labelR * y;
      built.phase = i * 1.7; // desync the bob
      built.appearAt = (i / n) * 0.45; // staggered cascade threshold
      labelGroup.add(built.sprite);
      sprites.push(built);
    });

    // --- Interaction state ---
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    let hovered = false; // pointer inside the hero field
    let hoverAmt = 0; // eased 0 → 1
    // Labels are a hover interaction, so only on pointer-precise, desktop-width
    // viewports — on tablet/mobile they crop and overlap the headline, and
    // touch has no hover. Below this the sphere still reacts to touch-drag.
    const LABEL_MIN_W = 1024;
    let labelsEnabled = window.innerWidth >= LABEL_MIN_W;

    const onMove = (e) => {
      targetX = e.clientX / window.innerWidth - 0.5;
      targetY = e.clientY / window.innerHeight - 0.5;
      const rect = mount.getBoundingClientRect();
      hovered =
        e.clientX >= rect.left &&
        e.clientX <= rect.right &&
        e.clientY >= rect.top &&
        e.clientY <= rect.bottom;
    };
    const onLeaveWin = () => {
      hovered = false;
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", onLeaveWin);
    document.addEventListener("pointerleave", onLeaveWin);

    const worldPos = new THREE.Vector3();
    const clock = new THREE.Clock();
    let raf = 0;
    const render = () => {
      raf = requestAnimationFrame(render);
      const dt = Math.min(clock.getDelta(), 0.05);

      // Snappier response so the field feels alive the instant you enter it.
      const wake = labelsEnabled && hovered ? 1 : 0;
      hoverAmt += (wake - hoverAmt) * 0.12;
      const t = clock.elapsedTime;

      if (!prefersReduced) {
        const spin = 0.09 + hoverAmt * 0.06;
        sphere.rotation.y += dt * spin;
        sphere.rotation.x += dt * 0.025;
        stars.rotation.y += dt * 0.012;
        // Labels orbit a touch slower — kept gentle so the stack stays legible.
        labelGroup.rotation.y += dt * (0.04 + hoverAmt * 0.03);
        labelGroup.rotation.x = Math.sin(t * 0.15) * 0.1;
      }

      // Globe reacts: expands + brightens as the field wakes.
      const s = 1 + hoverAmt * 0.07;
      sphere.scale.setScalar(s);
      sphereMat.opacity = 0.92 + hoverAmt * 0.08;
      sphereMat.size = 0.032 + hoverAmt * 0.006;

      // Labels emerge from the sphere and fade in. Multiple cues shape it:
      // a staggered cascade (per-label threshold), a depth fade+scale pop so
      // front labels read brighter and larger, a radial fade that drops labels
      // drifting toward the name/CTAs, and a gentle bob for life.
      labelGroup.scale.setScalar(0.8 + hoverAmt * 0.2);
      for (let i = 0; i < sprites.length; i++) {
        const sp = sprites[i];
        // Cascade: each label's own ramp begins once hoverAmt passes its slot.
        const cascade = THREE.MathUtils.clamp((hoverAmt - sp.appearAt) / 0.3, 0, 1);
        if (!prefersReduced) {
          sp.sprite.position.y = sp.baseY + Math.sin(t * 0.9 + sp.phase) * 0.035;
        }
        sp.sprite.getWorldPosition(worldPos);
        const front = THREE.MathUtils.clamp((worldPos.z + labelR) / (labelR * 2), 0, 1);
        worldPos.project(camera);
        const rad = Math.hypot(worldPos.x, worldPos.y);
        const edge = 1 - THREE.MathUtils.smoothstep(rad, 0.32, 0.72);
        sp.material.opacity = cascade * (0.1 + front * 0.55) * (0.3 + edge * 0.7);
        // Depth pop + a small settle-in scale from the cascade.
        const pop = (0.9 + front * 0.22) * (0.9 + cascade * 0.1);
        sp.sprite.scale.set(sp.baseW * pop, sp.baseH * pop, 1);
      }

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
      labelsEnabled = window.innerWidth >= LABEL_MIN_W;
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", onLeaveWin);
      document.removeEventListener("pointerleave", onLeaveWin);
      sphereGeo.dispose();
      sphereMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      sprites.forEach(({ material, texture }) => {
        material.dispose();
        texture.dispose();
      });
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
