<?php

include('lock.php');

?>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
	<head>
		<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
		<meta charset="UTF-8" />
		
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="Custom Login Form Styling with CSS3" />
		<meta name="keywords" content="css3, login, form, custom, input, submit, button, html5, placeholder" />
		<meta name="author" content="Codrops" />
		<link rel="shortcut icon" href="../favicon.ico">
		<link rel="stylesheet" type="text/css" href="css/style_main.css" />
		<script src="js/modernizr.custom.63321.js"></script>
		
		<title>CodeVisualizer-main</title>
	</head>
	<body>
		<header class="header">
			<div class ="nav logo">
				<img id="logo" src="images/logo.png" />
				<a>CodeVisualizer</a>
			</div>
			
			<div id="memberinfo-content">
				<a id="memberIcon"></a>
				<a id="memberid" href="#"> <?php
				echo $user_check;
				?>
				님 안녕하세요 </a>
				<a id="logout" href="logout.php">  Sign Out</a>
			</div>
			
		</header>
	</body>
</html>