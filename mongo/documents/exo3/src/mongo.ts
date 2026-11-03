import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL!);

await client.connect();

const products = client.db("marketplace").collection("products");

const filter = { name: "Laptop Pro 14" };

const before = await products.findOne(filter);
console.log("avant", before);

const result = await products.updateOne(filter, {
  $set: {
    "stock.quantity": 8,
  },
});

console.log(result.modifiedCount);

const after = await products.findOne(filter);
console.log("apres", after);

await client.close();
