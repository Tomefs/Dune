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
        <div class="login-page">
          <h2>Login</h2>
          <form id="login-form">
            <input type="text" id="login-username" placeholder="Username" required>
            <input type="password" id="login-password" placeholder="Password" required>
            <button type="submit" class="submit">Login</button>
          </form>
          <p>Don't have an account? <button class="switch-form" data-target="register">register</button></p>
        </div>
      `,
    };

    const registerForm = {
      key: "register",
      html: `
        <div class="register-page">
          <h2>Sign up</h2>
          <form id="register-form">
            <input type="text" id="register-username" placeholder="Username" required>
            <input type="password" id="register-password" placeholder="Password" required>
            <button type="submit" class="submit">Sign up</button>
          </form>
          <p>Already have an account? <button class="switch-form" data-target="login">login</button></p>
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