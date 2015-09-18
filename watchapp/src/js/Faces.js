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
            displayCollections(0);
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
            title:'Load Next 20'
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
    functions.apiCall('Populating watchfaces',data,onSuccess);
}

function displayCollections() {
    var data = {
        method: 'face_collections',
        platform: 'basalt'
    };
    var onSuccess = function(data) {
        var menuItems = [data.collections.length];
        for (var i = 0; i < data.collections.length; i++) {
            menuItems[i] = {
                title: data.collections[i].name,
                slug: data.collections[i].slug
            };
        }
        var menu = new UI.Menu({
            sections: [{
                title: 'Face Collections',
                items: menuItems
            }]
        });
        menu.on('select', function(event) {
            displayFacesInCollection(event.item.slug, 0);
        });
        menu.show();
    };
    functions.apiCall('Populating collections',data,onSuccess);
}

function displayFacesInCollection(collection, offset) {
    var data = {
        method: 'faces_in_collection',
        platform: 'basalt',
        collection: collection,
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
            title:'Load Next 20'
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
    functions.apiCall('Populating apps',data,onSuccess);
}