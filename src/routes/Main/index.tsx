import React, { FC } from 'react';
import { observer } from 'mobx-react';
import { BaseLayout } from '~/layouts';
import { Tabs } from 'antd';
import style from './style.scss';

const { TabPane } = Tabs;

const Main: FC = () => {
  return (
    <BaseLayout>
      <div>新建脚手架</div>
    </BaseLayout>
  );
}

export default observer(Main);
