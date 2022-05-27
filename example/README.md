## [New joiner note](https://git.garena.com/shopee/data-infra/reaction-starter-kit/-/wikis/new-joiner-note)

## Install

```bash
npm install
```

## [Configure your lattop /etc/hosts](https://git.garena.com/shopee/data-infra/reaction-starter-kit/-/wikis/new-joiner-note#7-configure-your-laptop-etchosts)

for example:
`127.0.0.1 dev.datasuite.test.shopee.io`

## npm start

```bash
npm start
```

http://dev.datasuite.test.shopee.io:1025

## Swagger/Yapi Typescript Typing File Generation

[🔗 Typing File Generation Instrument](https://git.garena.com/shopee/data-infra/reaction-starter-kit/-/wikis/YAPI-Typescript-Typing-File-Generation)

## Testing

Using [Cypress](https://docs.cypress.io/examples/examples/recipes.html) to perform e2e testing and unit testing

```bash
# prequirement: frontend file hosting server has been started
cd test
npm i
npm run test
```

## TODO

- pack mobx/mobx-react-lite/mobx-react into one bundle
- create a business utils package @shopee-data/business-utils
  - export `DatasuiteEnv`,  a variable that indicate current env
  - export `DatasuiteEnvEnum`
  - link generator method (from product A to product B based on env)

```ts
export const getLinkDataMap = (schema: string, tableName: string) => {
  const dynamic = DatasuiteEnv === '' ? 'datamap' : 'datamap-staging';
  return ` https://${dynamic}.idata.shopeemobile.com/table/${tableName}/${schema}/view`;
};

export const getLinkRAM = (schemaName: string, tableName: string) => {
  const env = DatasuiteEnv === DatasuiteEnvEnum.live ? '' : 'test-stable.';
  return `https://dmp.${env}shopee.io/apply-table-access?${urlParams({
    type: 'personal',
    schemaName,
    tableName,
  })}`;
};
```
