import { Input } from 'antd';
import React, { FC, useState } from 'react';
import style from './style.module.scss';

const { TextArea } = Input;

interface IProps {
  value?: string;
  onChange?: () => void;
  onPaste?: (e: any) => Promise<void>;
  placeholder?: string;
}

const FormTextarea: FC<IProps> = (props: IProps) => {
  const { value, onChange, onPaste, placeholder = '快留下你的足迹鸭~' } = props;
  const [hasBg, setHasBg] = useState<boolean>(true);
  return (
    <div className={style.body}>
      <TextArea
        value={value}
        showCount
        maxLength={200}
        onChange={onChange}
        onPaste={onPaste}
        onBlur={() => setHasBg(true)}
        onFocus={() => setHasBg(false)}
        placeholder={placeholder}
        className={`${style.textArea} ${hasBg ? style.bg : style.noBg}`}
      />
    </div>
  );
};

export default FormTextarea;
