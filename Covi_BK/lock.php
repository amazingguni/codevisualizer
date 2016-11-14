<?php
include('config.php');

$user_check=$_SESSION['login_user'];

$ses_sql=mysql_query("select id from user where id='$user_check' ");

$row=mysql_fetch_array($ses_sql);

$login_session=$row['id'];



if(!isset($login_session))
{
	
	?>
	<script>
		
		console.log("iuT^T");
	</script>
	<?php
}else{
	header("location:main.php");
	
}
?>