import React, { Component } from "react";
import { css } from "emotion";
import { observer, inject } from "mobx-react";

import RowOfTabs from "./RowOfTabs";
import CodeBlock from "./CodeBlock";

const CodeEditorContainer = ({ tabs, activeScriptName }) => {
  let code = tabs[activeScriptName];
  return (
    <div className={containerStyle}>
      <RowOfTabs tabs={tabs} activeScriptName={activeScriptName} />
      <CodeBlock scriptName={activeScriptName} code={code} />
    </div>
  );
};

export default inject(stores => ({
  activeScriptName: stores.UIStore.codeEditorStore.activeScriptName,
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
