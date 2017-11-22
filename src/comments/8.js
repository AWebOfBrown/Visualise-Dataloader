const step8 = `
We've deferred batchLoad() till the micro-task queue (and subsequently, the nextTick queue), and are free to round up any 
other loads taking place inside the \`Main.js\` execution context. That means we can process the .load() from line 18,
which involves the exact same process we just walked through, with one minor difference. On our second (and any subsequent loads),
after pushing our second key (47) to the promise queue, line 92 of DataLoader will return false as the this._queue.length 
(length of the Promise Queue) is now 2, meaning we won't accidently schedule another dispatch of our batchLoad function,
which is already handling the DB query for all of our keys. 

Rather than walk through the .load() process again, we'll assume we execute .load(47), which adds the pending promise representing
key 47's data to the promise cache, adds {key: 47, resolve(), reject} to the Promise Queue, and returns a pending promise
to const attendee1.

Now we have no more functions to process in Main.js, so Node will start processing the micro-task queue, where we'll 
eventually find batchLoad().`;

export default step8;
