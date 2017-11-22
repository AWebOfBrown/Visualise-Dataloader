import { computed } from "mobx";

export class StackStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed
  get currentFrames() {
    let storyProgress = this.rootStore.storyStore.storyProgress;
    let currentFrames = this.rootStore.storyStore.story[storyProgress]
      .stackFrames;

    return currentFrames;
  }
}
