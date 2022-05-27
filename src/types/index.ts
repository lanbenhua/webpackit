import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server';
import { Configuration as WebpackConfiguration } from 'webpack';
import { defaultExternalAssets } from '../lib/externals';

export interface WebpackConfigurations extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration;
}
export interface IKeyValue<T> {
  [key: string]: T;
}

export interface ICdnAsset {
  js?: string;
  css?: string;
  /**
   * @name priority
   * @description default 0, more than 0 will load first.
   */
  priority?: number;
  /**
   * @name required
   * @description if false, will not load this assets.
   */
  required?: boolean;
}

export enum OptionsTypeEnum {
  normal = 'normal',
  microApp = 'micro-app',
}

export interface WebpackConfigUserOptions {
  // htmlTemplate path default: ./src/app/index.html
  type?: OptionsTypeEnum;
  htmlTemplate?: string;
  productCode?: string;
  swaggerUrl?: string;
  devHost?: string; // dev.datasuite.test.shopee.io
  externalCdnAssets?: { [key in keyof typeof defaultExternalAssets]?: ICdnAsset } &
    IKeyValue<ICdnAsset>;
  defineValues?: IKeyValue<string>;
  plugins?: {
    bundleAnalyzerPlugin?: boolean;
    uploadSourceMapPlugin?: boolean;
  };
}
export interface ILocalConfigParams {
  /**
   * ['key=value; Domain=.datasuite.test.shopee.io; Path=/;']
   */
  cookies: string[];
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IExpressApp = any;
