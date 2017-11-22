import React from "react";
import { css } from "emotion";

const MicroTask = ({ onClick, onMouseEnter, onMouseLeave, innerRef }) => {
  return (
    <div
      className={Task}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      ref={innerRef}
    />
  );
};

export default MicroTask;

const Task = css`
  cursor: pointer;
  marginleft: 20px;
  backgroundcolor: #0f69f9;
  width: 40px;
  height: 20px;
  boxshadow: 0px 4px 20px 0px rgba(29, 79, 159, 1);
  opacity: 0;
`;
