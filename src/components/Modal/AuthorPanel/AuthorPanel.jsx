import React from "react";
import { css } from "emotion";
import styled from "react-emotion";

import MarkdownComponent from "../../MarkdownComponent";
import AboutMe from "./Markdown/AboutMe.js";
import ContactButton from "./ContactButton";

class AuthorPanel extends React.Component {
  state = { markdown: null };

  render() {
    return (
      <div className={panelStyle}>
        <h1 className={label}> About the Author</h1>

        <ul className={contactBlock}>
          <li>
            <ContactButton
              href="mailto:ajcbrown820@gmail.com"
              media="Gmail"
              mediaColor="#d14836"
              size={30}
            />
          </li>
          <li>
            <ContactButton
              href="https://twitter.com/awebofbrown"
              media="Twitter"
              mediaColor="#1b95e0"
              size={30}
            />
          </li>
        </ul>

        <MarkdownComponent skipHtml markdown={AboutMe} />
      </div>
    );
  }
}

export default AuthorPanel;

const label = css`text-align: center;`;

const contactBlock = css`
  display: flex;
  width: 100%;
  flex-flow: row nowrap;
  justify-content: space-around;
  margin-top: auto;
  padding: 10px 0 10px 0;
  list-style: none;
`;

const panelStyle = css`
  padding: 0px 25px 25px 25px;
  color: white;
  font-size: 18px;
  font-weight: 600;
  flex: 1 1 360px;
  height: 100%;
  background-color: #122740;
  box-shadow: 6px 8px 17px 1px rgba(0, 0, 0, 1);
  overflow-y: scroll;
`;
