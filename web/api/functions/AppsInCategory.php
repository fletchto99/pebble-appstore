<?php

class AppsInCategory {

    function __construct($platform, $category, $offset) {
        $this->platform = $platform;
        $this->category = $category;
        $this->offset = $offset;
    }

    function execute() {
        $data = Functions::makeAPICall(Configuration::PEBBLE_API_URL . Configuration::PPEBBLE_APP_CATEGORY .$this->category . '?limit=20&image_ratio=1&platform=pas&filter_hardware=true&hardware=' . $this->platform . '&offset=' . $this->offset);
        return ['watchapps' => $data['data'], 'offset' => $data['links']['nextPage'] != null ? (intval($this->offset) + 20) : null];
    }
}