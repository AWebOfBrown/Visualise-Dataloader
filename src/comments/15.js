const step15 = `
For the invitee of user 47, the whole .load() process starts over - which we won't walk through again. However, notice
that because dispatchQueue is delayed till nextTick, we can deal with both calls to .load(), even though they are
separate promise resolutions, within one dispatch if the first key wasn't cached.

## Summing Up

This completes our look at how batching and caching work in DataLoader. Hopefully this will be of use to you,
 particularly if you are looking at picking up GraphQL! 
 
 For some information about what was used to put this demo together, hit the "About" tab up top.`;

export default step15;
