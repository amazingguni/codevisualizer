<?php
	
	include("config.php");
	
	if($_SERVER["REQUEST_METHOD"] == "POST")
	{
		// username and password sent from form 
		
		
		$myusername=addslashes($_POST['sign_id']);		
		$mypassword=addslashes($_POST['sign_password']); 
		
		
		$sql="SELECT id FROM User WHERE ID='$myusername'";
		$result=mysql_query($sql);
		$count=mysql_num_rows($result);
		
		if($count==0)
		{
			$sql="insert into User(ID, PASSWORD) VALUES('$myusername', '$mypassword');";
			$result=mysql_query($sql);
?>
			<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
			<script src="js/myWebsocketModule.js"></script>
			<script>
					user = '<?php echo $myusername; ?>';
					socketOpen({
						onmessage: function(message){
							
							try{
								var json =JSON.parse(message.data);
							}catch (e) {
								console.log('This doesn\'t look like a valid JSON: ', message.data);
								return;
							}
							
							if(json.type === 'signUpOk'){
								alert(json.data.userName+" 님 회원가입에 성공했습니다");
								history.back();
							}
							socketClose();
						},
						onopen: function(){
							sendSignMsg(user);
							
						}
					});
			</script>
<?php	
		}else{
?>		
			<script>
				alert("기존에 존재하는 아이디입니다 다시 한번 시도해 주십시오");
				history.back();	
			</script>
<?php
		}
		
	}
?>

