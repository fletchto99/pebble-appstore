var functions = require('functions');

var SingleApp = module.exports;

SingleApp.display = function (appid) {
    var data = {
        method: 'single_app',
        platform: 'basalt',
        app_id: appid
    };
    var onSuccess = function(data) {
        functions.showCard(null, data.appinfo.title, 'by: ' + data.appinfo.author, data.appinfo.description, functions.getColorOptions('DATA'));
    };
    functions.apiCall('Loading app',data,onSuccess);
};