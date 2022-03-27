import React, { FC, useLayoutEffect, useState } from 'react';
import style from './style.scss';
import { observer } from 'mobx-react';
import { useInjectedStore } from '~/stores/useStore';
import ContextStore from "~/stores/context"
import UserStore from '~/stores/user';
React.useEffect = useLayoutEffect;

interface IProps {
  children: React.ReactChild;
}

const BaseLayout: FC<IProps> = (props: IProps) => {
  const context: ContextStore = useInjectedStore('context');
  const userStore: UserStore = useInjectedStore('userStore');
  return (
    <div className={style.layout}>
      <div className={style.body}>{props.children}</div>
    </div>
  );
}
export default observer(BaseLayout);
