<?php
require_once '../../config/database.php';
require_once '../../helpers/response.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    
    // Use hyphens here to match your HTML 'name' attributes
    $firstName = $_POST['first-name'] ?? ''; // Matches <input name="first-name">
    $lastName  = $_POST['last-name'] ?? '';  // Matches <input name="last-name">
    $email     = $_POST['email'] ?? '';      // Matches <input name="email">
    $password  = $_POST['password'] ?? '';   // Matches <input name="password">

    if (empty($firstName) || empty($lastName) || empty($email) || empty($password)) {
        sendResponse("error", "Please fill in all fields.");
    }

    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

    try {
        // We still use underscores for the SQL because that's how we named the DB columns
        $sql = "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)";
        $stmt = $pdo->prepare($sql);
        $stmt->execute([$firstName, $lastName, $email, $hashedPassword]);
        
        sendResponse("success", "Account created successfully!");

    } catch (PDOException $e) {
        if ($e->getCode() == 23000) {
            sendResponse("error", "That email address is already registered.");
        } else {
            sendResponse("error", "Server error.");
        }
    }
}