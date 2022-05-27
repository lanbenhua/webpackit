/* eslint-disable no-undef */
/**
 * https://git.garena.com/shopee-data/tunnel#configure-your-host
 * You must add `shopee-de-jump` into ~/.ssh/config
 * Or
 * const jumpHost = 'yaguang.liu@shopee-jump-host00';
 */
const jumpHost = 'shopee-de-jump';

module.exports = {
  jumpHost,
  mapping: {
    test: {
      source: 8090,
      target: 'ip-10-130-87-101:8090',
    },
  },
};
