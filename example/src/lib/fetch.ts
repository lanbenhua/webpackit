import { fetch, IReq } from '@shopee-data/reaction';
import { notification } from 'antd';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type IResponse = any; // depends on different BE API format
const isError = (res: IResponse) => {
  return res.error && res.status;
};

const googleAuthFilter = (res: Response) => {
  if (!res) return res;
  if (res.status === 401) location.reload();
  return res;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resFilter = (init: IReq) => (res: IResponse) => {
  if (!res) return res;
  if (isError(res)) {
    if (!init.noErrorHint) {
      notification.error({
        message: 'Error',
        description: res.message || 'Server Internal Error',
      });
    }
    throw res.message;
  }
  return res;
};

const defaultPreFix = '/api';
// const csrfTokenMethod = ['POST', 'PUT', 'DELETE'];

export const fetchCreater =
  (preFix = defaultPreFix) =>
  (url: string, init?: IReq) => {
    if (!init) init = {};
    if (!init.credentials) init.credentials = 'include';

    if (init.body && !init.method) init.method = 'POST';
    if (init.method) init.method = init.method.toUpperCase();

    // if (csrfTokenMethod.includes(init.method)) {
    //   init.headers = Object.assign({}, init.headers, {
    //     // 'HEADER-CSRF': getCookie('csrf-token'),
    //   });
    // }

    let realUrl = url;
    if (!/^http(s)?:\/\//.test(url)) {
      realUrl = `${preFix}${url}`;
    }
    return fetch(realUrl, init)
      .then(googleAuthFilter)
      .then((res) => res.json())
      .then(resFilter(init));
  };

export default fetchCreater();
