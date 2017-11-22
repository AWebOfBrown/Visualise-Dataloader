const step7 = `## Before we begin, some terminology:
It's convenient to refer to the process of running our batchLoad() function, ie sending our batchLoad async request to our database, 
as 'dispatching batchLoad()\` due to the way it is executed. When I use this term, I'm actually referring to a chain of functions:
1. enquePostPromise job, which we're about to discuss, is called at line 105, taking dispatchQueue as an argument. 
enquePostPromiseJob is what lets us load keys over an execution context by deferring dispatchQueue().
2. dispatchQueue checks whether we set maxBatchSize in the optional config object (we didn't), 
so it calls dispatchQueueBatch with the entire Promise Queue (your loader's this._queue) at line 227.
3. dispatchQueueBatch extracts the keys from the promise queue, then ultimate calls batchLoad() with the keys, 
occuring at line 240.

## enqueuePostPromiseJob() - the batching magician
At line 199 we find the \`enqueuePostPromiseJob()\` function. This utility function delays dispatching batchLoad() 
to our database until we've loaded all keys across both our execution context, and the micro-task queue. 
All of this occurs with a simple: resolvedPromise.then(() => process.nextTick(fn)) at line 199, let's talk about 
how this works.

## What does process.nextTick() achieve?
This part of the equation is reasonably obvious: we need some method of deferring dispatch of batchLoad() until after 
all of our .load() calls in our code are processed. By using process.nextTick() we can be sure that all of our 
.load functions, across one execution frame, will occur before node turns to the nextTick() queue.
But this doesn't solve all of our problems, because we won't catch any .loads() occuring as callbacks to 
promises that resolved during the current tick.  

## Why chain process.nextTick after a resolved promise?  
We've discussed how any callback to a promise resolution gets queued on the micro-task queue. 
Consequently, if we were executing the below code and assume that Promise.resolve() represents a promise which has
resolved during the current tick:

\`\`\`
someLoader.load(3);
Promise.resolve().then(() => someLoader.load(4));
someLoader.load(5)
\`\`\`

we'd have two loads occur and fail to batch (the latter loading key = 4), because the promise micro-task queue (where .load(4) is executed) 
isn't processed till after the nextTick queue, hence missing our dispatch of batchLoad(). This is why DataLoader uses Promise.resolve().then(() => process.nextTick(fn)) where 'fn'
is dispatchQueue(), because it delays the call to dispatchQueue() first to the micro-task queue, and from there uses process.nextTick to
further delay dispatchBatchload() so that all other micro-tasks execute beforehand. It might suprise you to learn that  
the micro-task queue flushes completely, and then revisits the nextTick queue, meaning we've gone from the 
current tick => nextTick queue => micro-task queue => nextTick. 


## What about async/await?
I'll cover async/await seperately once we're done visualising DataLoader's execution.

## Lastly: our animation
We added one frame and one task in this step of our walkthrough. A \`.load()\` function call added to the stack, and our  \`promise.resolve()\` micro-task which will run \`process.nextTick(() => dispatch())\` after we finish all other loads. Remember, only the first \`.load()\` call will actually queue a dispatch via process.nextTick, all the other calls to \`.load()\` won't go through this process because DataLoader checks for a resolved promise (at line 200), and if that exists then we already have scheduled dispatch and need not do it again.

So, in the next step we will fast-forward through calling \`.load()\` 5 more times, adding 5 more keys to our promiseQueue (and our cache) and we'll be ready to process the micro-task queue.`;

export default step7;
