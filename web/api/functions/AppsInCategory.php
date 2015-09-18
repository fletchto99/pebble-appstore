<?php

class AppsInCategory {

    function __construct($platform, $category, $offset) {
        $this->platform = $platform;
        $this->category = $category;
        $this->offset = $offset;
    }

    function execute() {
        $data = Functions::makeAPICall(Configuration::PEBBLE_API_URL . Configuration::PPEBBLE_APP_CATEGORY .$this->category . '?limit=100&image_ratio=1&filter_hardware=true&platform=' . $this->platform . '&offset=' . $this->offset);
        return ['watchapps' => $data['data'], 'offset'=>intval($this->offset)+100];
    }
}