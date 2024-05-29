import { useEffect } from 'react';
import throttle from 'lodash.throttle';

interface FunctionInterface {
  elementId: string;
  onBottomReached: () => void;
  onUnBottom: () => void;
}

const useReachBottom = ({
  elementId,
  onBottomReached,
  onUnBottom,
}: FunctionInterface) => {
  useEffect(() => {
    let lastScrollTop = 0;

    const el = document.getElementById(elementId)!;

    el.addEventListener(
      'scroll',
      throttle(() => {
        // If go up
        if (el.scrollTop < lastScrollTop) {
          onUnBottom();
          return;
        }

        // If go down
        lastScrollTop = el.scrollTop <= 0 ? 0 : el.scrollTop;

        // If at bottom
        if (el.scrollTop + el.offsetHeight < el.scrollHeight) {
          onBottomReached();
        }
      }, 50)
    );
    // eslint-disable-next-line
  }, []);
};

export default useReachBottom;
