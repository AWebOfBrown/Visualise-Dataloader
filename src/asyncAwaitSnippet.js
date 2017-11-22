// Don't do this, 4 won't run until 3 resolves meaning you won't do any batching:
const noBatching = async () => {
  const user3 = await userLoader.load(3);
  const user4 = await userLoader.load(4);
};

//You need:
const batching = async () => {
  const [user3, user4] = await Promise.all([
    userLoader.load(3),
    userLoader.load(4)
  ]);
};

//which DataLoader provides a utility for:
const bestBatching = async () => {
  const [user3, user4] = await userLoader.loadMany([3, 4]);
};
