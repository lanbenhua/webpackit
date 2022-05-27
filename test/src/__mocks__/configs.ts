import {
  OptionsTypeEnum,
  WebpackConfigurations,
  WebpackConfigUserOptions,
} from '../../../src/types';

export const mockMicroAppOptions = {
  type: OptionsTypeEnum.microApp,
  plugins: {
    bundleAnalyzerPlugin: false,
  },
  externalCdnAssets: {
    d3: {
      required: true,
    },
  },
};

export const mockMicroAppUserConfigs: WebpackConfigurations = {
  devServer: {
    proxy: {
      // proxy forward to the YAPI mock server
      '/ram/api': {
        target: `http://datasuite.staging.shopee.io`,
        changeOrigin: true,
      },
      '/datasuite-homepage/api': {
        target: `http://datasuite.staging.shopee.io`,
        changeOrigin: true,
      },
    },
  },
};

export const mockUserOptions: WebpackConfigUserOptions = {
  productCode: 'dashboard',
  plugins: {
    bundleAnalyzerPlugin: true,
  },
  swaggerUrl: 'http://localhost:9901/dashboard/swagger-ui.html',
  externalCdnAssets: {
    echarts: {
      required: true,
    },
    '@shopee-data/monaco-editor': {
      js: 'test',
    },
  },
};

export const mockUserConfigs: WebpackConfigurations = {
  devServer: {
    proxy: {
      // proxy forward to the YAPI mock server
      '/ram/api': {
        target: `http://datasuite.staging.shopee.io`,
        changeOrigin: true,
      },
      '/datasuite-homepage/api': {
        target: `http://datasuite.staging.shopee.io`,
        changeOrigin: true,
      },
    },
  },
  output: {
    publicPath: '/mockPublicPath',
  },
};
