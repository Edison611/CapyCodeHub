import React, { useEffect, useRef, useState } from 'react';
import { loadSplineRuntime } from './splineRuntime';

/**
 * Purely decorative 3D layer that sits behind hero content.
 *
 * Deliberately not interactive and not announced to assistive tech: it is
 * ambience, not a feature. If anything fails to load it renders nothing at all,
 * so the hero falls back to its plain image background with no visible gap.
 */
function SplineBackdrop({ scene, className = '' }) {
  const canvasRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if (!scene) return undefined;

    let cancelled = false;
    let app = null;

    (async () => {
      try {
        const { Application } = await loadSplineRuntime();
        if (cancelled || !canvasRef.current) return;

        app = new Application(canvasRef.current);
        await app.load(scene);
        if (cancelled) return;

        // Scenes usually export with an opaque background, which would hide the
        // hero image underneath. Drop it so only the model composites in.
        try {
          app.setBackgroundColor('transparent');
        } catch (error) {
          /* older runtimes may not support this; the layer still works */
        }

        setReady(true);
      } catch (error) {
        // Ambience is optional — log and leave the hero as-is.
        // eslint-disable-next-line no-console
        console.warn('Spline backdrop unavailable; hero will render without it.', error);
      }
    })();

    return () => {
      cancelled = true;
      try {
        app?.dispose?.();
      } catch (error) {
        /* nothing useful to do while unmounting */
      }
    };
  }, [scene]);

  if (!scene) return null;

  return (
    <div
      className={`hero-spline ${ready ? 'is-ready' : ''} ${className}`.trim()}
      aria-hidden="true"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

export default SplineBackdrop;
