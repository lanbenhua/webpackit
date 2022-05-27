import React from 'react';
import {
  CommonHeaderState,
  CommonHeaderProps,
  APP_NAME,
  CDN_PATH_NAME,
} from '@shopee-data/di-common-header-fe';
import { LoadMicroApp } from '@shopee-data/micro-fe';
import { header } from 'store/header';
import styles from './index.m.less';

export let commonHeaderInstance: LoadMicroApp<CommonHeaderProps, CommonHeaderState>;

export const StaticHeader = () => <div>header</div>;

export class Header extends React.Component {
  containerRef = React.createRef<HTMLDivElement>();

  componentDidMount() {
    this.loadApp();
  }

  public loadApp() {
    commonHeaderInstance = new LoadMicroApp<CommonHeaderProps, CommonHeaderState>({
      appName: APP_NAME,
      cdnPath: CDN_PATH_NAME,
      // appEntry: 'http://localhost:1026',

      container: this.containerRef.current,

      onReady: header.init,

      releaseNote: {
        version: '0.0.1',
        content: <div>test</div>,
      },
    });
  }

  render() {
    return <div ref={this.containerRef} className={styles.header} />;
  }
}
