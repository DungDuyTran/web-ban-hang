import Redis from "ioredis";

const redis = new Redis({
  host: "127.0.0.1",
  port: 6379,
});

export default redis;

// import Redis from "ioredis";

// const redis = new Redis({
//   host: "redis-16032.crce185.ap-seast-1-1.ec2.redns.redis-cloud.com",
//   port: 16032,
//   username: "default",
//   password: "QOIBJa2Q9BmyC5A0FaybDlloDPvp0tkz",
//   // tls: {
//   //   rejectUnauthorized: false,
//   // }, // Redis Cloud yêu cầu TLS (https secure)
// });

// redis.on("connect", () => console.log("✅ Redis connected successfully!"));
// redis.on("error", (err) => console.error("❌ Redis error:", err));

// export default redis;
