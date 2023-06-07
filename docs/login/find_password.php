<?php

// Create connection
$conn = mysqli_connect("database-1.cgohamsqjcrf.ap-northeast-2.rds.amazonaws.com","admin","12345678","User");      

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$userId = $_GET['id'];
$userName = $_GET['name'];

// Prepare and execute the query
$stmt = $conn->prepare("SELECT pw FROM user WHERE id = ? AND name = ?");
$stmt->bind_param("ss", $userId, $userName);
$stmt->execute();
$stmt->bind_result($foundPassword);
$stmt->fetch();
$stmt->close();

$conn->close();

if ($foundPassword !== null) {
    // 비밀번호 출력 형식 설정 ex)pas******
    $outputPassword = substr($foundPassword, 0, 3) . str_repeat('*', strlen($foundPassword) - 3);
    echo $outputPassword;
} else {
    echo "";
}
?>
