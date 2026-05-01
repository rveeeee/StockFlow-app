<?php
/**
 * Helper function to send a standardized JSON response
 * * @param string $status  - 'success' or 'error'
 * @param string $message - The message to show the user
 * @param mixed  $data    - Optional data to return (like user info)
 */
function sendResponse($status, $message, $data = null) {
    // Tell the browser that we are sending JSON data
    header('Content-Type: application/json');

    // Create the response array
    $response = [
        "status" => $status,
        "message" => $message
    ];

    // If there is extra data, add it to the response
    if ($data !== null) {
        $response["data"] = $data;
    }

    // Convert the array to a JSON string and print it
    echo json_encode($response);
    
    // Stop any further PHP execution
    exit;
}
?>