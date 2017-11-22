import React from "react";
import AnimationStage from "../components/AnimationStage";
import Commentary from "../components/Commentary";
import SizeWarning from "../components/SizeWarning";
import { observer, inject } from "mobx-react";

const Home = ({ mediaQueries }) => {
  let { viewportTooNarrow, deviceTooNarrow } = mediaQueries;
  if (viewportTooNarrow || deviceTooNarrow) {
    return (
      <SizeWarning
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
};

export default inject(stores => ({
  mediaQueries: stores.UIStore.mediaQueryStore.mediaQueries
}))(observer(Home));
