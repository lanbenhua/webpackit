import { observer } from '@shopee-data/reaction';
import { navigate } from 'component/router';
import { MenuList } from 'container/left-menu/menu';
import { ProductCode } from 'lib/constant';
import LeftMenuCom from 'component/menu';
import React from 'react';
import { leftMenu } from 'store/left-menu';

export const LeftMenu = observer(() => {
  const pathRoute = navigate.getRouterIndexPath(1);
  const path = `/${ProductCode}${pathRoute ? `/${pathRoute}` : ''}`;
  return (
    <LeftMenuCom
      data={MenuList}
      path={path}
      inlineCollapsed={leftMenu.isCollapsed}
      onCollapse={leftMenu.invertCollapse}
    />
  );
});
