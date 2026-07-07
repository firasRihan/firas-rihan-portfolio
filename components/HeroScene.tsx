"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { accentCSS } from "@/lib/theme";

/**
 * Hero signature: a particle globe with rising transmission arcs —
 * a nod to computer & communications engineering. Colors are read
 * from the CSS design tokens at runtime.
 */
export default function HeroScene() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      42,
      mount.clientWidth / Math.max(mount.clientHeight, 1),
      0.1,
      100,
    );
    camera.position.set(0, 0, 8);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    mount.appendChild(renderer.domElement);

    const accent = new THREE.Color(accentCSS());
    const group = new THREE.Group();
    scene.add(group);

    const geometries: THREE.BufferGeometry[] = [];
    const materials: THREE.Material[] = [];

    // ── particle globe (fibonacci sphere) ─────────────────────────
    const R = 2.7;
    const isSmall = mount.clientWidth < 768;
    const COUNT = isSmall ? 550 : 1200;
    const positions = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const y = 1 - (i / (COUNT - 1)) * 2;
      const r = Math.sqrt(Math.max(0, 1 - y * y));
      const theta = Math.PI * (3 - Math.sqrt(5)) * i;
      positions[i * 3] = Math.cos(theta) * r * R;
      positions[i * 3 + 1] = y * R;
      positions[i * 3 + 2] = Math.sin(theta) * r * R;
    }
    const pointsGeo = new THREE.BufferGeometry();
    pointsGeo.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    const pointsMat = new THREE.PointsMaterial({
      color: accent,
      size: 0.03,
      transparent: true,
      opacity: 1,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
    });
    geometries.push(pointsGeo);
    materials.push(pointsMat);
    group.add(new THREE.Points(pointsGeo, pointsMat));

    // ── transmission arcs between random surface points ───────────
    const surfacePoint = () => {
      const u = Math.random();
      const v = Math.random();
      const theta = 2 * Math.PI * u;
      const phi = Math.acos(2 * v - 1);
      return new THREE.Vector3(
        R * Math.sin(phi) * Math.cos(theta),
        R * Math.cos(phi),
        R * Math.sin(phi) * Math.sin(theta),
      );
    };

    const ARCS = isSmall ? 10 : 18;
    for (let i = 0; i < ARCS; i++) {
      const a = surfacePoint();
      const b = surfacePoint();
      const mid = a
        .clone()
        .add(b)
        .multiplyScalar(0.5)
        .normalize()
        .multiplyScalar(R * (1.3 + Math.random() * 0.55));
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      const arcGeo = new THREE.BufferGeometry().setFromPoints(
        curve.getPoints(48),
      );
      const arcMat = new THREE.LineBasicMaterial({
        color: accent,
        transparent: true,
        opacity: 0.1 + Math.random() * 0.2,
      });
      geometries.push(arcGeo);
      materials.push(arcMat);
      group.add(new THREE.Line(arcGeo, arcMat));
    }

    // ── faint equatorial ring ──────────────────────────────────────
    const ringGeo = new THREE.RingGeometry(R * 1.55, R * 1.555, 128);
    const ringMat = new THREE.MeshBasicMaterial({
      color: accent,
      transparent: true,
      opacity: 0.25,
      side: THREE.DoubleSide,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.4;
    geometries.push(ringGeo);
    materials.push(ringMat);
    group.add(ring);

    group.rotation.x = 0.28;

    // offset the globe to the right on wide screens, center on mobile
    const placeGroup = () => {
      const wide = mount.clientWidth >= 1024;
      group.position.x = wide ? 2.4 : 0;
      group.position.y = wide ? -0.2 : 0.6;
      const scale = wide ? 1 : 0.72;
      group.scale.setScalar(scale);
    };
    placeGroup();

    // pointer parallax on camera
    let targetX = 0;
    let targetY = 0;
    const onPointer = (e: PointerEvent) => {
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = (e.clientY / window.innerHeight) * 2 - 1;
      targetX = nx * 0.5;
      targetY = -ny * 0.35;
    };

    const onResize = () => {
      camera.aspect = mount.clientWidth / Math.max(mount.clientHeight, 1);
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      placeGroup();
    };
    window.addEventListener("resize", onResize);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      const dt = clock.getDelta();
      group.rotation.y += dt * 0.12;
      ring.rotation.z += dt * 0.05;
      camera.position.x += (targetX - camera.position.x) * 0.04;
      camera.position.y += (targetY - camera.position.y) * 0.04;
      camera.lookAt(group.position);
      renderer.render(scene, camera);
      raf = requestAnimationFrame(tick);
    };

    if (reduced) {
      camera.lookAt(group.position);
      renderer.render(scene, camera);
    } else {
      window.addEventListener("pointermove", onPointer, { passive: true });
      tick();
    }

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
      geometries.forEach((g) => g.dispose());
      materials.forEach((m) => m.dispose());
      renderer.dispose();
      if (renderer.domElement.parentElement === mount) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      aria-hidden
      className="absolute inset-0 opacity-70 lg:opacity-100"
    />
  );
}
