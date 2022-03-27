import { CloseOutlined } from '@ant-design/icons';
import { observer } from 'mobx-react';
import React, { FC } from 'react';
import { Lists } from '../index';
import SuperLargeDataList from '../../super-large-list';
import { deleteShop, HEIGTH, ITEMSIZE } from '../const';
import style from './style.module.scss';

interface IProps {
  lists: Array<Lists>;
  setLists: (shop) => void;
}

const LeftList: FC<IProps> = (props: IProps) => {
  const { lists, setLists } = props;
  const deleteShopItem = (id) => {
    const arr = deleteShop(lists, id);
    setLists(arr);
  };
  const reEmpty = () => {
    setLists([]);
  };
  return (
    <div className={style.body}>
      <div className={style.listBox}>
        <div className={style.listTitle}>
          {`已选择账号（${lists.length}）`}
          <a onClick={reEmpty}>清空</a>
        </div>
        <div className={style.listDataBox}>
          <SuperLargeDataList height={HEIGTH + ITEMSIZE} itemSize={() => ITEMSIZE} datas={lists}>
            {({ index, style: styleProps, data }) => {
              let value = data[index];
              return (
                <div style={styleProps} className={style.itemBox}>
                  <div className={style.item}>
                    <div className={style.itemText}>{value.name}</div>
                    <CloseOutlined
                      className={style.closeIcon}
                      onClick={(e) => deleteShopItem(value.id)}
                    />
                  </div>
                </div>
              );
            }}
          </SuperLargeDataList>
        </div>
      </div>
    </div>
  );
};

export default observer(LeftList);
