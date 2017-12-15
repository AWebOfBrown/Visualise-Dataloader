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
    lines: [195, 196, 197, 198, 199, 200],
    callSite: { scriptName: "DataLoader", line: 95 }
  },
  {
    scriptName: "DataLoader",
    lines: constructArrOfLines(207, 225),
    callSite: { scriptName: "DataLoader", line: 199 }
  },
  {
    scriptName: "DataLoader",
    lines: constructArrOfLines(227, 291),
    callSite: { scriptName: "DataLoader", line: 223 }
  },
  {
    scriptName: "Main",
    lines: [17],
    callSite: { scriptName: "DataLoader", line: 17 }
  },
  {
    scriptName: "Main",
    lines: [19],
    callSite: { scriptName: "DataLoader", line: 19 }
  }
];

const microTasks = [
  {
    scriptName: "DataLoader",
    lines: [199],
    callSite: { scriptName: "DataLoader", line: 195 }
  },
  {
    scriptName: "Main",
    lines: [17],
    callSite: { scriptName: "Main", line: 17 }
  },
  {
    scriptName: "Main",
    lines: [19],
    callSite: { scriptName: "Main", line: 19 }
  }
];

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
    cache: [{ key: 49, value: "undefined" }]
  },
  {
    title: "Batching - Pre-requisite Info",
    stackFrames: {
      frames: [stackFrames[0], stackFrames[2]]
    },
    promiseQueue: [{ key: 49 }],
    cache: [{ key: 49, value: "undefined" }]
  },
  {
    title: "Batching Explained!",
    stackFrames: {
      frames: [stackFrames[0], stackFrames[2], stackFrames[3]]
    },
    promiseQueue: [{ key: 49 }],
    cache: [{ key: 49, value: "undefined" }],
    microTaskQueue: {
      tasks: [microTasks[0]]
    }
  },
  {
    title: "Back to Main to Load Again!",
    stackFrames: {
      frames: [stackFrames[0]]
    },
    microTaskQueue: {
      tasks: [microTasks[0]]
    },
    promiseQueue: [{ key: 49 }, { key: 47 }],
    cache: [{ key: 49, value: "undefined" }, { key: 47, value: "undefined" }]
  },
  {
    title: "Enqueing Dispatch of batchLoad()",
    stackFrames: {
      frames: []
    },
    microTaskQueue: {
      tasks: [microTasks[0]]
    },
    promiseQueue: [{ key: 49 }, { key: 47 }],
    cache: [{ key: 49, value: "undefined" }, { key: 47, value: "undefined" }]
  },
  {
    title: "dispatchQueue()",
    stackFrames: {
      frames: [stackFrames[4]]
    },
    cache: [{ key: 49, value: "undefined" }, { key: 47, value: "undefined" }]
  },
  {
    title: "dispatchQueueBatch()",
    stackFrames: {
      frames: [stackFrames[4], stackFrames[5]]
    },
    cache: [{ key: 49, value: "undefined" }, { key: 47, value: "undefined" }]
  },
  {
    title: "Return of the Database Call",

    stackFrames: {
      frames: [stackFrames[4], stackFrames[5]]
    },
    cache: [{ key: 49, value: "{...}" }, { key: 47, value: "{...}" }]
  },
  {
    title: "Invitees of our attendees",
    stackFrames: {
      frames: []
    },
    microTaskQueue: {
      tasks: [microTasks[1], microTasks[2]]
    },
    cache: [{ key: 49, value: "{...}" }, { key: 47, value: "{...}" }]
  },
  {
    title: "Loading key 49 - again",
    stackFrames: {
      frames: [stackFrames[6]]
    },
    microTaskQueue: {
      tasks: [microTasks[2]]
    },
    cache: [{ key: 49, value: "{...}" }, { key: 47, value: "{...}" }]
  },
  {
    title: "Loading key 83",
    stackFrames: {
      frames: [stackFrames[7]]
    },
    cache: [
      { key: 49, value: "{...}" },
      { key: 47, value: "{...}" },
      { key: 83, value: "undefined" }
    ]
  }
];
