// http://ejohn.org/blog/ecmascript-5-strict-mode-json-and-more/
"use strict";

var sys = require("sys"), 
	spawn = require("child_process").spawn;
	
	
//var excute = spawn("ls",["-ls", "../../"]);
/*
var excute = spawn("python", //Absolute Path
					["/home/ssm/Documents/AptanaWorkspace/CodeVisualizerDebugger/src/CodeVisualizerDebugger.py",
					10, "UserName"
					//"/home/ssm/Documents/AptanaWorkspace/PythonServerTest04/asdf.py"
					]);
*/
var excute = spawn("python",
				["/home/ssm/Documents/AptanaWorkspace/CodeVisualizerDebugger/src/CodeVisualizerDebugger.py"]);

excute.stdout.on('data', function(data) {
	sys.print(data);
});

excute.stderr.on('data', function(data) {
	sys.print(data);
});