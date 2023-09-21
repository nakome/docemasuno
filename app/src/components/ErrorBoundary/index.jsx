import React from "react";
import { Alert} from "@mantine/core";
export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { error: null, errorInfo: null };
  }

  componentDidCatch(error, info) {
    this.setState({ error: error, errorInfo: info });
  }

  render() {
    if (this.state.errorInfo) {
      return (
        <Alert variant="light" color="red" title="Error">
            {this.state.error && this.state.error.toString()}
            {this.state.errorInfo.componentStack}
        </Alert>
      );
    }
    return this.props.children;
  }
}