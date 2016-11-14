var util = require('util');
var mysql = require('mysql');
var async = require('async');

var DBConnection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'zh3ql8fk',
});

DBConnection.connect(); 

DBConnection.query('USE CodeVisualizer', function(error, results){
    if(error) {
    	disabled="disabled"
       console.log("데이터베이스 접속 실패: " + error);
       return;
    }
    console.log("CodeVisualizer 데이터베이스에 접속하였습니다.");
    
    //insertProjectInfo(DBConnection, '', '', '');
    selectUserRootPath(DBConnection, 'astricmir');
});
 
DBClientReady = function(DBClient){
    var values = ['test', '12121212'];
    DBClient.query("INSERT INTO User SET ID=?, PASSWORD=?", values,
        function(error, results)
        {
            if(error) {
                console.log("데이터베이스 입력 실패: " + error);
                client.end();
                return;
            }
            console.log(results.affectedRows + "열 추가하였습니다.");
            console.log("ID 추가하였습니다: " + results.insertId);
        }
    );
}

getUserDBData = function(DBClient) {
	var funcTag = "getUserDBData ";
    DBClient.query(
        "SELECT USER_KEY, ID, PASSWORD FROM User",
        function(error, results, fields) {
            if(error){
                console.log(funcTag + "데이터베이스 조회 실패: " + error);
                dbClient.end();
                return;
            }
           // 무진장 많이 뜨는 거 보고싶으면 주석 해제하세요.
          //console.log('Results:');
          //console.log(results);
          //console.log('Field metadata:');
          //console.log(fields);
          //console.log(util.inspect(results));
  
          if(results.length > 0)
            {
            	for(var i = 0; i < results.length; i++){
                var result = results[i];
                console.log('ID: ' + result['ID'] + 
                				'  PASSWORD: ' + result['PASSWORD'] +
                				'  KEY: ' + result['USER_KEY']);
               }
            }
        }
    );
    
    DBClient.end();
    console.log("연결이 닫혔습니다.");
}



insertProjectInfo = function(DBClient, userID, projectName, projectPath) {
	var funcTag = "insertProjectInfo ";
	userID = ['astricmir'];
	var userKey = "";

	DBClient.query("SELECT USER_KEY FROM User WHERE ID = ?", userID, 
	function(error, results) {
		if (error) {
			console.log(funcTag + " 데이터베이스 조회 실패: " + error);
			DBClient.end();
			throw err;
			return;
		}
		if(results.length == 0){
			console.log(funcTag + " 데이터베이스 조회 실패: No Data - " + results);
			DBClient.end();
			return;
		}
		else if (results.length > 0) {
			var result = results[0];
			userKey = result['USER_KEY'];
			console.log(funcTag + " 데이터베이스 조회 성공 key = "+userKey);
			//insertProjectFolder(DBClient, userKey);
			
			projectName = 'ProjectCV1';
			projectPath = '/home/ssm/Document/CodeVisualizer/ProjectCV1';
			var projectInfo = [projectName, projectPath, userKey];
	
			console.log("Project Info : " + projectInfo);
			DBClient.query("INSERT INTO Project(PROJECT_NAME, PROJECT_PATH, USER_KEY) VALUES(?, ?, ?)", projectInfo, 
			function(error, results) {
				if (error) {
					console.log(funcTag + "데이터베이스 삽입 실패: " + error);
					DBClient.end();
					return;
				} else {
					console.log(funcTag + "데이터베이스 삽입 성공");
					DBClient.end();
				}
			});
		}
	});
}

selectUserRootPath = function(DBClient, userID){
	var funcTag = "selectUserRootPath ";
	var rootPath;
	
	if (userID != null) {
		console.log("user ID : " + userID);
		DBClient.query("SELECT USER_ROOT_PATH FROM User WHERE ID = ?", userID, 
		function(error, results) {
			if (error) {
				console.log(funcTag + " 데이터베이스 조회 실패: " + error);
				DBClient.end();
				return;
			} if(results.length == 0) {
				console.log(funcTag + " 데이터베이스 조회 실패: No Data");
				DBClient.end();
				return;
			}
			else {
				var result = results[0];
				rootPath = result['USER_ROOT_PATH'];
				
				console.log(funcTag + "데이터베이스 조회 성공 " + rootPath);
				DBClient.end();
				return rootPath;
			}
		});
	}
}

setProjectFolder3 = function(DBClient){
	
}

setProjectFolder4 = function(DBClient){
	
}
