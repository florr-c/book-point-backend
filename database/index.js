const { MongoClient, ServerApiVersion } = require("mongodb");

const uri = process.env.DB_URL;

const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

async function connectDb() {
  try {
    await client.connect();
    return client.db("book-point");
  } catch (error) {
    console.log(error);
  }
}

module.exports = {
  connectDb,
};
