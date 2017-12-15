import React from "react";
import AnimationStage from "../components/AnimationStage";
import Commentary from "../components/Commentary";
import SizeWarning from "../components/SizeWarning";
import { observer, inject } from "mobx-react";

class Home extends React.Component {
  state = { ignoreViewportWarning: false };

  ignoreWarning = () => this.setState({ ignoreViewportWarning: true });

  render() {
    let { viewportTooNarrow, deviceTooNarrow } = this.props.mediaQueries;
    if (
      (viewportTooNarrow && !this.state.ignoreViewportWarning) ||
      deviceTooNarrow
    ) {
      return (
        <SizeWarning
          ignoreWarning={this.ignoreWarning}
          viewportTooNarrow={viewportTooNarrow}
          deviceTooNarrow={deviceTooNarrow}
        />
      );
    }

    return (
      <div style={{ display: "flex" }}>
        <Commentary />
        <AnimationStage />
      </div>
    );
  }
}

export default inject(stores => ({
  mediaQueries: stores.UIStore.mediaQueryStore.mediaQueries
}))(observer(Home));
