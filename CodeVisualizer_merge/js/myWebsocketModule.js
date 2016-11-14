// for better performance - to avoid searching in DOM
var content_output = $('#content_output');
var status_userName = $('#status_userName');
var input_userName = $('#input_userName');
var status_code = $('#status_code');
var status_fileName = $('#status_fileName');
var input_code = $('#input_code');
var input_fileName = $('#input_fileName');
var input_console = $('#input_console');

var socket = null;
var myUserIdx = -1;
var username = null;
var serverIP = 'ws://211.189.127.121:1337';

var defaults = {
	onmessage : function(msg) {
		alert(msg.data);
	},
	onerror : function(msg) {
		alert("error " + msg.data);
	},
	onopen : function(msg) {
		alert("onopen " + msg.data);
	}
}

function socketOpen(o) {
	socket = new WebSocket(serverIP);
	setInterval(function() {
		if (socket.readyState !== 1) {
		}
	}, 3000);

	var opts = jQuery.extend(defaults, o);
	socket.onmessage = opts.onmessage;
	socket.onerror = opts.onerror;
	socket.onopen = opts.onopen;

	return true;
}

function socketClose() {
	if (socket != null) {
		socket.close();
	}
}

function sendMessage(data) {
	var jsonData = JSON.stringify(data);

	if (socket != null) {

		socket.send(jsonData);
	}
}

function sendUserName() {

	if (!username) {

		return;
	}

	var $data = {
		type : 'userName',
		userName : username,
		userIdx : 'request'
	};

	sendMessage($data);
}

function sendSignMsg(ID) {

	var $data = {
		type : 'userInitSignUp',
		userName : ID,
		userIdx : 'request'
	};

	sendMessage($data);
}

function makeFile(data) {
	var $defaultdata = {
		type : 'makeFile',
		path : '/',
		fileName : '',
		userName : username,
		userIdx : myUserIdx,
		data : ''
	};
	var $data = jQuery.extend($defaultdata, data);
	sendMessage($data);
}

function makeFolder(data) {
	var $defaultdata = {
		type : 'makeFolder',
		path : '/',
		data : '',
		userName : username,
		userIdx : myUserIdx
	};
	var $data = jQuery.extend($defaultdata, data);
	sendMessage($data);
}

function debugRun(data) {
	var $defaultdata = {
		type : 'debugRun',
		fileName : '',
		userName : username,
		userIdx : myUserIdx
	};

	var $data = jQuery.extend($defaultdata, data);
	sendMessage($data);
}

function debugCmd(data) {
	var $defaultdata = {
		type : 'inputConsole',
		userName : username,
		userIdx : myUserIdx,
		data : '\n'
	};
	var $data = jQuery.extend($defaultdata, data);
	sendMessage($data);
}

function compileRun(data) {
	var $defaultdata = {
		type : 'compileRun',
		fileName : '',
		userName : username,
		userIdx : myUserIdx
	};
	var $data = jQuery.extend($defaultdata, data);
	sendMessage($data);
}

function delete_file(data) {
	var $defaultdata = {
		type : 'delete',
		path : '',
		userName : username,
		userIdx : myUserIdx
	};
	var $data = jQuery.extend($defaultdata, data);
	sendMessage($data);
}

function gotoHighrightLine(breakLine) {
	if (breakLine == undefined) {
		return;
	}

	if (breakArr.length == 0) {
		return;
	} else {
		editor.gotoLine(breakLine + 1);

		var msg = "b " + breakLine;

		debugCmd({
			data : msg + '\n'
		});
	}
}

function send_breakpoint_info(breakArr) {
	var msg = breakArr;
	var tmp = '';
	// divideByComma(breakArr);

	for (var i = 0; i < msg.length; i++) {
		tmp += "b " + (msg[i] + 1) + "\n";
	}

	debugCmd({
		data : tmp
	});
}

function realTimeDebug() {
	var tmp = '';

	makeFile({
		fileName : 'covi.py',
		path : '../Database/',
		userName : myUserName,
		userIdx : myUserIdx,
		data : getAllLinesStr()
	});

	debugRun({
		fileName : '../Database/covi.py'
	});

	var allLineLen = getAllLineNum()+1;

	tmp = "b " + allLineLen + "\n";
	tmp += "c\n";

	debugCmd({
		data : tmp
	});
}

function set_code_input(inputcode) {
	$(inputcode).keydown(function(e) {
		if (e.keyCode === 13) {
			realTimeDebug();
		}
	});
}

function set_console_input(inputconsole) {
	$(inputconsole).keydown(function(e) {

		if (e.keyCode === 13) {

			var msg = $(this).val();

			if (msg == undefined || msg == null || msg == "" || msg == 'undefined' || msg == 'null') {
				debugCmd({
					data : '\n'
				});
				return;
			}

			debugCmd({
				data : $(this).val() + '\n'
			});
			$(this).val('');
		}
	});
}

function addMessage(contentoutput, userName, message, dt) {
	/*content_output.append('<p>' + userName + '</span> @ ' +
	 + (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':'
	 + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes())
	 + ': ' + message + '</p>');*/
	contentoutput.append('<p>' + message + '</p>');
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
