import React from "react";
import { css } from "react-emotion";

const ProgressIndicator = ({
  headerShrunk,
  scrollProgress,
  storyProgress,
  storyLength
}) => {
  if (headerShrunk) {
    return (
      <div className={progressContainer}>
        <progress max={1} value={scrollProgress || 0} />
      </div>
    );
  }

  return (
    <span className={label}>
      {storyProgress} / {storyLength}
    </span>
  );
};

export default ProgressIndicator;

const progressContainer = css`
  width: 100%;
  display: flex;
  justify-content: center;

  & progress {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background-color: transparent;
    margin-top: 2px;
    border: none;
    height: 0.25em;
    width: 180px;

    &::-webkit-progress-bar {
      background-color: white;
    }

    &::-webkit-progress-value {
      background-color: rgb(166, 226, 46);
    }
  }
`;

const label = css`
  color: rgb(150, 150, 150);
  margin-top: 5px;
`;
