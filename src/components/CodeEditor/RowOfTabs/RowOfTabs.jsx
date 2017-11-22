import React from "react";
import { css } from "emotion";
import Tab from "../Tab";
import { observer } from "mobx-react";

const RowOfTabs = ({ tabs, activeTabName }) => (
  <div className={tabRowStyle}>
    {tabs.map((tab, index) => (
      <Tab
        key={index}
        scriptName={tab.label}
        active={tab.label === activeTabName}
      />
    ))}
  </div>
);

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
