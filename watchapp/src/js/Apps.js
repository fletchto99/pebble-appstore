var functions = require('functions');
var UI = require('ui');
var singleapp = require('SingleApp');
var platform = require('platform');
var voice = require('ui/voice');

var Apps = module.exports;

Apps.display = function () {
    var menuItems = [{
        title: 'All Apps',
        icon: 'IMAGE_APPS_ICON'
    }, {
        title: 'Categories',
        icon: 'IMAGE_CATEGORY_ICON'
    }, {
        title: 'Collections',
        icon: 'IMAGE_COLLECTION_ICON'
    }, {
        title: 'Search',
        icon: 'IMAGE_COLLECTION_ICON'
    }];
    var facesMenu = new UI.Menu({
        sections: [{
            title: 'Appstore', items: menuItems
        }],
        highlightBackgroundColor: 'darkGreen'
    });
    facesMenu.show();
    facesMenu.on('select', function (event) {
        if (event.itemIndex === 0) {
            displayAllApps(0);
        } else if (event.itemIndex === 1) {
            displayCategories();
        } else if (event.itemIndex === 2) {
            displayCollections();
        } else if (event.itemIndex === 3) {
            displaySearch();
        }
    });
};

function displayAllApps(offset) {
    var data = {
        method: 'all_apps',
        platform: platform.version(),
        offset: offset
    };
    var onSuccess = function(data) {
        var next = false;
        var prev = false;
        var nextItem = {
            title: 'Load Next 20'
        };
        var prevItem = {
            title: 'Load Previous 20'
        };
        if (data.offset != null) {
            next = true;
        }
        if (data.offset > 20) {
            prev = true;
        }
        var menuItems = [data.watchapps.length];
        for (var i = 0; i < data.watchapps.length; i++) {
            menuItems[i] = {
                title: data.watchapps[i].title,
                subtitle: 'By ' + data.watchapps[i].author,
                id: data.watchapps[i].id,
                icon: data.watchapps[i].icon_image['28x28']
            };
        }
        if (next) {
            menuItems.push(nextItem);
        }
        if (prev) {
            menuItems.push(prevItem);
        }
        var menu = new UI.Menu({
            sections: [{
                title: 'All Apps',
                items: menuItems
            }],
            highlightBackgroundColor: 'darkGreen'
        });
        menu.on('select', function(event) {
            if (event.item == nextItem) {
                displayAllApps(data.offset);
                menu.hide();
            } if (event.item == prevItem) {
                displayAllApps(Math.max(0 ,offset - 20));
                menu.hide();
            } else {
                singleapp.display(event.item.id);
            }
        });
        menu.show();
    };
    functions.apiCall('Populating watchapps',data,onSuccess);
}


function displayCategories() {
    var data = {
        method: 'app_categories',
        platform: platform.version()
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
            }],
            highlightBackgroundColor: 'darkGreen'
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
        platform: platform.version(),
        category: category,
        offset: offset
    };
    var onSuccess = function(data) {
        var next = false;
        var prev = false;
        var nextItem = {
            title: 'Load Next 20'
        };
        var prevItem = {
            title: 'Load Previous 20'
        };
        if (data.offset != null) {
            next = true;
        }
        if (data.offset > 20) {
            prev = true;
        }
        var menuItems = [data.watchapps.length];
        for (var i = 0; i < data.watchapps.length; i++) {
            menuItems[i] = {
                title: data.watchapps[i].title,
                subtitle: 'By ' + data.watchapps[i].author,
                id: data.watchapps[i].id,
                icon: data.watchapps[i].icon_image['28x28']
            };
        }
        if (next) {
            menuItems.push(nextItem);
        }
        if (prev) {
            menuItems.push(prevItem);
        }
        var menu = new UI.Menu({
            sections: [{
                title: 'Apps',
                items: menuItems
            }],
            highlightBackgroundColor: 'darkGreen'
        });
        menu.on('select', function(event) {
            if (event.item == nextItem) {
                displayAppsInCategory(category, data.offset);
                menu.hide();
            } if (event.item == prevItem) {
                displayAppsInCategory(category, Math.max(0 ,offset - 20));
                menu.hide();
            } else {
                singleapp.display(event.item.id);
            }
        });
        menu.show();
    };
    functions.apiCall('Populating apps',data,onSuccess);
}


function displayCollections() {
    var data = {
        method: 'app_collections',
        platform: platform.version()
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
            }],
            highlightBackgroundColor: 'darkGreen'
        });
        menu.on('select', function(event) {
            if (event.itemIndex === data.collections.length) {

            } else {
                displayAppsInCollection(event.item.slug, 0);
            }
        });
        menu.show();
    };
    functions.apiCall('Populating collections',data,onSuccess);
}

function displayAppsInCollection(collection, offset) {
    var data = {
        method: 'apps_in_collection',
        platform: platform.version(),
        collection: collection,
        offset: offset
    };
    var onSuccess = function(data) {
        var next = false;
        var prev = false;
        var nextItem = {
            title: 'Load Next 20'
        };
        var prevItem = {
            title: 'Load Previous 20'
        };
        if (data.offset != null) {
            next = true;
        }
        if (data.offset > 20) {
            prev = true;
        }
        var menuItems = [data.watchapps.length];
        for (var i = 0; i < data.watchapps.length; i++) {
            menuItems[i] = {
                title: data.watchapps[i].title,
                subtitle: 'By ' + data.watchapps[i].author,
                id: data.watchapps[i].id,
                icon: data.watchapps[i].icon_image['28x28']
            };
        }
        if (next) {
            menuItems.push(nextItem);
        }
        if (prev) {
            menuItems.push(prevItem);
        }
        var menu = new UI.Menu({
            sections: [{
                title: 'Apps',
                items: menuItems
            }],
            highlightBackgroundColor: 'darkGreen'
        });
        menu.on('select', function(event) {
            if (event.item == nextItem) {
                displayAppsInCollection(collection, data.offset);
                menu.hide();
            } if (event.item == prevItem) {
                displayAppsInCollection(collection, Math.max(0 ,offset - 20));
                menu.hide();
            } else {
                singleapp.display(event.item.id);
            }
        });
        menu.show();
    };
    functions.apiCall('Populating apps',data,onSuccess);
}

function displaySearch() {

    var onSuccess = function(data) {
        var menuItems = [data.watchapps.length];
        for (var i = 0; i < data.watchapps.length; i++) {
            menuItems[i] = {
                title: data.watchapps[i].title,
                subtitle: 'By ' + data.watchapps[i].author,
                id: data.watchapps[i].id,
                icon: data.watchapps[i].icon_image['28x28']
            };
        }
        var menu = new UI.Menu({
            sections: [{
                title: 'Apps',
                items: menuItems
            }],
            highlightBackgroundColor: 'darkGreen'
        });
        menu.on('select', function(event) {
                singleapp.display(event.item.id);
        });
        menu.show();
    };
    voice.dictate('start', function(e) {
        console.log('hi');
        //if (e.err) {
        //    functions.showErrorCard('Error capturing dictation session');
        //    return;
        //}
        //var data = {
        //    method: 'search',
        //    platform: platform.version(),
        //    query: e.transcription
        //};
        //functions.apiCall('Searching...', data, onSuccess);
    });
}