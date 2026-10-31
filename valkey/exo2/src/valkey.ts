import { GlideClient } from "@valkey/valkey-glide";

const valkey = await GlideClient.createClient({
  addresses: [
    {
      host: process.env.VALKEY_HOST!,
      port: 6379,
    },
  ],
});

await valkey.xadd("stream:events", [
  ["type", "product.updated"],
  ["productId", "product:1"],
]);

await valkey.xadd("stream:events", [
  ["type", "product.updated"],
  ["productId", "product:2"],
]);

const result = await valkey.xread({
  "stream:events": "0-0",
});

console.log(result);
