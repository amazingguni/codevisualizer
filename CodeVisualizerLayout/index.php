<?php

include('lock.php');

?>

<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html lang="en">
	<head>
		<meta charset="UTF-8" />
		<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<title>CodeVisualizer</title>
		<meta name="description" content="Custom Login Form Styling with CSS3" />
		<meta name="keywords" content="css3, login, form, custom, input, submit, button, html5, placeholder" />
		<meta name="author" content="Codrops" />
		<link rel="shortcut icon" href="../favicon.ico">
		<link rel="stylesheet" type="text/css" href="css/style_index.css" />
		<script src="js/modernizr.custom.63321.js"></script>
		<!--[if lte IE 7]><style>.main{display:none;} .support-note .note-ie{display:block;}</style><![endif]-->
		<style>
			body {
				background: #563c55 url(images/background_loginpage.png) no-repeat center top;
				-webkit-background-size: cover;
				-moz-background-size: cover;
				background-size: cover;
			}
		</style>
	</head>
	<body>
		<div class="container">
			<div class="front-card">
				<div class="front-welcome">
					<h1><span class="welcome-desc">Code Visualizer</span>에 오신것을 환영합니다</h1>
					<p>
						<label>내가 작성한 코드를 시각적으로 확인해보십시오<br></label>
						<label>Code Visualizer와 함께라면 코딩이 어렵지 않습니다!<br><br></label>
						<label>지금 당장 시작하세요!</label>
					</p>
				</div>
				<div class="front-login">
					<form action="login.php" method="post" class="form login">
						<h1><span class="text-main">Login</span> to <span class="text-desc">Code Visualizer</span></h1>
						<p class="float">
							<label for="login"><i class="icon-user"></i>Username</label>
							<input type="text" name="id" placeholder="Username or email">
						</p>
						<p class="float">
							<label for="password"><i class="icon-lock"></i>Password</label>
							<input type="password" name="password" placeholder="Password" class="showpassword">
						</p>
						<p class="clearfix">
							<input type="submit" name="login" value="Log in">
						</p>
					</form>
				</div>

				<div class="front-signin">
					<form class="form signin">
						<h1><span class="text-main">Sign up</span></h1>
						<p class="float">
							<label for="login"><i class="icon-user"></i>Username</label>
							<input type="text" name="id" placeholder="Username or email">
						</p>
						<p class="float">
							<label for="password"><i class="icon-lock"></i>Password</label>
							<input type="password" name="password" placeholder="Password" >
						</p>
						<p >
							<input type="password" name="re-password" placeholder="Retyping Password" >
						</p>
						<p class="clearfix">
							<input type="submit" name="signup" value="Sign up">
						</p>
					</form>
				</div>

			</div>
		</div>
		<!-- jQuery if needed -->
		<script type="text/javascript" src="http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js"></script>
	
	</body>
</html>