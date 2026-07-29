import React from "react";
import ErrorFallback from "./ErrorFallback";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null,
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    this.setState({ errorInfo });

    // Optional error logging callback (Sentry, LogRocket, Datadog, etc.)
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    } else {
      console.error(
        "[ErrorBoundary] Caught unhandled error:",
        error,
        errorInfo,
      );
    }
  }

  componentDidUpdate(prevProps) {
    // Automatically reset error boundary if specified resetKeys change (e.g., route URL change)
    if (this.state.hasError && this.props.resetKeys) {
      const keysChanged = this.props.resetKeys.some(
        (key, index) => key !== prevProps.resetKeys?.[index],
      );
      if (keysChanged) {
        this.resetErrorBoundary();
      }
    }
  }

  resetErrorBoundary = () => {
    if (this.props.onReset) {
      this.props.onReset();
    }
    this.setState({
      hasError: false,
      error: null,
      errorInfo: null,
    });
  };

  hardReload = () => {
    window.location.reload();
  };

  render() {
    const { hasError, error, errorInfo } = this.state;
    const { fallback, FallbackComponent, children } = this.props;

    if (hasError) {
      const fallbackProps = {
        error,
        errorInfo,
        onReset: this.resetErrorBoundary,
        onReload: this.hardReload,
      };

      // 1. Custom React Element
      if (React.isValidElement(fallback)) {
        return fallback;
      }

      // 2. Custom Component Prop
      if (FallbackComponent) {
        return <FallbackComponent {...fallbackProps} />;
      }

      // 3. Default Fallback Component
      return <ErrorFallback {...fallbackProps} />;
    }

    return children;
  }
}

export default ErrorBoundary;
