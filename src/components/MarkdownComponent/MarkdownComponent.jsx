import Markdown from "react-markdown";
import React from "react";
import { css } from "emotion";
import CodeBlockRenderer from "./CodeBlockRenderer";

const MarkdownComponent = ({ markdown, innerRef }) => {
  return (
    <div className={markdownStyle} ref={innerRef}>
      <Markdown
        source={markdown}
        renderers={{ CodeBlock: CodeBlockRenderer }}
      />
    </div>
  );
};

export default MarkdownComponent;

const markdownStyle = css`
  & a {
    color: #56abff;
    &:hover {
      text-decoration: underline;
    }
  }
  & p {
    line-height: 1.7;
    font-size: 18px;
    -webkit-font-smoothing: antialiased;
    font-weight: 400;
    font-style: normal;
    margin-top: 30px;
    margin-bottom: 0px;
  }
  & h1 {
    margin-top: 40px;
    margin-bottom: 0px;
  }
  & h2 {
    border-top: 1px solid rgba(75, 75, 75, 1);
    padding-top: 17px;
    margin-top: 18px;
    margin-bottom: 0px;
    color: rgb(255, 255, 255);
    font-size: 1.4rem;
    font-weight: 200;
  }
  & h3 {
    color: #f2f2f2;
    border-left: 3px solid rgb(87, 164, 255);
    padding-left: 20px;
    margin-top: 30px;
    margin-bottom: 0px;
    font-size: 18px;
    line-height: 1.3;
  }
  & ul {
    margin-top: 20px;
    margin-bottom: 0px;
  }
  & li {
    margin-top: 20px;
    line-height: 1.3em;
    font-size: 16px;

    & p {
      margin-top: 10px;
      margin-bottom: 10px;
    }
  }
  & blockquote {
    & p {
      font-style: italic;
    }
  }
`;
