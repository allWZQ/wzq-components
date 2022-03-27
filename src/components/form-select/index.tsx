import { Select, Spin } from 'antd';
import React, { FC, useEffect, useState } from 'react';
import { SelectProps } from 'rc-select';
import style from './style.module.scss';
import { tool } from '~/utils';
import { PAGE, PAGE_SIZE } from './const';

const { Option } = Select;

interface IProps extends SelectProps {
  value?: string;
  onChange?: (e) => void;
}

const FormSelect: FC<IProps> = (props: IProps) => {
  const [datas, setDatas] = useState<Array<{
    id: string;
    name: string;
  }>>([]);
  const [loading, setLoading] = useState<boolean>(false)
  const { value, onChange } = props;
  const init = async () => {
    const res = await sendGetData({
      pageIndex: PAGE,
      pageSize: PAGE_SIZE,
    })
    setDatas((list) => [...list, ...res.data])
  }
  const sendGetData = async (data: {
    pageIndex: number,
    pageSize: number,
    keyword?: string,
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
  const onPopupScroll = async (e) => {
    e.persist();
    const { target } = e;
    //分页加载
    if (target.scrollTop + target.offsetHeight === target.scrollHeight) {
      const page = datas.length / PAGE_SIZE + 1;
      const res = await sendGetData({
        pageIndex: page,
        pageSize: PAGE_SIZE,
      })
      setDatas((list) => [...list, ...res.data])
    }
  }
  const onDropdownVisibleChange = (open) => {
    if (!open) {
      setDatas([])
    } else {
      init()
    }
  }
  const onSearch = (value) => {
    tool.deBounce(() => sendGetData({
      pageIndex: PAGE,
      pageSize: PAGE_SIZE,
      keyword: value,
    }), 200)()
  }
  return (
    <Select
      style={{ width: "100%" }}
      placeholder="请选择"
      mode="multiple"
      showSearch
      allowClear
      optionFilterProp="title"
      value={value}
      dropdownRender={(menu) => {
        return (
          <Spin spinning={loading} tip="请稍后...">{menu}</Spin>
        )
      }}
      onPopupScroll={onPopupScroll}
      onSearch={onSearch}
      onDropdownVisibleChange={onDropdownVisibleChange}
      onChange={(e) => onChange(e)}
      getPopupContainer={(triggerNode) => triggerNode.parentElement}
      optionLabelProp="title"
      className={`${style.selectBox} ${props.className}`}
      {...props}
    >
      {datas.map((value) => (
        <Option key={value.id} value={value.id} item={value} title={value.name}>
          <div className={style.itemBox}>
            <div className={style.itemIcon}>{value.name.slice(0, 1)}</div>
            <div className={style.itemText}>
              <div>{value?.name}</div>
            </div>
          </div>
        </Option>
      ))}
    </Select>
  );
};

export default FormSelect