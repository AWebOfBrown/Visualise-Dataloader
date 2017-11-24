import { observable, action, computed } from "mobx";
import { Main, UserLoader, DataLoader } from "../../../code";

export class CodeEditorStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.tabs = [
      {
        label: "Main",
        content: Main
      },
      {
        label: "UserLoader",
        content: UserLoader
      },
      {
        label: "DataLoader",
        content: DataLoader
      }
    ];
  }

  @observable activeTabName = "Main";
  @action setActiveTabName = scriptName => (this.activeTabName = scriptName);

  @observable highlightedCallSite = { scriptName: null, line: null };
  @action
  setHighlightedCallSite = ({ scriptName, line }) =>
    (this.highlightedCallSite = { scriptName, line });

  @observable highlightedCode = { scriptName: null, lines: null };
  @action
  setHighlightedCode = ({ scriptName, lines }) =>
    (this.highlightedCode = { scriptName, lines });

  @observable scrollToLine = { scriptName: null, line: null };
  @action
  setScrollToLine = ({ scriptName, line }) => {
    if (this.activeScriptName !== scriptName && scriptName) {
      this.activeScriptName = scriptName;
    }
    this.scrollToLine = { scriptName, line };
  };
}
