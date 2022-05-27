/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  createBrowserHistory,
  History,
  UnregisterCallback,
  LocationState,
  LocationListener,
} from 'history';
import { BrowserRouter, BrowserRouterProps } from 'react-router-dom';

// To fix render twice when pathname changed.
// Issues: https://github.com/umijs/umi/issues/3919, https://github.com/umijs/qiankun/issues/1184
export class DIBrowserRouter extends BrowserRouter {
  private history: History;

  constructor(props: BrowserRouterProps) {
    super(props);
    this.history = createBrowserHistory(this.props);

    const rawHistory = this.history.listen.bind(this.history);

    this.history.listen = (listener: LocationListener<LocationState>): UnregisterCallback => {
      let lastPathname: any = this.history.location.pathname;

      return rawHistory((...args: any[]) => {
        const [location] = args;
        if (location.pathname === lastPathname) return;
        lastPathname = location.pathname;
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        return listener(...args);
      });
    };
  }
}
