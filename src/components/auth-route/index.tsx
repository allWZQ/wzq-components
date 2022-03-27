import React, { FC } from 'react';
import { Route } from 'react-router-dom';
import { observer } from 'mobx-react';
import { ContextStore } from '~/stores/context';
import UserStore from '~/stores/user';
import { useInjectedStore } from '~/stores/useStore';
interface IProps {
  component: any;
  exact?: boolean;
  context?: ContextStore;
  userStore?: UserStore;
  path: string;
}
const AuthRouter: FC<IProps> = (props: IProps) => {
  const context: ContextStore = useInjectedStore('context');
  const userStore: UserStore = useInjectedStore('userStore');
  const { path } = props;
  const { component: TobeRender, exact, ...rest } = props;
  // 设置当前地址信息
  return (
    <Route
      {...rest}
      exact={exact}
      render={props => {
        context.setHistory(props.history);
        console.log(props.history);
        return <TobeRender {...props} />;
      }}
    />
  );
}

export default observer(AuthRouter);
