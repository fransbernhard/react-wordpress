<?php

    $servername = "localhost";
    $username = "root";
    $password = "root";
    $dbname = "magdalundberg_se_fri";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    $sql = "SELECT * FROM Items, Categories WHERE Items.catid_ = Categories.catId";

    $result = $conn->query($sql);
    while($row = mysqli_fetch_assoc($result))
    $items[] = $row;
    echo json_encode($items);
    // header('Content-type:application/json;charset=utf-8');

    $conn->close();

?>
