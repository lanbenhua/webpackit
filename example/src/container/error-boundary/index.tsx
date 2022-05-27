import * as React from 'react';
import { Link } from 'component/router';
import { Result } from 'antd';
import { Routers } from 'lib/constant';

interface IState {
  error: Error;
  errorInfo: React.ErrorInfo;
}

class ErrorBoundary extends React.Component<{ children: React.ReactNode }> {
  state: IState = { error: null, errorInfo: null };

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Catch errors in any components below and re-render with error message
    this.setState({
      error,
      errorInfo,
    });
    // You can also log error messages to an error reporting service here
  }

  clearErrorInfo = () => {
    this.setState({
      error: null,
      errorInfo: null,
    });
  };

  render() {
    if (!this.state.errorInfo) return this.props.children;
    return (
      <Result
        status={500}
        title="500"
        subTitle="Sorry, something went wrong."
        extra={
          <Link onClick={this.clearErrorInfo} to={Routers.HOME}>
            Back Home
          </Link>
        }
      />
    );
  }
}

export default ErrorBoundary;
