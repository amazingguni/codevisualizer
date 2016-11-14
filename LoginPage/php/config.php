<?php
$mysql_hostname = "localhost";
$mysql_user = "root";
$mysql_password = "zh3ql8fk";
$mysql_database = "CodeVisualizer";
$bd = mysql_connect($mysql_hostname, $mysql_user, $mysql_password)
or die("Opps some thing went wrong : connect");
mysql_select_db($mysql_database, $bd) or die("Opps some thing went wrong : select db");
?>