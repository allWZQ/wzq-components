//选中文本
export const textSelect = (e) => {
  const start = 0;
  const end = e.value.length;
  if (e.createTextRange) {
    //IE浏览器
    var range = e.createTextRange();
    range.moveStart('character', -end);
    range.moveEnd('character', -end);
    range.moveStart('character', start);
    range.moveEnd('character', end);
    range.select();
  } else {
    e.setSelectionRange(start, end);
    e.focus();
  }
};
//阻止默认行为
export const removeDefaultBehavior = (e) => {
  // 阻止默认事件
  if (e.preventDefault) {
    e.preventDefault();
  }
  // 阻止事件冒泡
  if (e.stopPropagation) {
    e.stopPropagation();
  }
  return false; //用于处理使用对象属性注册的处理程序
};

//判断验证码的位数
export const isSomeEmpty = (code): boolean => {
  if (!code.length) {
    return true;
  }
  const isCount = code.some((value) => {
    return value === '';
  });
  return isCount;
};
