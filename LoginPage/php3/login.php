<?php
include ("config.php");
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // username and password sent from Form
    $myusername = addslashes($_POST['username']);
    $mypassword = addslashes($_POST['password']);

    $sql = "SELECT ID FROM USER WHERE ID='$myusername' and PASSWORD='$mypassword'";
    $result = mysql_query($sql);
    $row = mysql_fetch_array($result);
    $active = $row['ID'];
    $count = mysql_num_rows($result);

    // If result matched $myusername and $mypassword, table row must be 1 row
    if ($count == 1) {
        session_register("myusername");
        $_SESSION['login_user'] = $myusername;

        header("location: welcome.php");
    } else {
        $error = "Your Login Name or Password is invalid";
    }
}
?>