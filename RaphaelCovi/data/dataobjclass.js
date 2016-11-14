DataObj = function(filename, breakpointrow) {
	this.filename = filename;
	this.breakpointrow = breakpointrow;
	// this.foo = function(argument) {
	// //todo
	// }

	this.getBreakpointrow = function() {
		return this.breakpointrow;
	}

	this.setBreakpointrow = function(breakpointrow) {
		this.breakpointrow = breakpointrow;
	}

	this.getFilename = function() {
		return this.filename;
	}

	this.setFilename = function(filename) {
		this.filename = filename;
	}

	this.pushRow = function(row) {
		this.breakpointrow.push(row);
	}

	this.popRow = function() {
		this.breakpointrow.pop();
	}
	
	this.delByIndex = function(row) {
		var len = this.breakpointrow.length;
		
		for (var i = 0; i < len; i++) {
			if (this.breakpointrow[i] == row) {
				this.breakpointrow.remove(i);
			}
		}
	}

	Array.prototype.remove = function(from, to) {
		var rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply(this, rest);
	};
}