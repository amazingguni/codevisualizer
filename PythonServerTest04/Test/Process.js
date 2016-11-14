var sys = require("sys"),
    spawn = require("child_process").spawn;
 
var excute = spawn("python", ["../Python/test.py"]);
 
excute.stdout.addListener("data", function(data) {
    sys.print(data);
});