function runDebugInfo(userid, filename, source, breakpoint) {
	this.userid = userid;
	this.filename = filename;
	this.source = source;
	this.breakpoint = breakpoint;
}

runDebugInfo.prototype.getUserId = function() {
	return this.userid;  
}

runDebugInfo.prototype.setUserId = function(userid) {
	this.userid = userid; 
}

runDebugInfo.prototype.getFileName = function() {
	return this.filename;  
}

runDebugInfo.prototype.setFileName = function(filename) {
	this.filename = filename; 
}

runDebugInfo.prototype.getSource = function() {
	return this.source;  
}

runDebugInfo.prototype.setSource = function(source) {
	this.source = source;  
}

runDebugInfo.prototype.getBreakPoint = function() {
	return this.breakpoint;  
}

runDebugInfo.prototype.setBreakPoint = function(breakpoint) {
	this.breakpoint = breakpoint;  
}