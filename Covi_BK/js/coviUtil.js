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

Array.prototype.childinArray = function(needle) {
	for (var i = 0, len = this.length; i < len; i++) {
		if (this[i].children[0].getText() == "\n" + needle) {
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

function findIndex(len, childarr, datatype) {
	while (len-- != 0) {
		if (childarr[len].children[1].getText() == datatype) {
			break;
		}
	}
	return len;
}

function findDeleteIndex(len, framearr, datatype) {
	while (len-- != 0) {
		if (framearr[len] == datatype) {
			break;
		}
	}
	return len;
}

function findFrameIndex(len, framearr, framename) {
	while (len-- != 0) {
		if (framearr[len].getId() == framename) {
			break;
		}
	}
	return len;
}

function removeTarget(eraseTarget) {
	if (eraseTarget != null) {
		eraseTarget.remove();
	}
}

function removeFromId(eraseid) {

	var tmpid = "#" + eraseid;
	var stage = mainlayer.getStage();
	var erasearr = stage.get(tmpid);
	var eraseTarget = erasearr[0];

	if (eraseTarget != null) {
		eraseTarget.remove();
		
	}
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