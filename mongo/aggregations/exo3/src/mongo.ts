import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL!);

await client.connect();

const commands = client.db("marketplace").collection("commands");

const result = await commands
  .aggregate([
    { $match: { status: "paid" } },
    { $unwind: "$lines" },
    {
      $group: {
        _id: "$lines.productId",
        totalQuantity: { $sum: "$lines.quantity" },
      },
    },
    { $sort: { totalQuantity: -1 } },
    { $limit: 5 },
  ])
  .toArray();

console.log(result);

await client.close();
