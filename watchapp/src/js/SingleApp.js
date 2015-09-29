var functions = require('functions');
var Vector2 = require('vector2');
var UI = require('ui');
var PebbleProtocol = require('PebbleProtocol');

var SingleApp = module.exports;

var preparing = null;
var installing = null;

SingleApp.display = function (appid) {
    preparing = null;
    installing = null;
    var data = {
        method: 'single_app', platform: 'basalt', app_id: appid
    };

    var onSuccess = function (data) {

        var options = [{
            title: 'Info'
        //}, {
        //    title: 'Images'
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
                                   "Version: "+ data.appinfo.latest_release.version + "\n"+
                                   "Hearts: " + data.appinfo.hearts + "\n\n"+
                                   data.appinfo.description,
                                   functions.getColorOptions('DATA'));
            //} else if (e.itemIndex == 1) {
            //    var generateImage = function (index) {
            //        return new UI.Image({
            //            position: new Vector2(0, 0),
            //            size: new Vector2(144, 168),
            //            image: data.appinfo.screenshot_images[index]['144x168']
            //        });
            //    };
            //    var image_index = 0;
            //    var image = generateImage(image_index);
            //
            //
            //    var container = new UI.Window({
            //        fullscreen: true, scrollable: false
            //    });
            //
            //    var updateImage = function (dir) {
            //        container.remove(image);
            //        if (dir == 'down') {
            //            image = generateImage(++image_index);
            //        } else {
            //            image = generateImage(--image_index);
            //        }
            //        container.add(image);
            //    };
            //
            //    container.add(image);
            //    container.show();
            //    container.on('click', 'down', function () {
            //        if (image_index + 1 < data.appinfo.screenshot_images.length) {
            //            updateImage('down');
            //        }
            //    });
            //    container.on('click', 'up', function () {
            //        if (image_index > 0) {
            //            updateImage('up');
            //        }
            //    });
            } else if (e.itemIndex == 1) {
                preparing = functions.showCard(null, 'Preparing...','','This should take no more than 5 seconds.', functions.getColorOptions('DATA'));
                //Install via Pebble protocol as seen in CloudPebble
                var connection = new WebSocket('ws://localhost:9000');
                connection.binaryType = "arraybuffer";
                connection.onclose = unableToConnect;
                connection.onerror = unableToConnect;
                connection.onmessage = messageRecieved;
                connection.onopen = function() {
                    connectionOpened(data.appinfo.latest_release.pbw_file, connection)
                };
            }
        });
        menu.show();
    };
    functions.apiCall('Loading app', data, onSuccess);
};

var connectionOpened = function(pbw, connection) {
    installing = functions.showCard(null, 'Installing...','','This can take up to 30 seconds.', functions.getColorOptions('DATA'), preparing);
    var request = new XMLHttpRequest();
    request.open('get', pbw, true);
    request.responseType = "arraybuffer";
    putbytes_sent = 0;
    request.onload = function () {
        var buffer = request.response;
        if (buffer) {
            buffer = new Uint8Array(buffer);
            var final_buffer = new Uint8Array(buffer.length + 1);
            final_buffer.set(buffer, 1);
            final_buffer.set([4]);
            connection.send(final_buffer);
        }
    };
    request.send();
};

var mInboundParser = new PebbleProtocol.parser();

var messageRecieved = function(e) {
    var data = new Uint8Array(e.data);
    if(data[0]==0) {
        mInboundParser.addBytes(data.subarray(1));
        while((data = mInboundParser.readMessage())) {
            var command = data.command;
            var message = data.message;
            console.log('Command recieved: ' + command);
            if (command == 6000) {
                functions.showErrorCard('Unable to install app, applocker is full!',installing);
            }
        }
    }
};

var unableToConnect = function() {
    functions.showErrorCard('Error installing app! Please ensure developer connection is enabled within the settings.',preparing);
};