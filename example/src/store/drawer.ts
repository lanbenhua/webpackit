import { observable, action } from '@shopee-data/reaction';
// import { DrawerKey } from 'container/drawer/constant';

class Drawer {
  @observable
  public id: string = null;

  @action.bound
  public close() {
    this.id = null;
  }
}

export const drawer = new Drawer();
