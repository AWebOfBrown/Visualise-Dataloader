import React, { Component } from "react";
import SyntaxHighlighter, {
  registerLanguage
} from "react-syntax-highlighter/dist/light";
import { javascript } from "react-syntax-highlighter/dist/languages/";
import { monokaiSublime } from "react-syntax-highlighter/dist/styles";
registerLanguage("js", javascript);

class CodeBlockRenderer extends Component {
  render() {
    return (
      <SyntaxHighlighter
        customStyle={{ fontSize: "1.2em" }}
        style={monokaiSublime}
        language="js"
      >
        {this.props.literal}
      </SyntaxHighlighter>
    );
  }
}

export default CodeBlockRenderer;
