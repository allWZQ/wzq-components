import React, { FC, useEffect, useState } from 'react';
import style from './style.module.scss';
import { Button } from 'antd';
import LeftList from './left-list';
import RightList from './right-list';
import { PAGE, PAGE_SIZE } from './const';
import { tool } from '~/utils';

export interface Lists {
  id: number;
  name: string;
}

interface IProps {
  value?: Array<Lists>
  onChange?: (formData) => void;
}

const FormTransfer: FC<IProps> = (props: IProps) => {
  const { onChange } = props;
  const [lists, setLists] = useState<Array<Lists>>([]);
  const [datas, setDatas] = useState([]);
  const [total, setTotal] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false)
  const sendGetData = async (data: {
    pageIndex: number,
    pageSize: number,
    keyword: string,
  }) => {
    setLoading(true)
    await tool.seelp(500)
    setLoading(false)
    return {
      code: 200,
      total: Infinity,
      data: Array.from({ length: data.pageSize }, (_, index) => {
        return { id: (index + 1 + (data.pageIndex - 1) * data.pageSize).toString(), name: `wzq${index + 1 + (data.pageIndex - 1) * data.pageSize}` }
      })
    }
  }
  const getData = async (page = PAGE, keyword?) => {
    if (!keyword && total && total === datas.length) {
      return;
    }
    if (page === PAGE) {
      setDatas([])
    }
    const res = await sendGetData({
      pageIndex: page,
      pageSize: PAGE_SIZE,
      keyword: keyword,
    });
    let arr = [];
    if (res.code === 200) {
      setDatas((list) => {
        if (keyword) {
          return res?.data;
        } else if (list?.length) {
          return [...list, ...res?.data];
        } else {
          return res?.data;
        }
      });
      setTotal(res?.total);
      arr = res?.data;
    }
    return arr;
  };
  const onSubmit = () => {
    onChange({ lists: lists });
  };
  return (
    <div className={style.body}>
      <div className={style.contentBox}>
        <LeftList
          datas={datas}
          lists={lists}
          total={total}
          loading={loading}
          getData={getData}
          setLists={setLists}
        />
        <RightList lists={lists} setLists={setLists} />
      </div>
      <div className={style.submitBox}>
        <Button onClick={onSubmit} type="primary">
          确定
        </Button>
      </div>
    </div>
  );
};

export default FormTransfer;
