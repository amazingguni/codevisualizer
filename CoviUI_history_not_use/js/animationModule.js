function preziprev() {
	if (prezinum == 0) {
		return;
	}
	
	readyToMove();
	
	mainlayer.transitionTo({
		y : (picture.offsetHeight * --prezinum),
		scale : {
			x : 1,
			y : 1
		},
		duration : 1.2,
		easing : 'ease-out'
	});

	mainlayer.draw();
}

function prezinext() {
	if (prezinum == mainlayer.children.length - 1) {
		return;
	}
	
	readyToMove();
	
	mainlayer.transitionTo({
		y : (picture.offsetHeight * ++prezinum),
		scale : {
			x : 1,
			y : 1
		},
		duration : 1.2,
		easing : 'ease-out'
	});

	mainlayer.draw();
}

//확대 축소
function handleScroll(evt) {
	if(evt.shiftKey === true){
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
	}else{
		readyToMove();
	}
};

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

// function createObjectGuide() {
	// var minimapArr = minimapLayer.get(".minimap");
	// var objectArr = mainlayer.get(".object");
// 
	// var namelist = new Array();
// 
	// for (var i = 0; i < objectArr.length; i++) {
		// namelist.push(objectArr[i].getId());
	// }
// 
	// var group = createGroup("minimap");
	// group.setX(picW - 100);
	// group.setY(0);
// 
	// for (var i = 0; i < objectArr.length; i++) {
		// var tmplength = mainlayer.get(".object").length;
		// var tmpY;
// 
		// if (tmplength == 0) {
			// tmpY = 0;
		// } else {
			// tmpY = 50 * tmplength;
		// }
// 
		// var minimap = new Kinetic.Text({
			// x : 0,
			// y : tmpY,
			// width : 100,
			// height : 50,
			// name : "minimap",
			// fill : "#F2E569",
			// text : "\n" + namelist[i],
			// stroke : 'white',
			// strokeWidth : 0,
			// fontFamily : 'Calibri',
			// fontSize : 15,
			// textFill : 'black',
			// align : 'center',
			// shadow : {
				// offset : 2,
				// color : 'black',
				// blur : 3,
				// opacity : 0.5
			// },
			// cornerRadius : 5
		// });
// 
		// group.add(minimap);
	// }
// 
	// minimapLayer.add(group);
	// minimapLayer.draw();
// 
	// // for (var i = 0; i < objectArr.length; i++) {
	// // if (minimapArr.length != 0) {
	// // for (var j = 0; j < minimapArr.length; j++) {
	// // var tmp = minimapArr[j].children[0].getText;
	// // tmp = tmp.substring(2);
	// // if (namelist.inArray(tmp)) {
	// // continue;
	// // } else {
	// // }
	// //
	// // function minimap() {
	// // var test = new Kinetic.Text({
	// // x : screen.width / 2,
	// // y : screen.heihgt / 2,
	// // width : 200,
	// // height : 200,
	// // fill : "red", //frame 구분하기 위한 색상
	// // align : 'left',
	// // text : "test",
	// // fontSize : 20,
	// // textFill : 'white',
	// // stroke : 'white',
	// // storkeWidth : 1,
	// // shadow : {
	// // offset : 2,
	// // color : 'black',
	// // blur : 3,
	// // opacity : 0.5
	// // },
	// // });
	// //
	// // minimapLayer.add(test);
	// // stage.draw();
	// // }
	// //
	// // }
	// // }
	// // }
// }