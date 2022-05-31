import { ExternalsElement } from 'webpack';
import { assetsCdnHost, isProd } from './constant';

export const webpackConfigExternals: ExternalsElement = {
  react: 'React',
  'react-dom': 'ReactDOM',
  'react-router-dom': 'ReactRouterDOM',
  antd: 'antd',
  '@ant-design/icons': 'icons',
  moment: 'moment',
  qiankun: 'qiankun',
  mobx: 'mobx',
  'mobx-react': 'mobxReact',
  'mobx-react-lite': 'mobxReactLite',
  echarts: 'echarts',
  d3: 'd3',
};

export const defaultExternalAssets = {
  
};
