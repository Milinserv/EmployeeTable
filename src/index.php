<?php
spl_autoload_register();
use controllers\Router;

$router = new Router();

echo $router->handleRequest($_GET['action'], $_POST);