export const Main = `// Note: you can scroll this code down/sideways if needed.
const userLoader = require("./userLoader")

const event = {
  id: 99213,
  attendees: [
    { name: "James", userId: 49 },
    { name: "Alicia", userId: 47 },
  ],
  creator: { name: "Alfie", userId: 83 }
};

// In practice we load these profiles dynamically 
// by reducing attendees to an array of userIds and calling loader.loadMany()
// with the array of keys (userIds), but we'll load one-by-one to better illustrate batching
let attendee0 = userLoader.load(event.attendees[0].userId)
let invitedAttendee0 = attendee0.then(user => userLoader.load(user.events[event.id].invitedById) // invited by userId 47
let attendee1 = userLoader.load(event.attendees[1].userId)
let invitedAttendee1 = attendee1.then(user => userLoader.load(user.events[event.id].invitedById) // invited by userId 83
`;
