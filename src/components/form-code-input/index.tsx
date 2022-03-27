import React, { FC, useMemo, useRef, useState } from "react";
import { removeDefaultBehavior, textSelect } from "./const";
import style from "./style.module.scss";

interface IProps {
  value?: Array<string>;
  onChange?: (value: Array<string>) => void;
  length?: number;
}

const FormCodeInput: FC<IProps> = (props: IProps) => {
  const { length = 6, value = new Array(length).fill(""), onChange } = props;
  const [code, setCode] = useState(value);
  const [dom, setDom] = useState(new Array(length));
  const [onBox, setOnBox] = useState<number | null>(null);
  const [flag, setflag] = useState(true);
  const getPrevBox = (i) => {
    return dom[i - 1];
  };
  const getNextBox = (i) => {
    return dom[i + 1];
  };
  const focusOn = (i) => {
    const element = dom[i]?.current;
    if (element) {
      element?.focus();
      setOnBox(i);
    }
  };
  const onChangeValue = (e, i) => {
    const value = e.target.value.trim();
    const reg = /^\d+$/g
    if (value !== '' && !reg.test(value)) {
      return;
    }
    const newCode = [...code];
    newCode[i] = value;
    setCode(newCode);
    focusOn(i + 1);
    onChange?.(newCode);
  };
  //重置
  const resetCodeItem = (i) => {
    const newCode = [...code];
    newCode[i] = '';
    setCode(newCode);
    onChange?.(newCode);
  };
  const onKeyDown = (e, i) => {
    switch (e.keyCode) {
      case 8: //删除操作
        resetCodeItem(i);
        removeDefaultBehavior(e);
        focusOn(i - 1);
        break;
      case 37: // 左
      case 38: // 上
        removeDefaultBehavior(e);
        if (getPrevBox(i)) {
          focusOn(i - 1);
        } else {
          focusOn(i);
        }
        break;
      case 39: // 右
      case 40: // 下
        removeDefaultBehavior(e);
        if (getNextBox(i)) {
          focusOn(i + 1);
        } else {
          focusOn(i);
        }
        break;
      default:
        //不管输入什么都进行操作
        textSelect(e.target);
    }
  };
  return (
    <div className={style.codeboxContainer}>
      {Array.from({ length: 6 }, (_, i) => i).map((_, i) => {
        const domRef = useRef<HTMLInputElement>()
        return (
          <div key={i} className={`${style.codeboxFieldWrap} ${onBox === i ? style.current : ""}`}>
            <input
              type="text"
              maxLength={1}
              autoComplete="false"
              autoCorrect="off"
              autoCapitalize="off"
              spellCheck="false"
              value={code[i] || ''}
              ref={(dom[i] = domRef)}
              onClick={(e) => setOnBox(i)}
              onInput={(e) => flag && onChangeValue(e, i)}
              onChange={(e) => flag && onChangeValue(e, i)}
              onKeyDown={(e) => {
                setflag(true);
                onKeyDown(e, i);
              }}
              onCompositionStart={() => setflag(true)}
              onCompositionEnd={() => setflag(false)}
            />
          </div>
        )
      })}
    </div>
  )
}

export default FormCodeInput