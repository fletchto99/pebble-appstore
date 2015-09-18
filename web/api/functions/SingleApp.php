<?php

class SingleApp {

    function __construct($platform, $appID) {
        $this->platform = $platform;
        $this->appID = $appID;
    }

    function execute() {
        $data = Functions::makeAPICall(Configuration::PEBBLE_API_URL . Configuration::PEBBLE_SINGLE_APP . $this->appID . '?image_ratio=1&filter_hardware=true&platform=' . $this->platform);
        return ['appinfo'=> $data['data']];
    }
}