import React from 'react';
import './index.less';
import { Button, Menu } from 'antd';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

export interface IMenu {
  key: string;
  title: React.ReactNode;
  onClick?: () => void;
  icon?: React.ReactNode;
  subMenu?: IMenu[];
  show?: boolean;
}

interface ILeftMenuProps {
  style?: React.CSSProperties;
  data: IMenu[];
  path?: string;
  inlineCollapsed?: boolean;
  onCollapse?: () => void;
}

export default class LeftMenu extends React.Component<ILeftMenuProps> {
  renderMenu(data: IMenu[]) {
    return data.map((d) => {
      if (d.show === false) {
        return null;
      }

      if (d.subMenu) {
        const subMenus = d.subMenu.filter((menu) => menu.show !== false);
        if (subMenus.length === 0) return null;

        return (
          <SubMenu key={d.key} title={d.title} icon={d.icon}>
            {this.renderMenu(subMenus)}
          </SubMenu>
        );
      }

      return (
        <Menu.Item key={d.key} icon={d.icon} onClick={d.onClick}>
          {d.title}
        </Menu.Item>
      );
    });
  }

  private findActiveMenu(data: IMenu[], path: string) {
    const openKeys: string[] = [];
    const selectedKeys: string[] = [];
    data.map((d) => {
      const nextSplit = d.key[path.length];
      const httpMatched = !nextSplit || nextSplit === '/';
      if (d.subMenu && d.subMenu.length) {
        if (!this.props.inlineCollapsed) openKeys.push(d.key);
        // tslint:disable-next-line: prettier
        const { selectedKeys: sk, openKeys: ok } = this.findActiveMenu(d.subMenu, path);
        selectedKeys.push(...sk);
        if (!this.props.inlineCollapsed) openKeys.push(...ok);
        return;
      }

      if (d.key.startsWith(path) && httpMatched) {
        selectedKeys.push(d.key);
      }
    });
    return { selectedKeys, openKeys };
  }

  renderExpandButton() {
    const { inlineCollapsed, onCollapse } = this.props;
    return (
      <Button className="collapse-buttom" type="link" onClick={onCollapse}>
        {inlineCollapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
    );
  }

  render() {
    const { style, data, path, inlineCollapsed } = this.props;
    const { selectedKeys, openKeys } = this.findActiveMenu(data, path);
    return (
      <div
        style={{ ...style }}
        className={`reaction-menu-wrapper${inlineCollapsed ? ' menu-inlineCollapsed' : ''}`}
      >
        <Menu
          defaultSelectedKeys={Array.from(new Set(selectedKeys))}
          defaultOpenKeys={Array.from(new Set(openKeys))}
          mode="inline"
          inlineCollapsed={inlineCollapsed}
          className="reaction-menu"
        >
          {this.renderMenu(data)}
        </Menu>
        {this.renderExpandButton()}
      </div>
    );
  }
}
