import React from 'react';

import { AdminIcon, MySqlAdminIcon } from 'component/icons';
import { BarChartOutlined } from '@ant-design/icons';
import { Link } from 'component/router';
import { IMenu } from 'component/menu';
import { Routers } from 'lib/constant';

export const MenuList: IMenu[] = [
  {
    icon: <BarChartOutlined />,
    key: Routers.HOME,
    title: <Link to={`${Routers.HOME}/100`}>menu home</Link>,
  },
  {
    icon: <AdminIcon />,
    key: 'sub_menus',
    title: 'Sub menus',
    subMenu: [
      {
        icon: <MySqlAdminIcon />,
        key: Routers.TEST,
        title: <Link to={`${Routers.TEST}/300`}>menu test</Link>,
      },
    ],
  },
];
