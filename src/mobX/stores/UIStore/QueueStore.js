import { computed } from "mobx";

export class QueueStore {
  constructor({ rootStore, globalQueue }) {
    this.rootStore = rootStore;
    this.globalQueue = globalQueue;
  }

  @computed
  get currentTasks() {
    let storyProgress = this.rootStore.storyStore.storyProgress;

    if (this.globalQueue) {
      return this.rootStore.storyStore.story[storyProgress].globalTaskQueue;
    } else {
      return this.rootStore.storyStore.story[storyProgress].microTaskQueue;
    }
  }
}
