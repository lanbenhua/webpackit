import React from 'react';
import './index.less';
import { observer } from '@shopee-data/reaction';
import { modal } from 'store/modal';
// import { ModalKey } from './constant';
@observer
export class AioModal extends React.Component {
  public modalMap: Record<string, React.ReactNode> = {};

  public render() {
    return modal.ids.map((id, idx) => (
      <React.Fragment key={idx}>{this.modalMap[id]}</React.Fragment>
    ));
  }
}
