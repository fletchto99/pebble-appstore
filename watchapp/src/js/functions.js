var UI = require('ui');
var Settings = require('settings');
var config = require('Config.json');
var ajax = require('ajax');

var functions = module.exports;

functions.getSetting = function (setting, default_setting) {
    if (!default_setting) {
        default_setting = false;
    }
    return Settings.option(setting) !== null ? Settings.option(setting) : default_setting;
};

functions.showErrorCard = function(errorMessage, cardToHide) {
    return functions.showCard('IMAGE_ERROR_ICON', 'Error!', '', errorMessage, functions.getColorOptions('ERROR'), cardToHide);
};

functions.showLoadingCard = function(module, loadingMessage) {
    return functions.showCard('IMAGE_LOADING_ICON', 'Loading', module, loadingMessage, functions.getColorOptions('LOADING'));
};

functions.showCard = function (icon, title, subtitle, body, colorOptions, cardToHide) {
    if (cardToHide !== undefined) {
        cardToHide.hide();
    }
    if (icon !== null) {
        title = '   ' + title;
    }
    scrollable = body != null && body.length > 0;
    var card = new UI.Card({
        title: title,
        titleColor: colorOptions.titleColor ? colorOptions.titleColor : 'blue',
        subtitle: subtitle,
        subtitleColor: colorOptions.subtitleColor ? colorOptions.subtitleColor : 'black',
        body: body,
        bodyColor: colorOptions.bodyColor ? colorOptions.bodyColor : 'black',
        icon: icon,
        scrollable: scrollable
    });
    card.show();
    return card;
};

functions.getAPIURL = function () {
    return config.API_URL;
};

functions.getColorOptions = function(type) {
    if (Pebble.getActiveWatchInfo === undefined) {
        return {titleColor: 'black', subtitleColor: 'black', bodyColor: 'black'};
    }
    switch(type){
        case 'ERROR':
            return {titleColor: 'red', subtitleColor: 'black', bodyColor: 'black'};
        case 'SUCCESS':
            return {titleColor: 'islamicGreen', subtitleColor: 'black', bodyColor: 'black'};
        case 'LOADING':
            return {titleColor: 'blue', subtitleColor: 'black', bodyColor: 'black'};
        case 'DATA':
            return {titleColor: 'black', subtitleColor: 'black', bodyColor: 'black'};
        default:
            return {titleColor: 'black', subtitleColor: 'black', bodyColor: 'black'};
    }
};

functions.apiCall = function(status, data, successCallback) {
    var loadingCard = functions.showLoadingCard('Appstore', status);
    ajax({
        url: functions.getAPIURL(),
        type: 'json',
        method: 'post',
        data: data,
        cache: false
    }, function (data) {
        if (data.error) {
            functions.showErrorCard(data.error, loadingCard);
        } else {
            loadingCard.hide();
            successCallback(data);
        }
    }, function () {
        functions.showErrorCard('Error contacting server.', loadingCard);
    });
};