import { defaultUserOptions } from '../../src/lib';
import { mergeUserOptions } from '../../src/lib/utils';
import { mockMicroAppOptions, mockUserOptions } from './__mocks__/configs';

describe('merge user options', () => {
  const finalOptions = mergeUserOptions(defaultUserOptions, mockUserOptions);

  test('default options', () => {
    expect(finalOptions).toBeDefined();
    expect(finalOptions.type).toBeDefined();
    expect(finalOptions.htmlTemplate).toBeDefined();
    expect(finalOptions.plugins.bundleAnalyzerPlugin).toBeTruthy();
  });

  test('merge externalCdnAssets', () => {
    expect(finalOptions.externalCdnAssets.echarts.js).toBeDefined();
    expect(finalOptions.externalCdnAssets.echarts.required).toBeTruthy();
  });

  const finalOptionsMicroApp = mergeUserOptions(defaultUserOptions, mockMicroAppOptions);

  test('merge micro app user options', () => {
    expect(finalOptionsMicroApp.externalCdnAssets.echarts.js).toBeDefined();
    expect(finalOptionsMicroApp.externalCdnAssets.echarts.required).not.toBeTruthy();
  });
});
