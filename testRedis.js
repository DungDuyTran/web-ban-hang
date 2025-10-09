import Redis from "ioredis";

const redis = new Redis(); // mặc định: localhost:6379

async function testRedis() {
  await redis.set("hello", "world");
  const value = await redis.get("hello");
  console.log("Kết quả từ Redis:", value);
  redis.disconnect();
}

testRedis();

//node testRedis.js
