import React from "react";
import Animations from "./animations";
import MicroTask from "./MicroTask";
import { action } from "mobx";
import { observer, inject } from "mobx-react";
import debounce from "../../../utils/debounce";
import PropTypes from "prop-types";

@observer
class MicroTaskContainer extends React.Component {
  DOMNode = null;
  animations = null;

  static propTypes = {
    setHighlightedCode: PropTypes.func.isRequired,
    setScrollToLine: PropTypes.func.isRequired,
    scriptName: PropTypes.string.isRequired,
    // observable array = obj
    lines: PropTypes.object.isRequired,
    active: PropTypes.bool.isRequired
  };

  bindRef = ref => {
    this.DOMNode = ref;
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.animation !== nextProps.animation) {
      this.animations.completeAnimation();
      this.performAnimation(nextProps.animation);
    }
  }

  componentDidMount() {
    this.animations = new Animations(this.DOMNode);
    this.animations.push();
  }

  componentWillUnmount() {
    this.animations = null;
  }

  handleClick = debounce(() => {
    this.props.setScrollToLine({
      scriptName: this.props.scriptName,
      line: this.props.lines[0]
    });
  }, 250);

  handleContextMenu = e => {
    e.preventDefault();

    this.props.setHighlightedCallSite({
      scriptName: this.props.callSite.scriptName,
      line: this.props.callSite.line
    });

    this.props.setScrollToLine({
      scriptName: this.props.callSite.scriptName,
      line: this.props.callSite.line
    });
  };

  handleMouseEnter = debounce(() => {
    this.props.setHighlightedCode({
      scriptName: this.props.scriptName,
      lines: this.props.lines
    });
  }, 100);

  handleMouseLeave = debounce(
    () =>
      this.props.setHighlightedCode({
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
        onContextMenu={this.handleContextMenu}
        innerRef={this.bindRef}
      />
    );
  }
}

export default inject(stores => ({
  setHighlightedCode: stores.UIStore.codeEditorStore.setHighlightedCode,
  setHighlightedCallSite: stores.UIStore.codeEditorStore.setHighlightedCallSite,
  setScrollToLine: stores.UIStore.codeEditorStore.setScrollToLine
}))(MicroTaskContainer);
