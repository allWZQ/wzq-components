import { Lists } from './index';

export const HEIGTH = 280;
export const ITEMSIZE = 35;

export const PAGE_SIZE = 20;
export const PAGE = 1;

export const titleList = [
  {
    id: '1',
    name: 'id',
  },
  {
    id: '2',
    name: '名称',
  },
];

export const addShop = (arr: Array<Lists>, value: Lists): Array<Lists> => {
  let list = [];
  if (arr.length) {
    list = arr.map((value) => value);
  }
  list.push(value);
  return list;
};

export const deleteShop = (arr: Array<Lists>, id: number): Array<Lists> => {
  return arr.filter((value) => value.id !== id);
};

// 防抖
export const deBounce = (
  fn: (...args: any[]) => any,
  interval: number
): ((...args: any[]) => any) => {
  let timer = null;
  return (e) => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
    timer = setTimeout(() => {
      fn(e);
    }, interval);
  };
};
