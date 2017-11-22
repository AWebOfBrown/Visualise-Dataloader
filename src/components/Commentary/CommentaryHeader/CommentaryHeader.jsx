import React from "react";
import styled, { css } from "react-emotion";
import { observer } from "mobx-react";
import ProgressIndicator from "./ProgressIndicator";

const CommentaryHeader = ({
  innerRef,
  commentaryTitle,
  scrollProgress,
  storyProgress,
  storyLength,
  headerShrunk,
  progressStory,
  regressStory
}) => {
  return (
    <div ref={innerRef} className={containerStyle}>
      <Row>
        <Arrow
          disabled={storyProgress === 0}
          direction={"left"}
          onClick={regressStory}
        />{" "}
        <span className={title}> {commentaryTitle} </span>
        <Arrow
          disabled={storyProgress === storyLength}
          direction={"right"}
          onClick={progressStory}
        />
      </Row>
      <ProgressIndicator
        headerShrunk={headerShrunk}
        scrollProgress={scrollProgress}
        storyProgress={storyProgress}
        storyLength={storyLength}
      />
    </div>
  );
};

export default observer(CommentaryHeader);

const Row = styled("span")`
  display: flex;
  align-items: center;
`;

const Arrow = styled("div")`
  cursor: pointer;
  padding: 5px;
  width: 20px;
  height: 20px;
  -webkit-transform: ${props =>
    props.direction === "left" ? "rotate(130deg)" : "rotate(-45deg)"};
  border-left: none;
  border-top: none;
  opacity: ${props => (props.disabled ? 0.5 : 1)};
  border-right: 5px #fff solid;
  border-bottom: 5px #fff solid;
`;

const title = css`
  width: 250px;
  margin: 0px 0px 0px 0px;
  color: rgb(255, 255, 255);
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  line-height: 1.3;
`;

const containerStyle = css`
  padding 2px 0px 20px 0px;
  top: 5vh;
  left: 0;
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
  background-color: #154a88;
  background: linear-gradient( 45deg,rgb(5, 53, 110) 0%,rgb(0, 86, 172) 50%,rgb(8, 111, 213) 80% );
  position: fixed;
  clip-path: polygon(0 0, 470px 0, 470px 85%, 0 100%);
  width: 350px;
  height: 200px;
  @media (min-width: 1200px) {
    width: 470px;
  }
`;
