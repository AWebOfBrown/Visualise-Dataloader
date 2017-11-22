import StoryStore from "./StoryStore";
import { QueueStore } from "./QueueStore";
import { PromiseQueueStore } from "./PromiseQueueStore";
import { CacheStore } from "./CacheStore";
import { StackStore } from "./StackStore";
import { CodeEditorStore } from "./CodeEditorStore";
import CommentaryStore from "./CommentaryStore";
import MediaQueryStore from "./MediaQueryStore";

class UIStore {
  storyStore = new StoryStore(this);
  stackStore = new StackStore(this);
  cacheStore = new CacheStore(this);
  mediaQueryStore = new MediaQueryStore();
  microTaskQueueStore = new QueueStore({
    rootStore: this,
    globalQueue: false
  });
  globalTaskQueueStore = new QueueStore({
    rootStore: this,
    globalQueue: true
  });
  codeEditorStore = new CodeEditorStore(this);
  commentaryStore = new CommentaryStore(this);
  promiseQueueStore = new PromiseQueueStore(this);
}

const singleton = new UIStore();

export default singleton;
