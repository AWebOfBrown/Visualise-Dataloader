import React from "react";
import Animations from "./animations";

import ScrollIndicator from "./ScrollIndicator.jsx";

export default class ScrollIndicatorContainer extends React.Component {
  Animations = null;
  DOMNode = null;

  bindRef = ref => (this.DOMNode = ref);

  componentDidMount() {
    this.Animations = new Animations({
      dots: [...this.DOMNode.children[0].children]
    });
    setTimeout(() => this.Animations.highlight(), 300);
  }

  render() {
    return (
      <ScrollIndicator onClick={this.props.onClick} innerRef={this.bindRef} />
    );
  }
}
