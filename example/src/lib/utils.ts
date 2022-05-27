import { message } from 'antd';

// eslint-disable-next-line @typescript-eslint/ban-types
export function pick<T extends object>(obj: T, k: (keyof T)[]) {
  const shadow: Partial<T> = {};
  k.forEach((el) => {
    shadow[el] = obj[el];
  });
  return shadow;
}

// simple email checker
export function allowedEmail(mail: string) {
  if (!mail) return false;
  const domain = mail.split('@')[1];
  const reg = /shopee|airpay|foody|seamoney|seagroup/;
  return domain && reg.test(domain);
}

export const urlParams = (obj: Record<string, number | string>) => {
  if (!obj) return '';
  return Object.keys(obj)
    .map((k) => `${k}=${obj[k] || ''}`)
    .join('&');
};

export const copyStringToClipboard = (str: string) => {
  const clipboardObj = navigator.clipboard;
  if (clipboardObj) {
    return clipboardObj.writeText(str).then(
      () => message.success('Copied to clipboard'),
      () => message.error('Failed to copy')
    );
  }
  return message.error('Failed to copy');
};
