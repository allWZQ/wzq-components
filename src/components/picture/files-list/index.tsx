import React, { FC, useState } from 'react';
import { Image } from 'antd';
import style from './style.module.scss';
import { FILE_IMG } from '../const';
import { observer } from 'mobx-react';
import { FileLists } from '../index';
import { CloseOutlined } from '@ant-design/icons';

interface IProps {
  filesList: Array<FileLists>;
  setFilesList: (file: unknown) => void;
  sendFile?: (file: File, jwt: string) => void;
}

const FilesList: FC<IProps> = (props: IProps) => {
  const { filesList, setFilesList, sendFile } = props;
  const [showImgId, setshowImg] = useState<string>(null);
  const deleteFileList = (id: string) => {
    setFilesList((list: Array<FileLists>) => list.filter(value => value.id !== id))
  };
  const showFile = async (value: FileLists) => {
    if (Object.keys(FILE_IMG).includes(value.fileType)) {
      setshowImg(value.id);
    }
  };
  const fileSize = (value) => {
    if (value > 1024 * 1024) {
      return `${Math.round(value / (1024 * 1024))}Mb`;
    } else if (Math.round(value / 1024) > 0) {
      return `${Math.round(value / 1024)}Kb`;
    } else {
      return `1Kb`;
    }
  };
  return (
    <div className={style.fileBox}>
      {filesList?.map((value: FileLists) => (
        <div key={value.id} className={style.fileItem}>
          <div className={style.fileView}>
            <Image
              src={value.url}
              className={style.imageBox}
              onClick={() => showFile(value)}
              preview={{
                visible: showImgId === value.id,
                onVisibleChange: () => setshowImg(null),
              }}
            />
            <div className={style.fileName}>{value?.fileName}</div>
          </div>
          <div className={style.manageBox}>
            <div className={style.state}>
              <div className={style.fileSize}>{fileSize(value.fileSize)}</div>
            </div>
            <CloseOutlined onClick={() => deleteFileList(value.id)} className={style.closeIcon} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default observer(FilesList);
