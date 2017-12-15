import React from "react";
import Transition from "react-transition-group/Transition";
import TransitionGroup from "react-transition-group/TransitionGroup";
import styled, { css } from "react-emotion";
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
        <span className={label}> Promise Queue (Array)</span>
        <div
          style={{
            display: "flex",
            width: "100%",
            height: "100px",
            justifyContent: "space-around",
            alignItems: "center"
          }}
        >
          <Bracket>{"["} </Bracket>
          <TransitionGroup>
            <div>{this.renderPromises()}</div>
          </TransitionGroup>
          <Bracket>{"]"}</Bracket>
        </div>
        <span className={label}>Property set at DataLoader.js line 48</span>
      </div>
    );
  }
}

export default inject(stores => ({
  promises: stores.UIStore.promiseQueueStore.currentPromiseQueue
}))(observer(PromiseQueue));

const promiseQueueStyle = css`
  color: black;
  flex-flow: column nowrap;
  align-items: center;
  width: 100%;
`;

const Bracket = styled("span")`font-size: 30px;`;

const label = css`
  color: black;
  margin: 0 auto;
`;
