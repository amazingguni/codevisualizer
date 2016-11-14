function fileInfo(userid, filename, source) {
	this.userid = userid;
	this.filename = filename;
	this.source = source;
}

fileInfo.prototype.getUserId = function() {
	return this.userid;  
}

fileInfo.prototype.setUserId = function(userid) {
	this.userid = userid; 
}

fileInfo.prototype.getFileName = function() {
	return this.filename;  
}

fileInfo.prototype.setFileName = function(filename) {
	this.filename = filename; 
}

fileInfo.prototype.getSource = function() {
	return this.source;  
}

fileInfo.prototype.setSource = function(source) {
	this.source = source;  
}
