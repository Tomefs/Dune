import { MongoClient } from "mongodb";

const uri = "mongodb://localhost:6001";
const client = new MongoClient(uri);

async function insertForms() {
  try {
    await client.connect();
    const db = client.db("data");
    const collection = db.collection("myCollection");

    const loginForm = {
      key: "login",
      html: `
        <div id="login-page" class="page">
          <h2>Login</h2>
          <form id="login-form">
            <input type="text" id="login-username" placeholder="Username" required>
            <input type="password" id="login-password" placeholder="Password" required>
            <button type="submit" class="submit">Login</button>
          </form>
          <p>Don't have an account? <a href="#" id="to-register">Sign up</a></p>
        </div>
      `,
    };

    const registerForm = {
      key: "register",
      html: `
        <div id="register-page" class="page hidden">
          <h2>Sign up</h2>
          <form id="register-form">
            <input type="text" id="register-username" placeholder="Username" required>
            <input type="password" id="register-password" placeholder="Password" required>
            <button type="submit" class="submit">Sign up</button>
          </form>
          <p>Already have an account? <a href="#" id="to-login">Log in</a></p>
        </div>
      `,
    };

    await collection.insertMany([loginForm, registerForm]);
    console.log("Forms inserted successfully");
  } catch (err) {
    console.error("Error inserting forms:", err);
  } finally {
    await client.close();
  }
}

insertForms().catch(console.error);