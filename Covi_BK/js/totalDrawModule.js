function drawData(alldata, languageMode) {

	//	if(mainlayer == undefined || mainlayer == null || mainlayer == '' || mainlayer == 'undefined' || mainlayer == 'null'){
	//		mainlayer = createLayer("mainlayer");
	//		stage.add(mainlayer);
	//	}

	if (languageMode == "python") {

		if (alldata == undefined || alldata == null || alldata == '' || alldata == 'undefined' || alldata == 'null') {
			return;
		}

		if (datacount == alldata.length + 1) {
			var drawDatabtn = document.getElementById("drawData");
			drawDatabtn.innerHTML = "Don't Click";
			return -1;
		}
		var tmptoobject = stringToObject(alldata);

		var framedict = tmptoobject.FrameDict;
		var objdict = tmptoobject.objDict;
		var framelist = tmptoobject.FrameList;
		var printlinelist = tmptoobject.PrintLineList;

		var existframe = mainlayer.get(".frame");
		var existlen = existframe.length;
		var framelen = framelist.length;

		var content_output = document.getElementById("content_output");
		var source_on_canvas = document.getElementById("source_on_canvas");

		$('#content_output').attr('style', "color : #FFFFFF");
		source_on_canvas.innerHTML = '';

		if (printlinelist != undefined && printlinelist != null && printlinelist != '' && printlinelist != 'undefined' && printlinelist != 'null') {
			if (printlinelist.length != 0) {
				for (var j = 0; j < printlinelist.length; j++) {
					source_on_canvas.innerHTML += printlinelist[j];
				}
			}
		}

		if (existlen == 0) {
			var check = findFrameListIndex(framelen, framelist, "execfile");

			if (check != -1) {
				createFrame("execfile");
			} else {
				for (var j = 0; j < framelist.length; j++) {
					createFrame(framelist[j]);
				}
			}
		} else {
			for (var j = 0; j < framelist.length; j++) {
				// if (checkStr(framelist[j], frameListEOF)) {
				// break;
				// }

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

					if (checkframe) {
						continue;
					} else {
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
					drawFrameDictData(childData);
				}());

		}

		preframelist = framelist;
		if(framelist.length != 0)
			animateFrame(framelist[0]);
	} else if (languageMode == "c") {
		if (alldata == undefined || alldata == null || alldata == '' || alldata == 'undefined' || alldata == 'null') {
			return;
		}

		var tmptoobject = stringToObject(alldata);

		var framedict = tmptoobject.FrameDict;
		var objdict = tmptoobject.objDict;
		var framelist = tmptoobject.FrameList;
		var printlinelist = tmptoobject.PrintLineList;

		var existframe = mainlayer.get(".frame");
		var existlen = existframe.length;
		var framelen = framelist.length;

		var existframe = mainlayer.get(".frame");
		var existlen = existframe.length;
		var framelen = framelist.length;

		var content_output = document.getElementById("content_output");
		var source_on_canvas = document.getElementById("source_on_canvas");

		source_on_canvas.innerHTML = '';

		if (printlinelist != undefined && printlinelist != null && printlinelist != '' && printlinelist != 'undefined' && printlinelist != 'null') {
			if (printlinelist.length != 0) {
				for (var j = 0; j < printlinelist.length; j++) {
					source_on_canvas.innerHTML += printlinelist[j];
				}
			}
		}

		if (existlen == 0) {
			for (var j = 0; j < framelist.length; j++) {
				// if (checkStr(framelist[j], frameListEOF)) {
				// break;
				// }
				createFrame(framelist[j]);
			}
		} else {
			for (var j = 0; j < framelist.length; j++) {
				// if (checkStr(framelist[j], frameListEOF)) {
				// break;
				// }

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

					if (checkframe) {
						continue;animateFrame(frameId)
					} else {
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
						createFrame(framelist[j]);
					}
				}

			}
		}
		mainlayer.draw();

		//object 그리는 자리
		drawObject_c(objdict, null);

		// framedict 내용 그리기
		for (var childkey in framedict) {( function() {
					var childData = framedict[childkey];
					drawFrameDictData_c(childData);
				}());

		}

		preframelist = framelist;
		if(framelist.length != 0)
			animateFrame(framelist[0]);
	}
}

function drawFrameDictData_c(datas) {
	var dataLen = datas.length;

	var tmpnum = 0;
	var tmpframe;
	var tmpgroup = 0;

	var tmpid = "#" + datas[1];
	//frame name
	var stage = mainlayer.getStage();
	var grouparr = stage.get(tmpid);
	var groupframe = grouparr[0];

	var childarr = groupframe.get(".basicvar");
	var childlen = childarr.length;

	var curTypeArr = new Array();

	for (var i = 3; i < dataLen; i++) {
		curTypeArr.push(datas[i]);
		i++;
		i++;
	}

	for (var i = 3; i < dataLen; i++) {
		tmpgroup = addVarToFrame_c(datas[1], datas[i], datas[i + 2], datas[i + 1], (dataLen - 3) / 3);

		if (checkStr(datas[i + 1], 'instance')) {//instance가 포함되어 있다면
			// 						여기 선 그리는거
			var instanceStr = datas[i + 1];
			var tmpinstanceName = instanceStr.substring(instanceStr.length - 9, instanceStr.length - 1);

			var existobject = mainlayer.get(".object");
			var existvar = mainlayer.get(".basicvar");
			var existvarlen = existvar.length;

			var checkvar = existvar.childinArray(tmpinstanceName);
			var checkobj = existobject.frameinArray(tmpinstanceName);
		}

		mainlayer.draw();
		i++;
		i++;
	}
	for (var j = 0; j < childlen; j++) {
		if (findDeleteIndex(curTypeArr.length, curTypeArr, childarr[j].children[1].getText()) == -1) {
			removeTarget(childarr[j]);
		}
	}
	mainlayer.draw();
}

function addVarToFrame_c(framename, dataname, datavalue, datatype, num) {

	if (checkStr(datavalue, 'instance')) {//instance가 포함되어 있다면
		var instanceStr = datavalue;
		datavalue = instanceStr.substring(instanceStr.length - 9, instanceStr.length - 1);
	}

	var tmpid = "#" + framename;
	//frame name
	var stage = mainlayer.getStage();
	var grouparr = stage.get(tmpid);
	var groupframe = grouparr[0];

	var childarr = groupframe.get(".basicvar");

	var childlen = childarr.length;

	if (childlen == 0) {
		var childgr = drawBaseVar(dataname, datatype, datavalue);
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
		var targetIndex = findIndex(childlen, childarr, dataname);

		if (targetIndex == -1) {
			var childgr = drawBaseVar(dataname, datatype, datavalue);
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

function drawFrameDictData(datas) {
	var dataLen = datas.length;

	var tmpnum = 0;
	var tmpframe;
	var tmpgroup = 0;

	var tmpid = "#" + datas[1];
	//frame name
	var stage = mainlayer.getStage();
	var grouparr = stage.get(tmpid);
	
	var groupframe = grouparr[0];

	var childarr = groupframe.get(".basicvar");
	var childlen = childarr.length;

	var spechildarr = groupframe.get(".specialvar");
	var spechildlen = spechildarr.length;

	var curTypeArr = new Array();

	for (var i = 3; i < dataLen; i++) {
		curTypeArr.push(datas[i]);
		i++;
	}

	for (var i = 3; i < dataLen; i++) {

		if ((datas[i + 1].match(/\(/) && datas[i + 1].match(/\)/)) || (datas[i + 1].match(/\[/) && datas[i + 1].match(/\]/)) || (datas[i + 1].match(/\{/) && datas[i + 1].match(/\}/)) || checkStr(datas[i + 1], 'set')) {
			// 			special Var
			addSpecialVarToFrame(datas[1], datas[i], datas[i + 1], (dataLen - 3) / 2);
		} else {
			addVarToFrame(datas[1], datas[i], datas[i + 1], (dataLen - 3) / 2);
		}
		// mainlayer.add(parentgr);
		// mainlayer.draw();

		if (checkStr(datas[i + 1], 'instance')) {//instance가 포함되어 있다면
			// 						여기 선 그리는거
			// var instanceStr = datas[i + 1];
			// var tmpinstanceName = instanceStr.substring(instanceStr.length - 8, instanceStr.length - 1);
			//
			// var existobject = mainlayer.get(".object");
			// var existvar = mainlayer.get(".basicvar");
			// var existvarlen = existvar.length;
			//
			// var checkvar = existvar.childinArray(tmpinstanceName);
			// var checkobj = existobject.frameinArray(tmpinstanceName);

			//선그리는 부분
			// if (checkvar && checkobj) {
			// var startNode;
			// for (var j = 0; j < existvar.length; j++) {
			// if (existvar[j].children[0].getText() == "\n" + tmpinstanceName) {
			// startNode = existvar[j]
			// }
			// }
			// var targetNode;
			// for (var j = 0; j < existobject.length; j++) {
			// if (existobject[j].getId() == tmpinstanceName) {
			// targetNode = existobject[j]
			// }
			// }
			//
			// connectFrameToObject(startNode, targetNode);
			// } else {
			// }
			// updateLine(tmpgroup, targetNode);
		}
		mainlayer.draw();
		i++;
	}
	if (childarr != []) {
		for (var j = 0; j < childarr.length; j++) {
	//		if (childarr[j].length<1) {
				if (findDeleteIndex(curTypeArr.length, curTypeArr, childarr[j].children[1].getText()) == -1) {
					removeTarget(childarr[j]);
				}
		//	}
		}
	}
	if (spechildarr != []) {
		for (var j = 0; j < spechildarr.length; j++) {
			//if (spechildarr[j].length <1) {
				if (findDeleteIndex(curTypeArr.length, curTypeArr, spechildarr[j].children[1].getText()) == -1) {
					removeTarget(spechildarr[j].getParent());
				}
			//}
		}
	}
	mainlayer.draw();
}

function addVarToFrame(framename, datatype, datavalue, num) {

	if (checkStr(datavalue, 'instance')) {//instance가 포함되어 있다면
		var instanceStr = datavalue;
		datavalue = instanceStr.substring(instanceStr.length - 8, instanceStr.length - 1);
	}

	var tmpid = "#" + framename;
	
//	animateFrame(framename);
	
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
			
			if(childtype == datatype){
				if(childname != "\n" + datavalue){
					childarr[targetIndex].setScale(0.1);
					mainlayer.draw();
					
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
			}

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

	var removebasicArr = groupframe.get(".specialvar");

	for (var i = 0; i < removebasicArr.length; i++) {
		var targetIndex = findIndex(removebasicArr.length, removebasicArr, datatype);

		if (targetIndex == -1) {
		} else {
			removeTarget(removebasicArr[targetIndex]);
			mainlayer.draw();
		}
	}

	return groupframe;
}

function addSpecialVarToFrame(framename, datatype, datavalue, num) {
	var tmpid = "#" + framename;
	//frame name
	var stage = mainlayer.getStage();
	var grouparr = stage.get(tmpid);
	var groupframe = grouparr[0];

	var childarr = groupframe.get(".specialvar");
	var childlen = childarr.length;

	if (childlen == 0) {
		var tmpspecial = drawSpecialVarGroup(datatype, datavalue);
		var childgr = tmpspecial.group;

		groupframe.add(setVarsPos(groupframe, childgr));
		childgr.transitionTo({
			scale : {
				x : 0.5 - (0.05 * (tmpspecial.len)),
				y : 0.5 - (0.05 * (tmpspecial.len))
			},
			duration : 1,
			easing : 'elastic-ease-out'
		});
		mainlayer.draw();
	}

	for (var j = 0; j < childlen; j++) {
		var targetIndex = findIndex(childlen, childarr, datatype);

		if (targetIndex == -1) {
			var tmpspecial = drawSpecialVarGroup(datatype, datavalue);
			var childgr = tmpspecial.group;

			groupframe.add(setVarsPos(groupframe, childgr));
			childgr.transitionTo({
				scale : {
					x : 0.5 - (0.05 * (tmpspecial.len)),
					y : 0.5 - (0.05 * (tmpspecial.len))
				},
				duration : 1,
				easing : 'elastic-ease-out'
			});
			mainlayer.draw();
			break;
		} else {
			var curData = getUseData(datavalue);
			var curName = datatype;
			var curType = curData.type;
			var curKeyArr = curData.key;
			var curValueArr = curData.value;
			var curLen = curKeyArr.length;

			if (curName == childarr[targetIndex].getId()) {
				if (curType == childarr[targetIndex].children[0]) {
					if (curLen == specialLen) {
						for (var i = 0; i < curLen; i++) {
							if (curKeyArr[i] == specialChild[i]) {
								if (curValueArr[i] == specialChild[i].children[0]) {
									continue;
								}
							}
						}
					}
				} else {
					var tmptarget = childarr[targetIndex];
					removeTarget(childarr[targetIndex]);

					var tmpspecial = drawSpecialVarGroup(datatype, datavalue);
					var childgr = tmpspecial.group;

					groupframe.add(setVarsPos(groupframe, childgr));
					childgr.setX(tmptarget.getX());
					childgr.setY(tmptarget.getY());

					childgr.transitionTo({
						scale : {
							x : 0.5 - (0.05 * (tmpspecial.len)),
							y : 0.5 - (0.05 * (tmpspecial.len))
						},
						duration : 1,
						easing : 'elastic-ease-out'
					});
				}
				mainlayer.draw();
			} else {
				var tmpspecial = drawSpecialVarGroup(datatype, datavalue);
				var childgr = tmpspecial.group;
				groupframe.add(setVarsPos(groupframe, childgr));
				childgr.transitionTo({
					scale : {
						x : 0.5 - (0.05 * (tmpspecial.len)),
						y : 0.5 - (0.05 * (tmpspecial.len))
					},
					duration : 1,
					easing : 'elastic-ease-out'
				});
				mainlayer.draw();
			}
			break;
		}
	}
	var removebasicArr = groupframe.get(".basicvar");

	for (var i = 0; i < removebasicArr.length; i++) {
		var targetIndex = findIndex(removebasicArr.length, removebasicArr, datatype);

		if (targetIndex == -1) {
		} else {
			removeTarget(removebasicArr[targetIndex]);
			mainlayer.draw();
		}
	}

	return groupframe;
}

var picW;
var picH;
function createStage(stage, canvas) {
	picW = $(canvas).width();
	picH = $(canvas).height();

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
			x : 20,
			y : 20,
			width : picW - 40,
			height : picH - 80,
			fill : "#eee", //frame 구분하기 위한 색상
			align : 'left',
			text : frameid,
			fontSize : 20,
			textFill : 'gray',
			padding : 20,
			stroke : 'white',
			storkeWidth : 1,
			shadow : {
				offset : 2,
				color : 'black',
				blur : 3,
				opacity : 0.5
			},
			cornerRadius : 30
		});

		tmpgroup.add(tmpFrameName);
		tmpgroup.setDraggable(false);
		mainlayer.add(tmpgroup);

		
		return tmpgroup;
	} else {
		return groupframe;
	}
}

function createObject_c(objectid) {
	var r = Math.random();

	var objectaddr = objectid.substring(0, 8);
	var objectname = objectid.substring(9);

	var objGroup = createGroup("object");
	objGroup.setId(objectaddr);

	var tmpinstance = new Kinetic.Text({
		x : 0,
		y : 0,
		width : 200,
		height : 100,
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
		text : objectname,
		fontSize : 25,
		textFill : 'gray',
	});

	var tmpobjaddr = new Kinetic.Text({
		y : th + 15,
		width : tw,
		align : 'right',
		text : objectaddr,
		fontSize : 20,
		textFill : 'gray',
	});

	// objGroup.setX(customRand(screen.width / 2));
	// objGroup.setY(customRand(screen.height / 2));
	objGroup.setName("object");

	objGroup.add(tmpinstance);
	objGroup.add(tmpobjname);
	objGroup.add(tmpobjaddr);
	objGroup.setDraggable(true);

	return objGroup;
}

function createObject(objectid) {
	var r = Math.random();

	var objectaddr = objectid.substring(0, 7);
	var objectname = objectid.substring(8);

	var objGroup = createGroup("object");
	objGroup.setId(objectaddr);

	var tmpinstance = new Kinetic.Text({
		x : 0,
		y : 0,
		width : 200,
		height : 120,
		stroke : 'white',
		strokeWidth : 0,
		draggable : true,
		fill : "rgb(" + parseInt(152 + 102 * r) + ",241,219)",
		fontFamily : 'Calibri',
		fontSize : 13,
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
		text : objectname,
		fontSize : 20,
		textFill : 'gray',
	});

	var tmpobjaddr = new Kinetic.Text({
		y : th + 15,
		width : tw,
		align : 'right',
		text : objectaddr,
		fontSize : 20,
		textFill : 'gray',
	});

	// objGroup.setX(customRand(screen.width / 2));
	// objGroup.setY(customRand(screen.height / 2));
	objGroup.setName("object");

	objGroup.add(tmpinstance);
	objGroup.add(tmpobjname);
	objGroup.add(tmpobjaddr);
	objGroup.setDraggable(true);

	return objGroup;
}

function clearCanvas() {
	mainlayer.remove();
	mainlayer = createLayer("mainlayer");
	stage.add(mainlayer);
	stage.draw();
}

function readyToMove() {
	
		scale = 1.0;
		mainlayer.setAbsolutePosition(initPosition.x, initPosition.y);
		mainlayer.setScale(1);
		mainlayer.draw();
	
}

function clearLayer() {
	var source_on_canvas = document.getElementById("source_on_canvas");
	source_on_canvas.innerHTML = '';

	var datacount = 0;
	var prezinum = 0;

	var prePosition = {
		x : mainlayer.getAbsolutePosition().x,
		y : mainlayer.getAbsolutePosition().y
	}
	
	mainlayer.remove();
	mainlayer = createLayer("mainlayer");

	mainlayer.setDraggable(false);
	scale = 1.0;

	
		mainlayer.setAbsolutePosition(initPosition.x - prePosition.x, initPosition.y - prePosition.y);
		
		initPosition = {
			x: mainlayer.getAbsolutePosition().x,
			y: mainlayer.getAbsolutePosition().y
		}
	
	stage.add(mainlayer);
	stage.draw();

	mainlayer.on('click', function(evt) {
		var node = evt.shape;
		
		var basicPos;
		var objectPos;

		if (node.getParent().getName() == "basicvar") {
			var objectArr = mainlayer.get(".object");

			for (var i = 0; i < objectArr.length; i++) {
				if ("\n" + objectArr[i].getId() == node.getText()) {
					scale = 1.0;
//					alert(objectArr[i].getX() + " : " + objectArr[i].getY());

					mainlayer.transitionTo({
						x : -(objectArr[i].getX() - picture.offsetWidth / 2),
						y : -(objectArr[i].getY() - picture.offsetHeight / 2),
						scale : {
							x : 1,
							y : 1
						},
						duration : 1.0,
						easing : 'back-ease-in-out'
					});

					mainlayer.draw();
				}
			}
		}

		if (node.getParent().getName() == "object") {
			var existframe = mainlayer.get(".frame");
			var existlen = existframe.length;

			var existvar = mainlayer.get(".basicvar");
			var existvarlen = existvar.length;

			for (var i = 0; i < existvarlen; i++) {
				if (existvar[i].children[0].getText() == "\n" + node.getParent().getId()) {
					scale = 1.0;
					
					var curframeindex = findFrameIndex(existlen, existframe, existvar[i].getParent().getId());

					mainlayer.transitionTo({
						x : 0,
						y : (picture.offsetHeight * curframeindex),
						scale : {
							x : 1,
							y : 1
						},
						duration : 1.0,
						easing : 'back-ease-in-out'
					});

					mainlayer.draw();
				}
			}
		}
	});

	mainlayer.on('mousemove', function(evt) {
		if (evt.shiftKey === false) {
			mainlayer.setDraggable(false);
		} else {
			mainlayer.setDraggable(true);
		}
	});

	mainlayer.on('mouseup', function(evt) {
		if (evt.shiftKey === false) {
			var node = evt.shape;

			var objectArr = mainlayer.get(".object");
			var lineArr = mainlayer.get(".line");

			for (var i = 0; i < objectArr.length; i++) {
				if (objectArr[i] == node.parent) {
					node.parent.on('dragmove', function() {
						node.parent.setOpacity(0.2);
					});

					node.parent.on('dragend', function() {
						node.parent.setOpacity(1);
						mainlayer.draw();
						// updateLine(objectArr[i], null);
					});
				}
			}

			for (var i = 0; i < lineArr.length; i++) {
				if (checkStr(lineArr[i].getId(), node.parent.getId())) {
					var startname = lineArr[i].getId().substring(0, 7);
					var endname = lineArr[i].getId().substring(7);
					var startnode;
					var endnode;

					for ( j = 0; j < objectArr.length; j++) {
						if (objectArr[j].getId() == startname) {
							startnode = objectArr[j];
						}

						if (objectArr[j].getId() == endname) {
							endnode = objectArr[j];
						}
					}
					updateLine(startnode, endnode);
				}
			}
		} else {
		}
	});
}

//..........update 안되서 여기 둠... coviUtil에 있어야함.
function findFrameListIndex(len, framearr, framename) {
	while (len-- != 0) {
		if (framearr[len] == framename) {
			break;
		}
	}
	return len;
}