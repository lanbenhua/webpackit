import { deepCloneWebpackConfigs } from '../../src/lib/utils';
import { WebpackConfigurations } from '../../src/types';
import { webpackConfigs } from '../../src/webpack-configs/configs';

describe('Deep clone test', () => {
  test('Clone webpack configs', () => {
    const clone = deepCloneWebpackConfigs(webpackConfigs) as WebpackConfigurations;

    expect(clone).toStrictEqual(webpackConfigs);
    clone.plugins.push(clone.plugins.slice(-1)[0]);

    expect(clone.plugins.length).not.toBe(webpackConfigs.plugins.length);
  });
});
