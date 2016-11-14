function folderInfo(userid, foldername) {
	this.userid = userid;
	this.foldername = foldername;
}

folderInfo.prototype.getUserId = function() {
	return this.userid;  
}

folderInfo.prototype.setUserId = function(userid) {
	this.userid = userid; 
}

folderInfo.prototype.getFolderName = function() {
	return this.foldername;  
}

folderInfo.prototype.setFolderName = function(foldername) {
	this.foldername = foldername; 
}
