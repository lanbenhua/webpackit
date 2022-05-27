import React from 'react';
import ErrorBoundary from 'container/error-boundary';
import { observer } from '@shopee-data/reaction';

import './index.less';
import { AioModal } from 'container/modal';
import { AioDrawer } from 'container/drawer';
import { IRouterProps } from 'component/router';
import { LeftMenu } from 'container/left-menu';
import 'container/header';

@observer
// eslint-disable-next-line @typescript-eslint/ban-types
export class ContentLayout<T = {}> extends React.Component<T> {
  public renderContentTitle(): React.ReactNode {
    return null;
  }

  public renderContentCore(): React.ReactNode {
    return null;
  }

  public render() {
    const contentTitle = this.renderContentTitle();
    return (
      <>
        <div className="scrollable-content">
          {contentTitle ? <div className="content-title">{contentTitle}</div> : null}
          <div className="content-area">
            <div className="main-content">{this.renderContentCore()}</div>
          </div>
        </div>
      </>
    );
  }
}

export const Layout = <P,>(props: IRouterProps<P>) => {
  return (
    <>
      <div className="common-sider">
        <div className="common-left-menu">
          <LeftMenu />
        </div>
        <div className="common-content">
          <ErrorBoundary>{props.children}</ErrorBoundary>
        </div>
      </div>
      <AioModal />
      <AioDrawer />
    </>
  );
};
