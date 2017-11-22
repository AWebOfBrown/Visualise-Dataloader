import React from "react";
import Transition from "react-transition-group/Transition";

import KeyVal from "./KeyVal";

const CacheContents = ({ keyValPairs }) => {
  if (keyValPairs) {
    return keyValPairs.map(pair => {
      return (
        <Transition key={pair.key} timeout={{ enter: 1200, exit: 1000 }}>
          {mountState => (
            <KeyVal
              mountState={mountState}
              key={pair.key + "keyval"}
              id={pair.key}
              value={pair.value}
            />
          )}
        </Transition>
      );
    });
  }

  return null;
};

export default CacheContents;
