import { AbstractBaseStore } from '@shopee-data/reaction';
import { message } from 'antd';

export { loading, followUp, followUpSync } from '@shopee-data/reaction';

export class BaseStore extends AbstractBaseStore {
  showMessage(msg: string) {
    message.success(msg);
  }
}
