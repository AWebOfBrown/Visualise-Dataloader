import React from "react";
import { css } from "emotion";
import Tab from "./Tab";
import { observer } from "mobx-react";

const RowOfTabs = ({ tabs, activeScriptName }) => {
  return (
    <div className={tabRowStyle}>
      {Object.keys(tabs).map((tabName, index) => {
        return (
          <Tab
            key={tabName}
            scriptName={tabName}
            active={tabName === activeScriptName}
          />
        );
      })}
    </div>
  );
};

export default observer(RowOfTabs);

const tabRowStyle = css`
  display: flex;
  flexflow: row nowrap;
  justifycontent: flex-start;
  alignitems: center;
  width: 100%;
  height: 60px;
  z-index: 2;
  position: relative;
  top: -30px;
`;
