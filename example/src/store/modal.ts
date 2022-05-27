import { BaseModalStore } from '@shopee-data/reaction';
// import { ModalKey } from 'container/modal/constant';

class Modal extends BaseModalStore {
  resetGlobalVar() {
    if (!this.ids.length) return;
  }
}

export const modal = new Modal();
