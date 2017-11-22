import React, { Component } from "react";
import { css } from "emotion";
import { observer, inject } from "mobx-react";

import RowOfTabs from "./RowOfTabs";
import CodeBlock from "./CodeBlock";

const CodeEditorContainer = ({ tabs, activeTabName }) => {
  let activeTab = tabs.find(tab => tab.label === activeTabName);

  return (
    <div className={containerStyle}>
      <RowOfTabs tabs={tabs} activeTabName={activeTabName} />
      <CodeBlock code={activeTab.code} />
    </div>
  );
};

export default inject(stores => ({
  activeTabName: stores.UIStore.codeEditorStore.activeTabName,
  tabs: stores.UIStore.codeEditorStore.tabs
}))(observer(CodeEditorContainer));

const containerStyle = css`
  display: flex;
  flex-flow: column nowrap;
  justify-content: flex-start;
  align-items: flex-start;
  height: 100%;
  flex-shrink: 1;
  width: calc(100% - 80px);
`;
