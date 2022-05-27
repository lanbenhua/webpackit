import { action, observable } from '@shopee-data/reaction';

class LeftMenu {
  @observable
  public isCollapsed = false;

  @action.bound
  public invertCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}

export const leftMenu = new LeftMenu();
