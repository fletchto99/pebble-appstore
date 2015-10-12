<?php

require_once 'Functions.php';
require_once 'functions/AllApps.php';
require_once 'functions/AllFaces.php';
require_once 'functions/AppCategories.php';
require_once 'functions/AppCollections.php';
require_once 'functions/AppsInCategory.php';
require_once 'functions/AppsInCollection.php';
require_once 'functions/FaceCollections.php';
require_once 'functions/FacesInCollection.php';
require_once 'functions/SingleApp.php';
require_once 'functions/MaxOffset.php';

class FunctionCallHandler {

    private $result = ['error' => 'Invalid function call.'];

    function execute($method, $params) {
        $offset = (isset($params['offset']) ? $params['offset'] : 0);
        switch ($method) {
            case 'all_apps':
                $apps = new AllApps($params['platform'], $offset);
                $this->result = $apps->execute();
                break;
            case 'app_categories':
                $categories = new AppCategories($params['platform']);
                $this->result = $categories->execute();
                break;
            case 'app_collections':
                $collections = new AppCollections($params['platform']);
                $this->result = $collections->execute();
                break;
            case 'apps_in_category':
                $apps = new AppsInCategory($params['platform'], $params['category'], $offset);
                $this->result = $apps->execute();
                break;
            case 'apps_in_collection':
                $apps = new AppsInCollection($params['platform'], $params['collection'], $offset);
                $this->result = $apps->execute();
                break;
            case 'all_faces':
                $faces = new AllFaces($params['platform'], $offset);
                $this->result = $faces->execute();
                break;
            case 'face_collections':
                $collections = new FaceCollections($params['platform']);
                $this->result = $collections->execute();
                break;
            case 'faces_in_collection':
                $faces = new FacesInCollection($params['platform'], $params['collection'], $offset);
                $this->result = $faces->execute();
                break;
            case 'single_app':
                $faces = new SingleApp($params['platform'], $params['app_id']);
                $this->result = $faces->execute();
                break;
            case 'max_offset':
                $max = new MaxOffset($params['platform']);
                $this->result = $max->execute();
                break;
            default:
                $this->result['error'] = 'Method '.$method.' does not exist!';
                break;
        }
        echo json_encode($this->result);
    }

}