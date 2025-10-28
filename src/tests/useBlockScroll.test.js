import { renderHook } from '@testing-library/react';
import useBlockScroll from '../hooks/useBlockScroll';

describe('useBlockScroll', () => {
  let lenis;

  beforeEach(() => {
    lenis = { stop: jest.fn(), start: jest.fn() };
    document.body.style.overflow = '';
  });

  test('блокує скрол, коли state = true', () => {
    renderHook(() => useBlockScroll(true, lenis));
    expect(document.body.style.overflow).toBe('hidden');
    expect(lenis.stop).toHaveBeenCalled();
  });

  test('відновлює скрол, коли state = false', () => {
    renderHook(() => useBlockScroll(false, lenis));
    expect(document.body.style.overflow).toBe('');
    expect(lenis.start).toHaveBeenCalled();
  });

  test('повертає overflow у початковий стан після анмаунту', () => {
    const { unmount } = renderHook(() => useBlockScroll(true, lenis));
    unmount();
    expect(document.body.style.overflow).toBe('');
    expect(lenis.start).toHaveBeenCalled();
  });
});
