<?php
    header("Content-Type: text/html;charset=UTF-8");
    $conn = mysqli_connect("database-1.cgohamsqjcrf.ap-northeast-2.rds.amazonaws.com","admin","12345678","User");      
    $data_stream = "'".$_GET['Id']."','".$_GET['Password']."','".$_GET['Name']."'";
    $query = "insert into User.user(`id`, `pw`, `name`) values (".$data_stream.")";
    $result = mysqli_query($conn, $query);
     

    
    if($result)
      echo "1";
    else
      echo "-1";
     
    mysqli_close($conn);
?>
