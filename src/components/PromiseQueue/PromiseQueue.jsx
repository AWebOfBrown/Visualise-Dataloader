import React from "react";
import Transition from "react-transition-group/Transition";
import TransitionGroup from "react-transition-group/TransitionGroup";
import { css } from "emotion";
import { observer, inject } from "mobx-react";

import Tuple from "./Tuple";

class PromiseQueue extends React.Component {
  renderPromises = () => {
    let { promises } = this.props;
    if (promises) {
      return promises.map(promise => (
        <Transition key={promise.key} timeout={{ enter: 1000, exit: 1000 }}>
          <Tuple
            id={promise.key}
            resolve={promise.resolve}
            reject={promise.reject}
          />
        </Transition>
      ));
    }
  };
  render() {
    return (
      <div className={promiseQueueStyle}>
        <div className={label}> Promise Queue (Array)</div>
        <TransitionGroup>
          <div>{this.renderPromises()}</div>
        </TransitionGroup>
        <span className={label}>Property set at DataLoader.js line 48</span>
      </div>
    );
  }
}

export default inject(stores => ({
  promises: stores.UIStore.promiseQueueStore.currentPromiseQueue
}))(observer(PromiseQueue));

const promiseQueueStyle = css`
  flex-flow: column nowrap;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  max-width: 500px;
  height: 100px;
  background-color: black;
`;

const label = css`color: white;`;
