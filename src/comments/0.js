const step0 = `This visualisation provides an under-the-hood look at what occurs
when DataLoader is used to batch / cache database queries.
It is based on, and
supplements, the already excellent commentary in DataLoader's source code, as
well as Lee Byron's insightful [source-code walkthrough](https://youtu.be/OQTnXNCDywA).

You should read the [DataLoader](https://github.com/facebook/dataloader) ReadMe prior to
going through this demo.

## Q. What is the purpose of this walkthrough?

To understand DataLoader, you need a high-level understanding of V8. What I found when working through numerous guides on the event loop, and v8 internals generally, is that almost every guide
will (as a matter of necessity) have a degree of assumed knowledge. These pieces of assumed knowledge can be the largest barriers standing in the way of understanding the big picture.

In this tutorial, I try to provide a brief overview of any concept that might get in the way of your understanding. I will link to resources that cover anything I can't comprehensively cover here.

 There is of course a degree of assumed knowledge - that of a developer who has use for DataLoader in the first place. You therefore should have some brief experience writing a basic Node app that communicates with a database. Hopefully this does not set the bar too high to understand the following walkthrough.

 I hope you enjoy it!

## How to interact with this demo
* Step through with the arrows in the header.

* You can change code tabs by clicking/tapping them. The code is not editable.

* You can click/tap a frame of execution (or task) to be taken to the relevant code tab if it isn't currently active.
* The code block will scroll when a frame/task is clicked if the relevant function is not currently visible. The relevant function will also blink.

* You can right click (long press) a frame/task to be taken to it's call-site (except frame 1 - its initiated from the command line), left click to return to it.

## What is DataLoader?
DataLoader allows you to batch all the queries you'd
otherwise individually send to your database, occuring across one execution context, into one query.

### If you're unclear on what a 'stack', 'heap', or execution context, read the following:
[article by Franziska Hinkelmann](https://medium.com/fhinkel/confused-about-stack-and-heap-2cf3e6adb771).

It also allows
you to cache these requests meaning that:
* two queries for the same data in one context are deduplicated.
* queries for the same data occuring in subsequent execution contexts can be returned from the cache with no network requests.

The caching  functionality is often used on a per-request basis, as requests may have varying permissions depending on the end-user and their login status.

Lastly, being a generic utility, the use of DataLoader is not tied to the use of any particular type of database.

## The code
In Main.js I'm expanding on the example code found in the DataLoader ReadMe. Assume that we want to display an event's list of attendees (profile picture, name etc), and then fetch the same data for the person who invited each attendee. At line 4, \`const event\` represents the initial information about the event returned from the database.

### Note: Obviously this code doesn't represent a feature-complete back-end application, but it should suffice to demonstrate DataLoader. You could easily get this code working by creating a database connection to an SQL DB, and then seeding some data.

If we weren't using a caching/batching solution such as DataLoader, we would find ourselves issueing one SQL request per \`.load()\` call, totalling four requests. By batching requests, we bring this down to two queries (one for ids 49/47, one for ids 47/83) and with caching the second query only needs to load one key (83 and not 47).

Hit the arrow in this section's header to continue.`;

export default step0;
