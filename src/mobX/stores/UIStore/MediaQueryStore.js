import { action, observable } from "mobx";

export class MediaQueryStore {
  @observable mediaQueries = {};
  @action setMediaQueries = mediaQueries => (this.mediaQueries = mediaQueries);
}

export default MediaQueryStore;
