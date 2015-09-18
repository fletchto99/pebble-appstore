var functions = require('functions');
var UI = require('ui');

var Faces = module.exports;

Faces.display = function () {
    var menuItems = [{
        title: 'All Watchfaces'
    }, {
        title: 'Collections'
    }];
    var facesMenu = new UI.Menu({
        sections: [{
            title: 'Appstore', items: menuItems
        }]
    });
    facesMenu.show();
    facesMenu.on('select', function (event) {
        if (event.itemIndex === 0) {
            displayAllFaces(0);
        } else if (event.itemIndex === 1) {
        }
    });
};

function displayAllFaces(offset) {
    var data = {
        method: 'all_faces',
        platform: 'basalt',
        offset: offset
    };
    var onSuccess = function(data) {
    };
    functions.apiCall('Populating watchfaces',data,onSuccess);
}