import { Tooltip } from "antd";
import React, { FC, useEffect, useRef, useState } from "react";
import { AliIconFont } from "../ali-icon";
import FormTextarea from "../form-textarea";
import Message from "../message";
import { addFile, defaultFile, FILE_IMG, getBase64, MAX_FILE_COUNT, PICTUREWALL } from "./const";
import FilesList from "./files-list";
import PictureWall from "./picture-wall";
import style from "./style.module.scss";

export interface FileLists {
  id: string;
  url: string;
  fileType: string;
  fileName: string;
  fileSize: number;
}

const Picture: FC = () => {
  const body = useRef<HTMLDivElement>(null);
  const [hasUpload, setHasUpload] = useState<boolean>(false);
  const [filesList, setFilesList] = useState<Array<FileLists>>(defaultFile);
  const [bodyHight, setBodyHight] = useState<number>(0);
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (typeof entries[0].contentRect.height === 'number') {
        //因为有border的缘故所有需要+2
        const minheight = 2;
        setBodyHight(entries[0].contentRect.height + minheight);
      }
    });
    resizeObserver.observe(body.current);
    return () => {
      resizeObserver.disconnect();
    };
  }, []);
  //移入
  const onDragEnter = () => {
    if (filesList.length < MAX_FILE_COUNT) {
      setHasUpload(true);
    }
  };
  //移除
  const onDragLeave = (e) => {
    if (e.target.id === PICTUREWALL) {
      setHasUpload(false);
    }
  };
  //放入
  const onDrop = (e) => {
    if (e.target.id === PICTUREWALL) {
      setHasUpload(false);
    }
  };
  //base64
  const base = async (file) => {
    await getBase64(file).then((src) => {
      const fileList = addFile(file, src);
      setFilesList(list => [...list, fileList])
    });
  };
  //请求接口
  const sendFile = (file) => {
    base(file)
  }
  //复制
  const onPaste = async (e) => {
    let count = filesList.length;
    if (e.clipboardData?.items.length) {
      for (const value of e.clipboardData?.items) {
        const file = value?.getAsFile();
        if (file) {
          if (count >= MAX_FILE_COUNT) {
            Message.error({
              content: "最多只能上10个附件"
            });
            break;
          }
          const typei = file?.name?.lastIndexOf('.');
          const fileTypes = Object.keys(FILE_IMG);
          if (fileTypes.includes(file.name.slice(typei + 1))) {
            sendFile(file)
            //这里需要等待初始化数组设置完成在调用接口需要一个等待
            count++;
          } else {
            const fileType = file?.name?.slice(typei);
            Message.error({
              content:`暂不支持${fileType}格式`
            });
          }
        }
      }
    }
  };
  return (
    <div
      ref={body}
      className={style.body}
      onDragEnter={onDragEnter}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
    >
      <FormTextarea onPaste={onPaste} placeholder="这个一个可以进行文件拖拽的输入框，你可以将你需要上传的图片拖拽到输入框当中。并且这个输入框也支持复制图片上传和截图上传。或者可以点击下面的橙色按钮进行上传。" />
      <div className={style.footerBox}>
        <PictureWall
          max={MAX_FILE_COUNT}
          filesList={filesList}
          sendFile={sendFile}
        >
          <Tooltip
            title={filesList.length >= MAX_FILE_COUNT ? '最多上传10个文件' : null}
          >
            <AliIconFont type="icon-upload" />
          </Tooltip>
        </PictureWall>
      </div>
      <FilesList filesList={filesList} setFilesList={setFilesList} />
      <div
        className={style.pictureWall}
        style={{
          opacity: hasUpload ? 1 : 0,
          zIndex: hasUpload ? 1 : -1,
        }}
      >
        <PictureWall
          max={MAX_FILE_COUNT}
          bodyHight={bodyHight}
          filesList={filesList}
          sendFile={sendFile}
        />
      </div>
    </div>
  )
}

export default Picture