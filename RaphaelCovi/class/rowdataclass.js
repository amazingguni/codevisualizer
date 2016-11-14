rowData = function(rownum, rowdata) {
	this.rownum = rownum;
	this.rowdata = rowdata;

	this.getRownum = function() {
		return this.rownum;
	}

	this.setRownum = function(rownum) {
		this.rownum = rownum;
	}
	
	this.getRowdata = function() {
		return this.rowdata;
	}

	this.setRowdata = function(rowdata) {
		this.rowdata = rowdata;
	}
	
	this.getRowlen = function() {
		return this.rowdata.length;
	}
	
	this.getSplitToken = function() {
		var arr = this.rowdata.split('@');
		return arr;
	}
}