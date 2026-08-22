import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

/**
 * Purely decorative, fully local 3D layer: a slowly spinning VEX-style disc.
 *
 * Unlike `SplineBackdrop`, this needs no hosted scene or CDN runtime — the
 * geometry, material, and lighting are all built with `three` at mount time.
 * Kept deliberately simple (one cylinder + a rim torus) so it stays quick to
 * render and reads as ambience rather than a focal point.
 *
 * Not interactive and not announced to assistive tech, same as the Spline
 * layer it sits alongside.
 */
function LocalDiscBackdrop({ className = '' }) {
  const containerRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return undefined;

    let frameId = null;
    let disposed = false;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch (error) {
      // No WebGL available (older browsers, some test environments, disabled
      // GPU access). Ambience is optional — render nothing rather than crash.
      // eslint-disable-next-line no-console
      console.warn('Local disc backdrop unavailable; hero will render without it.', error);
      return undefined;
    }

    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 100);
    camera.position.set(0, 1.6, 4.2);
    camera.lookAt(0, 0, 0);

    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // A disc: flat cylinder body plus a slightly larger, thinner rim torus
    // to read as a beveled edge without needing a custom mesh.
    const discGroup = new THREE.Group();

    const body = new THREE.Mesh(
      new THREE.CylinderGeometry(1, 1, 0.22, 48),
      new THREE.MeshStandardMaterial({
        color: 0xf5c518,
        roughness: 0.45,
        metalness: 0.05,
      })
    );
    discGroup.add(body);

    const rim = new THREE.Mesh(
      new THREE.TorusGeometry(1, 0.05, 16, 48),
      new THREE.MeshStandardMaterial({
        color: 0xd9a80f,
        roughness: 0.5,
        metalness: 0.05,
      })
    );
    rim.rotation.x = Math.PI / 2;
    discGroup.add(rim);

    discGroup.rotation.x = THREE.MathUtils.degToRad(70);
    scene.add(discGroup);

    const ambient = new THREE.AmbientLight(0xffffff, 0.65);
    const key = new THREE.DirectionalLight(0xffffff, 1.1);
    key.position.set(2, 3, 4);
    scene.add(ambient, key);

    const resize = () => {
      const { clientWidth: width, clientHeight: height } = container;
      if (!width || !height) return;
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
    };
    resize();

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const clock = new THREE.Clock();
    const prefersReducedMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    const animate = () => {
      if (disposed) return;
      if (!prefersReducedMotion) {
        const t = clock.getElapsedTime();
        discGroup.rotation.z = t * 0.35;
        discGroup.position.y = Math.sin(t * 0.6) * 0.08;
      }
      renderer.render(scene, camera);
      if (!prefersReducedMotion) {
        frameId = requestAnimationFrame(animate);
      }
    };

    setReady(true);
    animate();

    return () => {
      disposed = true;
      if (frameId !== null) cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      body.geometry.dispose();
      body.material.dispose();
      rim.geometry.dispose();
      rim.material.dispose();
      renderer.dispose();
      if (renderer.domElement.parentNode === container) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`hero-disc ${ready ? 'is-ready' : ''} ${className}`.trim()}
      aria-hidden="true"
    />
  );
}

export default LocalDiscBackdrop;
