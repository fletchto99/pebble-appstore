<?php

class Search {

    function __construct($query, $platform) {
        $this->query = $query;
        $this->platform = $platform;
    }

    function execute() {
        $results = Functions::queryAgolia(Configuration::AGOLIA_API_URL, Configuration::AGOLIA_API_KEY, Configuration::AGOLIA_APP_ID, 'query='.$this->query.'&tagFilters='.$this->platform.',(watchapp,companion-app)&hitsPerPage=1&page=0');
        if (sizeof($results['hits']) > 0) {
            $search = $results['hits'][0];
            $data = Functions::makeAPICall(Configuration::PEBBLE_API_URL . Configuration::PEBBLE_SINGLE_APP . $search['id']. '?image_ratio=1&platform=pas&filter_hardware=true&hardware=' . $this->platform);
            return ['appinfo'=> $data['data'][0]];
        } else {
            return ['error'=> 'No app found!'];
        }

    }
}