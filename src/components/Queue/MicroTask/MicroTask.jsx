import React from "react";
import { css } from "emotion";
import provideTooltip from "../MicrotaskTooltip";

const MicroTask = ({
  onClick,
  onContextMenu,
  onMouseEnter,
  onMouseLeave,
  innerRef
}) => {
  return (
    <div
      className={Task}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onContextMenu={onContextMenu}
      ref={innerRef}
    />
  );
};

export default provideTooltip(MicroTask);

const Task = css`
  cursor: pointer;
  margin-left: 20px;
  background-color: #0f69f9;
  width: 40px;
  height: 20px;
  box-shadow: 0px 4px 20px 0px rgba(29, 79, 159, 1);
  opacity: 1;
`;
