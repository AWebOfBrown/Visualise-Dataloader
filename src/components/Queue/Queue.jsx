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

  render() {
    let { label, global } = this.props;
    let currentState = global
      ? this.props.UIStore.globalTaskQueueStore.currentTasks
      : this.props.UIStore.microTaskQueueStore.currentTasks;

    return (
      <div className={container}>
        <QueuLabel>{label}</QueuLabel>
        <div className={queueStyle} ref={this.bindQueueNode}>
          {
            do {
              if (currentState) {
                if (currentState.tasks) {
                  currentState.tasks.map((task, index) => (
                    <Transition key={task + index} appear timeout={2000}>
                      {mountState => (
                        <MicroTask
                          active={index == currentState.tasks.length - 1}
                          setHoveredFrame={this.props.UIStore.setHoveredFrame}
                          setActiveTab={
                            this.props.UIStore.codeEditorStore.setActiveTab
                          }
                          scriptName={task.scriptName}
                          lines={task.lines}
                          mountState={mountState}
                          animation={currentState.animation}
                          key={task}
                        />
                      )}
                    </Transition>
                  ));
                }
              } else {
                null;
              }
            }
          }
          }}
        </div>
      </div>
    );
  }
}

// FIX THIS
export default inject(stores => ({
    globalTasks: stores.UIStore
})(Queue);

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
