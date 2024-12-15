import React from 'react';
import PropTypes from 'prop-types';
import styles from './Hero.module.css';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Hero component error:', error, errorInfo);
    // You could also log to an error reporting service here
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: null });
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className={styles.errorBoundary}>
          <ion-icon name="alert-circle-outline" size="large"></ion-icon>
          <h2>Something went wrong</h2>
          <p>We're sorry, but there was an error loading the slider.</p>
          <button onClick={this.handleRetry}>
            Try Again
            <ion-icon name="refresh-outline"></ion-icon>
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired
};

export default ErrorBoundary; 