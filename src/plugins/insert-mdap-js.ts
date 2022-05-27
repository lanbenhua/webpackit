import HtmlWebpackPlugin from 'html-webpack-plugin';
import { Compiler } from 'webpack';

class InsertMdapJS {
  apply(compiler: Compiler) {
    compiler.hooks.compilation.tap('InserMdapJS', (compilation) => {
      HtmlWebpackPlugin.getHooks(compilation).beforeEmit.tapAsync('InserMdapJS', (data, cb) => {
        const htmlStr = data.html.toString();
        data.html = htmlStr.replace(
          /<\/title>/,
          `</title><script>!function(){var _;if(!(null===(_=window.__MDAP_PREV_RESOURCE__)||void 0===_?void 0:_.init)){window.__MDAP_PREV_RESOURCE__={data:[],init:!0};var n=function(_){var n;null===(n=window.__MDAP_PREV_RESOURCE__.data)||void 0===n||n.push(_)};window.addEventListener("error",n,!0),window.__MDAP_PREV_RESOURCE__.removePrevListener=function(){window.removeEventListener("error",n)}}}();</script>`
        );
        cb(null, data);
      });
    });
  }
}

export default InsertMdapJS;
