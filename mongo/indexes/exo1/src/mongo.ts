import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGO_URL!);

await client.connect();

const products = client.db("marketplace").collection("products");

await products.createIndex({ "categories.id": 1 });

const result = await products
  .find({
    "categories.id": "accessories",
  })
  .toArray();

console.log(result);

const plan = await products
  .find({
    "categories.id": "accessories",
  })
  .hint({ "categories.id": 1 })
  .explain("executionStats");

console.log(plan.queryPlanner?.winningPlan);
console.log({
  stage: plan.executionStats?.executionStages?.stage,
  inputStage: plan.executionStats?.executionStages?.inputStage?.stage,
  nReturned: plan.executionStats?.nReturned,
  totalKeysExamined: plan.executionStats?.totalKeysExamined,
  totalDocsExamined: plan.executionStats?.totalDocsExamined,
});

await client.close();
