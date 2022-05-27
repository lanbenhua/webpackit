import { OptionsTypeEnum, WebpackConfigUserOptions } from '../types';
import {
  assetsCdnHost,
  HTML_TEMPLATE_PATH,
  microAppRootIdName,
  packageName,
  pathPrefix,
} from './constant';
import { defaultExternalAssets } from './externals';

export const defaultUserOptions: WebpackConfigUserOptions = {
  type: OptionsTypeEnum.normal,
  htmlTemplate: HTML_TEMPLATE_PATH,
  defineValues: {
    MOCK: JSON.stringify(process.env.DEV_MODE ? '/mock' : ''),
    ASSET_CDN_HOST: JSON.stringify(assetsCdnHost),
    PKG_REAL_NAME: JSON.stringify(packageName),
    MICRO_APP_ROOT_NAME: JSON.stringify(microAppRootIdName),
    CDN_FILE_PATH_NAME: JSON.stringify(pathPrefix),
  },
  externalCdnAssets: defaultExternalAssets,
  plugins: {
    bundleAnalyzerPlugin: false,
    uploadSourceMapPlugin: true,
  },
};
