const step9 = `So now that we've executed all our loads, our cache is full of pending promises. Our userLoader, being an instance of DataLoader, has an internal promiseQueue full of keys (with their respective resolve/reject methods). 

Having finished processing code in the current phase of the event loop, we jump into the nextTick queue, which is empty until we process our promise-job. With that said, we process the first job on the micro-task queue, which is:
\`process.nextTick(() => dispatchQueue())\`, because dispatchQueue is the sole argument that was passed to enqueuePostPromiseJob.`;

export default step9;
