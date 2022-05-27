import { ExternalLink } from '../plugins/html-webpack-cdn-plugin';
import { isProd } from './constant';
import { WebpackConfigurations, WebpackConfigUserOptions } from '../types';
import { ExternalsObjectElement } from 'webpack';
import merge, { mergeWithCustomize, unique } from 'webpack-merge';
import net from 'net';
import { defaultExternalAssets } from './externals';

export function devPortAutoAssign(port: number) {
  if (isProd) return port;

  return checkPort(port);
}

function checkPort(port: number): Promise<number> {
  return new Promise((resolve) => {
    const server = net.createServer().listen(port, '0.0.0.0');

    server.on('listening', () => {
      server.close((err) => {
        if (err) throw err;
        resolve(port);
      });
    });

    server.on('error', (err: Error & { code: string }) => {
      if (err.code === 'EADDRINUSE') {
        checkPort(port + 1).then(resolve);
      }
    });
  });
}

export const adapterExternalsCdnAssets = (
  cdnAssets: WebpackConfigUserOptions['externalCdnAssets'],
  config: WebpackConfigurations
) => {
  const externalKeys = Object.keys(cdnAssets);

  return externalKeys.reduce((prev, key) => {
    const cur = cdnAssets[key];

    if (!cur.required) {
      delete (config.externals as ExternalsObjectElement)[key];

      return prev;
    }

    if (cur.js) {
      prev.push({
        name: key,
        src: cur.js,
        type: 'script',
        priority: cur.priority ?? 0,
      });
    }

    if (cur.css) {
      prev.push({
        name: key,
        src: cur.css,
        type: 'css',
        priority: cur.priority ?? 0,
      });
    }

    return prev;
  }, [] as ExternalLink[]);
};

export const mergeUserConfig = (
  configs: WebpackConfigurations,
  userConfigs: WebpackConfigurations
) => {
  const finalConfigs: WebpackConfigurations = mergeWithCustomize({
    customizeArray: unique(
      'plugins',
      ['DefinePlugin', 'HtmlWebpackCdnPlugin'],
      (plugin) => plugin.constructor && plugin.constructor.name
    ),
  })(configs, userConfigs);

  return finalConfigs;
};

export const mergeUserOptions = (
  options: WebpackConfigUserOptions,
  userOptions: WebpackConfigUserOptions = {}
) => {
  const res = merge(options, userOptions);

  if (!userOptions.externalCdnAssets) return res;

  Object.keys(userOptions.externalCdnAssets).forEach((key: keyof typeof defaultExternalAssets) => {
    if (userOptions.externalCdnAssets[key].required === false) return;
    res.externalCdnAssets[key].required = true;
  });

  return res;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const deepCloneWebpackConfigs = <T extends Record<string, any>>(
  target: T | T[]
): T | T[] => {
  if (Array.isArray(target)) return target.slice();
  if (!target || Array.prototype.toString.call(target) !== '[object Object]') return target;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const res: Record<string, any> = {};
  Object.entries(target).map(([key, val]) => {
    res[key] = deepCloneWebpackConfigs(val);
  });

  return res as T;
};
