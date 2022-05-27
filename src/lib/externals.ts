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
  '@shopee-data/monaco-editor': 'ShopeeCDNMonacoEditor',
  d3: 'd3',
};

export const defaultExternalAssets = {
  react: {
    js: `//${assetsCdnHost}/data_common_ed53e092952fa241f8f3/react@16.13.1.${
      isProd ? 'min' : 'dev'
    }.js`,
    priority: 9,
    required: true,
  },

  'react-dom': {
    js: `//${assetsCdnHost}/data_common_ed53e092952fa241f8f3/react-dom@16.13.1.${
      isProd ? 'min' : 'dev'
    }.js`,
    priority: 8,
    required: true,
  },

  'react-router-dom': {
    js: `//${assetsCdnHost}/data_common_ed53e092952fa241f8f3/react-router-dom@5.2.0.${
      isProd ? 'min' : 'dev'
    }.js`,
    priority: 0,
    required: true,
  },

  antd: {
    js: `//${assetsCdnHost}/data_common_ed53e092952fa241f8f3/antd@4.15.3.${
      isProd ? 'min' : 'dev'
    }.js`,
    css: `//${assetsCdnHost}/data_engineering_antd_theme_lib_c622f7f45f40c693ef56/antd@4.15.3.f394c8c8039335a08d6f.css`,
    priority: 0,
    required: true,
  },

  moment: {
    js: `//${assetsCdnHost}/data_common_ed53e092952fa241f8f3/moment@2.29.1.min.js`,
    priority: 1,
    required: true,
  },

  '@ant-design/icons': {
    js: `//${assetsCdnHost}/data_common_ed53e092952fa241f8f3/@ant-design/icons@4.3.0.min.js`,
    priority: 0,
    required: true,
  },

  mobx: {
    js: `//${assetsCdnHost}/data_common_ed53e092952fa241f8f3/mobx/v5.15.7/index.${
      isProd ? 'min' : 'dev'
    }.js`,
    priority: 2,
    required: true,
  },

  'mobx-react-lite': {
    js: `//${assetsCdnHost}/data_common_ed53e092952fa241f8f3/mobx-react-lite/v2.2.2/index.${
      isProd ? 'min' : 'dev'
    }.js`,
    priority: 1,
    required: true,
  },

  'mobx-react': {
    js: `//${assetsCdnHost}/data_common_ed53e092952fa241f8f3/mobx-react/v6.3.1/index.${
      isProd ? 'min' : 'dev'
    }.js`,
    priority: 0,
    required: true,
  },

  qiankun: {
    js: `//${assetsCdnHost}/data_common_ed53e092952fa241f8f3/qiankun/di2.6.3/index.${
      isProd ? 'min' : 'dev'
    }.js`,
    priority: 0,
    required: true,
  },

  /**
   * @description Assets which default required is false.
   */

  echarts: {
    js: `//${assetsCdnHost}/data_common_ed53e092952fa241f8f3/echarts/v5.3.1/index.${
      isProd ? 'min' : 'dev'
    }.js`,
    priority: 0,
    required: false,
  },

  d3: {
    js: `//${assetsCdnHost}/data_common_ed53e092952fa241f8f3/d3/v6.7.0/index.min.js`,
    priority: 0,
    required: false,
  },

  '@shopee-data/monaco-editor': {
    js: `//static.idata-fe.shopee.io/data_common_ed53e092952fa241f8f3/monaco/v0.24.0/index.js`,
    priority: 0,
    required: false,
  },
};
