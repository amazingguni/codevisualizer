<?php
	session_start();
	include("config.php");
	
	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		// username and password sent from form 
	
		$myusername=addslashes($_POST['id']); 
		$mypassword=addslashes($_POST['password']); 
	
	
		$sql="SELECT id FROM User WHERE ID='$myusername' and PASSWORD='$mypassword'";
		$result=mysql_query($sql);
		
		$row=mysql_fetch_array($result);
		$active=$row['active'];
	
		$count=mysql_num_rows($result);


		// If result matched $myusername and $mypassword, table row must be 1 row
		if($count==1)
		{
			
			session_register("myusername");
			$_SESSION['login_user']=$myusername;
	
			header("location: main.php");
		}
		else 
		{
			$error="Your Login Name or Password is invalid";
		}
	}
?>