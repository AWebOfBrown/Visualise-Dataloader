import { observable, action, computed } from "mobx";
import { Main, UserLoader, DataLoader } from "../../../code";

const tabs = {
  Main,
  UserLoader,
  DataLoader
};

export class CodeEditorStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
    this.tabs = tabs;
  }

  @observable activeScriptName = "Main";
  @observable highlightedCallSite = { scriptName: null, line: null };
  @observable highlightedCode = { scriptName: null, lines: null };
  @observable scrollToLine = { scriptName: null, line: null };

  @action setTab = scriptName => (this.activeScriptName = scriptName);

  @action
  setHighlightedCode = ({ scriptName, lines }) =>
    (this.highlightedCode = { scriptName, lines });

  @action
  setScrollToLine = ({ scriptName, line }) => {
    if (this.activeScriptName !== scriptName && scriptName) {
      this.activeScriptName = scriptName;
    }
    this.scrollToLine = { scriptName, line };
  };

  @action setActiveScriptName = tab => (this.activeScriptName = tab);

  @action
  setHighlightedCallSite = ({ scriptName, line }) =>
    (this.highlightedCallSite = { scriptName, line });
}
