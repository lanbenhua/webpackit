import { filename, publicPath, outPath, dirName, ENTRY_PATH } from '../lib/constant';
import { modifyJsxAttributesTransformer } from '../plugins/modify-tsx-attr';
import OptimizeCSSAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import { packageName, noConsole, isProd } from '../lib/constant';
import TsconfigPathsPlugin from 'tsconfig-paths-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import { webpackConfigExternals } from '../lib/externals';
import { webpackDevServer } from './webpack-dev-server';
import { DefinePlugin, RuleSetRule } from 'webpack';
import TerserJSPlugin from 'terser-webpack-plugin';
import { WebpackConfigurations } from '../types';
import { initialPlugins } from '../lib/plugins';
import { defaultUserOptions } from '../lib';

const commonCssLoader = [
  isProd
    ? {
        loader: MiniCssExtractPlugin.loader,
        options: {
          publicPath,
        },
      }
    : 'style-loader',
  {
    loader: 'css-loader',
    options: {
      modules: {
        auto: /\.m\.\w+$/i,
        localIdentName: '[local]--[hash:base64:5]',
      },
    },
  },
];

const webpackRules: RuleSetRule[] = [
  {
    test: /\.css$/,
    use: commonCssLoader,
  },
  {
    test: /\.less$/,
    use: [
      ...commonCssLoader,
      {
        loader: 'less-loader',
        options: {
          lessOptions: {
            javascriptEnabled: true,
          },
        },
      },
    ],
  },
  {
    test: /\.(ts|tsx)?$/,
    loader: 'ts-loader',
    options: {
      getCustomTransformers: () => ({
        before: [modifyJsxAttributesTransformer(['data-tracking'])],
      }),
    },
  },
  {
    test: /\.ttf$/,
    use: ['file-loader'],
  },
];

const webpackOptimization: WebpackConfigurations['optimization'] = {
  minimize: isProd,
  minimizer: [
    new TerserJSPlugin({
      terserOptions: {
        compress: {
          drop_console: noConsole,
        },
      },
    }),
    new OptimizeCSSAssetsPlugin({}),
  ],
  splitChunks: {
    cacheGroups: {
      vendors: {
        test: /[\\/]node_modules[\\/]/,
        name: 'vendors',
        chunks: 'all',
        enforce: true,
        priority: -3,
      },
    },
  },
};

/**
 * @name webpackConfigs
 * @description For main app OptionsTypeEnum.normal
 */
export const webpackConfigs: WebpackConfigurations = {
  mode: isProd ? 'production' : 'development',
  entry: ENTRY_PATH,
  output: {
    filename: `${filename}.js`,
    publicPath,
    path: outPath,
  },
  devtool: isProd ? false : 'cheap-module-eval-source-map',
  externals: webpackConfigExternals,
  plugins: initialPlugins,
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx', '.json'],
    plugins: [new TsconfigPathsPlugin()],
  },
  module: {
    rules: webpackRules,
  },
  optimization: webpackOptimization,
  devServer: webpackDevServer,
};

/**
 * @name webpackConfigsMicroApp
 * @description For micro app. OptionsTypeEnum.microApp
 */
export const webpackConfigsMicroApp: WebpackConfigurations = {
  ...webpackConfigs,
  output: {
    ...webpackConfigs.output,
    library: packageName,
    libraryTarget: 'window',
    jsonpFunction: `webpackJsonp_${packageName}`,
  },
  devServer: {
    ...webpackDevServer,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
};

/**
 * @name webpackConfigsMicroApp
 * @description For micro app build ts declaration files. OptionsTypeEnum.microApp
 */
export const webpackConfigsMicroAppLib: WebpackConfigurations = {
  mode: webpackConfigs.mode,
  entry: {
    index: './src/index',
  },
  output: {
    path: `${dirName}/lib`,
    filename: '[name].js',
    libraryTarget: 'commonjs',
  },
  module: webpackConfigs.module,
  resolve: webpackConfigs.resolve,
  plugins: [new DefinePlugin(defaultUserOptions.defineValues)],
};
