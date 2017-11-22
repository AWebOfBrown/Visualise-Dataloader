const step6 = `In order to fully understand what batching achieves and how, let's briefly consolidate our knowledge about how Node processes a script and how the event loop operates. You should already have some idea about how this works, though notably a lot of the online commentary about the event loop is inconsistent.

When we run a script with \`node someScript\` in the command prompt, the following sequence of events occurs:
1. Node initialises the event loop but does not process it (no phase / queues are touched yet).
2. Node synchronously processes our script, which will likely make async calls, schedule timers, and could call process.nextTick() or setImmediate() etc).
3. Node starts processing the event loop.

The event loop is made up of numerous phases, all of which maintain a first-in-first-out queue of callbacks that execute synchronously until completion, or in the case of the poll phase until a (system-dependent) hard limit is reached. Four of these phases execute scheduled tasks from your code, those being:
1. "Timers" phase which executes callbacks to expired timers (setImmediate / setInterval).
2. "I/O" phase which executes the vast majority of callbacks (network, disk, child process callbacks).
3. Callbacks to setImmediate().
4. Callbacks that occur in response to \`.close()\` events (close event handlers).

In addition to these phases, there are also internal phases: *poll* and *idle, prepare*. *Poll* listens for incoming connections and data (e.g. from I/O events, databases) as well as checking for timer expiry, then schedules timer and I/O callbacks to be executed in their respective phases. There is also the preceding *idle, prepare* phase which is used internally.

Outside of libuv, Node also maintains its own micro-task queues. Specifically, one exists for callbacks scheduled in your code via \`process.nextTick()\`, and one for other micro-tasks such as [Promise Jobs](https://www.ecma-international.org/ecma-262/6.0/#sec-jobs-and-job-queues). A Promise Job is any callback called in response to the settlement of a promise, meaning any callback in a promise's \`.then()\` method. These two micro-task queues are flushed (nextTick first, other micro-task jobs second) to completion before a tick of the event loop, transitioning the loop to the next phase, occurs.

For clarity, processing of a script and one full loop looks something like this:
1. Process the script, which could schedules timers, makes async calls, setImmediate events, sets up event handlers, 
call process.nextTick(), settle a promise via Promise.resolve() or Promise.reject().
2. Check process.nextTick() queue and process to completion, check micro-task queue and process to completion. 
Either could have tasks waiting.
3. Tick to Poll phase. If a setTimeout or setInterval timer has expired, then those callbacks are executed. If there are no expired timers, the poll phase will iterate through its queue of callbacks until completion or the system-dependant hard limit is reached. If the queue is empty, the poll phase checks if there are callbacks scheduled via setImmediate(), and if so, ticks to the check phase to execute them. If there are no setImmediate callbacks, the poll phase waits for them and executes immediately. 

Depictions of the event loop often conveniently abstract its phases into a global task queue, as has been done in this tutorial.  


In addition to the global task queue, there also exists a micro-task queue, which is populated by the [Promise Job queue](https://www.ecma-international.org/ecma-262/6.0/#sec-jobs-and-job-queues) (a Promise Job is any callback in a Promise's .then()).

## Promise caveat
Callbacks to a settled native promise are queued as a micro-task.
 
Using promise libraries can change this behaviour, e.g from the [Q](https://github.com/kriskowal/q) docs:
> Note that resolution of a promise is always asynchronous: that is, the fulfillment or rejection handler will always be called in the next turn of the event loop (i.e. **process.nextTick** in Node).

Obviously this won't affect how DataLoader's internal promises are resolved as it uses native promises, but it's something to be aware of in your own code.
`;
export default step6;
