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
   
  },
};

export const mockUserConfigs: WebpackConfigurations = {
  devServer: {
    proxy: {
      
    },
  },
  output: {
    publicPath: '/mockPublicPath',
  },
};
