$(function() {"use strict";

	var content_output = $('#content_output');
	// var status_code = $('#status_code');
	// var status_fileName = $('#status_fileName');
	var input_code = $('#input_code');
	// var input_fileName = $('#input_fileName');
	// var input_console = $('#input_console');

	// var myColor = false;
	// var myName = false;
	var clientNum = 0;

	window.WebSocket = window.WebSocket || window.MozWebSocket;

	if (!window.WebSocket) {
		content_output.html($('<p>', {
			text : 'Sorry, but your browser doesn\'t ' + 'support WebSockets.'
		}));

		return;
	}

	var connection = new WebSocket('ws://211.189.127.197:1337');

	connection.onopen = function() {
	};

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
		} else {
			console.log('Hmm..., I\'ve never seen JSON like this: ', json);
		}
	};

	input_code.keydown(function(e) {
		if (e.keyCode === 13) {
			var msg = getCurLineStr();
			// var msg = getAllLinesStr();
			if (!msg) {
				content_output.html($('<p>', {
					text : 'empty message'
				}));
				return;
			}

			// var cursor = editor.getCursorPosition();
			// var currow = cursor.row;
			// var curLine = editor.session.getLine(currow);
			//
			// var rowdata = new rowData(currow, curLine);
			// var curLen = rowdata.getRowlen();
			//
			// var arr = rowdata.getSplitToken('@');
			//
			// //입력 양식 built: framename@built@num
			// // 입력 양식 basic : framename@basic@type@name@value
			// addVarToClass(mainlayer, arr);
			//
			// // json
			// for (var key in tmpdata) {( function() {
			// //alert(key);
			// var data = tmpdata[key];
			// addVarToClassJson(mainlayer, data);
			// }());
			// }
			for (var key in tmpdata) {( function() {
						//alert(key);
						var data = tmpdata[key];
						addVarToClassJson(mainlayer, data);
					}());
			}

			var json = JSON.stringify({
				type : 'sendCode',
				fileName : 'hyojinTest',
				data : msg
			});

			connection.send(json);
		}
	});

	setInterval(function() {
		if (connection.readyState !== 1) {
		}
	}, 3000);

	function addMessage(author, message, dt) {
		author = "admin";
		content_output.append('<p>' + author + '</span> @ ' + (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':' + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes()) + " >> " + message + '</p>');
	}


	window.onload = function() {
		document.getElementById("sendCode").onclick = function() {
			var allLine = getAllLinesStr();

			var json = JSON.stringify({
				type : 'sendCode',
				fileName : 'hyojinTest',
				data : allLine
			});

			connection.send(json);
		}

		document.getElementById("makeFile").onclick = function() {
			// var newfile = new fileInfo("hyojin", "firstproject", null);
			// var mkfile = JSON.stringify(newfile);

			var json = JSON.stringify({
				type : 'makeFile',
				data : 'firstFile'
			});

			connection.send(json);
		}

		document.getElementById("makeFolder").onclick = function() {
			var json = JSON.stringify({
				type : 'makeFolder',
				data : 'firstFolder'
			});

			connection.send(json);
		}

		document.getElementById("debugRun").onclick = function() {
			var allLine = getAllLinesStr();
			var rundebug = new runDebugInfo("hyojin", "firstproject.py", allLine, breakrowclass.getBreakpointrow());
			var runStr = JSON.stringify(rundebug);

			var json = JSON.stringify({
				type : 'debugRun',
				data : runStr
			});

			connection.send(json);
		}

		document.getElementById("compileRun").onclick = function() {
			var allLine = getAllLinesStr();

			var json = JSON.stringify({
				type : 'compileRun',
				data : allLine
			});

			connection.send(json);
		}
	}
});
