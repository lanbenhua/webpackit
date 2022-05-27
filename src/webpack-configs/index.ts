import { WebpackConfigurations, WebpackConfigUserOptions, OptionsTypeEnum } from '../types';
import {
  webpackConfigs as defaultWebpackConfigs,
  webpackConfigsMicroApp,
  webpackConfigsMicroAppLib,
} from './configs';
import { addWebpackBarPlugin, addDefaultWebpackPlugins } from '../lib/plugins';
import { isProd } from '../lib/constant';
import {
  mergeUserConfig,
  mergeUserOptions,
  devPortAutoAssign,
  deepCloneWebpackConfigs,
} from '../lib/utils';
import { defaultUserOptions } from '../lib';

class DefineConfigs {
  private configs: WebpackConfigurations;
  private options: WebpackConfigUserOptions;
  private get isMicroApp() {
    return this.options.type === OptionsTypeEnum.microApp;
  }
  private get defaultConfigs(): WebpackConfigurations {
    return deepCloneWebpackConfigs(
      this.isMicroApp ? webpackConfigsMicroApp : defaultWebpackConfigs
    ) as WebpackConfigurations;
  }

  constructor(configs: WebpackConfigurations, options: WebpackConfigUserOptions) {
    this.options = options;
    this.configs = configs;
    this.initOptions();
    this.initConfigs();
  }

  private initOptions() {
    this.options = mergeUserOptions(defaultUserOptions, this.options);
  }

  private initConfigs() {
    const configsAddPlugins = addDefaultWebpackPlugins(this.defaultConfigs, this.options);
    this.configs = mergeUserConfig(configsAddPlugins, this.configs);
  }

  async initRunningPort() {
    const runningPort = await devPortAutoAssign(this.configs.devServer.port);
    this.configs.devServer.port = runningPort;
  }

  addBarPlugin() {
    addWebpackBarPlugin(this.configs, this.options);
  }

  get finalConfigs() {
    return this.isMicroApp && isProd ? [this.configs, webpackConfigsMicroAppLib] : this.configs;
  }
}

/**
 * @name defineConfig
 * @description merge user input configs with default webpack configs
 * @param userConfigs partial of webpackConfigurations
 * @param userOptions options for webpackConfigurations
 *
 */
export async function defineConfig(
  userConfigs: Partial<WebpackConfigurations>,
  userOptions: WebpackConfigUserOptions
) {
  const configInstance = new DefineConfigs(userConfigs, userOptions);
  await configInstance.initRunningPort();
  configInstance.addBarPlugin();

  return configInstance.finalConfigs;
}

export default defineConfig;
