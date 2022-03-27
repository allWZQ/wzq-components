import { message } from 'antd';
import style from './style.module.scss';

const Message = {
  success: (option: {
    content: React.ReactNode;
    duration?: number;
    onClose?: () => void;
  }) => {
    return message.success({
      ...option,
      className: style.messageStyle,
    });
  },
  error: (option: {
    content: React.ReactNode;
    duration?: number;
    onClose?: () => void;
  }) => {
    message.error({
      ...option,
      className: style.messageStyle,
    });
  },
};

export default Message;
