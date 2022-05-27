import * as React from 'react';
import { ContentLayout, Layout } from 'container/main-layout';
import { IRouterProps } from 'component/router';
import './index.less';
import './tracking';
import { Button } from 'antd';
import { dt } from '@shopee-data/data-tracking';

interface ITestParams {
  id?: string;
}

export class TestLayout extends ContentLayout<ITestParams> {
  public renderContentTitle() {
    return `id = ${this.props.id}`;
  }

  public renderContentCore(): React.ReactNode {
    return (
      <>
        <Button
          type="primary"
          data-tracking={{ test: 'a', num: 2, track_id: 'track' }}
          style={{ borderColor: 'red' }}
        >
          Test
        </Button>
        <Button
          type="primary"
          data-tracking={dt({ test: 'a', num: 2, track_id: 'track dt' })}
          style={{ borderColor: 'red' }}
        >
          Test dt
        </Button>
        <Button id="btn1" type="primary" data-tracking={1} style={{ borderColor: 'red' }}>
          Test '1'
        </Button>
        <Button id="btn2" type="primary" data-tracking={true} style={{ borderColor: 'red' }}>
          Test true
        </Button>
        <Button type="primary" data-tracking="track" style={{ borderColor: 'red' }}>
          Test "track"
        </Button>
      </>
    );
  }
}

export const TestPage = (props: IRouterProps<ITestParams>) => {
  React.useEffect(() => {
    return () => console.log('reset store if necessary', props.match.params.id);
  }, [props.match.params.id]);
  console.log('render', props.match.params.id, props);

  return (
    <Layout {...props}>
      <TestLayout id={props.match.params.id} />
    </Layout>
  );
};
