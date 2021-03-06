import React from "react";
import { css } from "emotion";
import Animations from "./animations";
import provideTooltip from "../KeyValTooltip";

class KeyVal extends React.Component {
  animations = null;
  DOMNode = null;
  valueSpan = null;

  componentDidMount() {
    this.animations = new Animations(this.DOMNode, this.valueSpan);
    this.animations.enter();
  }

  componentWillUpdate(nextProps) {
    if (nextProps.mountState === "exiting") {
      this.animations.exit();
    }
  }

  bindRef = ref => (this.DOMNode = ref);
  bindValueSpan = ref => (this.valueSpan = ref);

  render() {
    let { value, id } = this.props;
    return (
      <div ref={this.bindRef} className={keyValStyle}>
        <span> {JSON.stringify(id)} </span>
        <div className={column}>
          <span ref={this.bindValueSpan}>
            <span>{value}</span>
          </span>
        </div>
      </div>
    );
  }
}

const label = css`color: rgba(250, 250, 250, 0.65);`;

const keyValStyle = css`
  position: relative;
  opacity: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: white;
  font-size: 14px;
  padding: 10px 10px 10px 10px;
  margin-top: 5px;
  background-color: #272822;
  width: 100%;
`;

const column = css`
  display: flex;
  flex-flow: column nowrap;
`;

export default provideTooltip(KeyVal);
