const express = require("express");
const path = require("path");
const InstagramAPI = require("./instagram");
const dotenv = require("dotenv");
dotenv.config();

const app = express();
const port = 3000;

// Set EJS as the template engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// // Route for the homepage
// app.get('/', async (req, res) => {
//     const accessToken =   `EAAGSGUNYC88BO8DsI3eToY243F9NVOsu87ZBmeVNcZAHpmLtZCiBbvdhaXOZC7AgtEPsyZCxziZAvyuXJQZCeQCVBVC9XQXMSDuXsnieaYwBHQIj6XZAxAaDZB52bVLLqgSVabZALs7nMn4i6ZAzXYInTQZBZCzoe8MU4ZCjFU5YW2ZCYgySBZBvDbFeuOnC5IFUk9uA3SPLe8J087bAt0fDYFqD2vTMk7HMCi4qipTf9aejL6E0FOHZCwBiPlO5oBMrExHbJJAZDZD` // Placeholder
//     const userId = 'webmind1s'; // Placeholder

//     const ig = new InstagramAPI({
//         getCode: req.query.code || '',
//         accessToken,
//         userId
//     });

//     if (ig.hasUserAccessToken) {
//         const user = await ig.getUser();
//         const highlightedPostId = '17841405793187218'; // Set your media ID here
//         const media = await ig.getMedia(highlightedPostId);
//         const mediaChildren = await ig.getMediaChildren(highlightedPostId);

//         return res.render('index', { user, media, mediaChildren });
//     } else {
//         return res.redirect(ig.getAuthorizationUrl());

//     }
// });

app.get("/auth", (req, res) => {
  const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
  console.log('Auth URL:', authUrl); // Log the URL to verify

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
    console.log(access_token);
  } catch (error) {
    res.status(500).send("Error during authentication");
  }
});

app.get('/user', async (req, res) => {

  const { access_token } = req.query; // Use the access token obtained earlier
  
  try {
  
  const response = await axios.get(`https://graph.instagram.com/me?fields=id,username&access_token=${access_token}`);
  
  res.json(response.data);
  
  } catch (error) {
  
  res.status(500).send('Error fetching user data');
  
  }
  
  });

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/auth`);
});
