export * from './types';
export { webpackConfigs as defaultConfigs } from './webpack-configs/configs';
export {
  assetsCdnHost,
  pathPrefix,
  publicPath,
  outPath,
  packageName,
  INDEPENDENT_APP_HTML_NAME,
  isProd,
} from './lib/constant';
export { defineConfig } from './webpack-configs';
