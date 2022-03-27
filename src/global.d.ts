declare module '*.svg';
declare module '*.png';
declare module '*.jpg';
declare module '*.gif';

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.less' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

interface RouteItem {
  key: string;
  icon?: string;
  name: string;
  // 是否绝对匹配
  isExact?: boolean;
  path?: string;
  component?: any;
}

interface User {
  username?: string;
  password?: string;
}
