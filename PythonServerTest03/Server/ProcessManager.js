// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";

var sys = require("sys"),
    spawn = require("child_process").spawn,
    exec  = require('child_process').exec;
    
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-process_manager';
 
// Port where we'll run the websocket server
var webSocketsServerPort = 1337;
 
// websocket and http servers
var webSocketServer = require('websocket').server;
var http = require('http');
 
/**
 * Global variables
 */
// latest 100 messages
var history = [ ];
// list of currently connected clients (users)
var clients = [ ];
var userObject = [ ];
/**
 * Helper function for escaping input strings
 */
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;')
                      .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}
 
/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
    // Not important for us. We're writing WebSocket server, not HTTP server
});
server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
});
 
/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket request is just
    // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server
});
 
// This callback function is called every time someone
// tries to connect to the WebSocket server
wsServer.on('request', function(request) {
    console.log((new Date()) + ' Connection from origin ' + request.origin + '.');
 
    // accept connection - you should check 'request.origin' to make sure that
    // client is connecting from your website
    // (http://en.wikipedia.org/wiki/Same_origin_policy)
    var connection = request.accept(null, request.origin);
    // we need to know client index to remove them on 'close' event
    var index = clients.push(connection) - 1;
    
 
    console.log((new Date()) + ' Connection accepted.');
 
    // send back chat history
    if (history.length > 0) {
        connection.sendUTF(JSON.stringify( { type: 'consoleHistory', data: history} ));
    }
 
    // user sent some message
    connection.on('message', function(message) {
    	console.log((new Date()) + ' Message type: ' + message.type+', Message data: '+message.utf8Data);
        if (message.type === 'utf8') { // accept only texts

			try {
				var json = JSON.parse(message.utf8Data);
			} catch (e) {
				console.log('This doesn\'t look like a valid JSON: ', message.utf8Data);
				return;
			}
			
			console.log((new Date()) + ' JSON type ' + json.type);
			//debugger;
			
			if(json.type === 'sendCode'){
				var fs = require('fs');
				fs.writeFile("../Python/" + json.fileName + ".py", json.data, function(err) {
					if (err) {
						console.log(err);
					} else {
						console.log("The file was saved! : " + json.data + ".py");
					}
				});
				var excute = spawn("python", ["../Python/" + json.fileName + ".py"]);
				var cliData;
				var obj;
				excute.stdout.addListener("data", function(data) {
					cliData = data.toString();
					message.utf8Data = cliData.substr(0, cliData.length - 1);

					console.log((new Date()) + ' Received Message from ' + ': ' + message.utf8Data + ' ' + cliData.length);
					// we want to keep history of all sent messages
					var obj = {
						time : (new Date()).getTime(),
						text : htmlEntities(message.utf8Data),
						userName : userName
					};

					history.push(obj);
					history = history.slice(-100);

					// broadcast message to all connected clients
					var json = JSON.stringify({
						type : 'message',
						data : obj
					});
					for (var i = 0; i < clients.length; i++) {
						clients[i].sendUTF(json);
					}
				}); 
 
			} else	if (json.type === 'makeFolder') {
				var mkdir = spawn("mkdir", ["../" + json.data]);
				//var chmod = spawn("chmod 777 ", ["../" + json.data]);
				
				cliData = json.data.toString();
				message.utf8Data = cliData.substr(0, cliData.length);

				console.log((new Date()) + ' make folder ' + ': ' + json.data + ' len: ' + cliData.length);
				// we want to keep history of all sent messages
				var obj = {
					time : (new Date()).getTime(),
					text : htmlEntities('make folder : '+message.utf8Data),
					userName : userName
				};

				history.push(obj);
				history = history.slice(-100);

				// broadcast message to all connected clients
				var json = JSON.stringify({
					type : 'message',
					data : obj
				});
				for (var i = 0; i < clients.length; i++) {
					clients[i].sendUTF(json);
				}
				
			} else	if (json.type === 'makeFile') {

				var fs = require('fs');
				fs.writeFile("../"+json.data+".py", "print \"Hello \""+json.data+"!", function(err) {
					if (err) {
						console.log(err);
					} else {
						console.log("The file was saved! : "+json.data+".py");
					}
				});
				//var chmod = spawn("chmod 777 ", ["../" + json.data+".py"]);
				
				cliData = json.data.toString();
				message.utf8Data = cliData.substr(0, cliData.length);

				console.log((new Date()) + ' make file ' + ': ' + json.data + ' len: ' + cliData.length);
				// we want to keep history of all sent messages
				var obj = {
					time : (new Date()).getTime(),
					text : htmlEntities('make file : '+message.utf8Data),
					userName : userName
				};

				history.push(obj);
				history = history.slice(-100);

				// broadcast message to all connected clients
				var json = JSON.stringify({
					type : 'message',
					data : obj
				});
				for (var i = 0; i < clients.length; i++) {
					clients[i].sendUTF(json);
				}
			} else	if (json.type === 'debugRun') {
				/*
				var fs = require('fs');
				fs.writeFile("../"+json.data+".py", "print \"Hello \""+json.data+"!", function(err) {
					if (err) {
						console.log(err);
					} else {
						console.log("Debug Run~~! : "+json.data+".py");
					}
				});
				//var chmod = spawn("chmod 777 ", ["../" + json.data+".py"]);
				
				cliData = json.data.toString();
				message.utf8Data = cliData.substr(0, cliData.length);

				console.log((new Date()) + ' Debug Run ' + ': ' + json.data + ' len: ' + cliData.length);
				// we want to keep history of all sent messages
				var obj = {
					time : (new Date()).getTime(),
					text : htmlEntities('make file : '+message.utf8Data),
					userName : userName
				};

				history.push(obj);
				history = history.slice(-100);

				// broadcast message to all connected clients
				var json = JSON.stringify({
					type : 'message',
					data : obj
				});
				for (var i = 0; i < clients.length; i++) {
					clients[i].sendUTF(json);
				}
				*/
			} else	if (json.type === 'compileRun') {

				var fs = require('fs');
				fs.writeFile("../test.py", json.data, function(err) {
					if (err) {
						console.log(err);
					} else {
						console.log("Comile Run! : test.py");
					}
				});
				//var chmod = spawn("chmod 777 ", ["../" + json.data+".py"]);
				var excute = spawn("python", ["../test.py"]);
				
				excute.stdout.addListener("data", function(data) {
					cliData = data.toString();
					message.utf8Data = cliData.substr(0, cliData.length);

					console.log((new Date()) + 'Comile Run !');
					// we want to keep history of all sent messages
					var obj = {
						time : (new Date()).getTime(),
						text : htmlEntities(message.utf8Data),
						userName : json.userName,
						userIdx : json.userIdx
					};

					history.push(obj);
					history = history.slice(-100);

					// broadcast message to all connected clients
					var sendJson = JSON.stringify({
						type : 'message',
						data : obj
					});

					for (var i = 0; i < userObject.length; i++) {
						if (userObject[i].userName === json.userName) {
							uIdx = i;
						}
					}

					clients[userObject[uIdx].userIdx].sendUTF(sendJson);
				});

				
			} else if (json.type === 'inputConsole') {
			// /home/ssm/Documents/AptanaWorkspace/CodeVisualizerDebugger/src/CodeVisualizerDebugger.py
				//var excute = spawn("python", ["/home/ssm/Documents/AptanaWorkspace/CodeVisualizerDebugger/src/CodeVisualizerDebugger.py"]);
				//var excute = spawn("python", ["../Python/fibo.py", "30"]);
				var outStm, inStm, errStm;
				var excute = spawn("python", //Absolute Path
							["/home/ssm/Documents/AptanaWorkspace/CodeVisualizerDebugger/src/CodeVisualizerDebugger.py"]);
							//{ stdio: ['pipe', 'pipe', process.stderr] });
				console.log('Spawned child pid: ' + excute.pid+'\n');
				var cliData;
				var obj;
				
				excute.stdout.on('data', function(data) {
    				// data emit
    				//socket.emit('gogogo', data.toString());
    				cliData = data.toString();
					message.utf8Data = cliData.substr(0, cliData.length - 1);

					console.log((new Date()) + 'Send To Console Message ' + ': ' + message.utf8Data + ' ' + cliData.length);
					// we want to keep history of all sent messages
					var obj = {
						time : (new Date()).getTime(),
						text : htmlEntities(message.utf8Data),
						userName : userName
					};

					history.push(obj);
					history = history.slice(-100);

					// broadcast message to all connected clients
					var json = JSON.stringify({
						type : 'message',
						data : obj
					});
					for (var i = 0; i < clients.length; i++) {
						clients[i].sendUTF(json);
					}
  				});
			} else if (json.type === 'userName') {

				console.log('User Name : ' + json.userName + ' idx : ' + 
												json.userIdx + '\n');
				var cliData;
				var obj;

				console.log((new Date()) + 'Send To Console Message : ' + message.utf8Data );
				
				// we want to keep history of all sent messages
				var obj = {
					time : (new Date()).getTime(),
					userName : json.userName,
					userIdx : index
				};

				history.push(obj);
				history = history.slice(-100);
				var uIdx = userObject.push(obj)-1;
				
				console.log( userObject );

				// broadcast message to all connected clients
				var json = JSON.stringify({
					type : 'userIdentify',
					data : obj
				});
				
				for (var i = 0; i < userObject.length; i++) {
					/*try {
						var compareObj = JSON.parse(json);
					} catch (e) {
						console.log('This doesn\'t look like a valid JSON: ', message.data);
						return;
					}*/
					if (userObject[i].userName === obj.userName) {
						uIdx = i;
					}
				}
				
				clients[userObject[uIdx].userIdx].sendUTF(json);
			}

        } 
    });
 

	// user disconnected
	connection.on('close', function(connection) {
		if (userName !== false) {
			console.log((new Date()) + " Peer " + userName + +connection.remoteAddress + " disconnected.");

			var uIdx;
			for (var i = 0; i < userObject.length; i++) {
				if (userObject[i].userName === obj.userName) {
					uIdx = i;
				}
			}

			// remove user from the list of connected clients
			clients.splice(uIdx, 1);
			// push back user's color to be reused by another user
			//colors.push(userColor);
			excute.splice(uIdx, 1);
		}
	}); 

    
    process.on('uncaughtException', function (err) {
 		console.log('Caught exception: ' + err);
		// 추후 trace를 하게 위해서 err.stack 을 사용하여 logging하시기 바랍니다.
 		// Published story에서 beautifule logging winston 참조
	});
});

