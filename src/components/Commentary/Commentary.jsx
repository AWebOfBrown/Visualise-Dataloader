import React from "react";
import { observer } from "mobx-react";
import { css } from "emotion";

import MarkdownComponent from "../MarkdownComponent";
import CommentaryHeader from "./CommentaryHeader";
import ScrollIndicator from "./ScrollIndicator";

const Commentary = ({
  markdown,
  innerRef,
  handleScroll,
  hasScrolled,
  handleScrollIndicatorClick,
  scrollProgress
}) => {
  return (
    <div className={markdownStyle} ref={innerRef} onScroll={handleScroll}>
      <CommentaryHeader scrollProgress={scrollProgress} />

      {!hasScrolled && <ScrollIndicator onClick={handleScrollIndicatorClick} />}

      <div className={marginBuffer}>
        {markdown && <MarkdownComponent markdown={markdown} />}
      </div>
    </div>
  );
};

export default observer(Commentary);

const marginBuffer = css`margin-top: 200px;`;

const markdownStyle = css`
  position: relative;
  box-shadow: 6px 8px 17px 1px rgba(0, 0, 0, 1);
  font-size: 18px;
  background-color: rgb(39, 39, 39);
  color: rgba(255, 255, 255, 0.85);
  height: 95vh;
  width: 350px;
  padding: 10px 10px 10px 10px;
  overflow-y: scroll;
  @media (min-width: 1200px) {
    width: 470px;
  }
`;
