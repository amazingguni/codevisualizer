<?php 
	session_start(); 
 	$username = $_SESSION['login_user']; 	
 	if($username=="")
		header("location:index.php"); 		
?>


<!DOCTYPE html>
<html>
	<head>
		<meta charset="UTF-8" />

		<meta name="viewport" content="width=device-width, initial-scale=1.0">
		<meta name="description" content="Custom Login Form Styling with CSS3" />
		<meta name="keywords" content="css3, login, form, custom, input, submit, button, html5, placeholder" />
		<meta name="author" content="Codrops" />

		<link rel="shortcut icon" href="../favicon.ico">

		<!-- css -->
<!-- 		<link rel="stylesheet" href="css/jqueryFileTree.css" /> -->
		<link rel="stylesheet" type="text/css" href="css/style_main.css" />
		<link rel="stylesheet" type="text/css" href="css/style_popup.css" />

		<!-- editor -->
		<script src="ace-editor/ace.js" type="text/javascript" charset="UTF-8"></script>

		<!-- drawing -->
		<script src="http://www.html5canvastutorials.com/libraries/kinetic-v4.0.3.min.js"></script>
		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
		
		<!-- js -->
		<script src="js/jquery.reveal.js"></script>
		<script src="js/jquery.contextmenu.js"></script>
		<script src="js/myWebsocketModule.js"></script>
		<script src="js/jqueryFileTree.js" charset="UTF-8"></script>
		<script src="js/myWebsocketModule.js"></script>
		<script src="js/modernizr.custom.63321.js"></script>

		<!-- 	Covi using Module	 -->
		<script src="js/packageModule.js"></script>
		<script src="js/coviUtil.js"></script>
		<script src="js/editorModule.js"></script>
		<script src="js/totalDrawModule.js"></script>
		<script src="js/drawObjectModule.js"></script>
		<script src="js/drawVarModule.js"></script>
		<script src="js/animationModule.js"></script>

		<script src="data/dataobjclass.js"></script>

		<!-- 		<script src="data/builtvardata.js"></script> -->
		<script src="data/specialdata.js"></script>
		<!-- 		<script src="data/data0113.js"></script> -->
		<!-- 		<script src="data/datalinkedlist.js"></script> -->
		<!-- 		<script src="data/datatree.js"></script> -->

		<script src="class/rowdataclass.js"></script>
		<script src="class/fileinfoclass.js"></script>
		<script src="class/folderinfoclass.js"></script>
		<script src="class/rundebugclass.js"></script>

		<title>CodeVisualizer</title>
		<script type="text/javascript">
			$(document).ready(function() {
			username = '<?php echo $username?>';
				$("#sb-left-content").fileTree({
					root : '<?php $username = $_SESSION['login_user'];
									
									echo '../Database/' . $username . '/';
							?>',
					folderEvent : 'dblclick',
					script : 'connectors/jqueryFileTree.php',
					expandSpeed : 200,
					collapseSpeed : 200,
					multiFolder : true
				}, function(file) {
					alert(file);
				});
				
				socketOpen({
					onmessage:function(message){
						try {
							var json = JSON.parse(message.data);
						} catch (e) {
							console.log('This doesn\'t look like a valid JSON: ', message.data);
							return;
						}

						if (json.type === 'message') {// it's a single message
							addMessage($('#content_output'),json.data.author, json.data.text, new Date(json.data.time));
						} else if (json.type === 'userIdentify') {
							userIdentification(json.data.userName, json.data.userIdx, new Date(json.data.time));
							myUserIdx = json.data.userIdx;
						} else {
							console.log('Hmm..., I\'ve never seen JSON like this: ', json);
						}
					},
					onerror: function(){
						$('#content_output').html($('<p>', {
							text : 'Sorry, but there\'s some problem with your ' + 'connection or the server is down.'
						}));
					},
					onopen: function(){
						sendUserName();
					}
				
				});
				
				set_console_input($('#input_console'));
				set_code_input($('#input_code'));
				
			});
	</script>
	</head>
	<body>
		<!-- header -->
		<header class="header">
			<div class ="nav logo">
				<img id="logo" src="images/logo.png" />
			</div>
				<a>CodeVisualizer</a>

			<div id="memberinfo-content">
				<a id="memberIcon"></a>
				<a id="memberid"> 
				<?php $username = $_SESSION['login_user'];
				echo $username;
				?></a>
				<a id="logout" href="logout.php">Log Out</a>
			</div>
		</header>

		<!--蹂몃Ц - edit view + codevisualizer view + console view-->
		<section>
			<div id="sb-left" class="sidebar" >
				<!--프로젝트 네비게이션 -->
				<div id="sb-left-content">
				</div>
			</div>
			<div id="editor-region">
				<div id="editor-top-bar">
					<a id="putName"  onClick="sendUserName()" class="ico-wrapper">putName</a>
					<div id="divider"></div>
					<a id="makeFile" onClick="makeFile({fileName : 'covi.py',path:'../Database/', userName : myUserName,userIdx : myUserIdx,data : getAllLinesStr()})" class="ico-wrapper">makeFile</a>
					<div id="divider"></div>
					<a id="debugRun" class="ico-wrapper" onClick="debugRun({fileName:'../Database/covi.py'})">debugRun</a>
					<div id="divider"></div>
					<a id="send_breakpoint_info" class="ico-wrapper" onClick="send_breakpoint_info(breakArr)">send_breakpoint_info</a>
					<div id="divider"></div>
					<a id="breakpointHighLight" class="ico-wrapper" onclick="gotoHighrightLine(breakArr[breakrowclass.getCurBreakIndex()])">gotoHighrightLine</a>
					<div id="divider"></div>
					<a id="realTimeDebug" class="ico-wrapper" onclick="realTimeDebug()">realTimeDebug</a>
					<div id="divider"></div>
					<a id="next" class="ico-wrapper" onclick="coviNext()">Next</a>
					<div id="divider"></div>
					<a id="step" class="ico-wrapper" onclick="coviStep()">Step</a>
					<div id="divider"></div>
					<a id="continue" class="ico-wrapper" onclick="coviContinue()">Continue</a>
					<div id="divider"></div>
					<a id= "testdbg" class="ico-wrapper"></a>
					<div id="divider"></div>
					<a id= "pagenumdbg" class="ico-wrapper"></a>
					<div id="divider"></div>
					<a id= "debugging" class="ico-wrapper"></a>
					<div id="divider"></div>
					<a id= "dbgcontent" class="ico-wrapper"></a>

					<a id="group" class="ico-wrapper" onclick="coviGroup(stage)">Group</a>
					<div id="divider"></div>
					<a id="ungroup" class="ico-wrapper" onclick="coviUngroup(stage)">Ungroup</a>
					<div id="divider"></div>
				</div>
				<!-- �몄쭛湲�-->
				<div id ="input_code"></div>
				<!-- 				<div id ="input_code" onkeydown="enterCode(event)"></div> -->

				<!-- Code Visualizer View-->
				<div id="picture" wrap="soft"></div>

				<!-- console View-->
				<div id="content_output" wrap="soft"></div>
			</div>
		</section>
		<input type="text" id="input_console" maxlength : 1/>
	</body>
	
	<!--�ㅽ겕由쏀듃-->
	<script>
		
		var myUserName;
		// setMyUserName("<?=$username?>");
		setMyUserName("hyojin12");
			var frameListEOF = "->None";
			//pic size
			var picW = picture.offsetWidth;
			var picH = picture.offsetHeight;

			// "ace/mode/c_cpp" : c 모드
			// "ace/mode/python" : python 모드

			var project1 = new packageModule("ace/mode/python");

			var editor = project1.getEditor();
			var breakrowclass = project1.getBreakRowClass();
			var datacount = project1.getDataCount();
			var mainlayer = project1.getMainLayer();
			var minimapLayer = project1.getMinimapLayer();
			var prezinum = project1.getPrezinum();
			// var alldatas = getAllDataArray();

			var breakArr = breakrowclass.getBreakpointrow();

			function setMyUserName(username) {
			myUserName = username;
			}

			function getMyUserName() {
			return myUserName;
			}
	</script>
	<div class="contextMenu" id="filenav_rightMenu">

      <ul>
<li id="delete"> delete</li>
        	<li id="new_file"> new file</li>

        	<li id="new_folder"> new folder</li>

       	
       	
       	<li id="rename"> rename</li>
      
        	
      </ul>

    </div>
    
<div id="new_file_popup">
	<div id="heading">
		Make new file
	</div>
	<form id="content">
		<p>Input file name<br>ex) python.py   helloworld.c</p>
		<input id="filename"></input>
		<a href="#" class="button submit close"><img src="images/tick.png">Create File</a>
		<a href="#" class="button red close"><img src="images/cross.png">Cancel</a>
	</form>
</div>

<div id="new_folder_popup">
	<div id="heading">
		Make new folder
	</div>
	<form id="content">
		<p>Input folder name<br><br></p>
		<input type="text" id="foldername"></input>
		<a href="#" class="button submit close"><img src="images/tick.png">Create File</a>
		<a href="#" class="button red close"><img src="images/cross.png">Cancel</a>
	</form>
</div>  


</html>