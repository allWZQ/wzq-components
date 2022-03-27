import React, { FC, useCallback, useEffect, useMemo, useState } from 'react';
import SuperLargeDataList from '../../super-large-list';
import { Checkbox, Input, Spin } from 'antd';
import style from './style.module.scss';
import {
  addShop,
  deBounce,
  deleteShop,
  HEIGTH,
  ITEMSIZE,
  PAGE,
  PAGE_SIZE,
  titleList,
} from '../const';
import { Lists } from '../index';

const { Search } = Input;

interface IProps {
  lists: Array<Lists>;
  setLists: (shop) => void;
  datas: Array<any>;
  total: number;
  loading: boolean
  getData: (page?: number, keyWorld?: string) => Promise<Array<Lists>>;
}

const RightList: FC<IProps> = (props: IProps) => {
  const { total, datas, lists, loading, getData, setLists } = props;
  const [indeterminate, setIndeterminate] = useState<boolean>(false);
  const [selectAll, setSelectAll] = useState<boolean>(false);
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    if (!lists.length) {
      setSelectAll(false);
    }
    if (lists.length === datas.length) {
      setIndeterminate(false);
    } else if (lists.length) {
      setIndeterminate(true);
    } else {
      setIndeterminate(false);
    }
  }, [lists]);
  const onSearch = async (keyword) => {
    await getData(PAGE, keyword);
  };
  const onScroll = async (e) => {
    const height = ITEMSIZE * datas.length;
    const heigthOffset: number = e.scrollOffset;
    const page = datas.length / PAGE_SIZE + 1;
    if (total && total === datas.length) {
      return;
    }
    if (height - heigthOffset === HEIGTH) {
      //请求接口
      const arr = await getData(page);
      console.log('分页加载');
      if (selectAll && arr?.length) {
        setLists((list) => [...list, ...arr]);
      }
    }
  };
  const checkboxItemChange = useCallback(
    (e, value: Lists) => {
      const checked = e.target.checked;
      let arr = [];
      if (checked) {
        arr = addShop(lists, value);
      } else {
        arr = deleteShop(lists, value.id);
      }
      setLists(arr);
    },
    [lists, datas]
  );
  const checkboxAllChange = (e) => {
    const checked = e.target.checked;
    let arr = [];
    if (checked) {
      setSelectAll(true);
      arr = datas.map((value) => value);
    } else {
      setSelectAll(false);
    }
    setLists(arr);
  };
  //避免组件多次刷新使用useMemo
  const listDom = useMemo(() => {
    return (
      <SuperLargeDataList
        onScroll={deBounce(onScroll, 200)}
        height={HEIGTH}
        itemSize={() => ITEMSIZE}
        datas={datas}
      >
        {({ index, style: styleProps, data }) => {
          let value = data[index];
          return (
            <div style={styleProps} className={style.itemBox}>
              <Checkbox
                checked={new Set(lists.map((value) => value.id)).has(value.id)}
                className={style.itemCheck}
                onChange={(e) => checkboxItemChange(e, value)}
              />
              <div className={style.item}>
                <div className={style.itemText}>{value.id}</div>
              </div>
              <div className={style.item}>
                <div className={style.itemText}>{value.name}</div>
              </div>
            </div>
          );
        }}
      </SuperLargeDataList>
    );
  }, [lists, datas]);
  return (
    <div className={style.body}>
      <Search placeholder="请输入关键词搜索" allowClear onSearch={onSearch} />
      <div className={style.listBox}>
        <div className={style.titleBox}>
          <Checkbox
            checked={selectAll}
            className={style.checkAll}
            indeterminate={indeterminate}
            onChange={checkboxAllChange}
          />
          {titleList.map((value) => (
            <div key={value.id} className={style.title}>
              {value.name}
            </div>
          ))}
        </div>
        <Spin spinning={loading} tip="请稍后...">
          {listDom}
        </Spin>
      </div>
    </div>
  );
};

export default RightList;
