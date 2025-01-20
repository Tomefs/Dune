import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { MongoClient } from "mongodb";

const app = express();
const PORT = 3000;

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

app.post("/register", async (message, response) => {
  const { username, password } = message.body;

  const db = client.db("data");
  const collection = db.collection("users");

  const existingUser = await collection.findOne({ username });
  if (existingUser) {
    return response.status(400).send("User already exists");
  }

  await collection.insertOne({ username, password });
  response.status(201).send("User registered successfully");
});

app.post("/login", async (message, response) => {
  const { username, password } = message.body;

  const db = client.db("data");
  const collection = db.collection("users");

  const user = await collection.findOne({ username });
  if (!user || user.password !== password) {
    return response.status(400).send("Invalid username or password");
  }

  response.status(200).send("Login successful");
});

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

app.get("/login", (message, response) => {
  response.sendFile(path.join(frontendDir, "login.html"));
});

app.get("/register", (message, response) => {
  response.sendFile(path.join(frontendDir, "register.html"));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

