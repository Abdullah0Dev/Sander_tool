// const express = require("express");
// const path = require("path");
// const dotenv = require("dotenv");
// const axios = require("axios");
// const cors = require("cors"); // Import cors
// const cheerio = require("cheerio");
// const { IgApiClient } = require("instagram-private-api");

// dotenv.config();
// const app = express();

// (async () => {
//   const ig = new IgApiClient();
//   // Instagram login credentials
//   const username = "webmind1s"; // Replace with your Instagram username
//   const password = "asdf2qwrASDF234@@#$@$@!$"; // Replace with your Instagram password

//   // Perform Instagram login
//   ig.state.generateDevice(username); // Set up the device for the session

//   try {
//     await ig.account.login(username, password);
//     console.log("Logged into Instagram successfully.");
//   } catch (error) {
//     console.error("Failed to log in:", error.message);
//     return;
//   }

//   // Search for a user
//   const query = "webmind1s"; // Replace with the username to search
//   let userId;

//   try {
//     const searchResults = await ig.user.searchExact(query); // Exact search by username
//     userId = searchResults.pk; // Get the user ID
//     console.log("Found user:", searchResults.username);
//   } catch (error) {
//     console.error("Error during user search:", error.message);
//     return;
//   }

//   // Get suggested users based on the found user
//   try {
//     const suggestedUsers = await ig.friendship.bestiesSuggestions(userId);

//     // Display suggested users
//     suggestedUsers.users.forEach((user) => {
//       console.log(`Suggested User: ${user.username}`);
//       console.log(`Full Name: ${user.full_name}`);
//       console.log(`Profile Picture: ${user.profile_pic_url}`);
//       console.log(`Is Verified: ${user.is_verified}`);
//     });
//   } catch (error) {
//     console.error("Failed to fetch suggested users:", error.message);
//   }
// })();

// // Use cors middleware
// app.use(cors());
// const accessToken =
//   "IGQWROdHd2VUFjbnBCc1NNdGVTVTVfeHBIc01CV2l4Um4xMWYxSnA0a2ZAQanhLekhjMGc4U21ZAYWZAxU0RxNUREQXZA6SDl2dlMzSDJNUUxPTFBWYVBBaXRTSlFnbmpaRk4tOEdVRVRUeTJGU1UwNk9uaDVFY2lNbXcZD"; // Add your access token here.

// // Fetch user profile
// const getUserProfile = async (username) => {
//   try {
//     const response = await axios.get(
//       `https://graph.instagram.com/${username}?fields=id,username,followers_count,bio,media_count&access_token=${accessToken}`,
//       {
//         headers: {
//           "User-Agent":
//             "Instagram 76.0.0.15.395 Android (24/7.0; 640dpi; 1440x2560; samsung; SM-G930F; herolte; samsungexynos8890; en_US; 138226743)",
//           "Content-Type": "application/json; charset=utf-8",
//         },
//       }
//     );
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching user profile:", error);
//     return null;
//   }
// };

// // Sample endpoint to get profile data
// app.get("/user/:username", async (req, res) => {
//   const { username } = req.params;
//   const profile = await getUserProfile(username);
//   if (profile) {
//     res.json(profile);
//   } else {
//     res.status(404).send("User not found");
//   }
// });

// app.listen(3000, () => {
//   console.log("Server running on port 3000");
// });

// // Set EJS as the template engine 
// // Instagram 146.0.0.27.125 (iPhone12,1; iOS 13_3; en_US; en-US;scale=2.00; 1656x3584; 190542906
// app.get("/profile-info", async (req, res) => {
//   const url =
//     "http://i.instagram.com/api/v1/users/web_profile_info/?username=webmind1s";
//   try {
//     const response = await axios.get(url, {
//       headers: {
//         "User-Agent":
//           "Instagram 76.0.0.15.395 Android (24/7.0; 640dpi; 1440x2560; samsung; SM-G930F; herolte; samsungexynos8890; en_US; 138226743)",
//         Origin: "https://www.instagram.com",
//         Referer: " https://www.instagram.com/",
//         "Content-Type": "application/json; charset=utf-8",
//       },
//     });

//     // Return the JSON data if the request was successful
//     return res.json(response.data);
//   } catch (error) {
//     // Log the error response if it exists
//     console.error(
//       "Error fetching profile info:",
//       error.response ? error.response.data : error.message
//     );
//     return res.status(500).send("Error fetching profile information");
//   }
// });
// app.use(
//   cors({
//     origin: "http://localhost:5173", // Only allow your frontend
//   })
// );
// const instagram_token = process.env.ACCESS_TOKEN;
// const instagramURL = `https://graph.instagram.com/me?fields=id,username&access_token=${process.env.ACCESS_TOKEN}`;
// // basic display:
// app.get("/auth", (req, res) => {
//   const authUrl = `https://api.instagram.com/oauth/authorize?client_id=${process.env.INSTAGRAM_CLIENT_ID}&redirect_uri=${process.env.INSTAGRAM_REDIRECT_URI}&scope=user_profile,user_media&response_type=code`;
//   console.log("Auth URL:", authUrl); // Log the URL to verify

//   res.redirect(authUrl);
// });

// app.get("/auth/callback", async (req, res) => {
//   const { code } = req.query;

//   try {
//     const response = await axios.post(
//       "https://api.instagram.com/oauth/access_token",
//       {
//         client_id: process.env.INSTAGRAM_CLIENT_ID,

//         client_secret: process.env.INSTAGRAM_CLIENT_SECRET,

//         grant_type: "authorization_code",

//         redirect_uri: process.env.INSTAGRAM_REDIRECT_URI,

//         code,
//       }
//     );

//     const { access_token } = response.data;

//     res.send(`Access Token: ${access_token}`);
//     console.log(access_token);
//   } catch (error) {
//     res.status(500).send("Error during authentication");
//   }
// });
// // graph.facebook.com

// // app.get("/user", async (req, res) => {
// //   try {
// //     const responseTest = await axios.get(
// //       // `https://graph.instagram.com/me?fields=id,username,followers_count,follows_count&access_token=${instagram_token}`);
// //       // https://www.instagram.com/graphql/query/?query_hash=7c16654f22c819fb63d1183034a5162f&variables={"id":"webmind1s","first":10}

// //       `https://www.instagram.com/graphql/query/?query_hash=7c16654f22c819fb63d1183034a5162f&variables={"id":"210412485","first":10}`);

// //     res.json(responseTest.data);
// //     console.log(responseTest.data);
// //   } catch (error) {
// //     res.status(500).send("Error fetching user data");
// //     console.log(error);

// //   }
// // });

// // https://www.instagram.com/graphql/query/?query_hash=7c16654f22c819fb63d1183034a5162f&variables={"user_id":"811172706","first":10}

// async function getSimilarAccounts(username) {
//   try {
//     const url = `https://www.instagram.com/${username}/`;
//     const { data } = await axios.get(url);

//     const $ = cheerio.load(data);
//     const similarAccounts = [];

//     // Note: The following selector may change based on Instagram's structure
//     // Inspect the page to find the correct path for similar accounts
//     $('a[href^="/"]').each((index, element) => {
//       const account = $(element).attr("href");
//       if (account && !account.includes(username)) {
//         similarAccounts.push(account.replace("/", ""));
//       }
//     });

//     // Remove duplicates and limit results
//     const uniqueAccounts = [...new Set(similarAccounts)].slice(0, 10);
//     return uniqueAccounts;
//   } catch (error) {
//     console.error("Error fetching data:", error);
//   }
// }

// // Example usage
// const username = "adidas";
// getSimilarAccounts(username).then((accounts) => {
//   console.log("Similar accounts:", accounts);
// });

// const PORT = process.env.PORT || 4000; // Use '||' for defaulting to 4000
// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}/user:webmind1s`);
// });

// // search : https://www.instagram.com/web/search/topsearch/?query={web}
// //  https://api.instagram.com/v1/users/self/?access_token=instagram_token
// // $userURL = "https://api.instagram.com/v1/users/" . $userID . "/?access_token=" . $myToken;
// // https://api.instagram.com/v1/users/{user-id}/?access_token=ACCESS-TOKEN
const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const dotenv = require("dotenv");
const cors = require("cors");
const { IgApiClient } = require("instagram-private-api");

dotenv.config();
const app = express();

// Use CORS
app.use(cors());
app.use(express.json()); // For parsing application/json

// Function to get the URL for similar users
var getSimilarUsersURL = function (userId) {
  const SIMILAR_USERS_BASE_URL =
    "https://www.instagram.com/graphql/query/?query_id=17845312237175864&variables=";
  return SIMILAR_USERS_BASE_URL + "%7B%22id%22%3A%22" + userId + "%22%7D";
};
var getSimilarAccountsByUserId = function (session, userId) {
  const requestUrl = getSimilarUsersURL(userId);
  return new Client.Request(session).setMethod("GET").setUrl(requestUrl).send();
};

app.get("/private", async (req, res) => {
  const ig = new IgApiClient();

  // Instagram login credentials
  const username = "webmind1s"; // Replace with your Instagram username
  const password = "asdf2qwrASDF234@@#$@$@!$"; // Replace with your Instagram password

  // Perform Instagram login
  ig.state.generateDevice(username); // Set up the device for the session

  try {
    await ig.account.login(username, password);
    console.log("Logged into Instagram successfully.");
  } catch (error) {
    console.error("Failed to log in:", error.message);
    return res.status(500).json({ error: "Failed to log in" });
  }

  // Search for the user "webminds"
  const searchQuery = "webminds"; // Replace with the username to search
  let userId;

  let searchResults;

  try {
    searchResults = await ig.user.searchExact(searchQuery); // Exact search by username
    userId = searchResults.pk; // Get the user ID
    console.log("Found user:", searchResults.username);
  } catch (error) {
    console.error("Error during user search:", error.message);
    return res.status(404).json({ error: "User not found" });
  }

  // Get user info to fetch mutual followers or similar accounts
  try {
    const userInfo = await ig.user.getInfo(userId); // Fetch user info

    // Extract mutual followers
    const similarUsers = userInfo.edge_mutual_followed_by.edges.map((edge) => ({
      username: edge.node.username,
      full_name: edge.node.full_name,
      profile_pic_url: edge.node.profile_pic_url,
      is_verified: edge.node.is_verified,
    }));

    console.log(`Similar Users Response:`, similarUsers);

    return res.json({
      user: searchResults.username,
      similarUsers,
    });
  } catch (error) {
    console.error("Failed to fetch similar users:", error.message);
    return res.status(500).json({ error: "Failed to fetch similar users" });
  }
});

// Your server setup here...

// Route to get similar Instagram accounts using Cheerio (Web scraping)
app.get("/similar/:username", async (req, res) => {
  const { username } = req.params;
  try {
    const url = `https://www.instagram.com/${username}/`;
    const { data } = await axios.get(url);
    const $ = cheerio.load(data);
    const similarAccounts = [];

    // Modify the selector as needed based on Instagram structure
    $('a[href^="/"]').each((index, element) => {
      const account = $(element).attr("href");
      if (account && !account.includes(username)) {
        similarAccounts.push(account.replace("/", ""));
      }
    });

    const uniqueAccounts = [...new Set(similarAccounts)].slice(0, 10);
    res.json(uniqueAccounts);
  } catch (error) {
    console.error("Error fetching similar accounts:", error);
    res.status(500).send("Error fetching similar accounts");
  }
});
// graph:

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
app.get("/user2", async (req, res) => {
  // Instagram login credentials from environment variables
  const username = "webmind1s";
  const password = "asdf2qwrASDF234@@#$@$@!$";

  // Login to Instagram
  try {
    await loginToInstagram(username, password);
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }

  // Fetch user data
  try {
    const userId = "61933666476"; // Example user ID; replace with dynamic input if needed
    const responseTest = await ig.request.get(
      `https://www.instagram.com/graphql/query/?query_hash=7c16654f22c819fb63d1183034a5162f&variables={"id":"${userId}","first":5}`
    );

    res.json(responseTest.body); // Send response data
  } catch (error) {
    console.error("Error fetching user data:", error.message);
    res.status(500).send("Error fetching user data");
  }
});

// Endpoint to get user data
app.get("/user-info", async (req, res) => {
  // Instagram login credentials
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

// Route to fetch user profile info via Instagram Graph API
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
