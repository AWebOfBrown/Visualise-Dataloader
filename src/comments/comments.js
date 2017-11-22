`Now we come to calling .load() on our UserLoader.
The first thing to note is that we could pass an options
object as the second argument. By default (if you don't specify, 
an options object) the options are:
batch: true (assumes we want to do some batching of db queries),
maxBatchSize: 0(infinite - all keys will be resolved in one db query),
cache: true (hold onto values for as long as our UserLoader persists),
cacheKeyFn: (key passed to .load()),
cacheMap: new Map()

Now let's proceed to loading...
`

`The load function starts on line 71 and checks if your key is not null/undefined.
The first noteworthy element of .load is checking our es6 Map (cache) for a value to return immediately.

Does this mean we only return from the cache if we have a resolved promise (our commenter's user info?) No! 
If we've already called .load() on our current key, we'll return the pending promise representing that key,
instead of including that value twice in our batched SLQ query.

If we don't get a cache hit? Time to create that promise. There's a few things to note here:
1. We put the promise's resolve / reject methods and our key in one object{key, resolve, reject} into the queue (array of keys)
to be sent to the database. We'll see why in a bit. We call it a "queue" because if we set a max batch size in our options, we would send sub-arrays one at a time. 
2. If the queue length is 1, we schedule dispatching of the batched db query (I'll expand on this in a second too). It would still be 0 if we got a 
cache hit for our key with an already resolved promise, as a result of a previously dispatched DB query.
3. we put our pending promise in the promise cache. If we .load() the same key again, we'll instantly get back the pending promise sitting in our queue.
4. we RETURN our pending promise to where we called .load().
So to summarise, our promise has been returned to the call-site of .load, but references to it are also sitting in our promise cache and our batched queue!
`

`Let's touch on this "scheduling the dispatching of a query" business. This is essentially how our batching works. Line 105 takes us to 
enqueuePostPromiseJob(), so here we are with another frame (function call) on the stack.

Q. Why does DataLoader assign an immediately resolved promise to a variable (resolvedPromise)?
A: To make use of the Promise-Jobs Queue (belonging to the micro-task Queue) of V8. 
Let's unpack this. Recall that Dataloader batching occurs over one execution context, so we want to send our query after all our frames return.
In V8, any callback taking place in a '.then' (following a promise) is placed inside the "Promise Jobs" queue, one of potentially many queues
existing as part of a micro-task queue. This micro-task queue executes after the execution context and before the next global task, so by placing
process.nextTick(fn) inside a .then, we're essentially delaying running `fn` (dispatching our queue) until the stack unwinds and the micro-task queue
begins to flush. 

But this leads us to: why the process.nextTick()?
`

`Process.nextTick() is used to make sure our dispatch, of the batched database query, occurs after other promise-resolution jobs. Essentially, 
proces.nextTick() puts our fn at the back of the promise-jobs queue, thus ensuring we batch all our loaded items in one context execution.
Now let's see what happens when our dispatched query returns.   

`


