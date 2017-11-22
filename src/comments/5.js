const step6 = `Okay, so we've finally called \`.load()\` at line 16 of Main.js.

The .load() method kicks off both our caching and batching statergies. Let's first explore how .load() interacts with DataLoader's caching functionality.

Because we haven't previously loaded any keys, and therefore haven't cached anything, DataLoader creates a new Promise representing our key (line 85), and then does multiple things with it:

1. It creates an object of shape \`{key, resolve, reject}\` and adds it to our promise queue* (line 87), which is the list of keys to send to the database in our batchload function. 

2. Enqueus a job to dispatch said promise queue, meaning execution of the batchLoad function is delayed till after the current execution context (I'll elaborate on this in the next section). This occurs provided that batching is not set to false in the config object, in which case our batchLoad() function is called immediately (line 98).

3. Caches the key in its current state as a pending promise (line 105).

4. Returns the pending promise to the variable (let attendee0) executing the \`.load\` function call (line 108). 

*Why is it called a 'promise queue' despite simply being an array? The dispatch function (\`dispatchQueue()\` at line 211) checks to see if we specified a maxBatchSize in our config object. If we did, it'll loop through our promise queue in chunks, scheduling a dispatch of the batchLoad function with one [slice](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice) of our promise queue array (length <= maxBatchSize) at a time. This occurs at line 219. Because we didn't specify a config object, all our keys get sent in one batchLoad function by default.

We provide each key's resolve/reject method along with the key to our 'promise queue' because it allows us to resolve or reject our pending promise once values are returned from the execution of our batchLoad function. 

At line 231, part of DataLoader's \`dispatchQueueBatch()\` method, DataLoader is taking our promise queue, extracting just the {key} of {key, resolve, reject} pairs into a new array and then passing this array as the only argument to the batchLoad function we provided in UserLoader.js at line 8. 

Each promise's \`resolve\` and \`reject\` sit in the \`queue\` while batchLoad() occurs, which explains why we need to ensure the order of the values returned from batchLoad match the queue's keys (as we did at line 15 of UserLoader.js) - they need to match with the correct resolve/reject pair.
If they didn't, DataLoader would resolve/reject based on the wrong value for each key, while looping through them at line 281.  
## Next up:
Notice that before we actually return the promise to wherever we called \`.load()\` from, we enqueue dispatching of our batch loading function (at line 95 of Dataloader). Let's follow that function and have a chat about all the batching / queuing shennanigans.`;

export default step6;
