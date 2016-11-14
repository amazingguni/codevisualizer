<?php
include ("config.php");
session_start();
if ($_SERVER["REQUEST_METHOD"] == "POST") {
	// username and password sent from Form
	$myusername = addslashes($_POST['id']);
	$mypassword = addslashes($_POST['password']);

	$sql = "SELECT ID FROM USER WHERE ID='$myusername' and PASSWORD='$mypassword'";
	$result = mysql_query($sql);
	$row = mysql_fetch_array($result);
	$active = $row['active'];
	$count = mysql_num_rows($result);

	// If result matched $myusername and $mypassword, table row must be 1 row
	if ($count == 1) {
		session_register("myusername");
		$_SESSION['login_user'] = $myusername;

		header('Location: welcome.php');
	} else {
		$error = "Your Login Name or Password is invalid";
	}
}
?>

