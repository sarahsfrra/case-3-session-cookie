<?php
session_start();

// VALIDASI LOGIN
function validateLogin($email, $password) {

    // LOAD DATA USER
    $users = file_get_contents('users.txt');
    $users = explode("\n", $users);
    $users = array_map('trim', $users);
    
    foreach ($users as $user) {
        $userInfo = explode('|', $user);
        if ($userInfo[0] == $email && $userInfo[1] == $password) {
            return true;
        }
    }
    
    return;
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];
    
    // VALIDATE LOGIN
    $validationResult = validateLogin($email, $password);
    if ($validationResult === true) {
        $_SESSION['email'] = $email;
        
        if (isset($_POST['remember'])) {
            setcookie('remember_email', $email, time() + (86400 * 30), "/"); 
        } else {
            setcookie('remember_email', "", time() - 3600, "/");
        }

        echo json_encode(array("success" => true));
    } else {
        echo json_encode(array("success" => false, "message" => $validationResult));
    }
}
?>
