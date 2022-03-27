import { Button, ButtonProps } from "antd";
import { observer } from "mobx-react-lite";
import React, { FC } from "react";
import style from "./style.module.scss";

interface IProps extends ButtonProps {
  text: string;
}

const FormButton: FC<IProps> = (props: IProps) => {
  const { text = "确认" } = props;
  return (
    <div className={style.submit} id="nextBtn">
      <Button
        {...props}
        className={style.submitBox}
        type="primary"
      >
        {text}
      </Button>
    </div>
  )
}

export default observer(FormButton)