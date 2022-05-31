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

const logRunInfo = () => {
  let runInfoLogged = false;

  return (
    port: number,
    {
      productCode = '',
      swaggerUrl = '',
      devHost = 'xxx',
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
  }

  config.plugins.push(
    new HtmlWebpackCdnPlugin({
      externals: adapterExternalsCdnAssets(options.externalCdnAssets, config),
    }),
  );

  if (options.plugins.bundleAnalyzerPlugin) {
    config.plugins.push(new BundleAnalyzerPlugin());
  }

  return config;
};
