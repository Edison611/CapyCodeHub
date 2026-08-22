import React from 'react';
import { act, render, screen } from '@testing-library/react';
import Hero from './HeroBg';
import { loadSplineRuntime } from './splineRuntime';

// The real runtime is a native browser ES module and needs WebGL, so neither
// jsdom nor jest can load it. Mock the loader seam instead.
jest.mock('./splineRuntime', () => ({
  loadSplineRuntime: jest.fn(),
}));

const load = jest.fn();
const dispose = jest.fn();
const setBackgroundColor = jest.fn();

class FakeApplication {
  constructor(canvas) {
    FakeApplication.lastCanvas = canvas;
  }

  load(...args) {
    return load(...args);
  }

  setBackgroundColor(...args) {
    return setBackgroundColor(...args);
  }

  dispose() {
    return dispose();
  }
}

const SCENE = 'https://example.test/scene.splinecode';

beforeEach(() => {
  jest.clearAllMocks();
  FakeApplication.lastCanvas = null;
  load.mockResolvedValue(undefined);
  loadSplineRuntime.mockResolvedValue({ Application: FakeApplication });
});

// The runtime load is async, so flush promises inside act() before asserting.
const renderHero = async (props) => {
  let result;
  await act(async () => {
    result = render(<Hero image="/logo.png" title="Capybaras (2055)" {...props} />);
  });
  return result;
};

const backdrop = () => document.querySelector('.hero-spline');

test('keeps the original hero markup intact', async () => {
  await renderHero();

  expect(screen.getByText('Capybaras (2055)')).toHaveClass('title');
  expect(document.querySelector('.hero .background img')).toBeInTheDocument();
  expect(document.querySelector('.hero-content')).toBeInTheDocument();
});

test('renders no 3D layer at all when no scene is given', async () => {
  await renderHero();

  expect(loadSplineRuntime).not.toHaveBeenCalled();
  expect(backdrop()).toBeNull();
});

test('loads the scene as a decorative, non-interactive layer', async () => {
  await renderHero({ scene: SCENE });

  expect(load).toHaveBeenCalledWith(SCENE);
  expect(FakeApplication.lastCanvas).toBeInstanceOf(HTMLCanvasElement);

  const layer = backdrop();
  expect(layer).toBeInTheDocument();
  // Decorative: hidden from assistive tech and marked ready so CSS fades it in.
  expect(layer).toHaveAttribute('aria-hidden', 'true');
  expect(layer).toHaveClass('is-ready');
});

test('clears the scene background so the hero image shows through', async () => {
  await renderHero({ scene: SCENE });

  expect(setBackgroundColor).toHaveBeenCalledWith('transparent');
});

test('leaves the hero untouched when the scene fails to load', async () => {
  load.mockRejectedValue(new Error('network down'));
  jest.spyOn(console, 'warn').mockImplementation(() => {});

  await renderHero({ scene: SCENE });

  // Layer stays mounted but never becomes visible, and the hero still renders.
  expect(backdrop()).not.toHaveClass('is-ready');
  expect(screen.getByText('Capybaras (2055)')).toBeInTheDocument();
  expect(document.querySelector('.hero .background img')).toBeInTheDocument();
});

test('leaves the hero untouched when the runtime cannot be fetched', async () => {
  loadSplineRuntime.mockRejectedValue(new Error('cdn unreachable'));
  jest.spyOn(console, 'warn').mockImplementation(() => {});

  await renderHero({ scene: SCENE });

  expect(backdrop()).not.toHaveClass('is-ready');
  expect(screen.getByText('Capybaras (2055)')).toBeInTheDocument();
});

test('disposes the application on unmount', async () => {
  const { unmount } = await renderHero({ scene: SCENE });

  act(() => unmount());
  expect(dispose).toHaveBeenCalled();
});
