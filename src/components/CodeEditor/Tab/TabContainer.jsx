import React from "react";
import Animations from "./animations";
import { observer, inject } from "mobx-react";
import debounce from "../../../utils/debounce";
import Tab from "./Tab";

@observer
class TabContainer extends React.Component {
  tabNode = null;
  indicatorNode = null;
  animations = null;

  handleClick = debounce(() => {
    this.props.setActiveTabName(this.props.scriptName);
  }, 100);

  componentDidMount() {
    this.animations = new Animations(this.tabNode, this.indicatorNode);
    if (this.props.active) {
      this.animations.active(this.indicatorNode);
    }
  }

  bindRef = ref => {
    this.tabNode = ref;
    this.indicatorNode = ref ? ref.children[0] : null;
  };

  componentWillUpdate(nextProps) {
    if (this.props.active && !nextProps.active) {
      this.animations.inactive(this.tabNode, this.indicatorNode);
    } else if (!this.props.active && nextProps.active) {
      this.animations.active(this.tabNode, this.indicatorNode);
    }
  }

  componentWillUnmount() {
    this.tabNode = null;
    this.indicatorNode = null;
  }

  render() {
    let { scriptName } = this.props;
    return (
      <Tab
        innerRef={this.bindRef}
        onClick={this.handleClick}
        scriptName={scriptName}
      />
    );
  }
}

export default inject(stores => ({
  setActiveTabName: stores.UIStore.codeEditorStore.setActiveTabName
}))(TabContainer);
