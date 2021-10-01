/* eslint-disable import/prefer-default-export */
import { useEffect } from 'react';

export function useScrollToTop() {
  useEffect(() => {
    if (window.pageYOffset > 0) window.scroll(0, 0);
  }, []);
}
