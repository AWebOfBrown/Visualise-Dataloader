const step12 = `
If the network request to our database fails, DataLoader will clear the keys from its cache (line 301) and reject the promises. 
This is done so that future requests for those keys don't return an error indicating that the database holds no data 
for those keys, when the issue is, for instance, a network issue.   

Assuming our request returns succesfully, our batchLoad function will match up each set of data with it's resolve / reject 
method based on its key, as we wrote at line 15 of UserLoader.js. 

This array is then iterated through at line 281 of DataLoader, resolving and rejecting the promises as required.
The locations in our code referencing these promises (stored on the V8 Heap) will be updated, as will DataLoader's
cache referencing the same Promise objects on the heap.

Note that I'm skipping over some stack frames to avoid tediousness. 

`;

export default step12;
