var testA = "[1,2,3,4,5]";
var testB = "{'k':33,'g':55}";
var testC = "(3,45)";
var testD = "set([1,2,3,4,5])";
var testE = "(5,(6,7),8,9)";
var testF = "1234,23412,312312";
var sample = "23,(12,32),(3)";

// if ((datavalue.match(/\(/) && datavalue.match(/\)/)) || (datavalue.match(/\[/) && datavalue.match(/\]/)) || (datavalue.match(/\{/) && datavalue.match(/\}/)) || checkStr(datavalue, 'set')) {
// // 			special Var
// childgr = drawSpecialVarGroup(datatype, datavalue);
// } else {
// childgr = drawBaseVar(datatype, "", datavalue);
// }

function startDrawSpecial() {
	mainlayer.add(drawSpecialVarGroup(testF));
	mainlayer.draw();
}

function drawSpecialVarGroup(name, target) {
	var tmpObject = whatVarType(target);
	var tmpType = tmpObject.type;
	var tmpText = tmpObject.text;
	var tmpArr;
	var tmpIndex = null;
	var tmpValue = new Array();

	if (tmpType == "Dictionary" || tmpType == "Dictionary+") {
		tmpIndex = new Array();
		tmpArr = divideByComma(tmpText);

		for (var i = 0; i < tmpArr.length; i++) {
			var text = divideByColon(tmpArr[i]);
			tmpIndex[i] = text.key;
			tmpValue[i] = text.value;
		}
	} else {
		if (tmpText.match(/\(/) && tmpText.match(/\)/) || tmpText.match(/\[/) && tmpText.match(/\]/)) {
			tmpArr = devideByBracket(tmpText);
		} else {
			tmpArr = divideByComma(tmpText);
		}
		tmpValue = tmpArr;
	}

	var group = drawSpecialVar(name, tmpType, tmpValue, tmpIndex);
	group.setName("specialvar");

	specialChildArr = tmpValue;

	return group;
}

function getUseData(target) {
	var tmpObject = whatVarType(target);
	var tmpType = tmpObject.type;
	var tmpText = tmpObject.text;
	var tmpArr;
	var tmpIndex = new Array();
	var tmpValue = new Array();

	if (tmpType == "Dictionary" || tmpType == "Dictionary+") {
		tmpIndex = new Array();
		tmpArr = divideByComma(tmpText);

		for (var i = 0; i < tmpArr.length; i++) {
			var text = divideByColon(tmpArr[i]);
			tmpIndex[i] = text.key;
			tmpValue[i] = text.value;
		}
	} else {
		if (tmpText.match(/\(/) && tmpText.match(/\)/) || tmpText.match(/\[/) && tmpText.match(/\]/)) {
			tmpArr = devideByBracket(tmpText);
		} else {
			tmpArr = divideByComma(tmpText);
		}

		for (var i = 0; i < tmpArr.length; i++) {
			tmpIndex[i] = i;
		}

		tmpValue = tmpArr;

	}
	return {
		type : tmpObject.type,
		key : tmpIndex,
		value : tmpValue
	};
}

//들어온 특수변수가 whattype인지
function whatVarType(targetVar) {
	var type = null;

	if (targetVar.substring(0, 1) == "[" && targetVar.substring(targetVar.length - 1) == "]") {
		// 		List
		var tmp = targetVar.substring(1, targetVar.length - 1);

		if (whatVarType(tmp).type == 'Basic') {
			return {
				type : "List",
				text : tmp
			}
		} else {
			return {
				type : "List + " + whatVarType(tmp).type,
				text : tmp
			}
		}
	} else if (checkStr(targetVar, 'set')) {
		// 		Set
		var tmp = targetVar.substring(5, targetVar.length - 2);

		if (whatVarType(tmp).type == 'Basic') {
			return {
				type : "Set",
				text : tmp
			}
		} else {
			return {
				type : "Set + " + whatVarType(tmp).type,
				text : tmp
			}
		}
	} else if (targetVar.substring(0, 1) == "(" && targetVar.substring(targetVar.length - 1) == ")") {
		// 		Tuple
		var tmp = targetVar.substring(1, targetVar.length - 1);

		if (whatVarType(tmp).type == 'Basic') {
			return {
				type : "Tuple",
				text : tmp
			}
		} else {
			return {
				type : "Tuple + " + whatVarType(tmp).type,
				text : tmp
			}
		}
	} else if (targetVar.substring(0, 1) == "{" && targetVar.substring(targetVar.length - 1) == "}") {
		// 		Dictionary
		var tmp = targetVar.substring(1, targetVar.length - 1);

		if (whatVarType(tmp).type == 'Basic') {
			return {
				type : "Dictionary",
				text : tmp
			}
		} else {
			return {
				type : "Dictionary + " + whatVarType(tmp).type,
				text : tmp
			}
		}
	} else {
		return {
			type : 'Basic',
			text : targetVar
		}
	}

	return null;
}

function divideByComma(target) {
	var tmparr = target.split(",");
	return tmparr;
}

function divideByColon(target) {
	target = target.replace(/'/gi, "");
	var tmparr = target.split(":");
	return {
		key : tmparr[0],
		value : tmparr[1]
	};
}

function drawSpecialVar(name, type, dataArr, dataIndex) {
	var specialGroup = new Array();

	var preGroup = null;
	var sumX = 0;
	var mergeGroup = createGroup(name);
	mergeGroup.setDraggable(true);

	var tmpName = new Kinetic.Text({
		y : 0,
		x : 5,
		width : 200,
		align : 'left',
		text : name,
		fontSize : 20,
		textFill : 'gray',
	});

	var tmpType = new Kinetic.Text({
		y : 0,
		width : 200,
		align : 'right',
		text : type,
		fontSize : 20,
		textFill : 'gray',
	});

	mergeGroup.add(tmpType);
	mergeGroup.add(tmpName);

	for (var i = 0; i < dataArr.length; i++) {
		if (dataIndex == null) {
			specialGroup[i] = builtInSpecial(i, drawBaseVar("", "", dataArr[i]));
		} else {
			specialGroup[i] = builtInSpecial(dataIndex[i], drawBaseVar("", "", dataArr[i]));
		}

		if (preGroup != null) {
			sumX = sumX + 200;
			specialGroup[i].setX(sumX);
		}

		specialGroup[i].setName("specialChild");
		mergeGroup.add(specialGroup[i]);
		preGroup = specialGroup[i];
	}

	tmpName.setWidth(sumX + 200);
	tmpType.setWidth(sumX + 200);
	tmpName.setY(-23);
	tmpType.setY(preGroup.children[0].getHeight() + 10);

	return mergeGroup;
}

function builtInSpecial(index, data) {
	var r = Math.random();
	var group = createGroup(data);
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
		padding : 8,
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
	data.setY(th / 2 - 10);
	data.setScale(0.7);
	tmpgroup.add(data);

	group.add(tmprect);
	group.add(tmpindex);
	group.add(tmpgroup);

	return group;

}

function devideByBracket(target) {
	// var regex = /\([^()]*\)/gi;
	var regex = /\([^()]*\)|\[[^()]*\]/gi;

	var arr = target.match(regex);
	var replaceStr = target.replace(regex, "@");

	var resultArr = new Array();
	resultArr = divideByComma(replaceStr);

	var j = 0;

	for (var i = 0; i < resultArr.length; i++) {
		if (resultArr[i] == "@") {
			resultArr[i] = arr[j++];
		}
	}

	return resultArr;
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

function setVarsPos(parent, childgroup) {
	var width = parent.children[0].getWidth();
	var height = parent.children[0].getHeight();
	childgroup.setDraggable(true);

	childgroup.setX(parent.children[0].getX() + customRand(width * 5 / 6));
	childgroup.setY(parent.children[0].getY() + customRand(height * 5 / 6));

	return childgroup;
}
