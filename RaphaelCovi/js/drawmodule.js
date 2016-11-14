function createPaper(canvas) {
	var picW = canvas.offsetWidth;
	var picH = canvas.offsetHeight;

	var paper = Raphael(canvas, picW, picH);
	return paper;
}

function drawCircle() {
	var r = Math.random();
	var circle = paper.circle(picture.offsetWidth / 2, picture.offsetHeight / 2, 100);

	circle.attr("fill", "rgb(" + parseInt(255 * r) + ",160,200)");
	circle.attr("stroke", "#ffffff");
	circle.attr("stroke-width", 3);

	return circle;
}

function drawRect(cx,cy) {
	var r = Math.random();
	var rect = paper.rect(cx, cy, 200, 100, 5);
	
	rect.attr("fill", "rgb(" + parseInt(255 * r) + ",160,200)");
	rect.attr("stroke", "#ffffff");
	rect.attr("stroke-width", 3);
	return rect;
}


// erase animation
function eraseCallback(target) {
	target.animate({
		r : 0,
		"stroke-opacity" : 0,
		"fill-opacity" : 0
	}, 3000);
}

function eraseAnimate(target) {
	var animObject = Raphael.animation({
		fill : "#ffffff"
	}, 1500, function() {
		eraseCallback(this);
	});

	target.animate(animObject);
}

// scroll zoomin out
function handle(delta) {
	vBHo = viewBoxHeight;
	vBWo = viewBoxWidth;
	if (delta > 0) {
		viewBoxWidth *= 0.9;
		viewBoxHeight *= 0.9;
	} else {
		viewBoxWidth *= 1.1;
		viewBoxHeight *= 1.1;
	}

	viewBox.X -= (viewBoxWidth - vBWo) / 2;
	viewBox.Y -= (viewBoxHeight - vBHo) / 2;
	paper.setViewBox(viewBox.X, viewBox.Y, viewBoxWidth, viewBoxHeight);
}

function wheel(event) {
	var delta = 0;
	if (!event)/* For IE. */
		event = parent.window.event;
	if (event.wheelDelta) {/* IE/Opera. */
		delta = event.wheelDelta / 120;
	} else if (event.detail) {/** Mozilla case. */
		/** In Mozilla, sign of delta is different than in IE.
		 * Also, delta is multiple of 3.
		 */
		delta = -event.detail / 3;
	}
	/** If delta is nonzero, handle it.
	 * Basically, delta is now positive if wheel was scrolled up,
	 * and negative, if wheel was scrolled down.
	 */
	if (delta)
		handle(delta);
	/** Prevent default actions caused by mouse wheel.
	 * That might be ugly, but we handle scrolls somehow
	 * anyway, so don't bother here..
	 */
	if (event.preventDefault)
		event.preventDefault();
	event.returnValue = false;
}
