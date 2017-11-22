import { computed } from "mobx";

export class CacheStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @computed
  get currentCache() {
    let storyProgress = this.rootStore.storyStore.storyProgress;
    let currentCacheContents = this.rootStore.storyStore.story[storyProgress]
      .cache;

    return currentCacheContents;
  }
}
