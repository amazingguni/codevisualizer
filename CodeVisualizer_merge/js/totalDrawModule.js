function drawData(alldata) {

	var languageMode = "python";

	if (languageMode == "python") {

		if (alldata == undefined || alldata == null || alldata == '' || alldata == 'undefined' || alldata == 'null') {
			return;
			// dbgcontent.innerHTML = "drawData null : " + alldata;
		}

		// dbgcontent.innerHTML = "drawData in : " + alldata;

		// var testA = ['execfile','spam','frame'];
		// window.alert(testA.inArray('spam'));

		if (datacount == alldata.length + 1) {
			var drawDatabtn = document.getElementById("drawData");
			drawDatabtn.innerHTML = "Don't Click";
			return -1;
		}
		var tmptoobject = stringToObject(alldata);

		var framedict = tmptoobject.FrameDict;
		var objdict = tmptoobject.objDict;
		var framelist = tmptoobject.FrameList;
		var printlist = tmptoobject.printList;

		var existframe = mainlayer.get(".frame");
		var existlen = existframe.length;
		var framelen = framelist.length;

		var content_output = document.getElementById("content_output");

		if (printlist.length != 0) {
			for (var j = 0; j < printlist.length; j++) {
				content_output.innerHTML += printlist[j] + "<br>";
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

		testdbg.innerHTML = datacount - 1;
		preframelist = framelist;
	} else if (languageMode == "c") {
		if (alldata == null || alldata == undefined) {
			return;
		}

		if (datacount == alldata.length + 1) {
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
			for (var j = 0; j < printlist.length; j++) {
				output_content.innerHTML += printlist[j] + "<br>";
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
		drawObject_c(objdict, null);

		// framedict 내용 그리기
		for (var childkey in framedict) {( function() {
					var childData = framedict[childkey];
					drawFrameDictData_c(childData);
				}());

		}

		testdbg.innerHTML = datacount - 1;
		preframelist = framelist;
	}
}

function drawFrameDictData_c(datas) {
	var dataLen = datas.length;

	var tmpnum = 0;
	var tmpframe;
	var tmpgroup = 0;

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
	mainlayer.draw();

	dbgcontent.innerHTML = datas[0] + ":" + datas[1] + ":" + datas[2] + "번째 줄 <br>";
}

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

function addSpecialVarToFrame(framename, datatype, datavalue, num) {
	var tmpid = "#" + framename;
	//frame name
	var stage = mainlayer.getStage();
	var grouparr = stage.get(tmpid);
	var groupframe = grouparr[0];

	var childarr = groupframe.get(".specialvar");
	var childlen = childarr.length;

	if (childlen == 0) {
		var childgr = drawSpecialVarGroup(datatype, datavalue);
		groupframe.add(setVarsPos(groupframe, childgr));
		childgr.transitionTo({
			scale : {
				x : 0.5,
				y : 0.5
			},
			duration : 1,
			easing : 'elastic-ease-out'
		});
		mainlayer.draw();
	}

	for (var j = 0; j < childlen; j++) {
		var targetIndex = findIndex(childlen, childarr, datatype);

		if (targetIndex == -1) {
			var childgr = drawSpecialVarGroup(datatype, datavalue);
			groupframe.add(setVarsPos(groupframe, childgr));
			childgr.transitionTo({
				scale : {
					x : 0.5,
					y : 0.5
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

					var childgr = drawSpecialVarGroup(datatype, datavalue);
					groupframe.add(setVarsPos(groupframe, childgr));
					childgr.setX(tmptarget.getX());
					childgr.setY(tmptarget.getY());

					childgr.transitionTo({
						scale : {
							x : 0.5,
							y : 0.5
						},
						duration : 1,
						easing : 'elastic-ease-out'
					});
				}
				mainlayer.draw();
			} else {
				var childgr = drawSpecialVarGroup(datatype, datavalue);
				groupframe.add(setVarsPos(groupframe, childgr));
				childgr.transitionTo({
					scale : {
						x : 0.5,
						y : 0.5
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

		prezinext();
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