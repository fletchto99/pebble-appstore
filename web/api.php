<?php

require_once 'configuration.php';

if (!Configuration::MAINTENANCE_MODE || isset($_POST['developer'])) {
    require_once 'api/FunctionCallHandler.php';
    require_once 'api/Functions.php';
    if (Configuration::MAINTENANCE_MODE && isset($_POST['developer'])) {
        ini_set('display_errors', 1);
    }
    $params = null;

    if (count($_POST) == 0) {
        $params = json_decode(file_get_contents('php://input'), true);
    } else {
        $params = $_POST;
    }

    if ($params !== null) {
        $handler = new FunctionCallHandler();
        $handler->execute($params['method'], $params);
    } else {
        echo json_encode(['status' => 1, 'message' => 'Server side error, please try again later.']);
    }
} else {
    echo json_encode(['status' => 1, 'message' => 'The server is currently undergoing maintenance, please try again later.']);
}