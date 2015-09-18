//Imports
var UI = require('ui');
var about = require('About');
var faces = require('Faces');
var apps = require('Apps');

//Setup the app, display a splash screen
setTimeout(function() {
    var menuItems = [{
        title: 'Apps',
        icon: 'IMAGE_APPS_ICON'
    }, {
        title: 'Faces',
        icon: 'IMAGE_WATCHFACES_ICON'
    }, {
        title: 'About',
        icon: 'IMAGE_INFO_ICON'
    }];
    var mainMenu = new UI.Menu({
        sections: [{
            title: 'Appstore', items: menuItems
        }]
    });
    mainMenu.show();
    mainMenu.on('select', function (event) {
        if (event.itemIndex === 0) {
            apps.display();
        } else if (event.itemIndex === 1) {
            faces.display();
        } else if (event.itemIndex === 2) {
            about.display();
        }
    });
}, 800);