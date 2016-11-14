// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";

var sys = require("sys"),
    spawn = require("child_process").spawn,
    exec  = require('child_process').exec;
var userInfoArray = [ ];
    
// Optional. You will see this name in eg. 'ps' or 'top' command
process.title = 'node-process_manager';
var coviRoot = '/home/ssm/Documents/AptanaWorkspace/PythonServerTest04/Roots/';
 
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

function currentPath(path){
	var backPath = path.substr(2, path.length);
	var pwd = spawn("pwd", [path]);
	var fullPath;
	
	pwd.stdout.on('data', function(data) {
		fullPath = data.toString().substr(0,data.length-1) + backPath;		
		console.log('Full Path : ' + fullPath);
	});
	
	return fullPath;
}
 
/**
 * HTTP server
 */
var server = http.createServer(function(request, response) {
    // Not important for us. We're writing WebSocket server, not HTTP server
    console.log((new Date()) + ' Received request for ' + request.url);
    response.writeHead(404);
    response.end();
});

server.listen(webSocketsServerPort, function() {
    console.log((new Date()) + " Server is listening on port " + webSocketsServerPort);
    
	var pwd = spawn("pwd");
	pwd.stdout.on('data', function(data) {
		data = data.toString();
		var strs = data.split("/");
		coviRoot = '';
		for (var i = 0; i < strs.length - 1; i++) {
			if (strs[i] == "Server") {
				break;
			} else {
				coviRoot = coviRoot + strs[i] + '/';
			}
		}
		//coviRoot = data;
		console.log('Current directory : ' + coviRoot);
	});
});
 
/**
 * WebSocket server
 */
var wsServer = new webSocketServer({
    // WebSocket server is tied to a HTTP server. WebSocket request is just
    // an enhanced HTTP request. For more info http://tools.ietf.org/html/rfc6455#page-6
    httpServer: server,
    // You should not use autoAcceptConnections for production
    // applications, as it defeats all standard cross-origin protection
    // facilities built into the protocol and the browser.  You should
    // *always* verify the connection's origin and decide whether or not
    // to accept it.
    autoAcceptConnections: false
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
	connection.userIdx = index;
	var excute;

	console.log((new Date()) + ' Connection accepted.');

	// user sent some message
	connection.on('message', function(message) {
		console.log((new Date()) + ' Message type: ' + message.type + ', Message data: ' + message.utf8Data);
		if (message.type === 'utf8') {// accept only texts

			try {
				var json = JSON.parse(message.utf8Data);
			} catch (e) {
				console.log('This doesn\'t look like a valid JSON: ', message.utf8Data);
				return;
			}

			console.log((new Date()) + ' JSON type ' + json.type);
			//debugger;

			if (json.type === 'sendCode') {
				var fs = require('fs');
				fs.writeFile("../Python/" + json.fileName + ".py", json.data, function(err) {
					if (err) {
						console.log(err);
					} else {
						console.log("The file was saved! : " + json.data + ".py");
					}
				});
				//var excute = spawn("python", ["../Python/" + json.fileName + ".py"]);
				excute = spawn("python", ["../Python/" + json.fileName + ".py"]);
				
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
						userName : json.userName,
						userIdx : connection.userIdx
					};

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

					clients[connection.userIdx].sendUTF(sendJson);
				});

			} else if (json.type === 'makeFolder') {
				var mkdir = spawn("mkdir", [coviRoot + json.data]);

				cliData = json.data.toString();
				message.utf8Data = cliData.substr(0, cliData.length);

				console.log((new Date()) + ' make folder ' + ': ' + json.data + ' len: ' + cliData.length);
				// we want to keep history of all sent messages
				var obj = {
					time : (new Date()).getTime(),
					text : htmlEntities('make folder : ' + message.utf8Data),
					path : './',
					userName : json.userName,
					userIdx : connection.userIdx
				};

				//history.push(obj);
				//history = history.slice(-100);

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

				clients[connection.userIdx].sendUTF(sendJson);

			} else if (json.type === 'makeFile') {
				if(excute != null){
					excute.kill();
					excute = null;
				}

				var fs = require('fs');
				fs.writeFile(coviRoot + json.fileName, json.data, function(err) {
					if (err) {
						console.log(err);
					} else {
						console.log("The file was saved! : " + json.fileName);
					}
				});

				cliData = json.fileName.toString();
				message.utf8Data = cliData.substr(0, cliData.length);

				console.log((new Date()) + ' make file ' + ': ' + json.data + ' len: ' + cliData.length);
				// we want to keep history of all sent messages
				var obj = {
					time : (new Date()).getTime(),
					text : htmlEntities('make file : ' + message.utf8Data),
					path : cliFilePath,
					userName : json.userName,
					userIdx : connection.userIdx
				};

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

				clients[connection.userIdx].sendUTF(sendJson);
				
			} else if (json.type === 'debugRun') {
				
				var cliData;
				var obj;
				
				var fs = require('fs');
				fs.writeFile(coviRoot+json.fileName, json.data, function(err) {
					if (err) {
						console.log(err);
					} else {
						console.log("Debug Run! : "+json.fileName);
						
						if(excute.pid == null){
							excute = null;
						}
						
						if (excute == null) {
							excute = spawn("python", //Absolute Path
											["/home/ssm/Documents/AptanaWorkspace/CodeVisualizer_merge/CodeVisualizerDebugger/src/CodeVisualizerDebugger.py", 
											coviRoot + json.fileName]);
							console.log('Spawned child pid: ' + excute.pid + '\n');

							excute.stdout.on('data', function(data) {
								// data emit
								cliData = data.toString();
								message.utf8Data = cliData.substr(0, cliData.length - 1);

								console.log((new Date()) + 'Send To Console Message ' + ': ' + message.utf8Data + ' ' + cliData.length);
								// we want to keep history of all sent messages
								var obj = {
									time : (new Date()).getTime(),
									text : htmlEntities(message.utf8Data),
									userName : json.userName,
									userIdx : connection.userIdx
								};

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

								clients[connection.userIdx].sendUTF(sendJson);
								
								console.log(cliData.substr(cliData.length - 8, cliData.length));
								if (cliData.substr(cliData.length - 8, cliData.length) == "The end\n") {
									console.log("killing process : "+excute.pid);
									excute.kill(excute.pid);
									excute = null;								
								}
							});

							excute.stderr.on('data', function(data) {
								sys.print(data);
							}); 
							
							excute.on('SIGKILL', function () {
  								excute = null;
							});

						}
					}
				});
				
				/*
				if (excute == null) {
					setTimeout(function() {
						excute = spawn("python", //Absolute Path
										["/home/ssm/Documents/AptanaWorkspace/CodeVisualizer_merge/CodeVisualizerDebugger/src/CodeVisualizerDebugger.py", 
										coviRoot + json.fileName]);
						console.log('Spawned child pid: ' + excute.pid + '\n');

						excute.stdout.on('data', function(data) {
							// data emit
							cliData = data.toString();
							message.utf8Data = cliData.substr(0, cliData.length - 1);

							console.log((new Date()) + 'Send To Console Message ' + ': ' + message.utf8Data + ' ' + cliData.length);
							// we want to keep history of all sent messages
							var obj = {
								time : (new Date()).getTime(),
								text : htmlEntities(message.utf8Data),
								userName : json.userName,
								userIdx : connection.userIdx
							};

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

							clients[connection.userIdx].sendUTF(sendJson);

							if (cliData.substr(cliData.length - 8, cliData.length) == "The end\n") {
								excute.kill();
								excute = null;
							}
						});

						excute.stderr.on('data', function(data) {
							sys.print(data);
						});
					}, 200);
				}*/

				
			} else if (json.type === 'compileRun') {

				var fs = require('fs');
				fs.writeFile("../test.py", json.data, function(err) {
					if (err) {
						console.log(err);
					} else {
						console.log("Comile Run! : test.py");
					}
				});
				
				if(excute == null){
					excute = spawn("python", ["../test.py"]);
				}

				setTimeout( function(){
					excute.stdout.addListener("data", function(data) {
						cliData = data.toString();
						message.utf8Data = cliData.substr(0, cliData.length);

						console.log((new Date()) + 'Comile Run !');
						// we want to keep history of all sent messages
						var obj = {
							time : (new Date()).getTime(),
							text : htmlEntities(message.utf8Data),
							userName : json.userName,
							userIdx : connection.userIdx
						};

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
				}, 500);

			} else if (json.type === 'inputConsole') {
				
				if(excute == null){
					console.log('Don\'t try this at home : Input Console\n');
				} else {
					console.log('> '+json.data);
					
					excute.stdin.resume();
					excute.stdin.setEncoding('utf8');
					excute.stdin.write(json.data);
				}				

			} else if (json.type === 'userName') {

				console.log('User Name : ' + json.userName + ' idx : ' + json.userIdx + '\n');
				var cliData;
				var obj;
				var userInfo = require('./UserInfo.js');
				userInfo.userName = json.userName;
				userInfo.userIdx = json.userIdx;
				connection.userName = json.userName;
				userInfo.connection = connection;
				userInfo.excute = excute;
				userInfo.remoteAddress = json.userName;

				console.log((new Date()) + 'Send To Console Message : ' + message.utf8Data);
				//console.log( userInfo );

				// we want to keep history of all sent messages
				var obj = {
					time : (new Date()).getTime(),
					userName : json.userName,
					userIdx : connection.userIdx
				};

				var uIdx = userObject.push(obj) - 1;

				// broadcast message to all connected clients
				var sendJson = JSON.stringify({
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

				clients[connection.userIdx].sendUTF(sendJson);
				
			} else if (json.type === 'exit') {
				
				if(excute != null){
					excute.kill();
					excute = null;
				}

				cliData = (new Date())+' <Exit CodeVisualizer> : Good bye, '+json.userName;
				message.utf8Data = cliData.substr(0, cliData.length);

				console.log((new Date())+' <Exit CodeVisualizer> : Exit '+json.userName);
				// we want to keep history of all sent messages
				var obj = {
					time : (new Date()).getTime(),
					text : htmlEntities(message.utf8Data),
					userName : json.userName,
					userIdx : connection.userIdx
				}; 

				var sendJson = JSON.stringify({
					type : 'message',
					data : obj
				});
				
				clients[connection.userIdx].sendUTF(sendJson);
				
				console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
				clients.splice(connection.userIdx, 1);
				
			} else if (json.type === 'userInitSignUp') {
				
				if(excute != null){
					excute.kill();
					excute = null;
				}
				
				var mkdir = spawn("mkdir", ["/home/ssm/Documents/AptanaWorkspace/PythonServerTest04/"+json.userName+"/"]);

				cliData = (new Date())+' <Sign up CodeVisualizer> : Hello, '+json.userName;
				message.utf8Data = cliData.substr(0, cliData.length);

				console.log((new Date())+' <Sign up CodeVisualizer> : Enter '+json.userName);
				// we want to keep history of all sent messages
				var obj = {
					time : (new Date()).getTime(),
					text : htmlEntities(message.utf8Data),
					rootPath : '/home/ssm/Documents/AptanaWorkspace/PythonServerTest04/'+json.userName+'/',
					userName : json.userName,
					userIdx : connection.userIdx
				}; 

				var sendJson = JSON.stringify({
					type : 'signUpOk',
					data : obj
				});
				
				clients[connection.userIdx].sendUTF(sendJson);
				console.log(sendJson);
				
			} else if (json.type === 'loadFile') {
				if(excute != null){
					excute.kill();
					excute = null;
				}

				var fs = require('fs');
				fs.readFile(coviRoot + json.fileName,['utf8'], function(err, data) {
					if (err) {
						console.log(err);
					} else {
						console.log("The file was loaded! : " + json.fileName + ".py");
					
						cliData = data.toString();
						message.utf8Data = cliData.substr(0, cliData.length);

						console.log((new Date()) + ' load file ' + ': ' + json.fileName + ' len: ' + cliData.length);
						// we want to keep history of all sent messages
						var obj = {
							time : (new Date()).getTime(),
							text : htmlEntities(message.utf8Data),
							fileName : json.fileName,
							userName : json.userName,
							userIdx : connection.userIdx
						};

						// broadcast message to all connected clients
						var sendJson = JSON.stringify({
							type : 'loadFile',
							data : obj
						});
						for (var i = 0; i < userObject.length; i++) {
							if (userObject[i].userName === json.userName) {
								uIdx = i;
							}
						}

						clients[connection.userIdx].sendUTF(sendJson); 
					}
				});
				
			} else if (json.type === 'reName') {
				if(excute != null){
					excute.kill();
					excute = null;
				}
				
				var mkdir = spawn("mv", [coviRoot+json.fileName, coviRoot+json.reName]);

				cliData = (new Date())+' <rename> : '+json.fileName+' to '+json.reName;
				message.utf8Data = cliData.substr(0, cliData.length);

				console.log((new Date())+' <rename> : '+json.fileName+' to '+json.reName);
				// we want to keep history of all sent messages
				var obj = {
					time : (new Date()).getTime(),
					text : htmlEntities(message.utf8Data),
					path : '/home/ssm/Documents/AptanaWorkspace/PythonServerTest04/'+json.userName+'/',
					userName : json.userName,
					userIdx : connection.userIdx
				}; 

				var sendJson = JSON.stringify({
					type : 'message',
					data : obj
				});
				
				clients[connection.userIdx].sendUTF(sendJson);
				console.log(sendJson);
			}

		}
	});

	// user disconnected
	connection.on('close', function(connection) {
		console.log((new Date()) + " Peer " + connection.remoteAddress + " disconnected.");
		clients.splice(connection.userIdx, 1);
	});

	process.on('uncaughtException', function(err) {
		console.log('Caught exception: ' + err);
		// 추후 trace를 하게 위해서 err.stack 을 사용하여 logging하시기 바랍니다.
		// Published story에서 beautifule logging winston 참조
	});
});
