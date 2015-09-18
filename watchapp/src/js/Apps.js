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
            displayCategories();
        } else if (event.itemIndex === 2) {
            displayCollections();
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
    functions.apiCall('Populating watchapps',data,onSuccess);
}


function displayCategories() {
    var data = {
        method: 'app_categories',
        platform: 'basalt'
    };
    var onSuccess = function(data) {
        var menuItems = [data.categories.length];
        for (var i = 0; i < data.categories.length; i++) {
            menuItems[i] = {
                title: data.categories[i].name,
                slug: data.categories[i].slug
            };
        }
        var menu = new UI.Menu({
            sections: [{
                title: 'App Categories',
                items: menuItems
            }]
        });
        menu.on('select', function(event) {
            displayAppsInCategory(event.item.slug, 0);
        });
        menu.show();
    };
    functions.apiCall('Populating categories',data,onSuccess);
}

function displayAppsInCategory(category, offset) {
    var data = {
        method: 'apps_in_category',
        platform: 'basalt',
        category: category,
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


function displayCollections() {
    var data = {
        method: 'app_collections',
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
                title: 'App Collections',
                items: menuItems
            }]
        });
        menu.on('select', function(event) {
            displayAppsInCollection(event.item.slug, 0);
        });
        menu.show();
    };
    functions.apiCall('Populating collections',data,onSuccess);
}

function displayAppsInCollection(collection, offset) {
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