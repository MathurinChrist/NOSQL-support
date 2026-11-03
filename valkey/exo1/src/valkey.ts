import { GlideClient, type PubSubMsg } from "@valkey/valkey-glide";

function asText(value: PubSubMsg["message"]): string {
  return typeof value === "string" ? value : Buffer.from(value).toString();
}

const subscriber = await GlideClient.createClient({
  addresses: [
    {
      host: process.env.VALKEY_HOST!,
      port: 6379,
    },
  ],
  pubsubSubscriptions: {
    channelsAndPatterns: {},
    callback: (message: PubSubMsg) => {
      console.log(asText(message.channel));
      console.log(asText(message.message));
    },
    context: null,
  },
});

await subscriber.subscribe(new Set(["notifications"]), 5000);

const publisher = await GlideClient.createClient({
  addresses: [
    {
      host: process.env.VALKEY_HOST!,
      port: 6379,
    },
  ],
});

await publisher.publish("hello", "notifications");
