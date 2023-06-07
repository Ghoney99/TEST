<?php
$servername = "database-1.cgohamsqjcrf.ap-northeast-2.rds.amazonaws.com";
$username = "admin";
$password = "12345678";
$dbname = "User";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $userName = $_POST['userName'];
    $userPassword = $_POST['userPassword'];

    // 입력된 사용자 이름과 비밀번호를 사용하여 데이터베이스에서 사용자 정보 조회
    $stmt = $conn->prepare("SELECT * FROM user WHERE id = ? AND pw = ?");
    $stmt->bind_param("ss", $userName, $userPassword);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // 로그인 성공
        echo "로그인에 성공했습니다.";
        // 로그인 성공 후 필요한 작업 수행
    } else {
        // 로그인 실패
        echo "아이디 또는 비밀번호가 일치하지 않습니다.";
    }

    $stmt->close();
}

$conn->close();
?>
