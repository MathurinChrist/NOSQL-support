import { GlideClient } from "@valkey/valkey-glide";

const valkey = await GlideClient.createClient({
  addresses: [{
    host: process.env.VALKEY_HOST!,
    port: 6379,
  }],
});