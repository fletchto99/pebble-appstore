var functions = require('functions');
var Vector2 = require('vector2');
var UI = require('ui');

var SingleApp = module.exports;

SingleApp.display = function (appid) {

    var data = {
        method: 'single_app', platform: 'basalt', app_id: appid
    };

    var onSuccess = function (data) {

        var options = [{
            title: 'Info'
        }, {
            title: 'Images'
        }, {
            title: 'Install'
        }];

        var menu = new UI.Menu({
            sections: [{
                title: data.appinfo.title, items: options
            }]
        });

        menu.on('select', function (e) {
            if (e.itemIndex == 0) {
                functions.showCard(null,
                                   data.appinfo.title,
                                   'by: ' + data.appinfo.author,
                                   data.appinfo.description,
                                   functions.getColorOptions('DATA'));
            } else if (e.itemIndex == 1) {
                var generateImage = function (index) {
                    return new UI.Image({
                        position: new Vector2(0, 0),
                        size: new Vector2(144, 168),
                        image: data.appinfo.screenshot_images[index]['144x168']
                    });
                };
                var image_index = 0;
                var image = generateImage(image_index);


                var container = new UI.Window({
                    fullscreen: true, scrollable: false
                });

                var updateImage = function (dir) {
                    container.remove(image);
                    if (dir == 'down') {
                        image = generateImage(++image_index);
                    } else {
                        image = generateImage(--image_index);
                    }
                    container.add(image);
                };

                container.add(image);
                container.show();
                container.on('click', 'down', function () {
                    if (image_index + 1 < data.appinfo.screenshot_images.length) {
                        updateImage('down');
                    }
                });
                container.on('click', 'up', function () {
                    if (image_index > 0) {
                        updateImage('up');
                    }
                });
            } else if (e.itemIndex == 2) {
                var preparing = functions.showCard(null, 'Preparing...','','', functions.getColorOptions('DATA'));
                //Install via Pebble Protocall as seen in CloudPebble
                var connection = new WebSocket('ws://localhost:9000');
                connection.binaryType = "arraybuffer";
                connection.onerror = function (e) {
                    functions.showErrorCard('Error installing app!',preparing);
                };
                connection.onmessage = function(e){
                    var data = new Uint8Array(e.data);
                    console.log(data[0]);
                };
                connection.onopen = function() {
                    functions.showCard(null, 'Installing...','','', functions.getColorOptions('DATA'),preparing);
                    console.log("Starting install process.");
                    var request = new XMLHttpRequest();
                    request.open('get', data.appinfo.latest_release.pbw_file, true);
                    request.responseType = "arraybuffer";
                    putbytes_sent = 0;
                    request.onload = function () {
                        var buffer = request.response;
                        if (buffer) {
                            buffer = new Uint8Array(buffer);
                            var final_buffer = new Uint8Array(buffer.length + 1);
                            final_buffer.set(buffer,
                                             1);
                            final_buffer.set([4]);
                            connection.send(final_buffer);
                        }
                    };
                    request.send();
                };
            }
        });
        menu.show();
    };
    functions.apiCall('Loading app', data, onSuccess);
};