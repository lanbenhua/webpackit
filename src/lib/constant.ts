import path from 'path';

export const isProd = process.env.NODE_ENV === 'production';
export const noConsole = !!process.env.NO_CONSOLE;

export const dirName = process.cwd();

// eslint-disable-next-line @typescript-eslint/no-var-requires
const packageJson = require(path.resolve(dirName, 'package.json'));
export const packageName = packageJson.name.split('/').slice(-1)[0];
export const microAppRootIdName = `${packageName}-root`;

const jenkinsEnv = process.env.JENKINS_ENV || '';
export const pathPrefix = `data_engineering_${packageName.replace(/-/g, '_')}_${
  packageJson.indexHash || '__no_index_hash__'
}`;

export const assetsCdnHost = `static.idata-fe${isProd ? '' : '.test'}.shopee.io`;

const createPublicPath = () => {
  const url = jenkinsEnv ? `static.idata-fe.${jenkinsEnv}.shopee.io` : 'static.idata-fe.shopee.io';
  if (!isProd) return '/';
  return `//${url}/${pathPrefix}/`;
};

const createOutputPath = () => {
  if (!isProd) return '';
  return pathPrefix;
};

export const filename = isProd ? '[name].[contenthash]' : '[name]';
export const publicPath = createPublicPath();
export const outPath = `${dirName}/dist/${createOutputPath()}`;

export const INDEPENDENT_APP_HTML_NAME = 'external.html';

export const HTML_TEMPLATE_PATH = './src/app/index.html';
export const ENTRY_PATH = './src/app/main/index';
