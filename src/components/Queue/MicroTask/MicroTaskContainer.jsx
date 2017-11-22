import React from "react";
import Animations from "./animations";
import MicroTask from "./MicroTask";
import { action } from "mobx";
import debounce from "../../../utils/debounce";

class MicroTaskContainer extends React.Component {
  DOMNode = null;
  animations = null;

  bindRef = ref => {
    this.DOMNode = ref;
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.animation !== nextProps.animation) {
      this.animations.completeAnimation();
      this.performAnimation(nextProps.animation);
    }
  }

  performAnimation = animation => {
    switch (animation) {
      case "push":
        this.animations.push();
        break;
      case "pop":
        this.animations.pop();
        break;
      default:
        return null;
    }
  };

  componentDidMount() {
    this.animations = new Animations(this.DOMNode);
    this.performAnimation(this.props.animation);
  }

  componentWillUnmount() {
    this.animations = null;
  }

  @action
  handleClick = debounce(() => {
    this.props.setActiveTab(this.props.scriptName, this.props.lines[0]);
  }, 250);

  @action
  handleMouseEnter = debounce(() => {
    this.props.setHoveredFrame({
      scriptName: this.props.scriptName,
      lines: this.props.lines
    });
  }, 100);

  @action
  handleMouseLeave = debounce(
    () =>
      this.props.setHoveredFrame({
        scriptName: null,
        lines: null
      }),
    100
  );

  render() {
    return (
      <MicroTask
        onClick={this.handleClick}
        onMouseLeave={this.handleMouseLeave}
        onMouseEnter={this.handleMouseEnter}
        innerRef={this.bindRef}
      />
    );
  }
}

export default MicroTaskContainer;
