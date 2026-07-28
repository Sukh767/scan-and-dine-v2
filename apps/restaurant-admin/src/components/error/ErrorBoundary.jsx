import React from "react";

import ErrorFallback from "./ErrorFallback";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hasError: false,
      error: null,
    };
  }

  static getDerivedStateFromError(error) {
    return {
      hasError: true,
      error,
    };
  }

  componentDidCatch(error, info) {
    console.error("Application crashed");
    console.error(error);
    console.error(info);

    // Later:
    // Sentry.captureException(error)
  }

  handleReset = () => {
    this.setState({
      hasError: false,
      error: null,
    });

    window.location.reload();
  };

  render() {
    if (this.state.hasError) {
      return (
        <ErrorFallback error={this.state.error} onReset={this.handleReset} />
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
