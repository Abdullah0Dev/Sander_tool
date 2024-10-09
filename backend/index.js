const express = require("express");
const axios = require("axios"); 
const dotenv = require("dotenv");
const cors = require("cors");
const { IgApiClient } = require("instagram-private-api");

dotenv.config();
const app = express();

// Use CORS
app.use(cors());
app.use(express.json()); // For parsing application/json
 

// Login to Instagram before handling requests
const ig = new IgApiClient();

// Function to log in to Instagram
const loginToInstagram = async (username, password) => {
  ig.state.generateDevice(username);
  try {
    await ig.account.login(username, password);
    console.log("Logged into Instagram successfully.");
  } catch (error) {
    throw new Error(`Failed to log in: ${error.message}`);
  }
};
 

// Endpoint to get user data
app.get("/user-info", async (req, res) => {
  // Instagram login credentials - you can use it...
  const username = "webmind1s"; // Replace with your Instagram username
  const password = "asdf2qwrASDF234@@#$@$@!$"; // Replace with your Instagram password

  // Login to Instagram
  try {
    await loginToInstagram(username, password);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }

  // Fetch user data
  try {
    const nickname = "simply_sander";
    const userId = await ig.user.getIdByUsername(nickname);

    // const userId = "61933666476"; // Example user ID; replace with dynamic input if needed

    // Use the ig.user method to get user info
    const userInfo = await ig.user.info(userId);

    // Send the user info as a response
    res.json(userInfo);
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).send("Error fetching user data");
  }
});

// Route to fetch user profile info via Instagram Graph API - access token problem, or something related!!! -> doesn't work
app.get("/profile/:username", async (req, res) => {
  const { username } = req.params;
  const accessToken = process.env.ACCESS_TOKEN;

  try {
    const response = await axios.get(
      `https://graph.instagram.com/${username}?fields=id,username,followers_count,bio,media_count&access_token=${accessToken}`
    );
    res.json(response.data);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).send("Error fetching user profile");
  }
});

// Route for Instagram OAuth Authentication
app.get("/auth", (req, res) => {
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
  res.redirect(authUrl);
});

app.get("/auth/callback", async (req, res) => {
  const { code } = req.query;
  try {
    const response = await axios.post(
      "https://api.instagram.com/oauth/access_token",
      {
        client_id: process.env.INSTAGRAM_CLIENT_ID,
        client_secret: process.env.INSTAGRAM_CLIENT_SECRET,
        grant_type: "authorization_code",
        redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,
        code,
      }
    );

    const { access_token } = response.data;
    res.send(`Access Token: ${access_token}`);
  } catch (error) {
    console.error("Error during authentication:", error);
    res.status(500).send("Error during authentication");
  }
});

// Start the server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
