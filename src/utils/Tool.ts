export class Tool {
  // 节流
  throttle = (fn: Function, interval: number) => {
    let canRun = true;
    return () => {
      if (!canRun) {
        return;
      }
      canRun = false;
      setTimeout(() => {
        fn();
        canRun = true;
      }, interval);
    };
  };
  // 防抖
  deBounce = (fn: Function, interval: number) => {
    let timer = null;
    return () => {
      if (timer) {
        clearInterval(timer);
        timer = null;
      }
      timer = setTimeout(() => {
        fn();
      }, interval);
    };
  };
  // 滚动到顶部
  scrollToTop = (isAnimation?: boolean) => {
    if (isAnimation) {
      // 返回顶部 - 带动画
      let scrollTop = document.documentElement.scrollTop;
      const allScrollTop = scrollTop;
      let speed = allScrollTop / 16;
      const scroll = () => {
        requestAnimationFrame(() => {
          scrollTop -= speed;
          window.scrollTo(0, scrollTop);
          if (scrollTop > 0) {
            scroll();
          }
        });
      };
      scroll();
    } else {
      window.scrollTo(0, 0);
    }
  };
  seelp = (timeout) => {
    return new Promise((resolve) => setTimeout(resolve, timeout));
  };
}

export const tool = new Tool();
