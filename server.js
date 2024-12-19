import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient } from "mongodb";

const app = express();
const PORT = 3002;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());

const uri = "mongodb://localhost:6001";
const client = new MongoClient(uri);

async function connectToDatabase() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

connectToDatabase();

const frontendDir = path.join(__dirname, "public");
app.use(express.static(frontendDir));

app.get("/getData/:key", async (message, response) => {
  try {
    const key = message.params.key;
    console.log(`Fetching data for key: ${key}`);

    const db = client.db("data");
    const collection = db.collection("myCollection");
    const data = await collection.findOne({ key });

    if (!data) {
      console.log(`Data not found for key: ${key}`);
      return response.status(404).send("Data not found");
    }

    console.log(`Data found: ${JSON.stringify(data)}`);
    response.json(data);
  } catch (error) {
    console.error("Error fetching data:", error);
    response.status(500).send("Server error");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});