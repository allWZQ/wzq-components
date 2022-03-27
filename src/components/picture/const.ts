import moment from 'moment';
import { wxCode, wxHead } from '~/utils/img-Url';
import { FileLists } from '.';

//最大文件上传数量
export const MAX_FILE_COUNT = 10;

//拖拽离开时判断的id
export const PICTUREWALL = 'PictureWall';

export const GET_JWT = () => {
  return `upload${moment().format('x')}${Math.random()}`;
};

//base文件
export const getBase64 = (file: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(String(reader.result));
    reader.onerror = (error) => reject(error);
  });
};

//图片
export const FILE_IMG = {
  jpg: 'icon-icon-wenjian-tupian',
  png: 'icon-icon-wenjian-tupian',
  bmp: 'icon-icon-wenjian-tupian',
  gif: 'icon-icon-wenjian-tupian',
};

export const addFile = (file: File, url: string): FileLists => {
  const obj = {
    id: '',
    url: '',
    fileType: '',
    fileName: '',
    fileSize: 0,
  };
  const typei = file.name.lastIndexOf('.');
  obj.id = GET_JWT();
  obj.url = url;
  obj.fileType = file.name.slice(typei + 1);
  obj.fileSize = file.size;
  obj.fileName = file.name;
  return obj;
};

export const defaultFile = [
  {
    id: "1",
    url: wxHead,
    fileType: "png",
    fileName: "test1",
    fileSize: 1,
  },
  {
    id: "2",
    url: wxCode,
    fileType: "png",
    fileName: "test2",
    fileSize: 1,
  },
]
