<?php

class AppsInCollection {

    function __construct($platform, $collection, $offset) {
        $this->platform = $platform;
        $this->collection = $collection;
        $this->offset = $offset;
    }

    function execute() {
        $data = Functions::makeAPICall(Configuration::PEBBLE_API_URL . Configuration::PEBBLE_COLLECTION .$this->collection . Configuration::PEBBLE_COLLECTION_WATCHAPPS. '?limit=20&image_ratio=1&filter_hardware=true&platform=' . $this->platform . '&offset=' . $this->offset);
        return ['watchapps' => $data['data'], 'offset' => $data['links']['nextPage'] != null ? (intval($this->offset) + 20) : null];
    }
}