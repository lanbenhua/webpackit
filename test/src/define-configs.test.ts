/* eslint-disable @typescript-eslint/no-explicit-any */
import { ENTRY_PATH, filename, outPath } from '../../src/lib/constant';
import { webpackConfigExternals } from '../../src/lib/externals';
import { deepCloneWebpackConfigs } from '../../src/lib/utils';
import { WebpackConfigurations, WebpackConfigUserOptions } from '../../src/types';
import defineConfig from '../../src/webpack-configs';
import {
  mockUserOptions,
  mockMicroAppOptions,
  mockUserConfigs,
  mockMicroAppUserConfigs,
} from './__mocks__/configs';

describe('defineConfig test', () => {
  // const configs = new DefineConfigs({}, mockUserOptions);
  // console.log('[debug] c=', configs.finalConfigs);

  test('Normal configs & options', async () => {
    const resConfigs = (await defineConfig(
      deepCloneWebpackConfigs(mockUserConfigs) as WebpackConfigurations,
      deepCloneWebpackConfigs(mockUserOptions) as WebpackConfigUserOptions
    )) as WebpackConfigurations;
    // console.log('[debug] dc=', resConfigs);

    expect(resConfigs).toBeDefined();
    expect(resConfigs.entry).toBe(ENTRY_PATH);
    expect(resConfigs.output.filename).toBe(`${filename}.js`);
    expect(resConfigs.output.publicPath).toBe(mockUserConfigs.output.publicPath);
    expect(resConfigs.output.path).toBe(outPath);
    expect(resConfigs.externals).not.toBe(webpackConfigExternals);
    expect((resConfigs.externals as any)['echarts']).toBe('echarts');
    expect((resConfigs.externals as any)['@shopee-data/monaco-editor']).toBe(
      'ShopeeCDNMonacoEditor'
    );
    expect((resConfigs.externals as any)['d3']).toBeUndefined();
    expect(resConfigs.plugins.length).toBe(7);
    expect(resConfigs.resolve).toBeDefined();
    expect(resConfigs.module).toBeDefined();
    expect(resConfigs.optimization).toBeDefined();
    expect(resConfigs.devServer).toBeDefined();
    expect(resConfigs.devServer.proxy).toStrictEqual(mockUserConfigs.devServer.proxy);
  });

  test('Micro App configs & options', async () => {
    const resConfigs = (await defineConfig(
      deepCloneWebpackConfigs(mockMicroAppUserConfigs) as WebpackConfigurations,
      deepCloneWebpackConfigs(mockMicroAppOptions) as WebpackConfigUserOptions
    )) as WebpackConfigurations;
    // console.log('[debug] dc=', resConfigs, resConfigs.plugins.length);

    expect(resConfigs).toBeDefined();
    expect(resConfigs.entry).toBe(ENTRY_PATH);
    expect(resConfigs.output.filename).toBe(`${filename}.js`);
    expect(resConfigs.output.publicPath).toBe('/');
    expect(resConfigs.output.path).toBe(outPath);
    expect(resConfigs.output.library).toBe('test');
    expect(resConfigs.output.libraryTarget).toBe('window');
    expect(resConfigs.output.jsonpFunction).toBe('webpackJsonp_test');
    // expect(resConfigs.externals).toBe(webpackConfigExternals);
    expect((resConfigs.externals as any)['echarts']).toBeUndefined();
    expect((resConfigs.externals as any)['@shopee-data/monaco-editor']).toBeUndefined();
    expect((resConfigs.externals as any)['d3']).toBe('d3');
    expect(resConfigs.plugins.length).toBe(6);
    expect(resConfigs.resolve).toBeDefined();
    expect(resConfigs.module).toBeDefined();
    expect(resConfigs.optimization).toBeDefined();
    expect(resConfigs.devServer).toBeDefined();
    expect(resConfigs.devServer.headers).toStrictEqual({ 'Access-Control-Allow-Origin': '*' });
    expect(resConfigs.devServer.proxy).toStrictEqual(mockUserConfigs.devServer.proxy);
  });
});
