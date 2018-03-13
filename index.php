<?php

define('WEBROOT', str_replace('index.php','',$_SERVER['SCRIPT_NAME']));
define('ROOT', str_replace('index.php','',$_SERVER['SCRIPT_FILENAME']));

require (ROOT.'Core/Database.php');
require (ROOT.'Core/Model.php');
require (ROOT.'Core/Controller.php');

$params = explode('/',$_GET['p']);
$controller  = $params[0];

$controller = $params[0] !== "" ? $params[0] : 'Homes';
$action = isset($params[1]) ? $params[1] : 'index';

if(file_exists('Controllers/'.$controller.'Controller.php')){
	require('Controllers/'.$controller.'Controller.php');

	$controller = new $controller();

	if(method_exists($controller, $action)){
		$statement = new ReflectionMethod($controller, $action);
		if ($statement->isPrivate() || $statement->isProtected()){
			echo "ERROR 404";
			exit;
		}
		else
		{
			unset($params[0]);
			unset($params[1]);
			session_start();
			call_user_func_array(array($controller, $action), $params);
		}
	}
	else
	{
		echo 'ERROR 404';
	}
}
else
{
	echo 'ERROR 404';
}
