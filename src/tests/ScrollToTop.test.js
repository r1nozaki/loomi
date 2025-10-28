import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import ScrollToTop from '../helpers/ScrollToTop';
import { lenis } from '../lenisInstance';

jest.mock('../lenisInstance', () => ({
  lenis: { stop: jest.fn(), start: jest.fn() },
}));

window.scrollTo = jest.fn();

describe('ScrollToTop', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  test('зупиняє lenis і скролить нагору при зміні маршруту', () => {
    render(
      <MemoryRouter initialEntries={['/']}>
        <ScrollToTop />
      </MemoryRouter>,
    );

    expect(lenis.stop).toHaveBeenCalled();
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      left: 0,
      behavior: 'auto',
    });

    jest.advanceTimersByTime(300);
    expect(lenis.start).toHaveBeenCalled();
  });
});
