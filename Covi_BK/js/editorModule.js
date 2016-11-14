function coviNext() {
	window.alert("next button clicked");
}

function coviStep() {
	window.alert("step button clicked");
}

function coviContinue() {
	window.alert("continue button clicked");
}

function coviQuit() {
	window.alert("quit button clicked");
}

function coviGroup(stage) {
	stage.setDraggable(true);
}

function coviUngroup(stage) {
	stage.setDraggable(false);
}

//eraseid에 해당하는 그림 삭제
function coviErase(stage, eraseid) {
	var tmpid = "#" + eraseid;
	var grouparr = stage.get(tmpid);
	var groupframe = grouparr[0];

	groupframe.remove();

	stage.draw();
}

function getAllLinesStr() {
	var str = editor.session.getValue();
	return str;
}

function getCurLineStr() {
	var cursor = editor.getCursorPosition();
	var currow = cursor.row;
	var curLine = editor.session.getLine(currow);

	return curLine;
}

function getAllLineNum() {
	var str = editor.session.getValue();
	var arr = new Array();
	arr = str.split("\n");

	return arr.length;
}

function getAllLineArr() {
	var str = editor.session.getValue();
	var arr = new Array();
	arr = str.split("\n");

	return arr;
}

function findInputLineNum(str) {
	if (checkStr(str, "input")) {
		return true;
	} else {
		return false;
	}
}

function objectToString(data) {
	var jsonstr = JSON.stringify(data);
	return jsonstr;
}

function stringToObject(data) {
	var tmpdata = eval("(" + data + ")");
	return tmpdata;
}

function autoScrollDown(target){
	target.scrollTop(target[0].scrollHeight);
}