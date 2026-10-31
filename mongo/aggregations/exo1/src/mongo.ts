import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL!);

await client.connect();

const commands = client.db("marketplace").collection("commands");

const result = await commands
  .aggregate([
    {
      $match: {
        status: "paid",
        createdAt: { $gte: new Date("2026-09-01") },
      },
    },
    {
      $project: {
        _id: 0,
        commandId: { $toString: "$_id" },
        customerId: "$customer.id",
        linesCount: { $size: "$lines" },
      },
    },
  ])
  .toArray();

console.log(result);

await client.close();
