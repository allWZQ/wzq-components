import 'regenerator-runtime/runtime';
import React, { FC, useEffect } from 'react';
import { render } from 'react-dom';
import { Provider } from 'mobx-react';
import { BrowserRouter, Switch } from 'react-router-dom';
import { Main } from '~/routes';
import RootStore from '~/stores';
import './style.scss';
import AuthRouter from '~/components/auth-route';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import moment from 'moment';

const App: FC = () => {
  useEffect(() => {
    moment.locale('zh-cn');
  }, [])
  return (
    <ConfigProvider locale={zhCN}>
      <BrowserRouter>
        <Switch>
          <AuthRouter path="/" component={Main} />
        </Switch>
      </BrowserRouter>
    </ConfigProvider>
  );
}

render(
  <Provider {...new RootStore()}>
    <App />
  </Provider>,
  document.getElementById('root')
);
