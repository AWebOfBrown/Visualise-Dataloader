import React from "react";
import { observer } from "mobx-react";
import { css } from "emotion";

const Tab = ({ innerRef, onClick, scriptName }) => {
  return (
    <div ref={innerRef} className={tabStyle} onClick={onClick}>
      {`${scriptName}.js`}
      <span className={activeIndicator} />
    </div>
  );
};

export default observer(Tab);

const activeIndicator = css`
  border-radius: 50%;
  opacity: 0;
  width: 10px;
  margin-left: 5px;
  height: 10px;
  background-color: #00d100;
  box-shadow: 0px 0px 10px #00d100;
`;

const tabStyle = css`
  cursor: pointer;
  color: white;
  background-color: #6a6464;
  height: 60px;
  width: 120px;
  display: flex;
  flex-flow: row nowrap;
  justify-content: center;
  align-items: center;
  border: 1px solid black;
  box-shadow: 1px 3px 2px black;
  zindex: 2;
`;
