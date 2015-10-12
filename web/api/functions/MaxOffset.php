<?php

class MaxOffset {

    function __construct($platform) {
        $this->platform = $platform;
    }

    function execute() {
        $offset = 0;
        $increment = 1000;
        while(true) {
            $data =  Functions::makeAPICall(Configuration::PEBBLE_API_URL . Configuration::PEBBLE_ALL_WATCHFACES . '?limit=20&image_ratio=1&platform=pas&filter_hardware=true&hardware=' . $this->platform . '&offset=' . $offset);
            if ($data['links']['nextPage'] != null) {
                $offset += $increment;
            } else {
                if ($increment != 20) {
                    $offset -= $increment;
                    if ($increment == 1000) {
                        $increment = 100;
                    } else {
                        $increment = 20;
                    }
                } else if ($increment == 20) {
                    break;
                }
            }
        }
        return ['max' => $offset];
    }
}