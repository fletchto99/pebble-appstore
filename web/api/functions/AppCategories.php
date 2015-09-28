<?php

class AppCategories {

    function __construct($platform) {
        $this->platform = $platform;
    }

    function execute() {
        $data = Functions::makeAPICall(Configuration::PEBBLE_API_URL . Configuration::PEBBLE_APP_COLLECTIONS_AND_CATEGORIES . '?image_ratio=1&platform=pas&filter_hardware=true&hardware=' . $this->platform);
        return ['categories'=> $data['categories']];
    }
}