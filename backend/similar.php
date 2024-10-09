<?php

require 'vendor/autoload.php';  // Load InstagramAPI classes via Composer

// Initialize the Instagram API client
$ig = new \InstagramAPI\Instagram();

// Set Instagram login credentials
$username = 'YOUR_USERNAME';  // Replace with your Instagram username
$password = 'YOUR_PASSWORD';  // Replace with your Instagram password

try {
    // Log in to Instagram
    $ig->login($username, $password);
} catch (\Exception $e) {
    echo 'Something went wrong: ' . $e->getMessage() . "\n";
    exit(0);
}

// Set a test username for $query
$query = 'webmind1s';  // Replace 'test_username' with any real Instagram username

// Clean the query by removing 's:' if $query is not empty
$query = !empty($query) ? str_replace("s:", "", $query) : '';

if (!empty($query)) {
    // Search for the user based on the query
    $search_result = $ig->people->search($query);

    if ($search_result->isOk()) {
        $userId = null;

        foreach ($search_result->getUsers() as $r) {
            if ($r->getUsername() === $query) {
                $userId = $r->getPk();
                // Assuming $this->resp is an object of the current class
                $this->resp->username = $r->getUsername();
                break;
            }
        }

        if (empty($userId)) {
            $this->resp->msg = "We can't find a user with this username.";
            $this->jsonecho();
            return;
        }

        // Request suggested users based on the found user ID
        try {
            $sug = $ig->request('fbsearch/accounts_recs/')
                ->addParam('target_user_id', $userId)
                ->addParam('surface', 'profile_view')
                ->getResponse(new \InstagramAPI\Response\SuggestedUsersResponse());

            // Initialize the items array
            $this->resp->items = [];

            // Prepare the response with suggested users
            foreach ($sug->getUsers() as $r) {
                $this->resp->items[] = [
                    "value" => $r->getUsername(),
                    "data" => [
                        "img"       => $r->getProfilePicUrl(),
                        "sub"       => $r->getFullName(),
                        "id"        => $r->getPk(),
                        "verified"  => $r->getIsVerified()
                    ],
                    "can_er" => in_array("reactions-settings-er-post", $package_modules ?? [])  // Assuming $package_modules is available
                ];
            }

            // Output the response as JSON
            $this->jsonecho();
        } catch (\Exception $e) {
            $this->resp->msg = 'Error fetching suggested users: ' . $e->getMessage();
            $this->jsonecho();
        }
    } else {
        $this->resp->msg = 'User search failed.';
        $this->jsonecho();
    }
}

// good luck...