import React from 'react';
import { observer } from '@shopee-data/reaction';

import './index.less';
// import { DrawerKey } from './constant';
import { drawer } from 'store/drawer';

@observer
export class AioDrawer extends React.Component {
  public getDrawerMap(): Record<string, React.ReactNode> {
    return {};
  }
  public render() {
    if (!drawer.id) return null;
    return <>{this.getDrawerMap()[drawer.id] || null}</>;
  }
}
