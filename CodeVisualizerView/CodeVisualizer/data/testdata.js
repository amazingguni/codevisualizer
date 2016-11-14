var dbgData = {
	'frame1' : {
		frameid : 'main',
		type : 'int',
		name : 'myInteger',
		value : '30000'
	},
	'stack1' : {
		frameid : 'func1',
		type : 'i',
		name : 'mger',
		value : '300'
	},
	'stack2' : {
		frameid : 'func2',
		type : 'string',
		name : 'hjString',
		value : 'HyoJin'
	},
	'stack3' : {
		frameid : 'func3',
		type : 'string',
		name : 'jbString',
		value : 'JunBum'
	},
	'stack4' : {
		frameid : 'func4',
		type : 'string',
		name : 'ygString',
		value : 'veryverylongYoungG'
	},
	'stack5' : {
		frameid : 'func5',
		type : 'string',
		name : 'jmString',
		value : 'JaeMin'
	},
	'stack6' : {
		frameid : 'func6',
		type : 'double',
		name : 'myDoub',
		value : '234'
	},
	'stack7' : {
		frameid : 'func7',
		type : 'int',
		name : 'hisInte',
		value : '230'
	}
};

function getData() {
	return dbgData;
}

function getLen() {
	return dbgData.length;
}