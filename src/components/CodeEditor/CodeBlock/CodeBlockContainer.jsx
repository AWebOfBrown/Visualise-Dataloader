import React, { Component } from "react";
import Animations from "./animations";
import { observer, inject } from "mobx-react";
import { autorun } from "mobx";
import CodeBlock from "./CodeBlock";

@observer
class CodeBlockContainer extends Component {
  DOMNode = null;
  codeLineNumbers = null;
  codeLines = null;
  animations = null;

  componentDidMount() {
    this.animations = new Animations(this.DOMNode);
  }

  bindRef = ref => {
    if (ref) {
      this.DOMNode = ref.children[0];
      this.codeLineNumbers = this.DOMNode.children[0];
      this.codeLines = this.DOMNode.children[1].children;
    }
  };

  componentDidUpdate(prevProps) {
    if (this.props.scrollToLine !== prevProps.scrollToLine) {
      let { line } = this.props.scrollToLine;
      this.handleScrolling(line);
    }

    if (this.props.highlightedCode !== prevProps.highlightedCode) {
      this.handleHighlighting(this.props.highlightedCode);
    }

    if (this.props.highlightedCallSite !== prevProps.highlightedCallSite) {
      this.animations.pauseHighlight();
      this.animations.indicateCallSite(
        this.codeLines[this.props.highlightedCallSite.line - 1]
      );
    }
  }

  handleHighlighting = ({ scriptName, lines }) => {
    if (!scriptName) {
      this.animations.pauseHighlight();
    } else if (scriptName === this.props.scriptName && lines) {
      let lineRefs = Array.from(this.codeLines).filter((line, index) =>
        lines.includes(index + 1)
      );
      this.animations.startHighlight(lineRefs);
    }
  };

  // Easier way to do this is this.codeLines[line - 1].scrollIntoView()
  // but its not smooth.
  handleScrolling = line => {
    if (line) {
      let scrollPositionPx =
        this.codeLines[line - 1].offsetTop - (this.DOMNode.offsetTop + 10);

      this.animations.scroll(scrollPositionPx);
    }
  };

  componentWillUnmount() {
    this.DOMNode = null;
    this.animations = null;
  }

  render() {
    return <CodeBlock innerRef={this.bindRef} code={this.props.code} />;
  }
}

export default inject(stores => ({
  highlightedCallSite: stores.UIStore.codeEditorStore.highlightedCallSite,
  highlightedCode: stores.UIStore.codeEditorStore.highlightedCode,
  scrollToLine: stores.UIStore.codeEditorStore.scrollToLine,
  setHighlightedCode: stores.UIStore.codeEditorStore.setHighlightedCode,
  setScrollToLine: stores.UIStore.codeEditorStore.setScrollToLine
}))(CodeBlockContainer);
