import React from "react";

import MarkdownComponent from "./MarkdownComponent.jsx";

export default class MarkdownComponentContainer extends React.Component {
  bindRef = ref => (this.DOMNode = ref);

  componentDidMount() {
    this.updateMarkdownAttributes();
  }

  componentDidUpdate(nextProps) {
    if (nextProps.markdown !== this.props.markdown) {
      this.updateMarkdownAttributes();
    }
  }

  updateMarkdownAttributes = () => {
    this.updateHyperlinkAttributes();
    this.addH1Ids();
  };

  updateHyperlinkAttributes = () => {
    Array.prototype.forEach.call(
      this.DOMNode.querySelectorAll("a"),
      hyperlink => {
        if (hyperlink.getAttribute("data-internalLink") !== "true") {
          hyperlink.target = "_blank";
          hyperlink.rel = "noopener noreferrer";
        }
      }
    );
  };

  addH1Ids = () => {
    Array.prototype.forEach.call(this.DOMNode.querySelectorAll("h1"), h1 => {
      h1.setAttribute("id", h1.innerText);
    });
  };

  render() {
    return (
      <MarkdownComponent
        innerRef={this.bindRef}
        markdown={this.props.markdown}
      />
    );
  }
}
