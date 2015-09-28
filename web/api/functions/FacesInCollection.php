<?php

class FacesInCollection {

    function __construct($platform, $collection, $offset) {
        $this->platform = $platform;
        $this->collection = $collection;
        $this->offset = $offset;
    }

    function execute() {
        $data = Functions::makeAPICall(Configuration::PEBBLE_API_URL . Configuration::PEBBLE_COLLECTION . $this->collection . Configuration::PEBBLE_COLLECTION_WATCHAFACES . '?limit=20&image_ratio=1&platform=pas&filter_hardware=true&hardware=' . $this->platform . '&offset=' . $this->offset);
        return ['watchfaces' => $data['data'], 'offset' => $data['links']['nextPage'] != null ? (intval($this->offset) + 20) : null];
    }
}