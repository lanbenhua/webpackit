import { Compiler } from 'webpack';

/* eslint-disable @typescript-eslint/no-explicit-any */
interface HtmlTagObject {
  /**
   * Attributes of the html tag
   * E.g. `{'disabled': true, 'value': 'demo'}`
   */
  attributes: {
    [attributeName: string]: string | boolean;
  };
  /**
   * The tag name e.g. `'div'`
   */
  tagName: string;
  /**
   * The inner HTML
   */
  innerHTML?: string;
  /**
   * Whether this html must not contain innerHTML
   * @see https://www.w3.org/TR/html5/syntax.html#void-elements
   */
  voidTag: boolean;
}

export interface ExternalLink {
  type: 'script' | 'css';
  src: string;
  name: string;
  priority?: number;
}
interface Options {
  externals: ExternalLink[];
}

class HtmlWebpackCdnPlugin {
  externals: ExternalLink[];
  headTags: HtmlTagObject[];
  bodyTags: HtmlTagObject[];

  constructor(options: Options) {
    this.externals = options.externals.sort((a, b) => b.priority - a.priority);

    this.bodyTags =
      this.externals
        .filter((item) => item.type === 'script')
        .map((item) => ({
          tagName: 'script',
          voidTag: false,
          attributes: {
            defer: false,
            src: item.src,
          },
        })) || [];

    this.headTags =
      this.externals
        .filter((item) => item.type === 'css')
        .map((item) => ({
          tagName: 'link',
          voidTag: true,
          attributes: {
            href: item.src,
            rel: 'stylesheet',
          },
        })) || [];
  }

  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap('HtmlWebpackCdnPlugin', (compilation: any) => {
      const ctrInstance = compilation.options.plugins.find(
        (item: any) => item.constructor.name === 'HtmlWebpackPlugin'
      );
      const ctr = ctrInstance.constructor;
      ctr.getHooks(compilation).alterAssetTags.tapPromise('insertExternals', (pluginArgs: any) => {
        return new Promise((resolve) => {
          if (pluginArgs.plugin.options.disabledCdnPlugin) return resolve(pluginArgs);

          resolve({
            ...pluginArgs,
            assetTags: {
              ...pluginArgs.assetTags,
              styles: [...this.headTags, ...pluginArgs.assetTags.styles],
              scripts: [...this.bodyTags, ...pluginArgs.assetTags.scripts],
            },
          });
        });
      });
    });
  }
}

export default HtmlWebpackCdnPlugin;
