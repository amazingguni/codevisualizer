var sampleData = {
	'FrameDict' : {
		'A/0x9daac8c' : ["'/home/junbum/workspace/CodeVisualizerDebugger/src/ExampleCode/Python/bdb-example-1.py'", 'A/0x9daac8c', '17'],
		'execfile' : ["'/home/junbum/workspace/CodeVisualizerDebugger/src/ExampleCode/Python/bdb-example-1.py'", 'execfile', '24', 'b', '6', 'a', '5', 'c', '3'],
		'spam' : ["'/home/junbum/workspace/CodeVisualizerDebugger/src/ExampleCode/Python/bdb-example-1.py'", 'spam', '10', 'a', '3', 'c', '6', 'b', '4', 'd', '<__main__.A instance at 0x9daac8c>']
	},
	'objDict' : ["'/home/junbum/workspace/CodeVisualizerDebugger/src/ExampleCode/Python/bdb-example-1.py'", '<__main__.A instance at 0x9daac8c>', '17', 'a', '10', 'c', '3', 'b', '3', 'd', 'None'],
	'FrameList' : ['spam', 'execfile()'],
	'printList' : []
}

function objectToString(data) {
	var jsonstr = JSON.stringify(data);
	return jsonstr;
}

function stringToObject(data) {
	var tmpdata = eval("(" + data + ")");
	return tmpdata;
}

function getsampleDatas() {
	return objectToString(sampleData);
}
