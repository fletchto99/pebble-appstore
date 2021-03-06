<?php

class FaceCollections {

    function __construct($platform) {
        $this->platform = $platform;
    }

    function execute() {
        $data = Functions::makeAPICall(Configuration::PEBBLE_API_URL . Configuration::PEBBLE_WATCHFACE_COLLECTIONS . '?image_ratio=1&platform=pas&filter_hardware=true&hardware=' . $this->platform);
        return ['collections'=> $data['collections']];
    }
}