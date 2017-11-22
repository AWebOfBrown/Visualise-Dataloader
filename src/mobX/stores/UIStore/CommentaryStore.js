import commentary from "../../../comments";
import { computed, observable } from "mobx";

export default class CommentaryStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed
  get commentary() {
    return commentary[this.rootStore.storyStore.storyProgress];
  }

  @computed
  get commentaryTitle() {
    return this.rootStore.storyStore.story[
      this.rootStore.storyStore.storyProgress
    ].title;
  }
}
