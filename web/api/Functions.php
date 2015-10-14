<?php

class Functions {

    public static function makeAPICall($url) {
        $response = json_decode(self::cURL($url), true);
        return !empty($key) ? $response[$key] : $response;
    }

    private static function cURL($url) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_AUTOREFERER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_FORBID_REUSE, true);
        curl_setopt($ch, CURLOPT_FRESH_CONNECT, false);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        $result = curl_exec($ch);
        curl_close($ch);

        return $result;
    }

    public static function queryAgolia($url, $apiKey, $appID, $query) {
        $data = ['apiKey' => $apiKey, 'appID' => $appID, 'params' => $query];

        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_AUTOREFERER, true);
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, false);
        curl_setopt($ch, CURLOPT_FORBID_REUSE, true);
        curl_setopt($ch, CURLOPT_FRESH_CONNECT, false);
        curl_setopt($ch, CURLOPT_HEADER, 0);
        curl_setopt($ch, CURLOPT_POST, 1 );
        curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type: text/plain'));
        $result = curl_exec($ch);
        curl_close($ch);

        return json_decode($result, true);
    }

}