import { WebpackConfigurations, WebpackConfigUserOptions, OptionsTypeEnum } from '../types';
import { adapterExternalsCdnAssets } from './utils';
import HtmlWebpackCdnPlugin from '../plugins/html-webpack-cdn-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Plugin, DefinePlugin } from 'webpack';
import chalk from 'chalk';
import {
  filename,
  INDEPENDENT_APP_HTML_NAME,
  isProd,
  microAppRootIdName,
  packageName,
} from './constant';
import WebpackBar from 'webpackbar';
import InsertMdapJS from '../plugins/insert-mdap-js';
import SourceMapPlugin from '@mdap/source-map-webpack-plugin';
import { mdapSecretConfig } from '@shopee-data/di-mdap/lib/constant';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const ScriptAttrPlugin = require('@mdap/script-attributes-html-webpack-plugin');

const logRunInfo = () => {
  let runInfoLogged = false;

  return (
    port: number,
    {
      productCode = '',
      swaggerUrl = '',
      devHost = 'dev.datasuite.test.shopee.io',
      type,
    }: WebpackConfigUserOptions,
    isUpdate = false
  ) => {
    if (runInfoLogged && !isUpdate) return;

    const protocol = 'http';
    const localUrl = `${protocol}://localhost:${port}/${productCode}`;
    const localIpUrl = `${protocol}://${devHost}:${port}/${productCode}`;

    console.log(
      [
        `  🎉🎉 App ${isUpdate ? 'updated' : 'running'} at:`,
        `  - Swagger:   ${chalk.cyan(swaggerUrl)}`,
        `  - Local:   ${chalk.cyan(localUrl)}`,
        `  - LocalDev:   ${chalk.cyan(localIpUrl)}`,
      ]
        .filter(Boolean)
        .join('\n')
    );
    if (type === OptionsTypeEnum.microApp) {
      console.log(
        `  - Independent LocalDev:   ${chalk.cyan(
          `${protocol}://localhost:${port}/${INDEPENDENT_APP_HTML_NAME}`
        )}`
      );
    }
    runInfoLogged = true;
  };
};

const logRunInfoOnce = logRunInfo();

export const initialPlugins: Plugin[] = [];

if (isProd) {
  initialPlugins.push(
    new MiniCssExtractPlugin({
      filename: `${filename}.css`,
    })
  );
}

export const addWebpackBarPlugin = (
  config: WebpackConfigurations,
  options: WebpackConfigUserOptions
) => {
  const runningPort = config.devServer.port;

  config.plugins.push(
    new WebpackBar(
      isProd
        ? {}
        : {
            reporter: [
              {
                afterAllDone: () => {
                  logRunInfoOnce(runningPort, options);
                },
                change: () => {
                  logRunInfoOnce(runningPort, options, true);
                },
              },
            ],
          }
    )
  );
};

const addMdapPlugins = (config: WebpackConfigurations, options: WebpackConfigUserOptions) => {
  config.plugins.push(new InsertMdapJS());

  if (!options.productCode) {
    console.log(
      chalk.red(`haven't provide productCode field, will not upload the sourceMap to mdap`)
    );
    return;
  }
  if (!isProd || !options.plugins.uploadSourceMapPlugin) return;

  const mconfig = mdapSecretConfig[options.productCode as keyof typeof mdapSecretConfig];
  if (!mconfig) {
    console.log(chalk.red(`haven't provide mdap secret field, please check your productCode`));
    return;
  }

  const env = process.env.JENKINS_ENV ? 'exp' : 'production';
  const configEnv = process.env.JENKINS_ENV ? 'test' : 'live';
  config.devtool = 'source-map';
  config.plugins.push(
    new SourceMapPlugin({
      appName: options.productCode,
      secret: mconfig[configEnv],
      env,
      appVersion: 'app_version',
      autoDelete: true,
    })
  );
};

export const addDefaultWebpackPlugins = (
  config: WebpackConfigurations,
  options: WebpackConfigUserOptions
) => {
  config.plugins.push(new DefinePlugin(options.defineValues));

  if (options.type === OptionsTypeEnum.microApp) {
    config.plugins.push(
      new HtmlWebpackPlugin({
        title: packageName,
        filename: 'index.html',
        templateContent: `<div id="${microAppRootIdName}"></div>`,
        disabledCdnPlugin: true,
      }),
      new HtmlWebpackPlugin({
        title: `${packageName}-external`,
        filename: INDEPENDENT_APP_HTML_NAME,
        templateContent: `<div id="${microAppRootIdName}"></div>`,
      })
    );
  } else {
    config.plugins.push(
      new HtmlWebpackPlugin({
        template: options.htmlTemplate,
      })
    );
    addMdapPlugins(config, options);
  }

  config.plugins.push(
    new HtmlWebpackCdnPlugin({
      externals: adapterExternalsCdnAssets(options.externalCdnAssets, config),
    }),
    new ScriptAttrPlugin({
      crossorigin: 'anonymous',
    })
  );

  if (options.plugins.bundleAnalyzerPlugin) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
