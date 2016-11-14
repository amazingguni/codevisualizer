function packageModule(editorMode) { {
		//�몄쭛湲�
		var input_code = document.getElementById("input_code");
		//code visualizer view
		var picture = document.getElementById("picture");
		//console view
		var content_output = document.getElementById("content_output");
		//input console
		var input_console = document.getElementById("input_console");
		//dbg
		var dbg = document.getElementById("debugging");

		//breakpoint 愿�젴 class
		var breakrowclass = new DataObj(null, new Array());

		//ace-editor : monokai �뚮쭏, python�몄뼱
		var editor = ace.edit("input_code");
		// editor.setTheme("ace/theme/monokai");
		editor.setTheme("ace/theme/tomorrow");
		editor.getSession().setMode(editorMode);

		var testdbg = document.getElementById("testdbg");
		var pagenumdbg = document.getElementById("pagenumdbg");
		var dbgcontent = document.getElementById("dbgcontent");

		//그림그리는 부분
		//stage �앹꽦
		var stage = createStage(stage, picture);
		var mainlayer = createLayer("mainlayer");
		stage.add(mainlayer);
		stage.setDraggable(false);

		var minimapLayer = createLayer("minimapLayer");
		stage.add(minimapLayer);

		minimapLayer.on('click', function(evt) {
			var node = evt.shape;

			var objectArr = mainlayer.get(".object");
			var frameArr = mainlayer.get(".frame");

			var preX;
			var preY;

			for (var i = 0; i < objectArr.length; i++) {
				if ("\n" + objectArr[i].getId() == node.getText()) {
					alert(objectArr[i].getX() + " : " + objectArr[i].getY());

					preX = mainlayer.getX();
					preY = mainlayer.getY();

					mainlayer.transitionTo({
						x : -(objectArr[i].getX() - picW / 2),
						y : -(objectArr[i].getY() - picH / 2),
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
		});

		var datacount = 0;

		//stage��mousewheel event 異붽�
		stage.getDOM().addEventListener("DOMMouseScroll", handleScroll, false);
		stage.getDOM().addEventListener("mousewheel", handleScroll, false);

		var prezinum = 0;

		//�뺣�異뺤냼 愿�젴
		var scale = 1.0;
		var scaleMultiplier = 0.8;
		var startDragOffset = {};
		var mouseDown = false;

		var preframelist = null;

		//animation 愿�젴
		var translatePos = {
			x : stage.getWidth() / 2,
			y : stage.getHeight() / 2
		};

		mainlayer.on('click', function(evt) {
			var node = evt.shape;

			if (node.getParent().getName() == "basicvar") {
				var objectArr = mainlayer.get(".object");

				for (var i = 0; i < objectArr.length; i++) {
					if ("\n" + objectArr[i].getId() == node.getText()) {
						alert(objectArr[i].getX() + " : " + objectArr[i].getY());

						preX = mainlayer.getX();
						preY = mainlayer.getY();

						mainlayer.transitionTo({
							x : -(objectArr[i].getX() - picW / 2),
							y : -(objectArr[i].getY() - picH / 2),
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

						var curframeindex = findFrameIndex(existlen, existframe, existvar[i].getParent().getId());

						mainlayer.transitionTo({
							x : 0,
							y : (picH * curframeindex),
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
			if (evt.altKey === false) {
				stage.setDraggable(false);
			} else {
				stage.setDraggable(true);
			}
		});

		mainlayer.on('mouseup', function(evt) {
			if (evt.altKey === false) {
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

		// mainlayer.on('mousedown', function(evt) {
		// if (evt.altKey === true) {
		// stage.setDraggable(false);
		// } else {
		// stage.setDraggable(true);
		// }
		//
		// var node = evt.shape;
		//
		// var objectArr = mainlayer.get(".object");
		//
		// for (var i = 0; i < objectArr.length; i++) {
		// if (objectArr[i] == node.parent) {
		// node.parent.on('dragmove', function() {
		// node.parent.setOpacity(0.2);
		// });
		//
		// node.parent.on('dragend', function() {
		// node.parent.setOpacity(1);
		// mainlayer.draw();
		// // updateLine(objectArr[i], null);
		// });
		// }
		// }
		// });

		//breakpoint 嫄���
		editor.on("gutterclick", function(e) {
			var target = e.domEvent.target;
			// 				file name : ace_gutter-cell?
			if (target.className.indexOf("ace_gutter-cell") == -1)
				return;
			if (!editor.isFocused())
				return;
			if (e.clientX > 25 + target.getBoundingClientRect().left)
				return;

			var row = e.getDocumentPosition().row;
			breakrowclass.pushRow(row);
			dbg.innerHTML = breakrowclass.getBreakpointrow();
			breakrowclass.setCurBreakIndex(0);
			e.editor.session.setBreakpoint(row);
			e.stop();
		});

		//breakpoint ����
		editor.on("guttermousedown", function(e) {
			var target = e.domEvent.target;
			if (target.className.indexOf("ace_gutter-cell") == -1)
				return;
			if (!editor.isFocused())
				return;
			if (e.clientX > 25 + target.getBoundingClientRect().left)
				return;

			var row = e.getDocumentPosition().row;
			var breakarray = e.editor.session.getBreakpoints();

			if (breakarray != null) {
				for (var i = 0; i < breakarray.length; i++) {
					if ("ace_breakpoint" == breakarray[i]) {
						if (row == i) {
							breakrowclass.delByIndex(row);
							dbg.innerHTML = breakrowclass.getBreakpointrow();
							breakrowclass.setCurBreakIndex(0);
							e.editor.session.clearBreakpoint(row);
							e.stop();
						}
					}
				}

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

	this.getMinimapLayer = function() {
		return minimapLayer;
	}

	this.getPrezinum = function() {
		return prezinum;
	}
}
