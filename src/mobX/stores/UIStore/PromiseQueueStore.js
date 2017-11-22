import { computed } from "mobx";

export class PromiseQueueStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed
  get currentPromiseQueue() {
    let storyProgress = this.rootStore.storyStore.storyProgress;
    let currentPromiseQueueContents = this.rootStore.storyStore.story[
      storyProgress
    ].promiseQueue;

    return currentPromiseQueueContents;
  }
}
