// for better performance - to avoid searching in DOM
var content_output = $('#content_output');
var status_userName = $('#status_userName');
var input_userName = $('#input_userName');
var status_code = $('#status_code');
var status_fileName = $('#status_fileName');
var input_code = $('#input_code');
var input_fileName = $('#input_fileName');
var input_console = $('#input_console');

var socket = null;
var myUserIdx = -1;
var username = null;
var serverIP = 'ws://211.189.127.121:1337';

var defaults = {
    onmessage: function(msg){
        alert(msg.data);
    },
    onerror: function(msg){
        alert("error " + msg.data);
    },
    onopen: function(msg){
        alert("onopen " + msg.data);
    }
}

function socketOpen(o){
    socket = new WebSocket(serverIP);
    setInterval(function(){
        if (socket.readyState !== 1) {
        }
    }, 3000);
    
    var opts = jQuery.extend(defaults, o);
    socket.onmessage = opts.onmessage;
    socket.onerror = opts.onerror;
    socket.onopen = opts.onopen;
    
    return true;
}

function socketClose(){
    if (socket != null) {
        socket.close();
    }
}

function sendMessage(data){
    var jsonData = JSON.stringify(data);
    
    if (socket != null) {
    
        socket.send(jsonData);
    }
}

function sendUserName(){

    if (!username) {
    
        return;
    }
    
    var $data = {
        type: 'userName',
        userName: username,
        userIdx: 'request'
    };
    
    sendMessage($data);
}

function sendSignMsg(data){

    var $defaultdata = {
        type: 'userInitSignUp',
        userName: data,
        userIdx: 'request'
    };
    
    sendMessage($defaultdata);
}

function makeFile(data){
    var $defaultdata = {
        type: 'makeFile',
        fileName: '',
        userName: username,
        userIdx: myUserIdx,
        data: ''
    };
    var $data = jQuery.extend($defaultdata, data);
    sendMessage($data);
}

function makeFolder(data){
    var $defaultdata = {
        type: 'makeFolder',
        path: '/',
        data: '',
        userName: username,
        userIdx: myUserIdx
    };
    var $data = jQuery.extend($defaultdata, data);
    sendMessage($data);
}

function debugRun(data){
    var $defaultdata = {
        type: 'debugRun',
        fileName: '',
        userName: username,
        userIdx: myUserIdx
    };
    
    var $data = jQuery.extend($defaultdata, data);
    sendMessage($data);
}

function debugCmd(data){
    var $defaultdata = {
        type: 'inputConsole',
        userName: username,
        userIdx: myUserIdx,
        data: '\n'
    };
    var $data = jQuery.extend($defaultdata, data);
    sendMessage($data);
}

function sendBreakPoint(data){
    var $defaultdata = {
        type: 'breakpoint',
        userName: username,
        userIdx: myUserIdx,
        data: '\n'
    };
    var $data = jQuery.extend($defaultdata, data);
    
    sendMessage($data);
}

function sendClearBreakPoint(data){
    var $defaultdata = {
        type: 'clearbreakpoint',
        userName: username,
        userIdx: myUserIdx,
        data: '\n'
    };
    var $data = jQuery.extend($defaultdata, data);
    sendMessage($data);
}

function compileRun(data){
    var $defaultdata = {
        type: 'compileRun',
        fileName: '',
        userName: username,
        userIdx: myUserIdx
    };
    var $data = jQuery.extend($defaultdata, data);
    sendMessage($data);
}

function delete_file(data){
    var $defaultdata = {
        type: 'delete',
        path: '',
        userName: username,
        userIdx: myUserIdx
    };
    var $data = jQuery.extend($defaultdata, data);
    sendMessage($data);
}

function load_file(data){
    var $defaultdata = {
        type: 'loadFile',
        fileName: '',
        userName: username,
        userIdx: myUserIdx
    };
    var $data = jQuery.extend($defaultdata, data);
    sendMessage($data);
}

function gotoHighrightLine(filename, breakLine){
    var _filename = filename;
    if (_filename.charAt(0) != '.') 
        _filename = ".." + _filename.substring(_filename.indexOf("/Database/"));
    if (breakLine == undefined) {
        return;
    }
    lineNum = breakLine;
    load_file({
        fileName: filename
    });
}

function send_breakpoint_info(){
    for (var files in breakpointDict) {
        var breaklist = breakpointDict[files];
        for (var i = 0; i < breaklist.length; i++) {
            tmp = files + ":" + (breaklist[i] + 1) + "\n";
            sendBreakPoint({
                data: tmp
            });
        }
    }
}

function realTimeDebug(){
    var iu = tabs.tabs("option", "active");
    
    debugRun({
        fileName: $('#sourceview >div').get(iu).getAttribute('rel')
    });
    
    debugCmd({
        data: "c\n"
    });
}

function set_code_input(inputcode){
    $(inputcode).keydown(function(e){
        if (e.keyCode === 13) {
            if (checkRealTime) {
                realTimeDebug();
            }
        }
    });
}

function set_realtime_input(editor){
    editor.getSession().on('change', function(e){
        realTimeDebug();
    });
}

function set_console_input(inputconsole){
    $(inputconsole).keydown(function(e){
    
        if (e.keyCode === 13) {
        
            var msg = $(this).val();
            
            if (msg == undefined || msg == null || msg == "" || msg == 'undefined' || msg == 'null') {
                debugCmd({
                    data: '\n'
                });
                return;
            }
            
            debugCmd({
                data: $(this).val() + '\n'
            });
            $(this).val('');
        }
    });
}


function addMessage(contentoutput, userName, message, dt, language){
var endCheck = false;
    /*content_output.append('<p>' + userName + '</span> @ ' +
     + (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':'
     + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes())
     + ': ' + message + '</p>');*/
    /*
     contentoutput.append('<p>' + message + '</p>');
     $('#content_output').attr('style', "color : #FFFFFF");
     */
    if (checkStr(message, "FrameDict") && (!checkStr(message, "connect and create debugger"))) {
        // dbgcontent.innerHTML = "ininininininin : "+message;
        
        // 			replaceAll과 같은 기능
        var tmpmessage = message.replace(/&quot;/gi, "\"");
        tmpmessage = tmpmessage.replace(/&lt;/gi, "\<");
        tmpmessage = tmpmessage.replace(/&gt;/gi, "\>");
        
        var usingmessage = tmpmessage;
        // 		c
        //		python
        if (checkStr(tmpmessage, "The end")) {
			 endCheck = true;
            usingmessage = tmpmessage.substring(0, tmpmessage.length - 8);
        }
        
        var tmptoobject = stringToObject(usingmessage);
        var framelist = tmptoobject.FrameList;
        var errorlist = tmptoobject.ErrorList;
        var printlist = tmptoobject.PrintList;
        
        if (printlist != undefined && printlist != null && printlist != '' && printlist != 'undefined' && printlist != 'null') {
            if (printlist.length != 0) {
                for (var j = 0; j < printlist.length; j++) {
                    contentoutput.append('<p class="printmessage">' + printlist[j] + '</p>');
                    $('.printmessage').attr('style', "color:#05E300");
                }
            }
        }
        
        if (errorlist != undefined && errorlist != null && errorlist != '' && errorlist != 'undefined' && errorlist != 'null') {
            if (errorlist.length != 0) {
                for (var j = 0; j < errorlist.length; j++) {
                    contentoutput.append('<p class="errormessage">' + errorlist[j] + '</p>');
                    $('.errormessage').attr('style', "color:#F2150D");
                }
            }
        }
        
        if (framelist != undefined && framelist != null && framelist != '' && framelist != 'undefined' && framelist != 'null') {
            var framedict = tmptoobject.FrameDict;
            
            var framename = framelist[0];
            var framedata = framedict[framename];
            var filename = framedata[0].substring(1, framedata[0].length - 1);
            var linenum = framedata[2];
            
            if (!checkRealTime) {
                gotoHighrightLine(filename, linenum);
             }
            else {
            }
            drawData(usingmessage, language);
        }
		
		if(endCheck){
			contentoutput.append('<p class="endmessage">The End</p>');
            $('.endmessage').attr('style', "color:#FFFFFF");
		}
		endCheck = false;
    }
    // dbgcontent.innerHTML = "nonononononono : "+message;
}

function userIdentification(userName, message, dt){
    content_output.append('<p>' + userName + '</span> @ ' + +(dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':' + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes()) + ': ' + message + '</p>');
    $('#content_output').attr('style', "color : #FFFFFF");
}
