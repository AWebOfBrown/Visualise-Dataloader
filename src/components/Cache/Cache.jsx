import React, { Component } from "react";
import TransitionGroup from "react-transition-group/TransitionGroup";
import styled, { css } from "react-emotion";
import { inject, observer } from "mobx-react";
import CacheContents from "./CacheContents.jsx";
import Transition from "react-transition-group/Transition";
import KeyVal from "./KeyVal";

@observer
class Cache extends Component {
  componentDidMount() {}

  renderKeyValues = () => {
    if (this.props.keyValPairs) {
      return this.props.keyValPairs.map(pair => {
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
  };

  render() {
    return (
      <div className={group}>
        <CacheHeader>
          <CacheLabel> Cache (ES6 Map)</CacheLabel>
          <div className={column}>
            <RowLabel>
              <span> Key (ID) </span> <span> Val (Promise Obj) </span>
            </RowLabel>
          </div>
        </CacheHeader>
        <div className={contents}>
          <TransitionGroup>{this.renderKeyValues()}</TransitionGroup>
        </div>
        <CacheFooter>
          <span className={cacheCreationInfo}>
            Instantiated at DataLoader.js line 46
          </span>
        </CacheFooter>
      </div>
    );
  }
}

export default inject(stores => ({
  keyValPairs: stores.UIStore.cacheStore.currentCache
}))(Cache);

const CacheHeader = styled("div")`
  background-color: #131314;
  width: 100%;
`;

const CacheFooter = styled("div")`
  width: 100%;
  background-color: #131314;
  margin-top: auto;
`;

const column = css`
  width: 100%;
  display: flex;
  flex-flow: column nowrap;
`;

const contents = css`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  width: 100%;
  height: 100%;
  background-color: rgb(61, 61, 61);
`;

const row = css`
  width: 100%;
  display: flex;
  color: white;
  justify-content: space-between;
  align-items: center;
`;

const RowLabel = styled("div")`
  ${row};
  padding: 0px 10px 0px 10px;
  color: rgba(255, 255, 255, 0.7);
  display: flex;
  justify-content: space-between;
`;

const cacheCreationInfo = css`
  display: flex;
  margin: auto auto 0 auto;
  justify-content: center;
  padding-bottom: 5px;
  text-align: center;
`;

const group = css`
  margin-top: 10px;
  margin-left: auto;
  width: 250px;
  max-width: 100%;
  height: 47vh;
  display: flex;
  flex-flow: column nowrap;
  justify-content: flexStart;
  align-items: center;
  overflow-x: hidden;
  overflow-y: hidden;
  border: 2px solid #131314;
`;

const CacheLabel = styled("div")`
  color: white;
  padding-top: 10px;
  text-align: center;
`;
