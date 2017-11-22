const step2 = `\`Main.js\` constitutes our first frame of execution. Each time we run into a function within this module,
another frame of execution is added to the stack and gets processed.

One small caveat; if the function to be processed is asynchronous, the frame of execution simply registers an event handler to handle the resulting data (e.g. network request, I/O) from the function when it eventually returns. When the data returns, it will be added as a task to the global task queue, to be handled on the stack once it is empty.  

 As you can probably guess, the next frame of execution will be line 2, where we require the UserLoader module. 

We won't add every frame of execution that arises from \`UserLoader.js\` for expedience sake, rather we'll explain setting up our UserLoader (instance of DataLoader) then pop this frame off the stack.`;

export default step2;
