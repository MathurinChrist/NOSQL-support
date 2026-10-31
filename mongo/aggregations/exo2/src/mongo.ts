import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL!);

await client.connect();

const commands = client.db("marketplace").collection("commands");

const result = await commands
  .aggregate([
    { $match: { status: "paid" } },
    { $unwind: "$lines" },
    {
      $project: {
        categoryId: "$lines.categoryId",
        lineTotal: {
          $multiply: ["$lines.quantity", "$lines.unitPrice"],
        },
      },
    },
    {
      $group: {
        _id: "$categoryId",
        revenue: { $sum: "$lineTotal" },
      },
    },
  ])
  .toArray();

console.log(result);

await client.close();
