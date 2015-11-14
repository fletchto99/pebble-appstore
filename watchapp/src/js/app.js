//Imports
var UI = require('ui');
var about = require('About');
var faces = require('Faces');
var apps = require('Apps');
var voice = require('ui/voice');

//Setup the app, display a splash screen
setTimeout(function() {
    var menuItems = [{
        title: 'Apps',
        icon: 'IMAGE_APPS_ICON'
    }, {
        title: 'Root search',
        icon: 'IMAGE_WATCHFACES_ICON'
    }, {
        title: 'About',
        icon: 'IMAGE_INFO_ICON'
    }];
    var mainMenu = new UI.Menu({
        sections: [{
            title: 'Appstore', items: menuItems
        }],
        highlightBackgroundColor: 'darkGreen'
    });
    mainMenu.show();
    mainMenu.on('select', function (event) {
        if (event.itemIndex === 0) {
            apps.display();
        } else if (event.itemIndex === 1) {
            //faces.display();
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
        } else if (event.itemIndex === 2) {
            about.display();
        }
    });
}, 800);