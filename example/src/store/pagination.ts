/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { action, observable } from '@shopee-data/reaction';
import { TablePaginationConfig } from 'antd/lib/table';

export interface PaginationClass {
  pagination: Pagination;
}

export const autoResetPageNum =
  () =>
  (
    target: PaginationClass,
    property: string,
    descriptor: TypedPropertyDescriptor<(...args: any) => any>
  ) => {
    const original = descriptor.value;
    if (typeof original !== 'function') {
      throw new Error('@message must decorator a function');
    }

    descriptor.value = function (...args: any) {
      if (!(this.pagination instanceof Pagination)) {
        throw new Error('Current Class must include pagination');
      }
      const promise = original.call(this, ...args);
      if (!(promise instanceof Promise)) {
        return this.pagination.setCurrent(promise);
      }
      return promise.then((res) => {
        this.pagination.setCurrent(res);
      });
    };
  };

export class Pagination {
  @observable
  config: TablePaginationConfig = {
    pageSize: 10,
    current: 1,
    total: 0,
    showSizeChanger: true,
    showTotal: (total) => `${total} Search Results`,
    onChange: (page, pageSize) => this.changePage({ pageSize, current: page }),
  };

  private handler: (config: Partial<TablePaginationConfig>) => Promise<unknown>;

  constructor(changeHandler: (config: Partial<TablePaginationConfig>) => Promise<unknown>) {
    this.handler = changeHandler;
  }

  changePage(config: Partial<TablePaginationConfig>) {
    return this.handler(config);
  }

  @action.bound
  setPagination(config: Partial<TablePaginationConfig>) {
    Object.assign(this.config, config);
  }

  @action.bound
  setCurrent(num: number) {
    this.config.current = num || 1;
  }
}
