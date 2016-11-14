
function UserInfo() {
	this.userName = un;
	this.connection;
	this.process;
	this.userIdx = ui;
	this.connectionIdx = ci;
	this.remoteAddress = ra;
	
	this.setConnection = function(con) {
		this.connection = con;
	};
	this.setProcess = function(proc) {
		this.process = proc;
	};
	this.getConnection = function() {
		return this.connection;
	};
	this.getProcess = function() {
		return this.process;
	};
	this.getUserName = function() {
		return this.userName;
	};
	this.getUesrIdx = function() {
		return this.userIdx;
	};
	this.getConnectionIdx = function() {
		return this.connectionIdx;
	};
}
