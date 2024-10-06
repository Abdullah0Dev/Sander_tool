const express = require('express');

const app = express(); // Corrected the typo here

const port = 3000; // You can change the port if needed

app.get('/', (req, res) => {
  res.send('Hello World!'); // Basic route example
});

// routes
// app.use('/api/')
// app.get('https://graph.facebook.com/v12.0/{ig-user-id}?fields=business_discovery.username({ig-username}){username,website,name,ig_id,id,profile_picture_url,biography,follows_count,followers_count,media_count,media{id,caption,like_count,comments_count,timestamp,username,media_product_type,media_type,owner,permalink,media_url,children{media_url}}}&access_token={access-token}', {
//   return 
// })
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


//   'https://graph.instagram.com/17895695668004550?fields=id,media_type,media_url,username,timestamp&access_token=IGQVJ...'
//https://developers.facebook.com/apps/1196642134912783/add/?business_id=1056317869373218
// 	$endpointFormat = 'https://graph.facebook.com/v12.0/{ig-user-id}?fields=business_discovery.username({ig-username}){username,website,name,ig_id,id,profile_picture_url,biography,follows_count,followers_count,media_count,media{id,caption,like_count,comments_count,timestamp,username,media_product_type,media_type,owner,permalink,media_url,children{media_url}}}&access_token={access-token}
