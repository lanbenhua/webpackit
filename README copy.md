# webpack-base-config

**`@shopee/webpack-base-config`** Provide a package for project of reaction-start-kit. Make the project more concise and the development more efficient.

## development

### Install

```sh
➜ npm i
```

### Watch / Realtime compile source code

```sh
➜ npm run watch
```

### Start example

```sh
➜ npm start
```

## document

### **`defineConfig`**

```typescript
// webpack.config.ts
const plugins: Plugin[] = [new MonacoWebpackPlugin(), new BundleAnalyzerPlugin()];

const userConfigs: WebpackConfigurations = {
  entry: './src/app/main/index',
  plugins,
  externals: {
    aly: 'aly'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]monaco-editor[\\/]/,
          name: 'commons',
          chunks: 'all',
          priority: -1
        }
      }
    }
  }
};

const userOptions: WebpackConfigUserOptions = {
  defineValues: {
    MOCK: JSON.stringify(process.env.DEV_MODE ? '/mock2' : '')
  },
  externalCdnAssets: {
    aly: {
      js: '//whale-alivia.oss-cn-hangzhou.aliyuncs.com/lib/aliyun-oss-sdk.6.10.0.min.js',
      priority: 10
    },
    // if you don't need antd external assets
    antd: {
      js: '',
      css: '',
      priority: 0
    }
  }
};

module.exports = defineConfig(userConfigs, userOptions);
```

### **`userConfigs`**

This package contains type definitions for webpack (https://github.com/webpack/webpack).

### **`userOptions`**

`htmlTemplate`: `string` (Optional) default: `'./src/app/index.html'`

The html path for `HtmlWebpackPlugin`

`defineValues`: `object` (Optional)

The config for `webpack.DefinePlugin`, will merge `MOCK`, `ASSET_CDN_HOST` default values.

`externalCdnAssets`: `object` (Optional) default contains `react`, `react-dom`, `react-router-dom`, `antd`, `@ant-design/icons`

Enhances `HtmlWebpackPlugin` functionality by allowing you to specify the modules you want to externalize from node_modules in development and a CDN in production.

`plugins.*`: `boolean` (Optional) default `true`

If false, can stop the plugin from working

### **`defaultUserOptions`**

```js
{
  htmlTemplate: './src/app/index.html',
  defineValues: {
    MOCK: '"/mock2"',
    ASSET_CDN_HOST: '"static.idata-fe.${env}.shopee.io"'
  },
  externalCdnAssets: {
    react: {
      js: '//static.idata-fe.test.shopee.io/data_common_ed53e092952fa241f8f3/react@16.13.1.min.js',
      priority: 9
    },
    'react-dom': {
      js: '//static.idata-fe.test.shopee.io/data_common_ed53e092952fa241f8f3/react-dom@16.13.1.min.js',
      priority: 8
    },
    'react-router-dom': {
      js: '//static.idata-fe.test.shopee.io/data_common_ed53e092952fa241f8f3/react-router-dom@5.2.0.min.js',
      priority: 0
    },
    antd: {
      js: '//static.idata-fe.test.shopee.io/data_common_ed53e092952fa241f8f3/antd@4.9.4.min.js',
      css: '//static.idata-fe.test.shopee.io/data_common_ed53e092952fa241f8f3/antd@4.9.4.min.css',
      priority: 0
    },
    '@ant-design/icons': {
      js: '//static.idata-fe.test.shopee.io/data_common_ed53e092952fa241f8f3/@ant-design/icons@4.3.0.min.js',
      priority: 0
    },
  },
  plugins: { bundleAnalyzerPlugin: true }
}
```
