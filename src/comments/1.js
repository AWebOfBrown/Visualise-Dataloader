const step1 = `Before we start adding frames to our context execution stack, let's brush up on some basic knowledge.

## Unfarmiliar with the event loop or V8 engine?
In the following sections I will try to provide an overview of the v8 mechanics at play, however explaining the event
loop could be a project of its own. With that in mind, if you're not farmiliar with the event loop and v8's queues - including:

* how timers and intervals, network/disk/child processes (often referred to as the I/O phase), setImmediate callbacks, and *close* event handlers queue for execution, 
* the micro-task queue,
* the next-tick queue,
* what a *tick* of the event loop is,
* V8's heap and stack

... then I may have to set some homework. 

The following articles are three of the best I've found that explain these things semantically:

### 1. [How does Javascript actually work, part 1, by Alexander Zlatkov](https://blog.sessionstack.com/how-does-javascript-actually-work-part-1-b0bacc073cf) 

This article is particularly excellent to obtain a quick understanding of V8's memory heap and the call stack, without being too long or too in-depth.

### 2. [Event Loop and the Big Picture , part 1, by Deepal Jayasekara](https://jsblog.insiderattack.net/event-loop-and-the-big-picture-nodejs-event-loop-part-1-1cb67a182810) 

This is an event loop deep dive, the first part of a (not yet complete) series, which is probably the most in-depth I found after a quick search. 

Read part 1 and you'll be set, but if you're a beginner don't wory too much about the 'Event Demultiplexer' section, focus on the 'Event Queue' part.


### 3. [What you should know to really understand the Node.js Event Loop, by Daniel Khan](https://medium.com/the-node-js-collection/what-you-should-know-to-really-understand-the-node-js-event-loop-and-its-metrics-c4907b19da4c) 

This article takes some inspiration from a [Node Interactive keynote by Bert Belder](https://www.youtube.com/watch?v=PNa9OMajw9w), in which Bert clarifies why most depictions of the event loop, found e.g. via google images, are somewhat misleading. 

Daniel provides an excellent follow-up, clearing up some of the most common misconceptions developers hold about the event loop. He also provides an excellent graphic which more accurately depicts the event loop's phases. The article does get more advanced in the 'Monitoring the Event Loop' section, so you can safely skip that.

## Before you move on
At the least, you should understand that my depiction of a global task queue and micro-task queue is somewhat of an abstraction - these two queues exist for each phase of the event-loop. There is also a nextTick queue.`;

export default step1;
