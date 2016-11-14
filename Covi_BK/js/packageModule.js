function packageModule(editorMode) { {

		//code visualizer view
		var picture = document.getElementById("picture");
		//console view
		var content_output = document.getElementById("content_output");
		//input console
		var input_console = document.getElementById("input_console");
		//dbg
		var stage = createStage(stage, picture);
		var mainlayer = createLayer("mainlayer");
		stage.add(mainlayer);
		mainlayer.setDraggable(false);

		initPosition = {
			x : mainlayer.getAbsolutePosition().x,
			y : mainlayer.getAbsolutePosition().y
		}

		var datacount = 0;

		var prezinum = 0;

		//�뺣�異뺤냼 愿�젴
		var scale = 1.0;
		var scaleMultiplier = 0.8;
		var startDragOffset = {};
		var mouseDown = false;

		var preframelist = null;

		mainlayer.on('click', function(evt) {
		var node = evt.shape;
		
		var basicPos;
		var objectPos;

		if (node.getParent().getName() == "basicvar") {
			var objectArr = mainlayer.get(".object");

			for (var i = 0; i < objectArr.length; i++) {
				if ("\n" + objectArr[i].getId() == node.getText()) {
//					alert(objectArr[i].getX() + " : " + objectArr[i].getY());
					scale = 1.0;
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

	this.getEditor = function() {
		return editor;
	}

	this.getBreakRowClass = function() {
		return breakrowclass;
	}

	this.getDataCount = function() {
		return datacount;
	}

	this.getMainLayer = function() {
		return mainlayer;
	}

	this.getStage = function() {
		return stage;
	}

	this.getPrezinum = function() {
		return prezinum;
	}
}