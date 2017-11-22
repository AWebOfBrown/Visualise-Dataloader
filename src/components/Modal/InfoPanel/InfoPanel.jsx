import React from "react";
import { css } from "emotion";

import MarkdownComponent from "../../MarkdownComponent";
import AboutTheProject from "./Markdown/AboutTheProject.js";

class InfoPanel extends React.Component {
  render() {
    return (
      <div className={panelStyle}>
        <h1 className={label}> About the Project</h1>
        <div className={markdownStyle}>
          <MarkdownComponent markdown={AboutTheProject} />
        </div>
      </div>
    );
  }
}

export default InfoPanel;

const panelStyle = css`
  padding: 10px 40px 10px 40px;
  color: #fff;
  background-color: rgba(42, 46, 59, 1);
  box-shadow: inset 10px -2px 20px -5px rgba(0, 0, 0, 0.75);
  flex: 3 1 920px;
  max-width: 920px;
  height: 100%;
  overflow-y: scroll;
`;

const markdownStyle = css`
  margin: 0 auto 0 auto;
  max-width: 720px;
`;

const label = css`text-align: center;`;
