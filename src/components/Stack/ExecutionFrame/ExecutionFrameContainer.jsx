import React from "react";
import { observer } from "mobx-react";
import { action } from "mobx";

import debounce from "../../../utils/debounce";
import Animations from "./animations";
import ExecutionFrame from "./ExecutionFrame";

@observer
class ExecutionFrameContainer extends React.Component {
  DOMNode = null;
  animations = null;

  componentDidMount() {
    this.animations = new Animations(this.DOMNode);
    this.animations.push();
  }

  bindRef = ref => (this.DOMNode = ref);

  componentWillReceiveProps(nextProps) {
    if (nextProps.mountState === "exiting") {
      return this.animations.pop();
    }
    if (this.props.active && !nextProps.active) {
      this.animations.inactive();
    }

    if (!this.props.active && nextProps.active) {
      this.animations.active();
    }
  }

  componentWillUnmount() {
    this.animations = null;
    this.DOMNode = null;
  }

  @action
  handleClick = debounce(() => {
    this.animations.click(this.props.active);

    this.props.UIStore.codeEditorStore.setScrollToLine({
      scriptName: this.props.scriptName,
      line: this.props.lines[0]
    });
    this.props.UIStore.codeEditorStore.setHighlightedCode({
      scriptName: this.props.scriptName,
      lines: this.props.lines
    });
  }, 250);

  @action
  handleContextMenu = e => {
    e.preventDefault();
    this.animations.click(this.props.active);

    if (this.props.callSite) {
      this.props.UIStore.codeEditorStore.setHighlightedCallSite({
        scriptName: this.props.callSite.scriptName,
        line: this.props.callSite.line
      });

      this.props.UIStore.codeEditorStore.setScrollToLine({
        scriptName: this.props.callSite.scriptName,
        line: this.props.callSite.line
      });
    }
  };

  @action
  handleMouseEnter = debounce(() => {
    this.props.UIStore.codeEditorStore.setHighlightedCode({
      scriptName: this.props.scriptName,
      lines: this.props.lines
    });
  }, 100);

  @action
  handleMouseLeave = debounce(
    () =>
      this.props.UIStore.codeEditorStore.setHighlightedCode({
        scriptName: null
      }),
    100
  );

  render() {
    let { scriptName } = this.props;
    return (
      <ExecutionFrame
        innerRef={this.bindRef}
        scriptName={scriptName}
        onMouseEnter={this.handleMouseEnter}
        onMouseLeave={this.handleMouseLeave}
        onClick={this.handleClick}
        onContextMenu={this.handleContextMenu}
      />
    );
  }
}

export default ExecutionFrameContainer;
