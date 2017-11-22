import React from "react";
import { css } from "emotion";
import SyntaxHighlighter, {
  registerLanguage
} from "react-syntax-highlighter/dist/light";
import { javascript } from "react-syntax-highlighter/dist/languages/";
import customSyntaxStyle from "../../../utils/customSyntaxStyle";
import { observer } from "mobx-react";
registerLanguage("js", javascript);

const CodeBlock = ({ code, innerRef }) => {
  return (
    <div className={container} ref={innerRef}>
      <SyntaxHighlighter
        className={blockStyle}
        showLineNumbers
        wrapLines
        language="js"
        style={customSyntaxStyle}
        customStyle={{
          padding: 0,
          paddingTop: "2px",
          margin: 0,
          height: "100%"
        }}
      >
        {code || ``}
      </SyntaxHighlighter>
    </div>
  );
};

export default observer(CodeBlock);

const container = css`
  padding-top: 30px;
  width: 100%;
  height: 100%;
`;

const blockStyle = css`
  overflow-x: scroll;
  font-size: 1.2em;
  line-height: 1.4em;
`;
