const step14 = `We first load the invitee of user 49, and as it turns out, they were invited by our previously loaded
user 47, so the value for their profile is still cached. This means we don't need to make any network requests.

When we call .load(), we reach line 77 which checks if we are caching, and then checks the cache for the key.
In this case it will find ID 49 in the cache and return that value. 
`;

export default step14;
