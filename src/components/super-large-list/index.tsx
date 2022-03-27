import { observer } from 'mobx-react';
import React, { forwardRef } from 'react';
import { VariableSizeList } from 'react-window';

interface IProps {
  height: number;
  width?: number;
  itemSize: (index: number) => number;
  datas: any[];
  className?: string;
  onScroll?: (e) => void;
  children: React.ReactChild;
}
const SuperLargeDataList = forwardRef((props: IProps, ref: any) => {
  const { datas = [], height, itemSize, onScroll, className, width } = props;
  return (
    <VariableSizeList
      className={className}
      height={height}
      width={width}
      itemSize={itemSize}
      itemCount={datas?.length}
      itemData={datas}
      ref={ref}
      onScroll={(e) => {
        onScroll?.(e);
      }}
    >
      {props.children}
    </VariableSizeList>
  );
});

export default observer(SuperLargeDataList);
