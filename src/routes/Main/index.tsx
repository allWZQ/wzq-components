import React, { FC, useEffect, useState } from 'react';
import { observer } from 'mobx-react';
import { BaseLayout } from '~/layouts';
import style from './style.scss';
import { Menu } from 'antd';
import { menuRouterConfig } from "../router.config";
import { Switch } from 'react-router-dom';
import { AuthRouter } from '~/components';
import { superTool } from '~/utils';
import { PATHS } from '../path.config';

const Main: FC = () => {
  const [selectedKeys,setSelectedKeys] = useState<Array<string>>([])
  const selectdPath = (item) => {
    superTool.pushUrl(item.key);
    setSelectedKeys([item.key]);
  }
  useEffect(()=>{
    superTool.pushUrl(PATHS.FormCodeInput);
    setSelectedKeys([PATHS.FormCodeInput]);
  },[])
  return (
    <BaseLayout>
      <div className={style.body}>
        <Menu mode="inline" selectedKeys={selectedKeys} className={style.menuBox} onClick={selectdPath}>
          {menuRouterConfig.map(value => (
            <Menu.Item key={value.key}>{value.name}</Menu.Item>
          ))}
        </Menu>
        <div className={style.contentBox}>
          <Switch>
            {menuRouterConfig.map(value => (
              <AuthRouter key={value.key} path={value.path} component={value.component} />
            ))}
          </Switch>
        </div>
      </div>
    </BaseLayout>
  );
}

export default observer(Main);
