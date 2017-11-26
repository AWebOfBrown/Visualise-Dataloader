import React from "react";
import Transition from "react-transition-group/Transition";
import styled, { css } from "react-emotion";
import MicroTask from "./MicroTask";
import { observer, inject } from "mobx-react";

@observer
class Queue extends React.Component {
  queueNode = null;

  bindQueueNode = ref => {
    this.queueNode = ref;
  };

  renderTasks = () => {
    let { global } = this.props;
    let currentState = global
      ? this.props.globalTasks ? this.props.globalTasks : null
      : this.props.microTasks ? this.props.microTasks : null;

    if (currentState) {
      return currentState.tasks.map((task, index) => {
        return (
          <Transition key={task} appear timeout={{ enter: 2000, exit: 0 }}>
            {mountState => (
              <MicroTask
                active={index === currentState.tasks.length - 1}
                scriptName={task.scriptName}
                lines={task.lines}
                mountState={mountState}
              />
            )}
          </Transition>
        );
      });
    }
  };

  render() {
    const { label } = this.props;
    return (
      <div className={container}>
        <QueuLabel>{label}</QueuLabel>
        <div className={queueStyle} ref={this.bindQueueNode}>
          {this.renderTasks()}
        </div>
      </div>
    );
  }
}

export default inject(stores => ({
  globalTasks: stores.UIStore.globalTaskQueueStore.currentTasks,
  microTasks: stores.UIStore.microTaskQueueStore.currentTasks
}))(Queue);

const QueuLabel = styled("div")`
  color: rgb(200, 200, 200);
  font-size: 1.2em;
  text-align: center;
`;

const container = css`
  background-color: #111;
  width: 100%;
  margin: 0 auto 0 auto;
  height: 50px;
  border: 2px solid white;
`;

const queueStyle = css`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: center;
`;
