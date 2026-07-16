import { useEffect, useRef } from "react";
import * as THREE from "three";

// Interactive particle constellation for the Orbit hero: a rotating
// point-cloud sphere wrapped in a sparse starfield, with gentle mouse
// parallax. Purely decorative and sits behind the DOM content — if WebGL
// is unavailable the hero still reads fine on the CSS glow alone.
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

    const sizeOf = () => ({
      w: mount.clientWidth || window.innerWidth,
      h: mount.clientHeight || Math.round(window.innerHeight * 0.9),
    });

    let { w, h } = sizeOf();
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
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

    // --- Mouse parallax (eased toward target) ---
    let targetX = 0;
    let targetY = 0;
    let curX = 0;
    let curY = 0;
    const onMove = (e) => {
      targetX = e.clientX / window.innerWidth - 0.5;
      targetY = e.clientY / window.innerHeight - 0.5;
    };
    window.addEventListener("pointermove", onMove, { passive: true });

    const clock = new THREE.Clock();
    let raf = 0;
    const render = () => {
      raf = requestAnimationFrame(render);
      const dt = Math.min(clock.getDelta(), 0.05);
      if (!prefersReduced) {
        sphere.rotation.y += dt * 0.09;
        sphere.rotation.x += dt * 0.025;
        stars.rotation.y += dt * 0.012;
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
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(mount);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      sphereGeo.dispose();
      sphereMat.dispose();
      starGeo.dispose();
      starMat.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={mountRef} className="absolute inset-0 h-full w-full" aria-hidden="true" />;
}
