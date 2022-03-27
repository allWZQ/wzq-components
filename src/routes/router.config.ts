import { PATHS } from './path.config';
import FormCodeInput from '~/components/form-code-input';
import Picture from '~/components/picture';
import FormTransfer from '~/components/form-transfer';
import FormSelect from '~/components/form-select';

export const menuRouterConfig: RouteItem[] = [
  {
    key: PATHS.FormCodeInput,
    name: '支付密码输入框',
    path: PATHS.FormCodeInput,
    component: FormCodeInput,
  },
  {
    key: PATHS.Picture,
    name: '上传图片输入框',
    path: PATHS.Picture,
    component: Picture,
  },
  {
    key: PATHS.FormTransfer,
    name: '虚拟列表分页穿梭框',
    path: PATHS.FormTransfer,
    component: FormTransfer,
  },
  {
    key: PATHS.FormSelect,
    name: '虚拟列表分页选择框',
    path: PATHS.FormSelect,
    component: FormSelect,
  },
];
