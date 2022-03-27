import { createFromIconfontCN } from '@ant-design/icons';
// 阿里图标库 iconfont.cn
const ALI_ICON = [
  '//at.alicdn.com/t/font_3155256_o6urdmwulz9.js',
];
export const AliIconFont = createFromIconfontCN({
  scriptUrl: ALI_ICON,
  extraCommonProps: {
    className: 'ali-icon-font',
  },
});
