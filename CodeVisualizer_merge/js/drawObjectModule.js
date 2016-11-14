var preNode = null;

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
					objectnamelist.push(key);
				}());
		}

		if (existobjectlen == 0 && objnum != 0) {
			for (var key in objdict) {( function() {
						var objGroup = createObject(key);
						objGroup.setX(picW + ((objGroup.children[0].getWidth() + 100) * (existobjectlen - 1)) + 500);
						// objGroup.setY(-(picH * (existlen - 1)) + picH/2);
						objGroup.setY(-(picH * (existlen - 1)) + customRand(picH / 2));
						mainlayer.add(objGroup);
						createObjectGuide();

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
					var tmpname = objectnamelist[j].substring(0, 7);
					var checkobject = existobject.frameinArray(tmpname);

					if (checkobject) {
						continue;
					} else {
						var objGroup = createObject(objectnamelist[j]);

						objGroup.setX(picW + ((objGroup.children[0].getWidth() + 100) * (existobjectlen - 1)) + 500);
						// objGroup.setY(-(picH * (existlen - 1)) + picH/2);
						objGroup.setY(-(picH * (existlen - 1)) + customRand(picH / 2));
						mainlayer.add(objGroup);

						createObjectGuide();
					}
				} else {
					var tmpname = objectnamelist[j].substring(0, 7);
					var checkobject = existobject.frameinArray(tmpname);
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

						createObjectGuide();
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

						var conncount = 0;
						preNode = null;

						for (var j = 0; j < childData.length; j++) {
							var smallData = childData;
							smallData = smallData[j].split(":");

							smallData[0] = smallData[0].replace(/'/gi, "");
							smallData[1] = smallData[1].replace(/'/gi, "");

							if (checkStr(smallData[1], 'None')) {
								// window.alert(smallData[1]);
							} else if (checkStr(smallData[1], 'instance')) {
								conncount++;
								var instanceStr = smallData[1];
								var tmpinstanceName = instanceStr.substring(instanceStr.length - 8, instanceStr.length - 1);

								var targetNode;
								for (var k = 0; k < existobject.length; k++) {
									if (existobject[k].getId() == tmpinstanceName) {
										targetNode = existobject[k]
									}
								}

								connectStartToEnd(objGroup, targetNode);

								if (conncount == 1) {
									// 									linked List
								} else if (conncount > 1) {
									// 									tree
									if (preNode != null) {
										targetNode.setX(preNode.getX());
										targetNode.setY(preNode.getY() + (preNode.children[0].getHeight() + 100));
									} else {
										targetNode.setX(objGroup.getX() + objGroup.children[0].getWidth());
										targetNode.setY(objGroup.getY() + customRand(picH / 2));
									}
								}

								updateLine(objGroup, targetNode);
								preNode = targetNode;
								// connectStartToEnd(objGroup, targetNode);
								var tmppoint = smallData[1].split(".");
								var tmparr = tmppoint[1].split("instance");
								smallData[1] = tmparr[0] + "(" + tmpinstanceName + " : " + conncount + ")";
								// smallData[1] = tmparr[1].substring(0,4);
							}

							tmp += smallData[0] + " : " + smallData[1] + "\n";
						}

						objGroup.children[0].setText(tmp);
					}
				}
			}());
	}
	mainlayer.draw();
}

function drawObject_c(objdict, connId) {

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
					objectnamelist.push(key);
				}());
		}

		if (existobjectlen == 0 && objnum != 0) {
			for (var key in objdict) {( function() {
						var objGroup = createObject_c(key);
						objGroup.setX(picW + ((objGroup.children[0].getWidth() + 100) * (existobjectlen - 1)) + 500);
						// objGroup.setY(-(picH * (existlen - 1)) + picH/2);
						objGroup.setY(-(picH * (existlen - 1)) + customRand(picH / 2));
						// objectlayer.add(objGroup);\
						mainlayer.add(objGroup);
						mainlayer.draw();
						createObjectGuide();

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
					var tmpname = objectnamelist[j].substring(0, 8);
					var checkobject = existobject.frameinArray(tmpname);

					if (checkobject) {
						continue;
					} else {
						var objGroup = createObject_c(objectnamelist[j]);

						objGroup.setX(picW + ((objGroup.children[0].getWidth() + 100) * (existobjectlen - 1)) + 500);
						// objGroup.setY(-(picH * (existlen - 1)) + picH/2);
						objGroup.setY(-(picH * (existlen - 1)) + customRand(picH / 2));
						mainlayer.add(objGroup);
						// objectlayer.add(objGroup);
						mainlayer.draw();

						createObjectGuide();
					}
				} else {
					var tmpname = objectnamelist[j].substring(0, 8);
					var checkobject = existobject.frameinArray(tmpname);
					var checkexistobject = objectinArray(objdict, existobject[j].getId());

					if (checkobject && checkexistobject) {
						continue;
					} else if (!checkobject) {
						//문제가 있는듯?
						removeTarget(existobject[j]);
						removeLineFromId(existobject[j].getId());
						var objGroup = createObject_c(objectnamelist[j]);

						objGroup.setX(picW + ((objGroup.children[0].getWidth() + 100) * (existobjectlen - 1)) + 500);
						// objGroup.setY(-(picH * (existlen - 1)) + picH/2);
						objGroup.setY(-(picH * (existlen - 1)) + customRand(picH / 2));
						mainlayer.add(objGroup);
						// objectlayer.add(objGroup);
						mainlayer.draw();

						createObjectGuide();
					}
				}

			}
		}
		mainlayer.draw();
	}

	for (var key in objdict) {( function() {
				var tmpkey = key.substring(0, 8);
				var existobject = mainlayer.get(".object");
				var objGroup;

				for (var i = 0; i < existobject.length; i++) {
					if (existobject[i].getId() == tmpkey) {
						objGroup = existobject[i]
					}
				}

				var childData = objdict[key];
				objGroup.children[0].setText(childData);
			}());
	}
	mainlayer.draw();
}

function removeLineFromId(eraseid) {
	var existLine = mainlayer.get(".line");

	for (var i = 0; i < existLine.length; i++) {
		if (checkStr(existLine[i].getId(), eraseid)) {
			existLine[i].remove();
		}
	}
}

function updateLine(startGroup, endGroup) {
	var existLine = mainlayer.get(".line");
	var curLine = new Array();
	for (var i = 0; i < existLine.length; i++) {
		if (existLine[i].getId() == startGroup.getId() + endGroup.getId()) {
			curLine.push(existLine[i]);
		}
	}
	// var curLine = existLine.get("#" + endGroup.getId());

	var startpointX = startGroup.getX() + startGroup.children[0].getWidth() / 2;
	var startpointY = startGroup.getY() + startGroup.children[0].getHeight() / 2;
	var endpointX = endGroup.getX() + endGroup.children[0].getWidth() / 2;
	var endpointY = endGroup.getY() + endGroup.children[0].getHeight() / 2;

	if (startGroup.getX() < endGroup.getX()) {
		endpointX = endGroup.getX();
		endpointY = endGroup.getY() + endGroup.children[0].getHeight() / 2;

		if (Math.abs(startGroup.getY() - endGroup.getY()) > 50) {
			if (startGroup.getY() > endGroup.getY()) {
				endpointX = endGroup.getX() + endGroup.children[0].getWidth() / 2;
				endpointY = endGroup.getY() + endGroup.children[0].getHeight();
			} else if (startGroup.getY() < endGroup.getY()) {
				endpointX = endGroup.getX() + endGroup.children[0].getWidth() / 2;
				endpointY = endGroup.getY();
			}
		}
	} else if (startGroup.getX() > endGroup.getX()) {
		endpointX = endGroup.getX() + endGroup.children[0].getWidth();
		endpointY = endGroup.getY() + endGroup.children[0].getHeight() / 2;
		if (Math.abs(startGroup.getY() - endGroup.getY()) > 50) {
			if (startGroup.getY() > endGroup.getY()) {
				endpointX = endGroup.getX() + endGroup.children[0].getWidth() / 2;
				endpointY = endGroup.getY() + endGroup.children[0].getHeight();
			} else if (startGroup.getY() < endGroup.getY()) {
				endpointX = endGroup.getX() + endGroup.children[0].getWidth() / 2;
				endpointY = endGroup.getY();
			}
		}
	}

	for (var i = 0; i < curLine.length; i++) {
		curLine[i].setDrawFunc(function(context) {
			var dx = endpointX - startpointX;
			var dy = endpointY - startpointY;

			// normalize
			var length = Math.sqrt(dx * dx + dy * dy);
			var unitDx = dx / length;
			var unitDy = dy / length;
			// increase this to get a larger arrow head
			var arrowHeadSize = 10;

			var fromX = startpointX;
			var fromY = startpointY;
			var toX = endpointX;
			var toY = endpointY;

			var arrowPoint1 = new Point((toX - unitDx * arrowHeadSize - unitDy * arrowHeadSize), (toY - unitDy * arrowHeadSize + unitDx * arrowHeadSize));
			var arrowPoint2 = new Point((toX - unitDx * arrowHeadSize + unitDy * arrowHeadSize), (toY - unitDy * arrowHeadSize - unitDx * arrowHeadSize));

			context.lineWidth = 1;
			var cp1X = fromX;
			var cp1Y = fromY;
			var cp2X = toX;
			var cp2Y = toY;
			context.beginPath();
			context.moveTo(fromX, fromY);
			context.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, toX, toY);
			context.stroke();

			context.beginPath();
			context.moveTo(toX, toY);
			context.lineTo(arrowPoint1.x, arrowPoint1.y);
			context.lineTo(arrowPoint2.x, arrowPoint2.y);
			context.lineTo(toX, toY);
			context.fill();
			context.stroke();

			context.closePath();

			this.fill(context);
			this.stroke(context);
		});
		mainlayer.draw();
	}
}

function connectStartToEnd(startGroup, endGroup) {
	var existframe = mainlayer.get(".frame");
	var existlen = existframe.length;

	var startpointX = startGroup.getX() + startGroup.children[0].getWidth();
	var startpointY = startGroup.getY() + startGroup.children[0].getHeight() / 2;
	var endpointX = endGroup.getX();
	var endpointY = endGroup.getY() + endGroup.children[0].getHeight() / 2;

	//var startpointX = startGroup.getX() + startGroup.children[0].getWidth() / 2;
	//var startpointY = startGroup.getY() + startGroup.children[0].getHeight() / 2;
	//var endpointX = endGroup.getX() + endGroup.children[0].getWidth() / 2;
	//var endpointY = endGroup.getY() + endGroup.children[0].getHeight() / 2;

	var connline = new Kinetic.Shape({
		drawFunc : function(context) {
			var dx = endpointX - startpointX;
			var dy = endpointY - startpointY;

			// normalize
			var length = Math.sqrt(dx * dx + dy * dy);
			var unitDx = dx / length;
			var unitDy = dy / length;
			// increase this to get a larger arrow head
			var arrowHeadSize = 10;

			var fromX = startpointX;
			var fromY = startpointY;
			var toX = endpointX;
			var toY = endpointY;

			var arrowPoint1 = new Point((toX - unitDx * arrowHeadSize - unitDy * arrowHeadSize), (toY - unitDy * arrowHeadSize + unitDx * arrowHeadSize));
			var arrowPoint2 = new Point((toX - unitDx * arrowHeadSize + unitDy * arrowHeadSize), (toY - unitDy * arrowHeadSize - unitDx * arrowHeadSize));

			context.lineWidth = 1;
			var cp1X = fromX;
			var cp1Y = fromY;
			var cp2X = toX;
			var cp2Y = toY;
			context.beginPath();
			context.moveTo(fromX, fromY);
			context.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, toX, toY);
			context.stroke();

			context.beginPath();
			context.moveTo(toX, toY);
			context.lineTo(arrowPoint1.x, arrowPoint1.y);
			context.lineTo(arrowPoint2.x, arrowPoint2.y);
			context.lineTo(toX, toY);
			context.fill();
			context.stroke();

			context.closePath();

			this.fill(context);
			this.stroke(context);
		},
		stroke : "#948E9E",
		strokeWidth : 3,
		opacity : 0.5,
		id : startGroup.getId() + endGroup.getId(),
		name : 'line'
	});

	// var connline = new Kinetic.Line({
	// points : [startpointX, startpointY, endpointX, endpointY],
	// stroke : 'red',
	// strokeWidth : 3,
	// lineCap : 'round',
	// lineJoin : 'round',
	// opacity : 0.5,
	// id : startGroup.getId() + endGroup.getId(),
	// name : 'line'
	// });

	mainlayer.add(connline);
	// objectlayer.add(connline);
	connline.moveToBottom();

	return connline;
}

function connectFrameToObject(startGroup, endGroup) {
	var existframe = mainlayer.get(".frame");
	var existlen = existframe.length;

	var curframeindex = findFrameIndex(existlen, existframe, startGroup.getParent().getId());

	var startpointX = startGroup.getX() + startGroup.children[0].getWidth() / 2;
	var startpointY = -(picH * curframeindex) + startGroup.getY() + startGroup.children[0].getHeight() / 2;
	var endpointX = endGroup.getX();
	var endpointY = endGroup.getY() + endGroup.children[0].getHeight() / 2;
	var startid = startGroup.children[0].getText();
	startid = startid.substring(1);

	var connline = new Kinetic.Shape({
		drawFunc : function(context) {
			var dx = endpointX - startpointX;
			var dy = endpointY - startpointY;

			// normalize
			var length = Math.sqrt(dx * dx + dy * dy);
			var unitDx = dx / length;
			var unitDy = dy / length;
			// increase this to get a larger arrow head
			var arrowHeadSize = 10;

			var fromX = startpointX;
			var fromY = startpointY;
			var toX = endpointX;
			var toY = endpointY;

			var arrowPoint1 = new Point((toX - unitDx * arrowHeadSize - unitDy * arrowHeadSize), (toY - unitDy * arrowHeadSize + unitDx * arrowHeadSize));
			var arrowPoint2 = new Point((toX - unitDx * arrowHeadSize + unitDy * arrowHeadSize), (toY - unitDy * arrowHeadSize - unitDx * arrowHeadSize));

			context.lineWidth = 1;
			var cp1X = fromX;
			var cp1Y = fromY;
			var cp2X = toX;
			var cp2Y = toY;
			context.beginPath();
			context.moveTo(fromX, fromY);
			context.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, toX, toY);
			context.stroke();

			context.beginPath();
			context.moveTo(toX, toY);
			context.lineTo(arrowPoint1.x, arrowPoint1.y);
			context.lineTo(arrowPoint2.x, arrowPoint2.y);
			context.lineTo(toX, toY);
			context.fill();
			context.stroke();

			context.closePath();

			this.fill(context);
			this.stroke(context);
		},
		stroke : "#948E9E",
		strokeWidth : 3,
		opacity : 0.5,
		id : startid + endGroup.getId(),
		name : 'line'
	});

	var existLine = mainlayer.get(".line");
	var checkline = existLine.frameinArray(startid + endGroup.getId());

	if (checkline) {
	} else {
		mainlayer.add(connline);
		connline.moveToTop();
		return connline;
	}
	return;
}

/*
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
 */

function setPosInObject(objGroup, childdata) {
	childdata.setScale(1);
	childdata.setAbsolutePosition(objGroup.children[0].getWidth() / 2 - childdata.children[0].getWidth() / 2, objGroup.children[0].getHeight() / 2 - childdata.children[0].getHeight() / 2);

	objGroup.add(childdata);
}

function Point(x, y) {
	this.x = x;
	this.y = y;
}

function printArrow(fromX, fromY, toX, toY) {
	var ctx = stage.children[0].canvas.context;
	var FromPoint = new Point(fromX, fromY);
	var ToPoint = {
		x : toX,
		y : toY
	};
	newArrow(ctx, FromPoint, ToPoint);
}

function newArrow(ctx, fromPoint, toPoint) {
	var dx = toPoint.x - fromPoint.x;
	var dy = toPoint.y - fromPoint.y;

	// normalize
	var length = Math.sqrt(dx * dx + dy * dy);
	var unitDx = dx / length;
	var unitDy = dy / length;
	// increase this to get a larger arrow head
	var arrowHeadSize = 10;

	var arrowPoint1 = new Point((toPoint.x - unitDx * arrowHeadSize - unitDy * arrowHeadSize), (toPoint.y - unitDy * arrowHeadSize + unitDx * arrowHeadSize));
	var arrowPoint2 = new Point((toPoint.x - unitDx * arrowHeadSize + unitDy * arrowHeadSize), (toPoint.y - unitDy * arrowHeadSize - unitDx * arrowHeadSize));
	// Drawing Arrow Line.
	ctx.lineWidth = 1;
	var cp1X = fromPoint.x;
	var cp1Y = fromPoint.y;
	var cp2X = toPoint.x;
	var cp2Y = toPoint.y;
	ctx.beginPath();
	ctx.moveTo(fromPoint.x, fromPoint.y);
	ctx.bezierCurveTo(cp1X, cp1Y, cp2X, cp2Y, toPoint.x, toPoint.y);
	ctx.stroke();
	strokeArrowHead(ctx, toPoint, arrowPoint1, arrowPoint2);
	ctx.closePath();
}

// Drawing Arrow Head Stroked.
function strokeArrowHead(ctx, toPoint, arrowPoint1, arrowPoint2) {
	ctx.beginPath();
	ctx.moveTo(toPoint.x, toPoint.y);
	ctx.lineTo(arrowPoint1.x, arrowPoint1.y);
	ctx.lineTo(arrowPoint2.x, arrowPoint2.y);
	ctx.lineTo(toPoint.x, toPoint.y);
	ctx.fill();
	ctx.stroke();
}

function arrowHeadLines(ctx, toPoint, arrowPoint1, arrowPoint2) {
	ctx.beginPath();
	ctx.moveTo(arrowPoint1.x, arrowPoint1.y);
	ctx.lineTo(toPoint.x, toPoint.y);
	ctx.lineTo(arrowPoint2.x, arrowPoint2.y);
	ctx.stroke();
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
