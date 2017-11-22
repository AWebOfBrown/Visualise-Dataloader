let queue = [];

let prom = null;

const load = key => {
  queue.push(key);
  if (!prom) {
    prom = Promise.resolve();
    prom.then(() => {
      console.log(`dispatch queue with keys ${queue}`);
      process.nextTick(() => {
        console.log(`dispatch queue with keys ${queue}`);
      });
    });
  }
};

let op1 = async () => {
  let key1 = await load("key1");
  let key3 = await load("key3");
  let key5 = await load("key5");
};

let op2 = async () => {
  let key2 = await load("key2");
  let key4 = await load("key4");
  let key6 = await load("key6");
};

Promise.all([op1(), op2()]);
