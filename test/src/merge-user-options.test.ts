import { defaultUserOptions } from '../../src/lib';
import { mergeUserOptions } from '../../src/lib/utils';
import { mockMicroAppOptions, mockUserOptions } from './__mocks__/configs';

describe('merge user options', () => {
  const finalOptions = mergeUserOptions(defaultUserOptions, mockUserOptions);

  test('default options', () => {
    expect(finalOptions).toBeDefined();
    expect(finalOptions.type).toBeDefined();
    expect(finalOptions.htmlTemplate).toBeDefined();
    expect(finalOptions.swaggerUrl).toBeDefined();
    expect(finalOptions.plugins.bundleAnalyzerPlugin).toBeTruthy();
    expect(finalOptions.productCode).toBe('dashboard');
    expect(finalOptions.defineValues.MOCK).toBe('""');
    expect(finalOptions.defineValues.ASSET_CDN_HOST).toBe('"static.idata-fe.test.shopee.io"');
    expect(finalOptions.defineValues.PKG_REAL_NAME).toBe('"test"');
    expect(finalOptions.defineValues.CDN_FILE_PATH_NAME).toBe(
      '"data_engineering_test_bb335e8cb7f0b2baeaee"'
    );
  });

  test('merge externalCdnAssets', () => {
    expect(finalOptions.externalCdnAssets.echarts.js).toBeDefined();
    expect(finalOptions.externalCdnAssets.echarts.required).toBeTruthy();
    expect(finalOptions.externalCdnAssets['@shopee-data/monaco-editor'].required).toBeTruthy();
    expect(finalOptions.externalCdnAssets['@shopee-data/monaco-editor'].js).toBe('test');
  });

  const finalOptionsMicroApp = mergeUserOptions(defaultUserOptions, mockMicroAppOptions);

  test('merge micro app user options', () => {
    expect(finalOptionsMicroApp.externalCdnAssets.echarts.js).toBeDefined();
    expect(finalOptionsMicroApp.externalCdnAssets.echarts.required).not.toBeTruthy();
    expect(
      finalOptionsMicroApp.externalCdnAssets['@shopee-data/monaco-editor'].required
    ).not.toBeTruthy();
  });
});
