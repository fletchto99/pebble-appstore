var functions = require('functions');
var UI = require('ui');

var Apps = module.exports;

Apps.display = function () {
    var menuItems = [{
        title: 'All Apps'
    }, {
        title: 'Categories'
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
            displayAllApps(0);
        } else if (event.itemIndex === 1) {
            //TODO: Categories code
        } else if (event.itemIndex === 2) {
            //TODO: Collections code
        }
    });
};

function displayAllApps(offset) {
    var data = {
        method: 'all_apps',
        platform: 'basalt',
        offset: offset
    };
    var onSuccess = function(data) {
        var menuItems = [data.watchapps.length + 1];
        for (var i = 0; i < data.watchapps.length; i++) {
            menuItems[i] = {
                title: data.watchapps[i].title,
                subtitle: 'By ' + data.watchapps[i].author,
                id: data.watchapps[i].id,
                icon: data.watchapps[i].icon_image['28x28']
            };
        }
        menuItems[data.watchapps.length] = {
            title:'Load 100 more'
        };
        var menu = new UI.Menu({
            sections: [{
                title: 'All Apps',
                items: menuItems
            }]
        });
        menu.on('select', function(event) {
            console.log(event.item.icon);
        });
        menu.show();
    };
    functions.apiCall('Populating watchapps',data,onSuccess);
}