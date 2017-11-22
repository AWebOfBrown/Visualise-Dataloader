const step3 = `Next we require our \`UserLoader.js\` file, where we instantiate a new DataLoader with a batch loading function. Click the \`UserLoader.js\` tab!

## The batchLoad function 
When it comes to actually **using** DataLoader, all you really need to do is provide the batchLoad function.
The batchLoad function is the first argument, of two, accepted by DataLoader's constructor function (the second is an optional config object).

The batchLoad function is just the generic query that you would ordinarily use to load multiple documents, by their IDs, from your database. In our case, the function begins on line 9 of \`UserLoader.js\`. Keep in mind that we're not actually executing the query in \`UserLoader.js\`, it's simply setting up the \`UserLoader\` for calls to \`.load()\` which is where the magic starts happening (which we'll cover in the next section). 

To put the batch loading function in context: over the course of one execution context, everytime we call \`UserLoader.load(\${key})\`, that key will get added to the \`userIds\` array. This means we can batch load keys that are loaded from numerous locations across our app.

There are examples of such generic queries, which we pass our array to, for [CouchDB, Knex, Redis, RethinkDB, SQLite3](https://github.com/facebook/dataloader/tree/master/examples) in Dataloader's repo.

The docs describe batchLoad as follows:
>A batch loading function accepts an Array of keys, and returns a Promise which resolves to an Array of values*

>The Array of values must be the same length as the Array of keys.

>Each index in the Array of values must correspond to the same index in the Array of keys.

To clarify this second condition: we need to make sure our database hasn't mudled up the order when returning values. More literally: if we send our batchLoad function to Postgres with userIds equivelant to [49, 32, 15, 28], and we receive from postgres an array: 
\`\`\`
[  
  {userId: 15, ...otherProperties}, 
  {userId: 28, ...otherProperties}, 
  {userId: 49, ...otherProperties}, 
  {userId: 32, ...otherProperties}
]
\`\`\`
we would need to re-arrange this array of objects so that they match the userId array's order.

To do so, we simply map the array of values that returns from the batch load function to the array of keys we provided earlier. This ensures that for each key, we return the value with the corresponding key's id (line 15 of UserLoader.js). I'll explain why this matters further on. 

In the next section, we'll get our hands dirty with DataLoader source code, and explain what \`.load()\` actually does.

## Quick note on query formatting
Remember to check whether your database / ORM etc. is vulnerable to un-escaped queries!

### Constructing dynamic queries using template literals with pg-promise may be [inviting trouble, as template literals will circumvent pg-promise's formatting engine](https://github.com/vitaly-t/pg-promise/wiki/Common-Mistakes#user-content-invalid-query-formatting-with-manual-string-concatenation-and-es6-template-strings).

This isn't a problem in our current example as we're only adding integer keys, supplied from our database, to our query. Constructing a more dynamic query, accomodating user input, would require a lot more care. 

On the other hand, an ORM like Knex is generally safe outside of using \`knex.raw()\`.`;

export default step3;
