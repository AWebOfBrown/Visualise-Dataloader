const step9 = `To recap: Node has finished processing our \`Main.js\` script now. The only thing it hasn't 
processed is lines 17 and 19, as they depend on the resolution of lines 16 and 18.  

So now that we've executed all our loads, our cache is full of pending promises. 
Our userLoader, being an instance of DataLoader, has an internal promiseQueue full of keys 
(with their respective resolve/reject methods). 

Node will now skip over an empty nextTick queue, into the micro-task queue which holds our promise-job,
pull it onto the stack and execute.

What we are executing is: \`() => process.nextTick(dispatchQueue(this)))\`.
Which means Node puts a task on the process.nextTick queue, and since there are no more promise jobs,
it jumps back to it to flush it. On we go to the nextTick queue.
`;

export default step9;
