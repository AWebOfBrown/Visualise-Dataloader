const step11 = `
At line 232 DataLoader pulls off the keys from our promiseQueue to send to the database.
It sets up a reference to the batchLoad function we provided it at line 235, and then calls that 
function with our keys at 236.

After checking for errors which would result if we didn't provide a function to our loader, DataLoader
awaits the data returned from querying our database with the provided keys. 

Note that in terms of Node's event loop, we return to the polling phase whilst waiting to get a response from 
the database, and as such the current frames are taken off the stack and Node is free to process something else (or continue polling)
in the meantime.

In the next section we'll assume the network request came back, queued in the I/O phase of the event loop (global task queue),
and is being executed 
`;

export default step11;
