import React from "react";
import styled, { css } from "react-emotion";
import Transition from "react-transition-group/Transition";

import TransitionGroup from "react-transition-group/TransitionGroup";
import ExecutionFrame from "./ExecutionFrame";
import { observer, inject } from "mobx-react";
import debounce from "../../utils/debounce";

@observer
class Stack extends React.Component {
  renderFrames = () => {
    let stackFrames = this.props.UIStore.stackStore.currentFrames;
    if (stackFrames && stackFrames.frames) {
      let arrOfFrames = stackFrames.frames.reduceRight(
        (frameStack, frame, index) => {
          return frameStack.concat(
            <Transition
              key={frame.scriptName + frame.lines}
              timeout={{ enter: 1000, exit: 1000 }}
            >
              {mountState => (
                <ExecutionFrame
                  mountState={mountState}
                  key={frame.scriptName + frame.lines}
                  UIStore={this.props.UIStore}
                  scriptName={frame.scriptName}
                  lines={frame.lines}
                  callSite={frame.callSite}
                  active={index === stackFrames.frames.length - 1}
                />
              )}
            </Transition>
          );
        },
        []
      );
      return arrOfFrames;
    } else {
      return null;
    }
  };

  render() {
    return (
      <StyledStack>
        <Label>Context Execution Stack</Label>
        <TransitionGroup>{this.renderFrames()}</TransitionGroup>
      </StyledStack>
    );
  }
}
export default inject("UIStore")(Stack);

const Label = styled("div")`
  position: relative;
  top: 0px;
  margin-top: 0px;
  color: rgba(255, 255, 255, 0.7);
  margin-bottom: auto !important;
  text-align: center;
`;

const StyledStack = styled("div")`
  width: 80px;
  display: flex;
  align-items: center;
  flex-flow: column;
  justify-content: flex-start;
  border: 6px solid black;
  background-color: rgb(39, 39, 39);
  border-radius: 15px;
`;
