var functions = require('functions');
var UI = require('ui');
var singleapp = require('SingleApp');

var Faces = module.exports;

Faces.display = function () {
    var menuItems = [{
        title: 'All Watchfaces',
        icon: 'IMAGE_WATCHFACES_ICON'
    }, {
        title: 'Collections',
        icon: 'IMAGE_COLLECTION_ICON'
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
        var menuItems = [data.watchfaces.length + 1];
        for (var i = 0; i < data.watchfaces.length; i++) {
            menuItems[i] = {
                title: data.watchfaces[i].title,
                subtitle: 'By ' + data.watchfaces[i].author,
                id: data.watchfaces[i].id
            };
        }
        menuItems[data.watchfaces.length] = {
            title:'Load Next 20'
        };
        var menu = new UI.Menu({
            sections: [{
                title: 'All Apps',
                items: menuItems
            }]
        });
        menu.on('select', function(event) {
            singleapp.display(event.item.id);
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
        var menuItems = [data.watchfaces.length + 1];
        for (var i = 0; i < data.watchfaces.length; i++) {
            menuItems[i] = {
                title: data.watchfaces[i].title,
                subtitle: 'By ' + data.watchfaces[i].author,
                id: data.watchfaces[i].id
            };
        }
        menuItems[data.watchfaces.length] = {
            title:'Load Next 20'
        };
        var menu = new UI.Menu({
            sections: [{
                title: 'All Apps',
                items: menuItems
            }]
        });
        menu.on('select', function(event) {
            singleapp.display(event.item.id);
        });
        menu.show();
    };
    functions.apiCall('Populating apps',data,onSuccess);
}