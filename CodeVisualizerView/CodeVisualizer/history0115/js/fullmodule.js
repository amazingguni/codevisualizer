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

function drawing() {
	var tmp = drawBaseVar("test", "test", "test");
	var tmpW = tmp.children[0].getWidth();
	var tmpH = tmp.children[0].getHeight();

	//center값
	tmp.setScale(3);
	tmp.setAbsolutePosition(picW / 2 - (tmpW / 2 * tmp.getScale().x), picH / 2 - ((tmpH / 2 + 20) * tmp.getScale().x));
	// tmp.setX(picture.offsetWidth / 2 - (tmpW / 2 * tmp.getScale().x));
	// tmp.setY(picture.offsetHeight / 2 - ((tmpH / 2 + 20) * tmp.getScale().x));
	// tmp.setAbsolutePosition(picture.offsetWidth / 2 - (tmpW / 2 * tmp.getScale().x), picture.offsetHeight / 2 - ((tmpH / 2 + 20) * tmp.getScale().x) - (picture.offsetHeight * num++));

	mainlayer.add(tmp);
	mainlayer.draw();
}

function drawSample() {
	var tmpData = evalData.FrameDict;

	for (var childkey in tmpData) {( function() {
				var childData = tmpData[childkey];
				drawSampleDataJson(mainlayer, childData, evalData.objDict);
			}());

	}
}

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

function drawSampleDataJson(layer, datas, objDatas) {
	// if ( typeof (datas) == Object) {
	// for (var key in datas) {( function() {
	// var tmpdata = datas[key];
	// var childgr = drawBuiltVarSample(tmpdata);
	// var parentgr = addVarToClassData(layer, tmpdata, childgr);
	// layer.add(parentgr);
	// }());
	// }
	// }
	var dataLen = datas.length;

	for (var i = 3; i < dataLen; i++) {

		var childgr = drawBaseVar(datas[i], "", datas[i + 1]);
		var parentgr = addVarToClassData(layer, datas[1], childgr);
		layer.add(parentgr);

		if (checkStr(datas[i + 1], 'instance')) {//instance가 포함되어 있다면
			drawSampleDataJson(layer, objDatas, null);
		}

		parentgr.transitionTo({
			y : 0,
			duration : 1,
			easing : 'ease-out'
		});
		i++;
	}
	layer.draw();

	testdbg.innerHTML += datas[0] + ":" + datas[1] + ":" + datas[2] + "번째 줄 <br>";

	if (objDatas == null) {
		return;
	}
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

function drawFrame(groupid, frameW) {
	var r = Math.random();

	tmpgroup = createGroup(groupid);

	var tmpinstance = new Kinetic.Circle({
		x : 0,
		y : 0,
		stroke : 'white',
		strokeWidth : 0,
		opacity : 0.3,
		draggable : true,
		fill : "rgb(" + parseInt(152 + 102 * r) + ",241,219)",
		fontFamily : 'Calibri',
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

function drawClassVar(parent, parentW, childgroup) {
	childgroup.setDraggable(true);

	childgroup.setX(-customRand(parentW) * 2 / 3);
	childgroup.setY(-customRand(parentW) * 2 / 3);

	childgroup.setScale(0.5);
	return childgroup;
}

// preziTest
function drawing() {
	var tmp = drawBaseVar("test", "test", "test");
	var tmpW = tmp.children[0].getWidth();
	var tmpH = tmp.children[0].getHeight();

	//center값
	tmp.setScale(3);
	tmp.setAbsolutePosition(screen.width / 2 - (tmpW / 2 * tmp.getScale().x), screen.height / 2 - ((tmpH / 2 + 20) * tmp.getScale().x) - (screen.height * num++));

	mainlayer.add(tmp);
	mainlayer.draw();
}

function drawingJson(tmpdata) {
	for (var key in tmpdata) {( function() {
				//alert(key);
				var data = tmpdata[key];
				var tmp = addVarToClassJson(data);

				tmp.setAbsolutePosition(screen.width / 2 - (200 * tmp.getScale().x), screen.height / 2 - (200 * tmp.getScale().x) - (screen.height * num++));
			}());
	}
}

function preziprev() {--prezinum;
	mainlayer.add(createFrame(prezinum));
	mainlayer.draw();

	mainlayer.transitionTo({
		y : (screen.height * prezinum),
		scale : {
			x : 1,
			y : 1
		},
		duration : 1.2,
		easing : 'ease-out'
	});

	mainlayer.draw();
	testdbg.innerHTML = prezinum + "페이지";
}

function prezinext() {++prezinum;
	mainlayer.add(createFrame(prezinum));
	mainlayer.draw();

	mainlayer.transitionTo({
		y : (screen.height * prezinum),
		scale : {
			x : 1,
			y : 1
		},
		duration : 1.2,
		easing : 'ease-out'
	});

	mainlayer.draw();
	testdbg.innerHTML = prezinum + "페이지";
}

// function createFrame(frameid) {
// var tmpid = "#" + frameid;
// var stage = mainlayer.getStage();
// var grouparr = stage.get(tmpid);
// var groupframe = grouparr[0];
//
// if (groupframe == undefined || groupframe == null || groupframe == '' || groupframe == 'undefined' || groupframe == 'null') {
// tmpgroup = createGroup(frameid);
// tmpgroup.setAbsolutePosition(0, -(screen.height * prezinum));
//
// var tmpFrameName = new Kinetic.Text({
// x : 0,
// y : 0,
// align : 'left',
// text : prezinum,
// fontSize : 20,
// textFill : 'gray',
// });
//
// tmpgroup.add(tmpFrameName);
// // mainlayer.add(tmpgroup);
// return tmpgroup;
// } else {
// groupframe.setAbsolutePosition(0, -(screen.height * prezinum));
// return groupframe;
// }
// }

function test() {
	testdbg.innerHTML = mainlayer.children[0].getAbsolutePosition().x + ", " + mainlayer.children[0].getAbsolutePosition().y;
}

function childDraw() {
	for (var key in tmpdata) {( function() {
				//alert(key);
				var data = tmpdata[key];
				addVarToClassJsonprezi(data);
			}());
	}
	// var vardata = drawBaseVar("testtype", "testname", "textValue");
	//
	// drawOnFrame(1, vardata);
	// drawOnFrame(1, vardata);
	// drawOnFrame(3, vardata);
	// drawOnFrame(4, vardata);
	// drawOnFrame(2, vardata);
	// drawOnFrame(1, vardata);
	// drawOnFrame(3, vardata);
	// drawOnFrame(4, vardata);
	// drawOnFrame(6, vardata);
	// drawOnFrame(0, vardata);
	// drawOnFrame(-1, vardata);
	// drawOnFrame(1, vardata);
	// drawOnFrame(2, vardata);
}

function drawOnFrame(framename, data) {
	var tmpid = "#" + framename;
	var stage = mainlayer.getStage();
	var grouparr = stage.get(tmpid);
	var groupframe = grouparr[0];
	// data.setX(-customRand(screen.width) * 2 / 3);
	// data.setY(-customRand(screen.height) * 2 / 3);

	// data.setAbsolutePosition(0, -(screen.height * framename));
	if (groupframe == undefined || groupframe == null || groupframe == '' || groupframe == 'undefined' || groupframe == 'null') {
		var tmpframe = createFrame(framename);
		data.setX(screen.width / 2);
		data.setY(tmpframe.getY() + screen.height / 2);
		tmpframe.add(data);
	} else {
		data.setX(screen.width / 2);
		data.setY(groupframe.getY() + screen.height / 2);
		groupframe.add(data);
	}
	mainlayer.draw();
}

function addVarToClassDataprezi(layer, framename, childgroup) {
	var tmpid = "#" + framename;
	//frame name
	var stage = layer.getStage();
	var grouparr = stage.get(tmpid);
	var groupframe = grouparr[0];

	var childgroup;
	var parentgroup;

	if (groupframe == undefined || groupframe == null || groupframe == '' || groupframe == 'undefined' || groupframe == 'null') {
		var tmpgroup = createFrame(framename);

		tmpgroup.add(drawClassVarprezi(tmpgroup, childgroup));
		layer.add(tmpgroup);
		parentgroup = tmpgroup;

		// doAnim(tmpgroup, 1);
	} else {
		groupframe.add(drawClassVarprezi(groupframe, childgroup));
		parentgroup = groupframe;

		// doAnim(groupframe, 1);
	}

	layer.draw();

	return parentgroup;
}

// 나중에 json 형식으로 할때 사용
function addVarToClassJsonprezi(jsondata) {
	var tmpid = "#" + jsondata.framename;
	var stage = mainlayer.getStage();
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
		var tmpgroup = createFrame(jsondata.framename);

		if (jsondata.flag == 'built') {
			childgroup = drawBuiltVarJson(childdata);
		} else if (jsondata.flag == 'basic') {
			childgroup = drawBaseVar(childdata.type, childdata.name, childdata.value);
		}
		tmpgroup.add(drawClassVarprezi(tmpgroup, childgroup));
		mainlayer.add(tmpgroup);
		parentgroup = tmpgroup;

		// doAnim(tmpgroup, 1);
	} else {
		if (jsondata.flag == 'built') {
			childgroup = drawBuiltVarJson(childdata);
		} else if (jsondata.flag == 'basic') {
			childgroup = drawBaseVar(childdata.type, childdata.name, childdata.value);
		}
		groupframe.add(drawClassVarprezi(groupframe, childgroup));
		parentgroup = groupframe;

		// doAnim(groupframe, 1);
	}

	mainlayer.draw();

	return parentgroup;
}

function drawClassVarprezi(parent, child) {
	child.setDraggable(true);
	// + customRand(screen.width)
	child.setX(parent.getX());
	child.setY(parent.getY());
	return child;
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

//문자열에 포함되어 있는지 check
function checkStr(strdata, substr) {
	var pattern = new RegExp(substr, "g");

	if (pattern.exec(strdata)) {
		return true;
	} else {
		return false;
	}
}
