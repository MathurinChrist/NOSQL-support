import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL!);

await client.connect();

const products = client.db("marketplace").collection("products");

const result = await products
  .find({
    "categories.id": "accessories",
    "stock.quantity": { $gte: 20 },
  })
  .toArray();

console.log(result);

await client.close();
