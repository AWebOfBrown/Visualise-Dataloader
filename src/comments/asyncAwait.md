#Async / Await with DataLoader

One source of confusion, that seems to trip up even experienced developers, is the assumption that async/await is merely syntatic sugar for promises. While this interpretation isn't far from accurate, it's not quite so.  

Notice that I've added a fourth code tab to the editor, click it and observe the two very simple DataLoader examples. How do they differ?

Crucially, async/await allows us to yield function execution until the settlement of a promise, which native promises alone cannot do. Therefore, async/await is better thought of as sugar for generators yielding promises. 

In the promise example, our loader will correctly batch both calls because execution will not pause after the first load. This means that the first load will add a key to our loader's promise queue during the I/O phase of the event loop, and the second will be added in the micro-task queue as discussed previously.

In the async/await example, the use of `await` means that execution of the *async* function is paused, meaning that the event loop continues on (as does processing of code outside the async function), but we can't resume the async function to load the second key until the first load has returned a settled promise (therefore no batching). 

It's also worth noting that the second `await` is not a callback to a settled promise (ie a Promise Job), as it is not called in the first promises' `.then()`.  

So how do we do multiple loads at once with async/await? The same way you'd execute parallel promises normally: by using Promise.all(), albeit DataLoader provides the utility function `.loadMany(keys)` to save you some typing. loadMany allows you to pass in just the keys you want to load, and then internally calls `Promise.all(keys.map(key => this.load(key)))` for you. 

Remember that because `await` only yields execution of its enclosing async function, we can still concurrently load across multiple functions calling `.load()` (or rather, across our execution context). 
