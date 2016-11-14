$(function () {
    "use strict";
 
    // for better performance - to avoid searching in DOM
    var content_output = $('#content_output');
    var status_userName = $('#status_userName');
    var input_userName = $('#input_userName');
    var status_code = $('#status_code');
    var status_fileName = $('#status_fileName');
    var input_code = $('#input_code');
    var input_fileName = $('#input_fileName');
    var input_console = $('#input_console');
    
    var myUserName;
    var myUserIdx;
 
    // my color assigned by the server
    var myColor = false;
    // my name sent to the server
    var myName = false;
    var clientNum = 0;
 
    // if user is running mozilla then use it's built-in WebSocket
    window.WebSocket = window.WebSocket || window.MozWebSocket;
 
    // if browser doesn't support WebSocket, just show some notification and exit
    if (!window.WebSocket) {
        content_output.html($('<p>', { text: 'Sorry, but your browser doesn\'t '
                                    + 'support WebSockets.'} ));
        input_code.hide();
        $('span').hide();
        input_fileName.hide();
        input_console.hide();
        
        return;
    }
 
    // open connection
    var connection = new WebSocket('ws://211.189.127.197:1337');
 
    connection.onopen = function () {
        // first we want users to enter their names
        input_userName.removeAttr('disabled');
        input_code.removeAttr('disabled');
        input_fileName.removeAttr('disabled');
        input_console.removeAttr('disabled');
    };
 
    connection.onerror = function (error) {
        // just in there were some problems with conenction...
        content_output.html($('<p>', { text: 'Sorry, but there\'s some problem with your '
                                    + 'connection or the server is down.</p>' } ));
    };
 
    // most important part - incoming messages
    connection.onmessage = function (message) {
        // try to parse JSON message. Because we know that the server always returns
        // JSON this should work without any problem but we should make sure that
        // the massage is not chunked or otherwise damaged.
        try {
            var json = JSON.parse(message.data);
        } catch (e) {
            console.log('This doesn\'t look like a valid JSON: ', message.data);
            return;
        }
 
        // NOTE: if you're not sure about the JSON structure
        // check the server source code above
        if (json.type === 'message') { // it's a single message
        	 input_userName.attr('disabled', 'disabled');
            input_code.removeAttr('disabled'); // let the user write another message
            input_fileName.removeAttr('disabled');
            input_console.removeAttr('disabled');
            addMessage(json.data.userName, json.data.text, new Date(json.data.time));
        } else if(json.type === 'userIdentify'){
        	 input_userName.attr('disabled', 'disabled');
            input_code.removeAttr('disabled'); // let the user write another message
            input_fileName.removeAttr('disabled');
            input_console.removeAttr('disabled');
        	 userIdentification(json.data.userName, json.data.userIdx, new Date(json.data.time));
        	 myUserIdx = json.data.userIdx;
        }else {
            console.log('Hmm..., I\'ve never seen JSON like this: ', json);
         }
    };
 
     /**
     * Send mesage when user presses Enter key
     */
    input_userName.keydown(function(e) {
        if (e.keyCode === 13) {
            var msg = $(this).val();
            if (!msg) {
                return;
            }
            // send the message as an ordinary text
            //connection.send(msg);
            var json = JSON.stringify({ type:'userName', 
            								userName: input_userName.val(), 
            								userIdx: 'request' });
            myUserName = input_userName.val();
            connection.send(json);            
            
            //$(this).val('');
            // disable the input field to make the user wait until server
            // sends back response
            input_userName.attr('disabled', 'disabled');
        }
    });
    
    /**
     * Send mesage when user presses Enter key
     */
    input_code.keydown(function(e) {
        if (e.keyCode === 13) {
            var msg = $(this).val();
            if (!msg) {
                return;
            }
            // send the message as an ordinary text
            //connection.send(msg);
            var json = JSON.stringify({ type:'sendCode', 
            								fileName: input_fileName.val(), 
            								data: input_code.val() });
            connection.send(json);            
            
            $(this).val('');
            // disable the input field to make the user wait until server
            // sends back response
            input_code.attr('disabled', 'disabled');
        }
    });
    
        /**
     * Send mesage when user presses Enter key
     */
    input_console.keydown(function(e) {
        if (e.keyCode === 13) {
            var msg = $(this).val();
            if (!msg) {
                return;
            }
            // send the message as an ordinary text
            //connection.send(msg);
            var json = JSON.stringify({ type:'inputConsole', 
            								fileName: input_fileName.val(), 
            								data: input_code.val() });
            connection.send(json);            
            
            $(this).val('');
            // disable the input field to make the user wait until server
            // sends back response
            input_console.attr('disabled', 'disabled');
        }
    });
 
    /**
     * This method is optional. If the server wasn't able to respond to the
     * in 3 seconds then show some error message to notify the user that
     * something is wrong.
     */
    setInterval(function() {
        if (connection.readyState !== 1) {
            status_code.text('Error');
            status_fileName.text('Error');
            input_fileName.text('Error');
            input_console.text('Error');
            input_code.attr('disabled', 'disabled').val('Unable to comminucate '
                                                 + 'with the WebSocket server.');
        }
    }, 3000);
 
    /**
     * Add message to the chat window
     */
    function addMessage(userName, message, dt) {
        /*content_output.append('<p>' + userName + '</span> @ ' +
             + (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':'
             + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes())
             + ': ' + message + '</p>');*/
        content_output.append('<p>' + message + '</p>');
    }

    function userIdentification(userName, message, dt) {
        content_output.append('<p>' + userName + '</span> @ ' +
             + (dt.getHours() < 10 ? '0' + dt.getHours() : dt.getHours()) + ':'
             + (dt.getMinutes() < 10 ? '0' + dt.getMinutes() : dt.getMinutes())
             + ': ' + message + '</p>');
    }
    
    window.onload = function() {
       document.getElementById("sendCode").onclick = function() {
        	 var json = JSON.stringify({ type:'sendCode', 
        	 								userName: myUserName, 
            								userIdx: myUserIdx,
        	 								fileName: input_fileName.val(), 
        	 								data: input_code.val() });
        	 //window.alert(json);
            connection.send(json);
            input_code.attr('disabled', 'disabled');
        }
       document.getElementById("makeFile").onclick = function() {
            var json = JSON.stringify({ type:'makeFile', 
        	 								userName: myUserName, 
            								userIdx: myUserIdx,
            								data: input_code.val() });
            //window.alert(json);
            connection.send(json);
            input_code.attr('disabled', 'disabled');
        }
       document.getElementById("makeFolder").onclick = function() {
            var json = JSON.stringify({ type:'makeFolder', 
        	 								userName: myUserName, 
            								userIdx: myUserIdx,
            								data: input_code.val() });
            //window.alert(json);
            connection.send(json);
            input_code.attr('disabled', 'disabled');
        }
       document.getElementById("debugRun").onclick = function() {
            var json = JSON.stringify({ type:'debugRun', 
        	 								userName: myUserName, 
            								userIdx: myUserIdx,
            								data: input_code.val() });
            //window.alert(json);
            connection.send(json);
            input_code.attr('disabled', 'disabled');
        }
       document.getElementById("compileRun").onclick = function() {
            var json = JSON.stringify({ type:'compileRun', 
        	 								userName: myUserName, 
            								userIdx: myUserIdx,
            								data: input_code.val() });
            //window.alert(json);
            connection.send(json);
            input_code.attr('disabled', 'disabled');
        }
    }
});