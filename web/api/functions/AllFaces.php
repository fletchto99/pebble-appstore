<?php

class AllFaces {

    function __construct($platform, $offset) {
        $this->platform = $platform;
        $this->offset = $offset;
    }

    function execute() {
        $data = Functions::makeAPICall(Configuration::PEBBLE_API_URL . Configuration::PEBBLE_ALL_WATCHFACES . '?limit=100&image_ratio=1&filter_hardware=true&platform=' . $this->platform . '&offset=' . $this->offset);
        return ['watchfaces' => $data['data'], 'offset' => (intval($this->offset) + 100)];
    }
}