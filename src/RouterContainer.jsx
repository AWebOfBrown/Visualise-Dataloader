import React from "react";
import PropTypes from "prop-types";
import { MQLManager } from "react-mql-manager";
import { inject, observer } from "mobx-react";

import Router from "./Router.jsx";

class RouterContainer extends React.Component {
  myMQLManager = new MQLManager({
    queries: {
      deviceTooNarrow: "(max-device-width: 1023px)",
      viewportTooNarrow: "(max-width: 1023px)"
    },
    debounce: 250,
    onChange: mediaQueries => this.props.setMediaQueries(mediaQueries)
  });

  static propTypes = {
    setMediaQueries: PropTypes.func.isRequired
  };

  render() {
    return <Router />;
  }
}
export default inject(stores => ({
  setMediaQueries: stores.UIStore.mediaQueryStore.setMediaQueries
}))(observer(RouterContainer));
