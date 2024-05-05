import { MongoClient, ServerApiVersion } from "mongodb";

const URI = process.env.MONGODB_URI || "";
const client = new MongoClient(URI, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

try {
  //Connect the Client to the Server
  await client.connect();
  await client.db("admin").command({ ping: 1 });
  console.log("Pinged your deployment. You successfully connected to MongoDB!");
} catch (error) {
  console.log(error);
}

let db = client.db("employees");

export default db;