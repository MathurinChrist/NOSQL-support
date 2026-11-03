import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL!);

await client.connect();

const products = client.db("marketplace").collection("products");

const result = await products
  .find({
    variants: {
      $elemMatch: {
        price: { $lt: 1600 },
        stock: { $gt: 0 },
      },
    },
  })
  .toArray();

console.log(result);

await client.close();
