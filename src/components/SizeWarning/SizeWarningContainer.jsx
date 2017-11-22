import React from "react";
import PropTypes from "prop-types";

import { deviceWarningContent, viewportWarningContent } from "./content";
import SizeWarning from "./SizeWarning.jsx";

export default class SizeWarningContainer extends React.Component {
  state = { ignoreWarning: false };

  static propTypes = {
    deviceTooNarrow: PropTypes.bool.isRequired,
    viewportTooNarrow: PropTypes.bool.isRequired
  };

  ignore = () => this.setState({ ignoreWarning: true });

  render() {
    let { viewportTooNarrow, deviceTooNarrow } = this.props;

    let warningContent = viewportTooNarrow
      ? viewportWarningContent
      : deviceTooNarrow ? deviceWarningContent : null;

    if (
      (this.props.viewportTooNarrow && !this.state.ignoreWarning) ||
      this.props.deviceTooNarrow
    ) {
      return <SizeWarning ignore={this.ignore} {...warningContent} />;
    }

    return null;
  }
}
