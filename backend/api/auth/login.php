<?php
session_start();

// 1. Load the database connection and the response helper
// Ensure these filenames match your backend/config and backend/helpers folders
require_once '../../config/database.php'; 
require_once '../../helpers/response.php';

// 2. Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    sendResponse("error", "Method not allowed.");
}

// 3. Get the JSON data sent from auth.js
$data     = json_decode(file_get_contents('php://input'), true);
$email    = trim($data['email'] ?? '');
$password = trim($data['password'] ?? '');

// 4. Basic validation
if (!$email || !$password) {
    sendResponse("error", "Email and password are required.");
}

try {
    // 5. Check if user exists using the 'EMAIL' column (All-caps to match your SQL)
    $stmt = $pdo->prepare('SELECT * FROM users WHERE EMAIL = ?');
    $stmt->execute([$email]);
    $user = $stmt->fetch(PDO::FETCH_ASSOC);

    // 6. Verify password using the 'PASSWORD' column (All-caps to match your SQL)
    // password_verify handles the hashing check automatically
    if (!$user || !password_verify($password, $user['PASSWORD'])) {
        sendResponse("error", "Invalid email or password.");
    }

    // 7. Save user data to session for the Dashboard
    // Using ID and FIRST_NAME to match your government-standard SQL naming
    $_SESSION['user_id']         = $user['ID'];
    $_SESSION['user_first_name'] = $user['FIRST_NAME'];
    $_SESSION['user_last_name'] = $user['LAST_NAME'];
    $_SESSION['user_email']      = $user['EMAIL'];

    // 8. Send the final success response
    sendResponse("success", "Login successful.", [
        'user' => [
            'id'         => $user['ID'],
            'first_name' => $user['FIRST_NAME'],
            'last_name'  => $user['LAST_NAME']
        ]
    ]);

} catch (PDOException $e) {
    // If the database crashes, send a clean error instead of HTML
    sendResponse("error", "Database error: " . $e->getMessage());
}
?>