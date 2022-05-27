import React from 'react';

import './index.less';
import { MenuOutlined } from '@ant-design/icons';

interface IHeaderProps {
  title: string;
  avatar?: string;
  collapse?: () => void;
}

export default function Header(props: IHeaderProps) {
  const { avatar, collapse } = props;
  const showAvatar = avatar || 'Guest';
  return (
    <div className="common-header">
      <MenuOutlined className="ch-more" onClick={collapse} />
      <span className="ch-product">{props.title}</span>
      <div className="img">{showAvatar[0].toLocaleUpperCase()}</div>
    </div>
  );
}
