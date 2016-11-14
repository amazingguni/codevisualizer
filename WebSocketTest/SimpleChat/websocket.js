var sys = require('sys'), ws = require('websocket');

ws.createServer(function (socket) {
	socket.addListener("connect", function (resource) {
      sys.debug("connect: " + resource);
		//socket.write("welcome WebSocket Server\r\n");
		setTimeout(socket.end, 100 * 1000); 

	}).addListener("data", function (data) {
		console.info("read data: " + data);
		//socket.write(data);

	}).addListener("close", function () {
		sys.puts("client left");
	})

}).listen(8000);