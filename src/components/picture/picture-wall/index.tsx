import React, { FC } from 'react';
import { message, Upload, UploadProps } from 'antd';
import { observer } from 'mobx-react-lite';
import style from './style.module.scss';
import { PICTUREWALL, FILE_IMG } from '../const';
import { FileLists } from '../index';
import Message from '~/components/message';

interface IProps extends UploadProps {
  max?: number;
  multiple?: boolean;
  filesList?: Array<FileLists>;
  disabled?: boolean;
  bodyHight?: number;
  children?: React.ReactChild;
  sendFile: (file: File) => void;
}

const PictureWall: FC<IProps> = (props: IProps) => {
  const {
    max = 0,
    multiple = true,
    disabled = false,
    filesList = [],
    bodyHight,
    children,
    sendFile,
  } = props;
  let count = filesList.length;
  const uploadProps = {
    name: 'file',
    beforeUpload: (file) => {
      return new Promise((resolve) => {
        const typei = file.name.lastIndexOf('.');
        const fileTypes = Object.keys(FILE_IMG);
        if (fileTypes.includes(file.name.slice(typei + 1))) {
          handleChange(file);
        } else {
          Message.error({
            content:"暂不支持${file.name.slice(typei)}格式"
          });
        }
      });
    },
  };
  const handleChange = async (file) => {
    if (count < max) {
      sendFile(file)
      count++;
    } else {
      Message.error({
        content: '最多只能上10个附件',
      });
    }
  };
  if (filesList.length >= max) {
    return <div className={style.disableBox}>{children}</div>;
  }
  return (
    <div className={style.body}>
      <Upload
        {...uploadProps}
        listType="picture"
        className={style.upload}
        fileList={[]}
        multiple={multiple}
        disabled={disabled}
      >
        {children ? (
          children
        ) : (
          <div style={{ height: bodyHight }} className={style.uploadBox} id={PICTUREWALL}>
            拖拽文件到这里，直接上传
          </div>
        )}
      </Upload>
    </div>
  );
};

export default observer(PictureWall);
