import { IExpressApp, ILocalConfigParams, WebpackConfigurations } from '../types';
import { outPath } from '../lib/constant';
import path from 'path';
import http from 'http';
import fs from 'fs';

const dirName = process.cwd();
const localConfigPath = path.resolve(dirName, './config/local.config.json');
const hasLocalConfig = fs.existsSync(localConfigPath);

const localConfig: ILocalConfigParams = hasLocalConfig
  ? JSON.parse(fs.readFileSync('./config/local.config.json').toString())
  : {};

export const webpackDevServer: WebpackConfigurations['devServer'] = {
  contentBase: outPath,
  host: '0.0.0.0',
  port: 1025,
  hot: true,
  disableHostCheck: true,
  historyApiFallback: true,
  noInfo: true,
  before: localConfig.cookies
    ? (app: IExpressApp) => {
        app.use('/', (_: http.ClientRequest, res: http.ServerResponse, next: () => void) => {
          res.setHeader('set-cookie', localConfig.cookies);
          next();
        });
      }
    : undefined,
};
