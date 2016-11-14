// 붉은 계통 랜덤 "rgb(200," + parseInt(255 * r) + ",100)",
//푸른 계통 랜덤 "rgb(" + parseInt(255 * r) + ",160,200)",

// Kinetic.js 관련
function createStage(stage, canvas) {
	var picW = canvas.offsetWidth;
	var picH = canvas.offsetHeight - 20;

	if (stage == null) {
		var stage = new Kinetic.Stage({
			container : canvas,
			width : picW,
			height : picH
		});
		return stage;
	} else {
		return stage;
	}
}

function createLayer(layerid) {
	var layer = new Kinetic.Layer();
	layer.setId(layerid);
	return layer;
}

function createGroup(groupid) {
	var group = new Kinetic.Group();
	group.setId(groupid);
	return group;
}

// Button 관련
function makeFile() {
	var newfile = new fileInfo("hyojin", "firstproject", null);
	var mkfile = JSON.stringify(newfile);
	window.alert(mkfile + "new file 생성완료");
}

function makeFolder() {
	var newfolder = new folderInfo("hyojin", "MyFirstProject");
	var mkfolder = JSON.stringify(newfolder);
	window.alert(mkfolder + "new folder 생성완료");
}

function compileRun() {
	var allLine = getAllLinesStr();
	var newfile = new fileInfo("hyojin", "firstproject", allLine);
	var sendStr = JSON.stringify(newfile);
	window.alert(sendStr + "send 완료");
	// window.alert(sendstr + "&" + breakrowclass.getBreakpointrow());
}

function debugRun() {
	var allLine = getAllLinesStr();
	var rundebug = new runDebugInfo("hyojin", "firstproject.py", allLine, breakrowclass.getBreakpointrow());
	var runStr = JSON.stringify(rundebug);
	window.alert(runStr + "debugger run 완료");
}

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

//확대 축소
function handleScroll(evt) {
	var delta = evt.wheelDelta ? evt.wheelDelta / 40 : evt.detail ? -evt.detail : 0;
	if (delta > 0) {
		scale /= scaleMultiplier;
		mainlayer.setScale(scale);
		mainlayer.draw();
	} else {
		scale *= scaleMultiplier;
		mainlayer.setScale(scale);
		mainlayer.draw();
	}
	return evt.preventDefault() && false;
};

// function drawBaseVar(datatype, dataname, datavalue) {
// var wholegroup = new Kinetic.Group();
//
// var r = Math.random();
// var orivalue = "";
// var group = new Kinetic.Group();
// group.setDraggable(true);
//
// orivalue = datavalue;
//
// if (datavalue.length > 8) {
// datavalue = datavalue.substring(0, 8) + "...";
// }
//
// var tmprect = new Kinetic.Text({
// x : 0,
// y : 0,
// name : orivalue,
// stroke : 'white',
// strokeWidth : 0,
// draggable : true,
// fill : "rgb(" + parseInt(255 * r) + ",160,200)",
// text : "\n" + datavalue,
// fontSize : 30,
// fontFamily : 'Calibri',
// textFill : 'white',
// width : 200,
// height : 100,
// align : 'center',
// shadow : {
// offset : 2,
// color : 'black',
// blur : 3,
// opacity : 0.1
// },
// cornerRadius : 5,
// });
//
// var tw = tmprect.getWidth();
// var th = tmprect.getHeight();
//
// var tmptype = new Kinetic.Text({
// y : -23,
// width : tw,
// align : 'left',
// text : datatype,
// fontSize : 18,
// textFill : 'gray',
// });
//
// var tmpname = new Kinetic.Text({
// y : th + 6,
// x : 0,
// width : tw,
// text : dataname,
// align : 'right',
// fontSize : 15,
// textFill : 'gray',
// });
//
// group.add(tmprect);
// group.add(tmptype);
// group.add(tmpname);
//
// group.setX(screen.width / 2 * r);
// group.setY(screen.height / 2 * r);
// group.setScale(0.7);
//
// //tool tip
// group.on("mousemove", function() {
// var mousePos = stage.getMousePosition();
// tooltip.setPosition(mousePos.x + 5, mousePos.y + 5);
// tooltip.setText(orivalue);
// tooltip.show();
// tooltipLayer.draw();
// });
//
// group.on("mouseout", function() {
// tooltip.hide();
// tooltipLayer.draw();
// });
//
// //animation 어쩌지...
// // tmprect.transitionTo({
// // x : 0,
// // scale : {
// // x : 1,
// // y : 1
// // },
// // duration : 1,
// // easing : 'ease-out'
// // });
//
// wholegroup.add(group);
//
// return wholegroup;
// }

//변수 그림 그리는 함수
function drawBaseVar(datatype, dataname, datavalue) {
	// var wholegroup = new Kinetic.Group();

	var r = Math.random();
	var orivalue = "";
	var group = new Kinetic.Group();
	group.setDraggable(true);

	orivalue = datavalue;

	if (datavalue.length > 8) {
		datavalue = datavalue.substring(0, 8) + "...";
	}

	var tmprect = new Kinetic.Text({
		x : 0,
		y : 0,
		name : orivalue,
		stroke : 'white',
		strokeWidth : 0,
		draggable : true,
		fill : "rgb(" + parseInt(255 * r) + ",160,200)",
		text : "\n" + datavalue,
		fontSize : 30,
		fontFamily : 'Calibri',
		textFill : 'white',
		width : 200,
		height : 100,
		align : 'center',
		shadow : {
			offset : 2,
			color : 'black',
			blur : 3,
			opacity : 0.1
		},
		cornerRadius : 5,
	});

	var tw = tmprect.getWidth();
	var th = tmprect.getHeight();

	var tmptype = new Kinetic.Text({
		y : -23,
		width : tw,
		align : 'left',
		text : datatype,
		fontSize : 18,
		textFill : 'gray',
	});

	var tmpname = new Kinetic.Text({
		y : th + 6,
		x : 0,
		width : tw,
		text : dataname,
		align : 'right',
		fontSize : 15,
		textFill : 'gray',
	});

	group.add(tmprect);
	group.add(tmptype);
	group.add(tmpname);
	// customRand(screen.height)
	group.setX(0);
	group.setY(0);
	// group.setScale(0.7);

	//animation 어쩌지...
	// tmprect.transitionTo({
	// x : 0,
	// scale : {
	// x : 1,
	// y : 1
	// },
	// duration : 1,
	// easing : 'ease-out'
	// });

	// wholegroup.add(group);

	return group;
}

//함수 그림 그리는 함수
function drawFunction(fromLayer, funcName, datatype, dataname, datavalue) {
	var funcLayer = createLayer(funcName);
	var group = drawBaseVar(datatype, dataname, datavalue);
	funcLayer.add(group);
	stage.add(funcLayer);
	dbg.innerHTML = funcLayer.getId();
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

function drawLine(fromObj, toObj) {
	var fromObjX = fromObj.getX();
	var fromObjY = fromObj.getY();
	var toObjX = toObj.getX();
	var toObjY = toObj.getY();
	var fromObjW = fromObj.getWidth();
	var fromObjH = fromObj.getHeight();
	var toObjW = toObj.getWidth();
	var toObjH = toObj.getHeight();

	var linelayer = new Kinetic.Layer();

	var line = new Kinetic.Shape({
		drawFunc : function(context) {
			var fromX = fromObjX + fromObjW / 2;
			var fromY = fromObjY + fromObjH / 2;
			var toX = toObjX + toObjW / 2;
			var toY = toObjY + toObjH / 2;

			context.beginPath();
			context.moveTo(fromX, fromY);
			context.lineTo(toX, toY);
			context.moveTo(fromX + size, toY);
			context.closePath();
			this.fill(context);
			this.stroke(context);
		},
		stroke : "#948E9E",
		strokeWidth : 3
	});

	// line.transitionTo({
	// x : fromObjW,
	// scale : {
	// x : 1,
	// y : 1
	// },
	// duration : 1,
	// easing : 'ease-out'
	// });

	linelayer.add(line);
	stage.add(linelayer);
}

// function drawObject(stage, frameid, dataObj) {
// var layer = createLayer(frameid);
// var r = Math.random();
//
// classgroup = new Kinetic.Group();
// classgroup.setDraggable(true);
//
// tmpgroup = new Kinetic.Group();
//
// var tmpclass = new Kinetic.Text({
// x : 0,
// y : -50,
// stroke : 'white',
// strokeWidth : 0,
// draggable : true,
// fill : "rgb(" + parseInt(255 * Math.random()) + ",160,200)",
// fontSize : 15,
// fontFamily : 'Calibri',
// textFill : 'white',
// text : "\nclass",
// width : 100,
// height : 50,
// // height : 50,
// align : 'center',
// shadow : {
// offset : 2,
// color : 'black',
// blur : 3,
// opacity : 0.1
// },
// cornerRadius : 5,
// });
//
// var tmpcw = tmpclass.getWidth();
// var tmpch = tmpclass.getHeight();
//
// var tmpinstance = new Kinetic.Text({
// x : 0,
// y : 0,
// stroke : 'white',
// strokeWidth : 0,
// draggable : true,
// alpha : 0.5,
// fontFamily : 'Calibri',
// textFill : 'white',
// width : 500,
// height : 500,
// align : 'center',
// shadow : {
// offset : 2,
// color : 'black',
// blur : 3,
// opacity : 0.1
// },
// cornerRadius : 5,
// });
//
// tmpgroup.add(tmpinstance);
//
// var line = new Kinetic.Shape({
// drawFunc : function(context) {
// var fromX = 0;
// var fromY = tmpch / 2;
// var toX = tmpcw;
// var toY = tmpch / 2;
// var size = toX;
// var arrowX = fromX + 0.9 * size;
// var arrowTopY = fromY - 0.707 * (0.1 * size);
// var arrowBottomY = fromY + 0.707 * (0.1 * size);
//
// context.beginPath();
// context.moveTo(fromX, fromY);
// context.lineTo(toX, toY);
// context.moveTo(fromX + size, toY);
// context.lineTo(arrowX, arrowTopY);
// context.closePath();
// context.lineTo(arrowX, arrowBottomY);
// this.fill(context);
// this.stroke(context);
// },
// // fill : "#00D2FF",
// stroke : "#948E9E",
// strokeWidth : 3
// });
//
// for (var key in dataObj) {( function() {
// var data = dataObj[key];
// var tmp = drawClassVar(tmpgroup, tmpinstance, data.type, data.name, data.value);
// tmpgroup.add(tmp);
// }());
// }
//
// tmpgroup.setX((screen.width / 2) * r + tmpcw * 2);
// tmpgroup.setY((screen.height / 2) * r);
// classgroup.add(tmpgroup);
// classgroup.add(tmpclass);
// classgroup.add(line);
// classgroup.setX((screen.width / 2) * r);
// classgroup.setY((screen.height / 2) * r);
// tmpgroup.setDraggable(true);
// classgroup.setDraggable(true);
//
// layer.add(classgroup);
// layer.add(tmpgroup);
// layer.setDraggable(true);
//
// tmpclass.transitionTo({
// y : 0,
// duration : 1,
// easing : 'ease-out'
// });
//
// tmpinstance.transitionTo({
// y : 0,
// duration : 1,
// easing : 'ease-out'
//
// });
//
// line.transitionTo({
// x : tmpcw,
// scale : {
// x : 1,
// y : 1
// },
// // rotation: -Math.PI*2,
// duration : 1,
// // easing : 'elastic-ease-out'
// // easing : 'ease-in',
// // easing : 'ease-in-out'
// easing : 'ease-out'
// });
//
// return layer;
// // stage.add(layer);
// }

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//frame id 찾아서 그 위치에 그리기
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function drawFrame(groupid, frameW) {
	var r = Math.random();

	tmpgroup = createGroup(groupid);

	var tmpinstance = new Kinetic.Circle({
		x : 0,
		y : 0,
		stroke : 'white',
		strokeWidth : 0,
		draggable : true,
		fill : "rgb(" + parseInt(152 + 102 * r) + ",241,219)",
		fontFamily : 'Calibri',
		opacity : 0.3,
		textFill : 'white',
		radius : frameW,
		align : 'center',
		shadow : {
			offset : 2,
			color : 'black',
			blur : 3,
			opacity : 0.1
		},
		text : groupid
	});
	//
	// var tmpinstance = new Kinetic.Text({
	// x : screen.width / 4 * r,
	// y : screen.height / 4 * r,
	// stroke : 'white',
	// strokeWidth : 0,
	// draggable : true,
	// fill : "rgb(" + parseInt(152 + 102 * r) + ",241,219)",
	// fontFamily : 'Calibri',
	// alpha : 0,
	// textFill : 'white',
	// width : frameW,
	// height : frameH,
	// align : 'center',
	// shadow : {
	// offset : 2,
	// color : 'black',
	// blur : 3,
	// opacity : 0.1
	// },
	// cornerRadius : 5,
	// });

	var tmpFrameName = new Kinetic.Text({
		x : -tmpinstance.getRadius() / 2,
		y : -(tmpinstance.getRadius() + 50),
		width : tmpinstance.getRadius(),
		align : 'center',
		text : groupid,
		fontSize : 40,
		textFill : 'gray',
	});

	tmpgroup.setX(customRand(screen.width));
	tmpgroup.setY(customRand(screen.height));

	tmpgroup.add(tmpinstance);
	tmpgroup.add(tmpFrameName);
	tmpgroup.setDraggable(true);

	// tmpinstance.transitionTo({
	// y : 0,
	// duration : 1,
	// easing : 'ease-out'
	// });

	return tmpgroup;
}

//
// function addVarToClass(stage, layer, data) {
// var tmpid = "#" + data.frame;
// var grouparr = stage.get(tmpid);
// var groupframe = grouparr[0];
//
// if (groupframe == undefined || groupframe == null || groupframe == '' || groupframe == 'undefined' || groupframe == 'null') {
// var tmpgroup = drawFrame(data.frame, 400);
// var childgroup = drawBaseVar(data.type, data.name, data.value);
// drawClassVar(tmpgroup, 400, childgroup);
// // tmpgroup.setDraggable(true);
// layer.add(tmpgroup);
// } else {
// drawClassVar(groupframe, 400, data.type, data.name, data.value);
// // layer.draw();
// // groupframe.add(vargroup);
// layer.add(groupframe);
// }
//
// layer.draw();
// }

// array 형식으로 할때 사용
function addVarToClassData(layer, framename, childgroup) {
	var tmpid = "#" + framename;
	//frame name
	var stage = layer.getStage();
	var grouparr = stage.get(tmpid);
	var groupframe = grouparr[0];

	var childgroup;
	var parentgroup;

	if (groupframe == undefined || groupframe == null || groupframe == '' || groupframe == 'undefined' || groupframe == 'null') {
		var tmpgroup = drawFrame(framename, 400);

		tmpgroup.add(drawClassVar(tmpgroup, 400, childgroup));
		layer.add(tmpgroup);
		parentgroup = tmpgroup;

		doAnim(tmpgroup, 1);
	} else {
		groupframe.add(drawClassVar(groupframe, 400, childgroup));
		parentgroup = groupframe;

		doAnim(groupframe, 1);
	}

	layer.draw();

	return parentgroup;
}

// 나중에 json 형식으로 할때 사용
function addVarToClassJson(layer, jsondata) {
	var tmpid = "#" + jsondata.framename;
	var stage = layer.getStage();
	var grouparr = stage.get(tmpid);
	var groupframe = grouparr[0];
	var childdata = jsondata.data;
	var num = childdata.length;
	// var tmplayer = new Kinetic.Layer();

	// for (var key in data) {( function() {
	// dt = data[key];
	// }());
	// }
	var childgroup;
	var parentgroup;

	if (groupframe == undefined || groupframe == null || groupframe == '' || groupframe == 'undefined' || groupframe == 'null') {
		var tmpgroup = drawFrame(jsondata.framename, 400);

		if (jsondata.flag == 'built') {
			childgroup = drawBuiltVarJson(childdata);
		} else if (jsondata.flag == 'basic') {
			childgroup = drawBaseVar(childdata.type, childdata.name, childdata.value);
		}
		tmpgroup.add(drawClassVar(tmpgroup, 400, childgroup));
		layer.add(tmpgroup);
		parentgroup = tmpgroup;

		doAnim(tmpgroup, 1);
	} else {
		if (jsondata.flag == 'built') {
			childgroup = drawBuiltVarJson(childdata);
		} else if (jsondata.flag == 'basic') {
			childgroup = drawBaseVar(childdata.type, childdata.name, childdata.value);
		}
		groupframe.add(drawClassVar(groupframe, 400, childgroup));
		parentgroup = groupframe;

		doAnim(groupframe, 1);
	}

	layer.draw();

	return parentgroup;
}

// enter 입력에 사용
function addVarToClass(layer, data) {
	var tmpid = "#" + data[0];
	var stage = layer.getStage();
	var grouparr = stage.get(tmpid);
	var groupframe = grouparr[0];
	// var tmplayer = new Kinetic.Layer();

	// for (var key in data) {( function() {
	// dt = data[key];
	// }());
	// }

	if (groupframe == undefined || groupframe == null || groupframe == '' || groupframe == 'undefined' || groupframe == 'null') {
		var tmpgroup = drawFrame(data[0], 400);

		var childgroup;

		if (data[1] == 'built') {
			childgroup = drawBuiltVar(data[2], "type", "name", "value");
		} else if (data[1] == 'basic') {
			childgroup = drawBaseVar(data[2], data[3], data[4]);
		}

		tmpgroup.add(drawClassVar(tmpgroup, 400, childgroup));
		layer.add(tmpgroup);
	} else {
		var childgroup;

		if (data[1] == 'built') {
			childgroup = drawBuiltVar(data[2], "type", "name", "value");
		} else if (data[1] == 'basic') {
			childgroup = drawBaseVar(data[2], data[3], data[4]);
		}

		groupframe.add(drawClassVar(groupframe, 400, childgroup));
	}
	layer.draw();
}

function drawClassVar(parent, parentW, childgroup) {
	childgroup.setDraggable(true);

	childgroup.setX(-customRand(parentW) * 2 / 3);
	childgroup.setY(-customRand(parentW) * 2 / 3);

	childgroup.setScale(0.5);
	return childgroup;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//move to center
///////////////////////////////////////////////////////////////////////////////////////////////////////////////

function getPos(obj) {
	for (var lx = 0, ly = 0; obj != null; lx += obj.offsetLeft, ly += obj.offsetTop, obj = obj.offsetParent);
	return {
		x : lx,
		y : ly
	};
}

function cameraView(layer, evt, scale) {
	var stage = layer.getStage();
	var canvas = stage.getContainer();
	var node = evt.shape;
	var cvsPos = getPos(canvas);

	var R = {//(canvas space)
		x : evt.pageX,
		y : evt.pageY
	};

	// var mousePosition = stage.getMousePosition();

	var thisPos = layer.getPosition();
	var w = stage.getWidth();
	var h = stage.getHeight();

	var scl = layer.getScale().x;

	var centerPos = {
		x : w / 2,
		y : h / 2
	}

	// mousePos == xA
	var xA = {
		x : (R.x - thisPos.x - cvsPos.x) / scl,
		y : (R.y - thisPos.y - cvsPos.y) / scl
	}

	var newPos = {
		x : centerPos.x - scl * xA.x,
		y : centerPos.y - scl * xA.y
	}

	layer.transitionTo({
		x : newPos.x,
		y : newPos.y,
		scale : {
			x : scale,
			y : scale
		},
		duration : 1,
		easing : 'ease-out',
	});

	// // debugging
	// var cvsPosdbg = "cvsPos : " + cvsPos.x + " , " + cvsPos.y + "\n";
	// var thisposdbg = "getCenterPos : " + getCenterPos(evt.shape).x + " , " + getCenterPos(evt.shape).y + "\n";
	// var thisdbg = "thisPos : " + thisPos.x + " , " + thisPos.y + "\n";
	// var centerposdbg = "centerPos : " + centerPos.x + " , " + centerPos.y + "\n";
	// var mouseposdbg = "mousePos : " + mousePosition.x + " , " + mousePosition.y + "\n";
	// var Rdbg = "R : " + R.x + " , " + R.y + "\n";
	// var xAdbg = "xA : " + xA.x + " , " + xA.y + "\n";
	// var newPosdbg = "newPos : " + newPos.x + " , " + newPos.y + "\n";
	//
	// stagedbg.innerHTML = cvsPosdbg + thisposdbg + thisdbg + centerposdbg + mouseposdbg + Rdbg + xAdbg + newPosdbg;
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//draw Builtin
///////////////////////////////////////////////////////////////////////////////////////////////////////////////
function drawBuiltIn(index, data) {
	var r = Math.random();
	var group = new Kinetic.Group();
	group.setDraggable(true);

	var tmprect = new Kinetic.Rect({
		x : 0,
		y : 0,
		stroke : 'white',
		strokeWidth : 0,
		draggable : true,
		fill : "#353535",
		width : 200,
		height : 200,
		align : 'center',
		shadow : {
			offset : 2,
			color : 'black',
			blur : 3,
			opacity : 0.1
		},
		cornerRadius : 5,
	});

	var tw = tmprect.getWidth();
	var th = tmprect.getHeight();

	var tmpindex = new Kinetic.Text({
		y : 0,
		width : tw,
		stroke : 'white',
		strokeWidth : 0,
		align : 'center',
		verticalAlign : 'center',
		text : index + "",
		fontSize : 30,
		textFill : 'white',
		cornerRadius : 5,
	});

	var tmpgroup = new Kinetic.Group({
		x : 0,
		y : 0,
		width : tw,
		align : 'center',
	});

	data.setX(30);
	data.setY(80);
	data.setScale(0.7);
	tmpgroup.add(data);

	group.add(tmprect);
	group.add(tmpindex);
	group.add(tmpgroup);

	return group;
}

// //내장형 자료형 그리는 함수
function drawBuiltVar(num, datatype, dataname, datavalue) {
	var testgr = new Array();
	var pregr = null;
	var sumX = 0;
	var mergegroup = new Kinetic.Group();
	mergegroup.setDraggable(true);

	for (var i = 0; i < num; i++) {
		testgr[i] = drawBuiltIn(i, drawBaseVar(datatype, dataname, datavalue));

		// testgr[i].setX(0);

		if (pregr != null) {
			sumX = sumX + 200;
			testgr[i].setX(sumX);
		}
		mergegroup.add(testgr[i]);
		pregr = testgr[i];
	}

	return mergegroup;
}

//내장형 자료형 그리는 함수
function drawBuiltVarJson(data) {
	var testgr = new Array();
	var pregr = null;
	var sumX = 0;
	var num = data.length;

	var mergegroup = new Kinetic.Group();
	mergegroup.setDraggable(true);

	var i = 0;
	var indexdata = 0;
	for (var key in data) {
		if (i == num) {
			break;
		}( function() {
				var tmpdata = data[key];
				if (tmpdata != undefined || tmpdata != null || tmpdata != '' || tmpdata != 'undefined' || tmpdata != 'null') {
					if (tmpdata.index == undefined) {
						indexdata = i;
					} else {
						indexdata = tmpdata.index;
					}

					testgr[i] = drawBuiltIn(indexdata, drawBaseVar(tmpdata.type, tmpdata.name, tmpdata.value));

					if (pregr != null) {
						sumX = sumX + 200;
						testgr[i].setX(sumX);
					}
					mergegroup.add(testgr[i]);
					pregr = testgr[i];

				}
			}());
		i++;
	}

	return mergegroup;
}

// 			sample 그리는 용도
// var Execfile = new Array("/home/junbum/workspace/CodeVisualizerDebugger/src/ExampleCode/Python/bdb-example-1.py", 'execfile()', '24', 'b', '6', 'a', '5', 'c', '3');
function drawSampleData(layer, datas, objdatas) {
	var dataLen = datas.length;

	for (var i = 3; i < dataLen; i++) {
		var childgr = drawBaseVar(datas[i], "", datas[i + 1]);
		var parentgr = addVarToClassData(layer, datas[1], childgr);
		layer.add(parentgr);

		if (checkStr(datas[i + 1], 'instance')) {//instance가 포함되어 있다면
			drawSampleData(layer, objdatas);
		}

		parentgr.transitionTo({
			y : 0,
			duration : 1,
			easing : 'ease-out'
		});
		i++;
	}
	layer.draw();

	return datas[0] + ":" + datas[1] + ":" + datas[2] + "번째 줄";
}

//문자열에 포함되어 있는지 check
function checkStr(strdata, substr) {
	var pattern = new RegExp(substr, "g");

	if (pattern.exec(strdata)) {
		return true;
	} else {
		return false;
	}
}

//애니메이션

function doAnim(target, dura) {
	// var tmp = target.getChildren();
	// var len = tmp.length;

	target.transitionTo({
		x : target.getX() - 300,
		duration : dura,
		easing : 'ease-out'
	});

	// while (true) {
	// if (len == 0) {
	// break;
	// } else {
	// len--;
	// }
	//
	// tmp[len].transitionTo({
	// x : tmp[len].getX() - 300,
	// duration : dura * 2,
	// easing : 'ease-out',
	// });
	// }
}

function customRand(range) {
	var a = 1664525;
	var m = 4294967296;
	var c = 1013904223;

	var offset = 0;

	var x = Math.round(Math.random() * range);

	var tmp = (a * x + c) % m;

	var res = tmp % range + offset;

	return res;
}

//n1 : -5   ~   n2 : 5
function randomRange(n1, n2) {
	return Math.floor((Math.random() * (n2 - n1 + 1)) + n1);
}
