import commentary from "../../../comments";
import { action, observable } from "mobx";

export default class StoryStore {
  constructor(rootStore) {
    this.rootStore = rootStore;
  }

  @observable story = story;

  @observable storyLength = Object.keys(story).length - 1;

  @observable storyProgress = 0;

  @action
  progressStory = () =>
    this.storyProgress < this.storyLength ? ++this.storyProgress : null;

  @action
  regressStory = () => (this.storyProgress >= 1 ? --this.storyProgress : null);
}

const constructArrOfLines = (start, end) => {
  let arr = [];
  for (let i = start; i < end + 1; i++) {
    arr.push(i);
  }
  return arr;
};

const constructCachePromise = ({
  key,
  promiseStatus = "pending",
  promiseValue = "undefined"
}) => ({
  key,
  value: {
    "[[PromiseStatus]]": promiseStatus,
    "[[PromiseValue]]": promiseValue
  }
});

const constructPromiseQueuePromise = ({
  key,
  resolve = null,
  reject = null
}) => ({
  key,
  resolve,
  reject
});

const stackFrames = [
  { scriptName: "Main", lines: constructArrOfLines(1, 30), callSite: null },
  {
    scriptName: "UserLoader",
    lines: constructArrOfLines(1, 20),
    callSite: { scriptName: "Main", line: 2 }
  },
  {
    scriptName: "DataLoader",
    lines: constructArrOfLines(59, 109),
    callSite: { scriptName: "Main", line: 16 }
  },
  {
    scriptName: "DataLoader",
    lines: constructArrOfLines(59, 109),
    callSite: { scriptName: "Main", line: 18 }
  },
  {
    scriptName: "DataLoader",
    lines: [199, 200, 201, 202, 203, 204],
    callSite: { scriptName: "DataLoader", line: 95 }
  }
];

const microTasks = [{ scriptName: "DataLoader", lines: [203] }];

const globalTasks = [{ scriptName: "Main", lines: constructArrOfLines(1, 30) }];

const story = [
  {
    title: "Visualise DataLoader",
    stackFrames: null
  },
  {
    title: "First Steps",
    stackFrames: null
  },
  {
    title: "Main.js",
    stackFrames: {
      frames: [stackFrames[0]]
    }
  },
  {
    title: "Requiring Our UserLoader",
    stackFrames: {
      frames: [stackFrames[0], stackFrames[1]]
    }
  },
  {
    title: "Back to Main.js",
    stackFrames: {
      frames: [stackFrames[0]]
    }
  },
  {
    title: "Keeping up with the Promise Cache",
    stackFrames: {
      frames: [stackFrames[0], stackFrames[2]]
    },
    promiseQueue: [{ key: 49 }],
    cache: [{ key: 49 }].map(key => constructCachePromise(key))
  },
  {
    title: "Batching - Pre-requisite Info",
    stackFrames: {
      frames: [stackFrames[0], stackFrames[2]]
    },
    cache: [{ key: 49 }].map(key => constructCachePromise(key))
  },
  {
    title: "Batching Explained!",
    stackFrames: {
      frames: [stackFrames[0], stackFrames[2]]
    },
    cache: [{ key: 49 }].map(key => constructCachePromise(key)),
    microTaskQueue: {
      tasks: [microTasks[0]],
      animation: null
    }
  },
  {
    title: "Back to Main to Load Again!",
    stackFrames: {
      frames: [stackFrames[0]]
    },
    cache: [{ key: 49 }].map(key => constructCachePromise(key))
  },
  {
    title: "Enqueing Dispatch of batchLoad()",
    stackFrames: {
      frames: [stackFrames[0], stackFrames[3]]
    },
    microTaskQueue: {
      tasks: [microTasks[0]]
    },
    cache: [{ key: 59 }].map(key => constructCachePromise(key))
  },
  {
    title: "Executing batchLoad()",
    stackFrames: {
      frames: [stackFrames[0], stackFrames[2], stackFrames[3]]
    },
    microTaskQueue: {
      tasks: [microTasks[0]]
    },
    cache: [{ key: 49 }, { key: 47 }].map(promise =>
      constructCachePromise({ key: promise.key })
    )
  }
];
