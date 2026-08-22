/**
 * Loads the Spline runtime as a *native* browser ES module.
 *
 * Why not `import '@splinetool/runtime'` / `@splinetool/react-spline`?
 * Both break when bundled by react-scripts 5:
 *   - @splinetool/runtime@2.x fails the build outright — it references
 *     '../libs/draco/draco_decoder.wasm', which the package does not ship.
 *   - @splinetool/runtime@1.x builds, but CRA's Babel + Terser pass mangles the
 *     runtime's internal three.js bundle. A superclass reference is emitted as
 *     `class extends(null)`, so the scene throws
 *     "Super constructor null of anonymous class is not a constructor" at runtime.
 *
 * Loading the prebuilt ESM directly keeps it out of webpack's graph, so nothing
 * transpiles or minifies it. The bundle is fully self-contained (no bare import
 * specifiers), so the browser can evaluate it as-is.
 *
 * `webpackIgnore` tells webpack to leave this import() alone and emit a real
 * dynamic import instead of trying to resolve/bundle the URL.
 *
 * To self-host instead of using a CDN, drop runtime.js into `public/` and point
 * RUNTIME_URL at it — the mechanism is the same.
 */
export const RUNTIME_VERSION = '1.12.98';

export const RUNTIME_URL = `https://cdn.jsdelivr.net/npm/@splinetool/runtime@${RUNTIME_VERSION}/build/runtime.js`;

let runtimePromise = null;

/** Resolves to the runtime module namespace, which exports `Application`. */
export function loadSplineRuntime() {
  if (!runtimePromise) {
    runtimePromise = import(/* webpackIgnore: true */ RUNTIME_URL).catch((error) => {
      // Let a later mount retry instead of caching the rejection forever.
      runtimePromise = null;
      throw error;
    });
  }
  return runtimePromise;
}
