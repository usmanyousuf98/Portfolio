import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { NAME } from "../data";

// The Signal hero headline as an interactive particle field: the name is
// rasterized to an offscreen 2D canvas, its letterform pixels sampled into
// a point cloud, and rendered with three.js. Particles scatter on load and
// spring into place; the cursor repels them. The trailing period keeps the
// lime accent. Falls back to the plain typographic headline when WebGL is
// unavailable; stays static under prefers-reduced-motion. An sr-only <h1>
// keeps the name in the document for screen readers and SEO.
export default function SignalName() {
  const mountRef = useRef(null);
  const [failed, setFailed] = useState(false);
  const [first, ...rest] = NAME.split(" ");

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: false,
        powerPreference: "high-performance",
      });
    } catch {
      setFailed(true);
      return;
    }

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    renderer.setPixelRatio(dpr);
    const el = renderer.domElement;
    el.style.display = "block";
    el.style.width = "100%";
    el.style.height = "100%";
    mount.appendChild(el);

    const scene = new THREE.Scene();
    const material = new THREE.PointsMaterial({
      size: 1.5 * dpr,
      sizeAttenuation: false,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    });

    const cream = new THREE.Color("#f4f4ef");
    const lime = new THREE.Color("#d4ff3f");
    const mouse = { x: -1e6, y: -1e6 };

    const [line1, ...restWords] = NAME.split(" ");
    const line2 = `${restWords.join(" ")}.`;

    let camera = null;
    let geometry = null;
    let points = null;
    let home = null;
    let vel = null;
    let count = 0;
    let w = 0;
    let h = 0;
    let lastW = 0;
    let lastH = 0;
    let firstBuild = true;
    let disposed = false;
    let raf = 0;
    let resizeTimer = 0;

    // Draw the two-line name and sample pixels every `gap` px.
    const rasterize = (gap) => {
      const cvs = document.createElement("canvas");
      cvs.width = w;
      cvs.height = h;
      const ctx = cvs.getContext("2d", { willReadFrequently: true });

      let fontSize = h / 2.3;
      const setFont = () => {
        ctx.font = `700 ${fontSize}px "Space Grotesk", ui-sans-serif, sans-serif`;
        try {
          // Match the display type's tight tracking; not supported everywhere.
          ctx.letterSpacing = `${(-0.035 * fontSize).toFixed(1)}px`;
        } catch {
          /* older engines: slightly looser name, still fine */
        }
      };
      setFont();
      const widest = Math.max(ctx.measureText(line1).width, ctx.measureText(line2).width);
      if (widest > w * 0.98) {
        fontSize *= (w * 0.98) / widest;
        setFont();
      }

      const baseline1 = fontSize * 0.85;
      const baseline2 = baseline1 + fontSize * 0.98;
      ctx.fillStyle = "#fff";
      ctx.fillText(line1, 0, baseline1);
      ctx.fillText(line2, 0, baseline2);

      // Particles right of where the period starts (on line 2) go lime.
      const periodX = ctx.measureText(line2.slice(0, -1)).width - fontSize * 0.02;
      const line2Top = baseline1 + fontSize * 0.15;

      const img = ctx.getImageData(0, 0, w, h).data;
      const pts = [];
      const isLime = [];
      for (let y = 0; y < h; y += gap) {
        for (let x = 0; x < w; x += gap) {
          if (img[(y * w + x) * 4 + 3] > 128) {
            pts.push(x, y);
            isLime.push(y > line2Top && x >= periodX);
          }
        }
      }
      return { pts, isLime };
    };

    const build = () => {
      w = mount.clientWidth;
      h = mount.clientHeight;
      if (!w || !h) return;
      lastW = w;
      lastH = h;
      renderer.setSize(w, h, false);
      // Screen-space ortho camera: x right in CSS px, y negative downward,
      // so sampled pixel (x, y) maps to point (x, -y).
      camera = new THREE.OrthographicCamera(0, w, 0, -h, -10, 10);

      let gap = 2;
      let sampled = rasterize(gap);
      if (sampled.pts.length / 2 > 20000) {
        gap = 3;
        sampled = rasterize(gap);
      }

      count = sampled.pts.length / 2;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      home = new Float32Array(count * 2);
      vel = new Float32Array(count * 2);

      const scatter = firstBuild && !prefersReduced;
      for (let i = 0; i < count; i++) {
        const hx = sampled.pts[i * 2];
        const hy = -sampled.pts[i * 2 + 1];
        home[i * 2] = hx;
        home[i * 2 + 1] = hy;
        positions[i * 3] = scatter ? hx + (Math.random() - 0.5) * w * 0.7 : hx;
        positions[i * 3 + 1] = scatter ? hy + (Math.random() - 0.5) * h * 1.6 : hy;
        positions[i * 3 + 2] = 0;
        const c = sampled.isLime[i] ? lime : cream;
        colors[i * 3] = c.r;
        colors[i * 3 + 1] = c.g;
        colors[i * 3 + 2] = c.b;
      }
      firstBuild = false;

      if (points) {
        scene.remove(points);
        geometry.dispose();
      }
      geometry = new THREE.BufferGeometry();
      geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
      geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
      points = new THREE.Points(geometry, material);
      scene.add(points);
    };

    const frame = () => {
      raf = requestAnimationFrame(frame);
      if (!geometry || !camera) return;
      if (!prefersReduced) {
        const pos = geometry.attributes.position.array;
        const r = Math.max(60, w * 0.06);
        const r2 = r * r;
        for (let i = 0; i < count; i++) {
          const ix = i * 3;
          const iy = ix + 1;
          // Spring toward home with damping…
          vel[i * 2] = (vel[i * 2] + (home[i * 2] - pos[ix]) * 0.06) * 0.82;
          vel[i * 2 + 1] = (vel[i * 2 + 1] + (home[i * 2 + 1] - pos[iy]) * 0.06) * 0.82;
          let px = pos[ix] + vel[i * 2];
          let py = pos[iy] + vel[i * 2 + 1];
          // …then push away from the cursor.
          const dx = px - mouse.x;
          const dy = py - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < r2 && d2 > 0.001) {
            const d = Math.sqrt(d2);
            const f = ((r - d) / r) * 2.2;
            px += (dx / d) * f * 3;
            py += (dy / d) * f * 3;
          }
          pos[ix] = px;
          pos[iy] = py;
        }
        geometry.attributes.position.needsUpdate = true;
      }
      renderer.render(scene, camera);
    };

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = -(e.clientY - rect.top);
    };
    const onLeave = () => {
      mouse.x = -1e6;
      mouse.y = -1e6;
    };

    const ro = new ResizeObserver(() => {
      if (mount.clientWidth === lastW && mount.clientHeight === lastH) return;
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (!disposed) build();
      }, 150);
    });

    const start = () => {
      if (disposed) return;
      build();
      ro.observe(mount);
      window.addEventListener("pointermove", onMove, { passive: true });
      document.addEventListener("pointerleave", onLeave);
      frame();
    };

    // Sample only after Space Grotesk is in, or the letterforms come out in
    // the fallback font; don't wait forever if the font API stalls.
    const fontsReady =
      document.fonts && document.fonts.load
        ? document.fonts.load('700 100px "Space Grotesk"').then(() => undefined)
        : Promise.resolve();
    Promise.race([fontsReady, new Promise((res) => setTimeout(res, 1500))])
      .catch(() => undefined)
      .then(() => start());

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
      if (geometry) geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (el.parentNode === mount) mount.removeChild(el);
    };
  }, []);

  if (failed) {
    return (
      <h1 className="display-2 mt-7 text-cream text-[15vw] leading-[0.88] md:text-[10.5vw] lg:text-[9vw]">
        {first}
        <br />
        {rest.join(" ")}
        <span className="text-signal">.</span>
      </h1>
    );
  }

  return (
    <div className="mt-7">
      <h1 className="sr-only">{NAME}</h1>
      <div ref={mountRef} aria-hidden="true" className="h-[46vw] max-h-[430px] w-full md:h-[26vw]" />
    </div>
  );
}
