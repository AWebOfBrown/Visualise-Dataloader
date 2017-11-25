import React from "react";
import { css } from "emotion";
import { observer } from "mobx-react";
import provideTooltip from "../ExecutionFrameTooltip";

const ExecutionFrame = ({
  onMouseEnter,
  onMouseLeave,
  onClick,
  onContextMenu,
  scriptName,
  innerRef
}) => {
  return (
    <div
      ref={innerRef}
      className={frameStyle}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onContextMenu={onContextMenu}
    >
      {`${scriptName.substr(0, 5)}`}
    </div>
  );
};

export default provideTooltip(observer(ExecutionFrame));

const frameStyle = css`
  cursor: pointer;
  opacity: 0;
  margin-bottom: 20px;
  background-color: yellow;
  width: 50px;
  height: 25px;
  box-shadow: 0px 4px 6px 0px rgba(214, 208, 36, 0.7);
  text-align: center;
`;
