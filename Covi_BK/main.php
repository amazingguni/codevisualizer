<?php
session_start();
$username = $_SESSION['login_user'];
if($username=="")
header("location:index.php");
?>

<!DOCTYPE HTML>
<html>
	<head>
		<meta charset="UTF-8" />
		<title>CodeVisualizer</title>
		<script src="http://www.html5canvastutorials.com/libraries/kinetic-v4.0.3.min.js"></script>
		<link href="css/ui-lightness/jquery-ui-1.10.0.custom.css" rel="stylesheet">
		<link href="css/filetree_style.css" rel="stylesheet">
		<link href="css/style_popup.css" rel="stylesheet">
		<link href="css/style.css" rel="stylesheet">

		<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.7.2/jquery.min.js" type="text/javascript"></script>
		<SCRIPT type="text/javascript" src="js/jquery-ui-1.10.0.custom.min.js"></SCRIPT>
		<script src="ace-editor/ace.js" type="text/javascript" charset="UTF-8"></script>
		<script src="js/jquery.layout.min.js"></script>
		<script src="js/jquery.reveal.js"></script>
		<script src="js/jquery.contextmenu.js"></script>
		<script src="js/jqueryFileTree.js"></script>
		
		<!--  websocketModule  -->
		<script src="js/myWebsocketModule.js"></script>

<!-- 		<script src="js/kinetic-v4.0.3.min.js"></script> -->
		<script src="js/packageModule.js"></script>
		<script src="js/coviUtil.js"></script>
		<script src="js/editorModule.js"></script>
		<script src="js/totalDrawModule.js"></script>
		<script src="js/drawObjectModule.js"></script>
		<script src="js/drawVarModule.js"></script>
		<script src="js/animationModule.js"></script>
		<script src="js/breakpointObj.js"></script>
		<script src="class/rowdataclass.js"></script>
		<script src="class/fileinfoclass.js"></script>
		<script src="class/folderinfoclass.js"></script>
		<script src="class/rundebugclass.js"></script>
	</head>
	<script>
		var myLayout;
		var tabs;
		var initPosition;
		var lineNum = -1;
		var checkRealTime = false;
		var checkHold = false;
		
		username = '<?php echo $username;?>'
		$(document).ready(function() {
			// $("#content_output").scrollTop($("#content_output")[0].scrollHeight);
			myLayout = $('body').layout({
				applyDefaultStyles : true
			});
			myLayout.sizePane("west", 400);

			$("#filetree").fileTree({
				root : '../Database/' + '<?php echo $username; ?>' + '/',
				folderEvent : 'dblclick',
				script : 'connectors/jqueryFileTree.php',
				expandSpeed : 200,
				collapseSpeed : 200,
				multiFolder : true
			}, function(file) {
				addSourceTab(file);
			});

			tabs = $('#sourceview').tabs();
			
			tabs.delegate( "span.ui-icon-close", "click", function() {
				var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
				$( "#" + panelId ).remove();
				tabs.tabs( "refresh" );
			});
			
			
			$('#btn_debugrun').button({
				icons:{
					primary: "ui-icon-triangle-1-e"
				}
			}).click(function(event){
				var iu = tabs.tabs("option", "active");
				debugRun({
					fileName: $('#sourceview >div').get(iu).getAttribute('rel')
				});
				canvasResizetest();
				readyToMove();
				send_breakpoint_info();
				clearConsole();
				clearLayer();
			});
			
			$('#btn_next').button({
				icons:{
					primary: "ui-icon-arrow-1-e"
				}
			}).click(function(event){
				debugCmd({
					data:"n\n"
				});
				
			});
			$('#btn_continue').button({
				icons:{
					primary: "ui-icon-circle-plus"
				}
			}).click(function(event){
				debugCmd({
					data:"c\n"
				});
				
				
			});
			
			$('#btn_step').button({
				icons:{
					primary: "ui-icon-circle-plus"
				}
			}).click(function(event){
				debugCmd({
					data:"s\n"
				});
				
				
			});
			
			$('#btn_fullscreen').button({
				icons:{
					primary: "ui-icon-circle-plus"
				}
			}).click(function(event){
				setTimeout(canvasResizetest,500);
				
			});
			
			myLayout.bindButton('#btn_fullscreen','toggle','south')
					.bindButton('#btn_fullscreen','toggle','west')
					.bindButton('#btn_fullscreen','toggle','east');
			
			$('#btn_realtime').button({
				icons:{
					primary: "ui-icon-circle-plus"
				}
			}).click(function(event){
				if(checkRealTime){
					checkRealTime = false;
				}else{
					clearLayer();
					checkRealTime = true;
				}

			});

			$('#btn_hold').button({
				icons:{
					primary: "ui-icon-circle-plus"
				}
			}).click(function(event){
				if(checkHold==true){
					checkHold = false;
				}else{
					checkHold = true;
				}
			});
			
			$('#newproject').button({
				icons:{
					primary: "ui-icon-circle-plus"
				}
			}).click(function(event){
				$('#projectname').val('');
				$('#new_project_popup').reveal({
					animation: 'fade',
					animationspeed: 200,
					closeonbackgroundclick: false,
					dismissmodalclass: 'close',
					submitmodalclass: 'submit',
					submitEvent: function(){
						makeFolder({
							path: '../Database/'+'<?php echo $username; ?>'+'/',
							data: $('#projectname').val()
						});	
						$("#filetree").fileTree({
							root : '../Database/' + '<?php echo $username; ?>' + '/',
							folderEvent : 'dblclick',
							script : 'connectors/jqueryFileTree.php',
							expandSpeed : 200,
							collapseSpeed : 200,
							multiFolder : true
						}, function(file) {
							addSourceTab(file);
						});				
					}
				});
			});
			set_code_input('#input_code');

			// set_console_input($('#input_console'));
		});
		socketOpen({
				onmessage : function(message) {
					try {
						var json = JSON.parse(message.data);
					} catch (e) {
						console.log('This doesn\'t look like a valid JSON: ', message.data);
						return;
					}

					if (json.type === 'message') {// it's a single message
						addMessage($('#content_output'), json.data.author, json.data.text, new Date(json.data.time), json.language);
						autoScrollDown($('#content_output'));
					} else if (json.type === 'userIdentify') {
						userIdentification(json.data.userName, json.data.userIdx, new Date(json.data.time));
						autoScrollDown($('#content_output'));
						myUserIdx = json.data.userIdx;
					} else if(json.type === 'loadFile'){
						addTab(json.data.fileName, json.data.text);
						
					}else {
						console.log('Hmm..., I\'ve never seen JSON like this: ', json);
					}
				},
				onerror : function() {
					$('#content_output').html($('<p>', {
						text : 'Sorry, but there\'s some problem with your ' + 'connection or the server is down.'
					}));
					autoScrollDown($('#content_output'));
				},
				onopen : function() {
					username = '<?php echo $username;?>';
					sendUserName();
				}
			});
			var tabTitle = $( "#tab_title" ),
				tabContent = $( "#tab_content" ),
				tabTemplate = "<li><a href='#{href}' rel='#{rel}'>#{label}</a> <span class='ui-icon ui-icon-close' role='presentation'>Remove Tab</span></li>",
				tabCounter = 1;
				//<div id="input_code" class="input_code"></div>
				
			function addSourceTab(sourcePath){
				load_file({
					fileName:sourcePath
				});
			}
			function addTab(_path ,content) {
				if(getTabIndex(_path) ==-1){
					var splited = _path.split('/');
					var title = splited[splited.length-1];
				
					var label = title,
						id = "tabs-" + tabCounter,
						rel=_path,
						li = $( tabTemplate.replace( /#\{href\}/g, "#" + id ).replace( /#\{label\}/g, label ).replace(/#\{rel\}/g, _path) ),
						tabContentHtml = content;
					
					tabs.find( ".ui-tabs-nav" ).append( li );
					var input_s=tabs.append( "<div id='" + id + "' class='input_code' rel='"+rel+"'></div>" );
		
				
					tabs.tabs( "refresh" );
					
					tabCounter++;
					
					var editor = ace.edit(id);
			
					editor.setTheme("ace/theme/tomorrow");
					editor.getSession().setMode("ace/mode/python");
					editor.insert(content);

					changeTab(_path);
					
					if(lineNum!=-1)
						editor.gotoLine(lineNum);
					// $("#"+id).scrollTop($("#"+id)[0].scrollHeight);
					
					var breakrowclass = new breakpointObj(_path, new Array());
					
					//breakpoint 嫄���
					editor.on("gutterclick", function(e) {
						var editor = e.editor;
						var target = e.domEvent.target;
						// 				file name : ace_gutter-cell?
						if (target.className.indexOf("ace_gutter-cell") == -1)
							return;
						if (!editor.isFocused())
							return;
						if (e.clientX > 25 + target.getBoundingClientRect().left)
							return;
	
						var row = e.getDocumentPosition().row;
						breakrowclass.pushRow(row);
						breakrowclass.setCurBreakIndex(0);
						e.editor.session.setBreakpoint(row);
						e.stop();
						
						breakpointDict[_path] = breakrowclass.getBreakpointrow();
						sendBreakPoint({
							data:_path+":"+(row+1)+ "\n"
						});
							
					});		

				//breakpoint ����
					editor.on("guttermousedown", function(e) {
						var editor = e.editor;
						var target = e.domEvent.target;
						if (target.className.indexOf("ace_gutter-cell") == -1)
							return;
						if (!editor.isFocused())
							return;
						if (e.clientX > 25 + target.getBoundingClientRect().left)
							return;
	
						var row = e.getDocumentPosition().row;
						var breakarray = e.editor.session.getBreakpoints();
						
						if (breakarray != null) {
							for (var i = 0; i < breakarray.length; i++) {
								if ("ace_breakpoint" == breakarray[i]) {
									if (row == i) {
										breakrowclass.delByIndex(row);
										breakrowclass.setCurBreakIndex(0);
										e.editor.session.clearBreakpoint(row);
										e.stop();
									}
								}
							}
						}
						sendClearBreakPoint({
							data:_path+":"+(row+1)+ "\n"
						});
					});

					//contents
		   			editor.on("change", function(e){
		   				
		   	
		   				makeFile({
							fileName:_path,
							data:editor.session.getValue()
						});

		   				if (e.data.text === '\n') {
		   					clearConsole();
		   					
		   		            if (checkRealTime) {
		   		                realTimeDebug();
		   		            }
		   		        }

		   				//if(checkRealTime){
		   				//	realTimeDebug();
			   			//}
					});
				}else{
					changeTab(_path);
				}
			}
			

			function changeTab(rel){
				var index = getTabIndex(rel)
				if(index!= -1){
					var a = tabs.tabs("option", "active", index);
					var b = a.find('>div').get(index);
					var editor = ace.edit($(b).attr('id'));
					editor.setTheme("ace/theme/tomorrow");
					editor.getSession().setMode("ace/mode/python");
					
					
					if(lineNum!=-1)
						editor.gotoLine(lineNum);
				}
			}
			function getTabIndex(rel){
				var child = $(tabs.children().get(0)).children();
				var i = 0;
				var isFind = false;
				var _rel =rel;
				if(_rel.charAt(0)!='.')
					_rel=".."+_rel.substring(_rel.indexOf("/Database/"));
				for ( i = 0 ; i != child.length; i++){
					if($($($(child[i]).children()).get(0)).attr("rel") == _rel){
						isFind = true;
						break; 
					}
				}

				if(isFind)
					return i;
				else
					return -1;
			}
			
			
	</script>
	<BODY>
		<DIV class="ui-layout-center">
			
			<div id="picture"></div>
			<div style="position:absolute; top:5px;">
				<button id="btn_debugrun">Run</button>
				<button id="btn_next">Next</button>
				<button id="btn_continue">Continue</button>
				<button id="btn_step">Step</button>
				<button id="btn_fullscreen">FullScrean</button>
				<input type="checkbox" id="btn_realtime"/><label for="btn_realtime">Realtime</label>
				<input type="checkbox" id="btn_hold"/><label for="btn_hold">Hold</label>
			</div>	
			<textarea readonly id="source_on_canvas"></textarea>
		
		</DIV>
		<DIV class="ui-layout-north">
			<div id="header">
				<div id="logo"></div>
				<div id="userinfo">
						<form  action="logout.php" method="post">	
							<button id = "userid" type="submit"><?php echo $username; ?>님 환영합니다</button>
						</form>
						
						<script>
							$('#userid').button({
								icon: {
									primary: "ui-icon-circle-close"
								}
							});
							
						</script>
					
				</div>
				
			</div>
		</DIV>
		<DIV class="ui-layout-south">
			<div id="content_output"></div>
			<input id="input_console" type="text">
			</input>
		</DIV>
		<DIV class="ui-layout-east">
			<button id="newproject">create new Project</button>
			<div id="filetree"></div>
		</DIV>
		<DIV class="ui-layout-west">
			<div id="sourceview">
				<ul>
					 
				</ul>			
			</div>
		</DIV>
	</BODY>
	<script>
		var myUserName;
		// setMyUserName("<?=$username?>");
		setMyUserName("hyojin12");
		//pic size
		var picW = picture.offsetWidth;
		var picH = picture.offsetHeight;
		var editor;
//		var breakrowclass;
		var datacount;
		var mainlayer;
		var prezinum;
		var breakArr;
		var stage;
		
		var scale = 1.0;
		var scaleMultiplier = 0.8;
		var startDragOffset = {};
		var mouseDown = false;

		// "ace/mode/c_cpp" : c 모드
		// "ace/mode/python" : python 모드
		$(document).ready(function() {
			var project1 = new packageModule("ace/mode/python");

			editor = project1.getEditor();
			datacount = project1.getDataCount();
			mainlayer = project1.getMainLayer();
			prezinum = project1.getPrezinum();
			stage = project1.getStage();
			
			stage.getDOM().addEventListener("DOMMouseScroll", handleScroll, false);
			stage.getDOM().addEventListener("mousewheel", handleScroll, false);
		});
		
		function setMyUserName(username) {
			myUserName = username;
		}

		function getMyUserName() {
			return myUserName;
		}
		
		function canvasResizetest(){
			stage.setWidth($(".ui-layout-center")[0].offsetWidth);
			stage.setHeight($(".ui-layout-center")[0].offsetHeight);
			
			stage.draw();
		}

		function canvasResize(){
			stage.setWidth(screen.width);
			stage.setHeight(screen.height);

			//alert("w:"+$(".ui-layout-center")[0].offsetWidth+", h:"+$(".ui-layout-center")[0].offsetHeight);

			if(screen.width - $(".ui-layout-center")[0].offsetWidth > 50){
				stage.setWidth(screen.width);
				stage.setHeight(screen.height);
				
				//mainlayer.setScale(screen.width/stage.getWidth());
			}else{
				stage.setWidth(preSizeW);
				stage.setHeight(preSizeH);
				//mainlayer.setScale(stage.getWidth()/screen.width);			
			}

			var existframe = mainlayer.get(".frame");
			var existlen = existframe.length;
			for(var i=0;i<existlen;i++){
			existframe[i].children[0].setWidth(stage.getWidth()-50);
			existframe[i].children[0].setHeight(stage.getHeight()-80);			
			}
			preSizeW = $(".ui-layout-center")[0].offsetWidth;
			preSizeH = $(".ui-layout-center")[0].offsetHeight;
			stage.draw();		
		}

		function clearConsole(){
			$('#content_output').empty();
		}
	</script>
	<!-- popup용 레이아웃 -->
	<div id="new_file_popup">
		<div id="heading">
			Make new file
		</div>
		<form id="content">
			<p>
				Input file name
				<br>
				ex) python.py   helloworld.c
			</p>
			<input id="filename">
			</input><a href="#" class="button submit close"><img src="images/tick.png">Create File</a><a href="#" class="button red close"><img src="images/cross.png">Cancel</a>
		</form>
	</div>
	<div id="new_folder_popup">
		<div id="heading">
			Make new folder
		</div>
		<form id="content">
			<p>
				Input folder name
				<br>
				<br>
			</p>
			<input type="text" id="foldername">
			</input><a href="#" class="button submit close"><img src="images/tick.png">Create File</a><a href="#" class="button red close"><img src="images/cross.png">Cancel</a>
		</form>
	</div>
	<div id="new_project_popup">
		<div id="heading">
			Make new Project
		</div>
		<form id="content">
			<p>
				Input Project name
				<br>
				<br>
			</p>
			<input type="text" id="projectname">
			</input><a href="#" class="button submit close"><img src="images/tick.png">Create File</a><a href="#" class="button red close"><img src="images/cross.png">Cancel</a>
		</form>
	</div>
	<div class="contextMenu" id="filenav_rightMenu">
		<ul>
			<li id="delete">
				delete
			</li>
			<li id="new_file">
				new file
			</li>
			<li id="new_folder">
				new folder
			</li>
			<li id="rename">
				rename
			</li>
		</ul>
	</div>
</html>
