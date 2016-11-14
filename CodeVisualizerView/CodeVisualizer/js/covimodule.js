function drawData(alldata) {

	// var testA = ['execfile','spam','frame'];
	// window.alert(testA.inArray('spam'));

	if (datacount == alldatas.length + 1) {
		var drawDatabtn = document.getElementById("drawData");
		drawDatabtn.innerHTML = "Don't Click";
		return -1;
	}
	var tmptostring = objectToString(alldata);
	var tmptoobject = stringToObject(tmptostring);

	var framedict = tmptoobject.FrameDict;
	var objdict = tmptoobject.objDict;
	var framelist = tmptoobject.FrameList;
	var printlist = tmptoobject.printList;

	var existframe = mainlayer.get(".frame");
	var existlen = existframe.length;
	var framelen = framelist.length;

	if (printlist.length != 0) {
		for (var i = 0; i < printlist.length; i++) {
			output_content.innerHTML += printlist[i] + "<br>";
		}
	}

	if (existlen == 0) {
		for (var j = 0; j < framelist.length; j++) {
			if (checkStr(framelist[j], frameListEOF)) {
				break;
			}
			createFrame(framelist[j]);
		}
	} else {
		for (var j = 0; j < framelist.length; j++) {
			if (checkStr(framelist[j], frameListEOF)) {
				break;
			}

			if (existlen > framelen) {
				var tmp = 0;
				for (var k = 0; k < existframe.length; k++) {
					var checkexistframe = framelist.inArray(existframe[k].getId());

					if (checkexistframe) {
						continue;
					} else if (!checkexistframe) {
						removeFromId(existframe[k].getId());
						tmp = k;
					}
				}

				for (var l = tmp; l < existframe.length; l++) {
					var tmpH = existframe[l].getY();
					existframe[l].setY(tmpH + picH);
				}
			} else if (existlen < framelen) {
				var checkframe = existframe.frameinArray(framelist[j]);

				if (checkframe) {
					continue;
				} else {
					createFrame(framelist[j]);
				}
			} else {
				var checkframe = existframe.frameinArray(framelist[j]);
				var checkexistframe = framelist.inArray(existframe[j].getId());

				if (checkframe && checkexistframe) {
					continue;
				} else if (!checkframe) {
					//문제가 있는듯?
					removeFromId(existframe[j].getId());
					createFrame(framelist[j]);
				}
			}

		}
	}
	mainlayer.draw();

	//object 그리는 자리
	drawObject(objdict, null);

	// framedict 내용 그리기
	for (var childkey in framedict) {( function() {
				var childData = framedict[childkey];
				drawSampleDataJson(childData);
			}());

	}

	testdbg.innerHTML = datacount - 1;
	preframelist = framelist;
	return 0;
}

function objectinArray(object, needle) {
	for (var key in object) {
		var tmpkey = key.substring(0, 7);
		if (tmpkey == needle) {
			return true;
		}
	}
	return false;
}

Array.prototype.inArray = function(needle) {
	for (var i = 0, len = this.length; i < len; i++) {
		if (this[i] == needle) {
			return true;
		}
	}
	return false;
}

Array.prototype.frameinArray = function(needle) {
	for (var i = 0, len = this.length; i < len; i++) {
		if (this[i].getId() == needle) {
			return true;
		}
	}
	return false;
}
function drawSampleDataJson(datas) {
	var dataLen = datas.length;

	var tmpnum = 0;

	for (var i = 3; i < dataLen; i++) {

		var tmpframe = addVarToFrame(datas[1], datas[i], datas[i + 1], (dataLen - 3) / 2);
		// mainlayer.add(parentgr);
		// mainlayer.draw();

		if (checkStr(datas[i + 1], 'instance')) {//instance가 포함되어 있다면
			// 						여기 선 그리는거

			var instanceStr = datas[i + 1];
			var tmp = instanceStr.substring(instanceStr.length - 8, instanceStr.length - 1);

			// 출발점
			var startarr = tmpframe.get(".basicvar");
			var startNode = startarr[(i - 3) / 2];

			// 끝 점
			var existobject = mainlayer.get(".object");
			var endNode;

			for (var j = 0; j < existobject.length; j++) {
				if (existobject[j].getId() == tmp) {
					endNode = existobject[j]
				}
			}
			// connStartToEnd(startNode, endNode);

		}
		mainlayer.draw();

		// parentgr.transitionTo({
		// y : 0,
		// duration : 1,
		// easing : 'ease-out'
		// });
		i++;
	}
	mainlayer.draw();

	dbgcontent.innerHTML = datas[0] + ":" + datas[1] + ":" + datas[2] + "번째 줄 <br>";

	// if (objDatas == null) {
	// return;
	// }
}

// function addVarToObject(framename, text) {
// var tmpid = "#" + framename;
// //frame name
// var stage = mainlayer.getStage();
// var grouparr = stage.get(tmpid);
// var groupframe = grouparr[0];
//
// var childarr = groupframe.get(".basicvar");
//
// var childlen = childarr.length;
//
// if (childlen == 0) {
// var childgr = drawBaseVar(datatype, "", datavalue);
// groupframe.add(setVarsPos(groupframe, childgr));
// childgr.transitionTo({
// scale : {
// x : 0.7,
// y : 0.7
// },
// duration : 1,
// easing : 'elastic-ease-out'
// });
// mainlayer.draw();
// }
//
// for (var i = 0; i < childlen; i++) {
// var targetIndex = findIndex(childlen, childarr, datatype);
//
// if (targetIndex == -1) {
// var childgr = drawBaseVar(datatype, "", datavalue);
// groupframe.add(setVarsPos(groupframe, childgr));
// childgr.transitionTo({
// scale : {
// x : 0.7,
// y : 0.7
// },
// duration : 1,
// easing : 'elastic-ease-out'
// });
// mainlayer.draw();
// break;
// } else {
// var childtype = childarr[targetIndex].children[1].getText();
// var childname = childarr[targetIndex].children[0].getText();
//
// if (childname == "\n" + datavalue) {
// } else {
// if (datavalue <= 8) {
// childarr[targetIndex].children[0].setFontSize(30);
// }
// childarr[targetIndex].children[0].setText("\n" + datavalue);
// childarr[targetIndex].transitionTo({
// scale : {
// x : 0.7,
// y : 0.7
// },
// duration : 1,
// easing : 'elastic-ease-out'
// });
// mainlayer.draw();
// }
// break;
// }
// }
// return groupframe;
// }

function addVarToFrame(framename, datatype, datavalue, num) {

	if (checkStr(datavalue, 'instance')) {//instance가 포함되어 있다면
		var instanceStr = datavalue;
		datavalue = instanceStr.substring(instanceStr.length - 8, instanceStr.length - 1);
	}

	var tmpid = "#" + framename;
	//frame name
	var stage = mainlayer.getStage();
	var grouparr = stage.get(tmpid);
	var groupframe = grouparr[0];

	var childarr = groupframe.get(".basicvar");

	var childlen = childarr.length;

	if (childlen == 0) {
		var childgr = drawBaseVar(datatype, "", datavalue);
		groupframe.add(setVarsPos(groupframe, childgr));
		childgr.transitionTo({
			scale : {
				x : 0.7,
				y : 0.7
			},
			duration : 1,
			easing : 'elastic-ease-out'
		});
		mainlayer.draw();
	}

	for (var i = 0; i < childlen; i++) {
		var targetIndex = findIndex(childlen, childarr, datatype);

		if (targetIndex == -1) {
			var childgr = drawBaseVar(datatype, "", datavalue);
			groupframe.add(setVarsPos(groupframe, childgr));
			childgr.transitionTo({
				scale : {
					x : 0.7,
					y : 0.7
				},
				duration : 1,
				easing : 'elastic-ease-out'
			});
			mainlayer.draw();
			break;
		} else {
			var childtype = childarr[targetIndex].children[1].getText();
			var childname = childarr[targetIndex].children[0].getText();

			if (childname == "\n" + datavalue) {
			} else {
				if (datavalue <= 8) {
					childarr[targetIndex].children[0].setFontSize(30);
				}
				childarr[targetIndex].children[0].setText("\n" + datavalue);
				childarr[targetIndex].transitionTo({
					scale : {
						x : 0.7,
						y : 0.7
					},
					duration : 1,
					easing : 'elastic-ease-out'
				});
				mainlayer.draw();
			}
			break;
		}
	}
	return groupframe;
}

function findIndex(len, childarr, datatype) {
	while (len-- != 0) {
		if (childarr[len].children[1].getText() == datatype) {
			break;
		}
	}
	return len;
}

function setVarsPos(parent, childgroup) {
	var width = parent.children[0].getWidth();
	var height = parent.children[0].getHeight();
	childgroup.setDraggable(true);

	childgroup.setX(parent.children[0].getX() + customRand(width * 5 / 6));
	childgroup.setY(parent.children[0].getY() + customRand(height * 5 / 6));

	return childgroup;
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

//변수 그림 그리는 함수
function drawBaseVar(datatype, dataname, datavalue) {
	// var wholegroup = new Kinetic.Group();

	var r = Math.random();
	var orivalue = "";
	var group = new Kinetic.Group();
	group.setDraggable(true);

	orivalue = datavalue;

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

	if (datavalue.length > 8) {
		// datavalue = datavalue.substring(0, 8) + "...";
		tmprect.setFontSize(20);
	}

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
	group.setScale(0.3);
	group.setName("basicvar");

	// wholegroup.add(group);

	return group;
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

// 			framelist : 현재 FrameList
function createFrame(frameid) {
	var tmpid = "#" + frameid;
	var stage = mainlayer.getStage();
	var grouparr = stage.get(tmpid);
	var groupframe = grouparr[0];

	if (groupframe == undefined || groupframe == null || groupframe == '' || groupframe == 'undefined' || groupframe == 'null') {
		tmpgroup = createGroup(frameid);
		tmpgroup.setName("frame");
		var existframe = mainlayer.get(".frame");
		var existlen = existframe.length;
		tmpgroup.setAbsolutePosition(0, -picH * existlen);

		var tmpFrameName = new Kinetic.Text({
			x : 0,
			y : 0,
			width : picW,
			height : picH,
			fill : "#eee", //frame 구분하기 위한 색상
			align : 'left',
			text : frameid,
			fontSize : 20,
			textFill : 'gray',
		});

		tmpgroup.add(tmpFrameName);
		tmpgroup.setDraggable(true);
		mainlayer.add(tmpgroup);

		prezinext();
		return tmpgroup;
	} else {
		return groupframe;
	}
}

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

//문자열에 포함되어 있는지 check
function checkStr(strdata, substr) {
	var pattern = new RegExp(substr, "g");

	if (pattern.exec(strdata)) {
		return true;
	} else {
		return false;
	}
}

function preziprev() {
	if (prezinum == 0) {
		return;
	}
	mainlayer.transitionTo({
		y : (picH * --prezinum),
		scale : {
			x : 1,
			y : 1
		},
		duration : 1.2,
		easing : 'ease-out'
	});

	mainlayer.draw();
	pagenumdbg.innerHTML = (prezinum + 1) + "페이지";
}

function prezinext() {
	if (prezinum == mainlayer.children.length - 1) {
		return;
	}
	mainlayer.transitionTo({
		y : (picH * ++prezinum),
		scale : {
			x : 1,
			y : 1
		},
		duration : 1.2,
		easing : 'ease-out'
	});

	mainlayer.draw();
	pagenumdbg.innerHTML = (prezinum + 1) + "페이지";
}

function removeFromId(eraseid) {

	var tmpid = "#" + eraseid;
	var stage = mainlayer.getStage();
	var erasearr = stage.get(tmpid);
	var eraseTarget = erasearr[0];

	if (eraseTarget != null) {
		eraseTarget.remove();
		preziprev();
	}
}

function removeTarget(eraseTarget) {
	if (eraseTarget != null) {
		eraseTarget.remove();
	}
}

function setPosInObject(objGroup, childdata) {
	childdata.setScale(1);
	childdata.setAbsolutePosition(objGroup.children[0].getWidth() / 2 - childdata.children[0].getWidth() / 2, objGroup.children[0].getHeight() / 2 - childdata.children[0].getHeight() / 2);

	objGroup.add(childdata);
}

function connectStartToEnd(startGroup, endGroup) {
	var existframe = mainlayer.get(".frame");
	var existlen = existframe.length;

	var startpointX = startGroup.getX() + startGroup.children[0].getWidth() / 2;
	var startpointY = startGroup.getY() + startGroup.children[0].getHeight() / 2;
	var endpointX = endGroup.getX() + endGroup.children[0].getWidth() / 2;
	var endpointY = endGroup.getY() + endGroup.children[0].getHeight() / 2;

	// var startpointX = startGroup.getAbsolutePosition().x + startGroup.children[0].getWidth() / 2;
	// var startpointY = startGroup.getAbsolutePosition().y + (startGroup.children[0].getHeight() / 2) - ((existlen - 1) * picH);
	// var endpointX = endGroup.getAbsolutePosition().x + endGroup.children[0].getWidth() / 2;
	// var endpointY = endGroup.getAbsolutePosition().y + (endGroup.children[0].getHeight() / 2) - ((existlen - 1) * picH);

	var connline = new Kinetic.Line({
		points : [startpointX, startpointY, endpointX, endpointY],
		stroke : 'red',
		strokeWidth : 3,
		lineCap : 'round',
		lineJoin : 'round',
		opacity : 0.5,
		id : endGroup.getId(),
		name : 'line'
	});

	mainlayer.add(connline);
	connline.moveToBottom();
	mainlayer.draw();

	// connline.transitionTo({
	// strokeWidth : 5,
	// duration : 0.5,
	// easing : 'linear'
	// });
	//
	// mainlayer.draw();
	return connline;
}

function connStartToEnd(start, end) {
	// var startpointX = start.getAbsolutePosition().x + start.children[0].getWidth() / 2;
	// var startpointY = start.getAbsolutePosition().y + start.children[0].getHeight() / 2;
	// var endpointX = end.getAbsolutePosition().x + end.children[0].getWidth() / 2;
	// var endpointY = end.getAbsolutePosition().y + end.children[0].getHeight() / 2;
	var existframe = mainlayer.get(".frame");
	var existlen = existframe.length;

	var startpointX = start.getAbsolutePosition().x + start.children[0].getWidth() / 2;
	var startpointY = start.getAbsolutePosition().y + (start.children[0].getHeight() / 2) - ((existlen - 1) * picH);
	var endpointX = end.getAbsolutePosition().x + end.children[0].getWidth() / 2;
	var endpointY = end.getAbsolutePosition().y + (end.children[0].getHeight() / 2) - ((existlen - 1) * picH);

	var connline = new Kinetic.Line({
		points : [startpointX, startpointY, endpointX, endpointY],
		stroke : '#F24B4B',
		strokeWidth : 0,
		lineCap : 'round',
		lineJoin : 'round',
		id : end.getId(),
		name : 'line'
	});

	mainlayer.add(connline);
	connline.moveDown();
	mainlayer.draw();

	connline.transitionTo({
		strokeWidth : 5,
		duration : 0.5,
		easing : 'linear'
	});

	mainlayer.draw();
	return connline;
}

function objectDragEvent(start, end) {
	start.on('dragstart', function() {
		start.setOpacity(0.3);
		mainlayer.get("#line")[0].remove();
	});
	start.on('dragend', function() {
		start.setOpacity(1);
		connStartToEnd(start, end);
	});
	end.on('dragstart', function() {
		end.setOpacity(0.3);
		mainlayer.get("#line")[0].remove();
	});
	end.on('dragend', function() {
		end.setOpacity(1);
		connStartToEnd(start, end);
	});
}

function removeLineFromId(eraseid) {
	var existLine = mainlayer.get(".line");
	var target = null;

	for (var i = 0; i < existLine.length; i++) {
		if (existLine[i].getId() == eraseid) {
			target = existLine[i]
			target.remove();
		}
	}

	// if (target != null) {
	// }
}

function createObject(objectid) {
	var r = Math.random();

	var objGroup = createGroup("object");
	objGroup.setId(objectid);

	var tmpinstance = new Kinetic.Text({
		x : 0,
		y : 0,
		width : 250,
		height : 150,
		stroke : 'white',
		strokeWidth : 0,
		draggable : true,
		fill : "rgb(" + parseInt(152 + 102 * r) + ",241,219)",
		fontFamily : 'Calibri',
		fontSize : 15,
		padding : 20,
		textFill : 'gray',
		align : 'left',
		shadow : {
			offset : 2,
			color : 'black',
			blur : 3,
			opacity : 0.1
		},
		cornerRadius : 5
	});

	var tw = tmpinstance.getWidth();
	var th = tmpinstance.getHeight();

	var tmpobjname = new Kinetic.Text({
		y : -30,
		width : tw,
		align : 'left',
		text : objectid,
		fontSize : 25,
		textFill : 'gray',
	});

	// objGroup.setX(customRand(screen.width / 2));
	// objGroup.setY(customRand(screen.height / 2));
	objGroup.setName("object");

	objGroup.add(tmpinstance);
	objGroup.add(tmpobjname);
	objGroup.setDraggable(true);

	return objGroup;
}

function drawObject(objdict, connId) {

	if (connId == null) {

		var existframe = mainlayer.get(".frame");
		var existlen = existframe.length;

		var existobject = mainlayer.get(".object");
		var existobjectlen = existobject.length;
		var objectlist = new Array();
		var objectnamelist = new Array();

		var objnum = 0;

		for (var key in objdict) {( function() {
					objnum++;
					objectlist.push(objdict[key]);

					var tmpkey = key.substring(0, 7);
					objectnamelist.push(tmpkey);
				}());
		}

		if (existobjectlen == 0 && objnum != 0) {
			for (var key in objdict) {( function() {
						var tmpkey = key.substring(0, 7);
						var objGroup = createObject(tmpkey);
						objGroup.setX(picW + ((objGroup.children[0].getWidth() + 100) * (existobjectlen - 1)) + 500);
						// objGroup.setY(-(picH * (existlen - 1)) + picH/2);
						objGroup.setY(-(picH * (existlen - 1)) + customRand(picH / 2));
						mainlayer.add(objGroup);

						// var childData = objdict[key];
						// if (childData != null) {
						// objGroup.children[0].setText(childData);
						// }
					}());
			}
		} else if (objnum == 0) {
			for (var k = 0; k < existobjectlen; k++) {
				removeTarget(existobject[k]);
				removeLineFromId(existobject[k].getId());
			}
		} else {
			var objectlen = objnum;
			for (var j = 0; j < objectlen; j++) {
				if (existobjectlen > objectlen) {
					for (var k = 0; k < existobjectlen; k++) {
						var checkexistobject = objectinArray(objdict, existobject[k].getId());

						if (checkexistobject) {
							continue;
						} else if (!checkexistobject) {
							removeTarget(existobject[k]);
							removeLineFromId(existobject[k].getId());
							// mainlayer.draw();
						}
					}
				} else if (existobjectlen < objectlen) {
					var checkobject = existobject.frameinArray(objectnamelist[j]);

					if (checkobject) {
						continue;
					} else {
						var objGroup = createObject(objectnamelist[j]);

						objGroup.setX(picW + ((objGroup.children[0].getWidth() + 100) * (existobjectlen - 1)) + 500);
						// objGroup.setY(-(picH * (existlen - 1)) + picH/2);
						objGroup.setY(-(picH * (existlen - 1)) + customRand(picH / 2));
						mainlayer.add(objGroup);
					}
				} else {
					var checkobject = existobject.frameinArray(objectnamelist[j]);
					var checkexistobject = objectinArray(objdict, existobject[j].getId());

					if (checkobject && checkexistobject) {
						continue;
					} else if (!checkobject) {
						//문제가 있는듯?
						removeTarget(existobject[j]);
						removeLineFromId(existobject[j].getId());
						var objGroup = createObject(objectnamelist[j]);

						objGroup.setX(picW + ((objGroup.children[0].getWidth() + 100) * (existobjectlen - 1)) + 500);
						// objGroup.setY(-(picH * (existlen - 1)) + picH/2);
						objGroup.setY(-(picH * (existlen - 1)) + customRand(picH / 2));
						mainlayer.add(objGroup);
					}
				}

			}
		}
		mainlayer.draw();
	}

	for (var key in objdict) {( function() {
				var tmpkey = key.substring(0, 7);
				var existobject = mainlayer.get(".object");
				var objGroup;

				for (var i = 0; i < existobject.length; i++) {
					if (existobject[i].getId() == tmpkey) {
						objGroup = existobject[i]
					}
				}

				var childData = objdict[key];
				if (childData != null) {
					var tmp = '';
					childData = childData.substring(1, childData.length - 1);
					if (childData != "") {
						childData = childData.split(", ");

						for (var j = 0; j < childData.length; j++) {
							var smallData = childData;
							smallData = smallData[j].split(":");

							tmp += smallData[0] + " : " + smallData[1] + "\n";

							if (checkStr(smallData[1], 'None')) {
								// window.alert(smallData[1]);
							} else if (checkStr(smallData[1], 'instance')) {
								var instanceStr = smallData[1];
								var tmpinstanceName = instanceStr.substring(instanceStr.length - 8, instanceStr.length - 1);

								var targetNode;
								for (var k = 0; k < existobject.length; k++) {
									if (existobject[k].getId() == tmpinstanceName) {
										targetNode = existobject[k]
									}
								}
								// 											선만 그리면 될듯.....ㅠㅠ
								// connStartToEnd(objGroup, targetNode);
								// targetNode.children[0].setFill("red");
								connectStartToEnd(objGroup, targetNode);
							}
						}

						objGroup.children[0].setText(tmp);
					}
				}
			}());
	}
	mainlayer.draw();
}

function testLine() {
	// svg
	// M = moveto
	// L = lineto
	// H = horizontal lineto
	// V = vertical lineto
	// C = curveto
	// S = smooth curveto
	// Q = quadratic Bézier curve
	// T = smooth quadratic Bézier curveto
	// A = elliptical Arc
	// Z = closepath

	var r = Math.random();

	var objectGroup = createGroup("object");
	var startGroup = createGroup("start");
	var endGroup = createGroup("end");
	mainlayer.add(startGroup);
	mainlayer.add(endGroup);

	var start = new Kinetic.Text({
		x : 0,
		y : 0,
		stroke : 'white',
		strokeWidth : 0,
		draggable : true,
		fill : "rgb(" + parseInt(255 * r) + ",160,200)",
		text : "start",
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

	var end = new Kinetic.Text({
		x : 0,
		y : 0,
		stroke : 'white',
		strokeWidth : 0,
		draggable : true,
		fill : "rgb(" + parseInt(255 * r) + ",160,200)",
		text : "end",
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

	startGroup.add(start);
	endGroup.add(end);

	startGroup.setAbsolutePosition(-customRand(screen.width / 2), -customRand(screen.height / 2));
	endGroup.setAbsolutePosition(-customRand(screen.width / 2), -customRand(screen.height / 2));

	var startpointX = startGroup.getX() + startGroup.children[0].getWidth() / 2;
	var startpointY = startGroup.getY() + (startGroup.children[0].getHeight() / 2);
	var endpointX = endGroup.getX() + endGroup.children[0].getWidth() / 2;
	var endpointY = endGroup.getY() + (endGroup.children[0].getHeight() / 2);

	var line = new Kinetic.Line({
		points : [startpointX, startpointY, endpointX, endpointY],
		stroke : 'red',
		strokeWidth : 3,
		lineCap : 'round',
		lineJoin : 'round',
		opacity : 0.5
	});

	objectGroup.add(startGroup);
	objectGroup.add(endGroup);
	objectGroup.add(line);

	line.moveToBottom();

	objectGroup.setAbsolutePosition(-customRand(screen.width / 2), -customRand(screen.height / 2));

	mainlayer.add(objectGroup);
	mainlayer.draw();
}

// 			frameId 따라 화면에 띄우는 animation
// 			Object는 따로 옆에 그리기
//			전체 보여주는 clone 하나 생성해서 작게 보여주기
