$(function() {"use strict";

	// for better performance - to avoid searching in DOM
	var content_output = $('#content_output');
	var status_userName = $('#status_userName');
	var input_userName = $('#input_userName');
	var status_code = $('#status_code');
	var status_fileName = $('#status_fileName');
	var input_code = $('#input_code');
	var input_fileName = $('#input_fileName');
	var input_console = $('#input_console');

	var testFileName = "covi";
	var myUserName = getMyUserName();
	var myUserIdx;

	var clientNum = 0;
	var connection;

	window.WebSocket = window.WebSocket || window.MozWebSocket;

	if (!window.WebSocket) {
		content_output.html($('<p>', {
			text : 'Sorry, but your browser doesn\'t ' + 'support WebSockets.'
		}));
		return;
	}

	
	function open(){
		connection = new WebSocket('ws://211.189.127.121:1337');
		connection.onopen = function() {
		
		};
	};

	

	
	function close(){
		connection.close();	
	};
	
	open();
	connection.onerror = function(error) {
		content_output.html($('<p>', {
			text : 'Sorry, but there\'s some problem with your ' + 'connection or the server is down.'
		}));
	};
	
	connection.onmessage = function(message) {
		try {
			var json = JSON.parse(message.data);
		} catch (e) {
			console.log('This doesn\'t look like a valid JSON: ', message.data);
			return;
		}

		if (json.type === 'message') {// it's a single message
			addMessage(json.data.author, json.data.text, new Date(json.data.time));
		} else if (json.type === 'userIdentify') {
			userIdentification(json.data.userName, json.data.userIdx, new Date(json.data.time));
			myUserIdx = json.data.userIdx;
		} else {
			console.log('Hmm..., I\'ve never seen JSON like this: ', json);
		}
	};
	
	input_code.keydown(function(e) {
		if (e.keyCode === 13) {
			var msg = getAllLinesStr();
			// var msg = getAllLinesStr();
			if (!msg) {
				content_output.html($('<p>', {
					text : 'empty message'
				}));
				return;
			}

			// drawData(alldatas[datacount++]);

			// var cursor = editor.getCursorPosition();
			// var currow = cursor.row;
			// var curLine = editor.session.getLine(currow);
			//
			// var rowdata = new rowData(currow, curLine);
			// var curLen = rowdata.getRowlen();
			//
			// var arr = rowdata.getSplitToken('@');
			//

			// var json = JSON.stringify({
			// type : 'sendCode',
			// fileName : testFileName,
			// data : msg
			// });
			//
			// connection.send(json);
		}
	});

	input_console.keydown(function(e) {
		if (e.keyCode === 13) {
			var msg = $(this).val();

			if (msg == undefined || msg == null || msg === '' || msg == 'undefined' || msg == 'null') {
				var json = JSON.stringify({
					type : 'inputConsole',
					fileName : testFileName,
					data : '\n'
				});

				connection.send(json);

				addMessage('', 'Input enter', '');
				return;
			}

			// send the message as an ordinary text
			//connection.send(msg);
			var json = JSON.stringify({
				type : 'inputConsole',
				fileName : testFileName,
				data : input_console.val()
			});
			connection.send(json);

			$(this).val('');
			// disable the input field to make the user wait until server
			// sends back response
			// input_console.attr('disabled', 'disabled');
		}
	});

	setInterval(function() {
		if (connection.readyState !== 1) {
		}
	}, 3000);

	function addMessage(userName, message, dt) {
		/*content_output.append('<p>' + userName + '</span> @ ' +
		 + (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':'
		 + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes())
		 + ': ' + message + '</p>');*/
		$(this).append('<p>' + message + '</p>');
		if (checkStr(message, "FrameDict") && (!checkStr(message, "connect and create debugger"))) {
			// dbgcontent.innerHTML = "ininininininin : "+message;

			// 			replaceAll과 같은 기능
			var tmpmessage = message.replace(/&quot;/gi, "\"");
			tmpmessage = tmpmessage.replace(/&lt;/gi, "\<");
			tmpmessage = tmpmessage.replace(/&gt;/gi, "\>");

			var usingmessage = tmpmessage;
 
			if (checkStr(tmpmessage, "The end")) {
				usingmessage = tmpmessage.substring(0, tmpmessage.length - 8);
			}

			drawData(usingmessage);
		}
		// dbgcontent.innerHTML = "nonononononono : "+message;
	}

	function userIdentification(userName, message, dt) {
		content_output.append('<p>' + userName + '</span> @ ' + +(dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':' + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes()) + ': ' + message + '</p>');
	}


	window.onload = function() {
		// document.getElementById("sendCode").onclick = function() {
		// var json = JSON.stringify({
		// type : 'sendCode',
		// userName : myUserName,
		// userIdx : myUserIdx,
		// fileName : testFileName,
		// data : getAllLinesStr()
		// });
		//
		// connection.send(json);
		// }

		document.getElementById("makeFile").onclick = function() {
			// var newfile = new fileInfo("hyojin", "firstproject", null);
			// var mkfile = JSON.stringify(newfile);

			var json = JSON.stringify({
				type : 'makeFile',
				fileName : testFileName,
				userName : myUserName,
				userIdx : myUserIdx,
				data : getAllLinesStr()
			});

			connection.send(json);
		}

		document.getElementById("makeFolder").onclick = function() {
			var json = JSON.stringify({
				type : 'makeFolder',
				userName : myUserName,
				userIdx : myUserIdx,
				data : getAllLinesStr()
			});

			connection.send(json);
		}

		document.getElementById("debugRun").onclick = function() {
			var allLine = getAllLinesStr();
			var rundebug = new runDebugInfo("hyojin", "firstproject.py", allLine, breakrowclass.getBreakpointrow());
			var runStr = JSON.stringify(rundebug);

			var json = JSON.stringify({
				type : 'debugRun',
				fileName : testFileName,
				userName : myUserName,
				userIdx : myUserIdx,
				data : getAllLinesStr()
			});

			connection.send(json);
		}

		document.getElementById("compileRun").onclick = function() {
			var allLine = getAllLinesStr();

			var json = JSON.stringify({
				type : 'compileRun',
				userName : myUserName,
				userIdx : myUserIdx,
				data : getAllLinesStr()
				
			});

			connection.send(json);
		}

		document.getElementById("putName").onclick = function() {
			var msg = myUserName;
			if (!msg) {
				return;
			}
			// send the message as an ordinary text
			//connection.send(msg);
			var json = JSON.stringify({
				type : 'userName',
				userName : msg,
				userIdx : 'request'
			});

			myUserName = msg;
			connection.send(json);
		}
	}
});
