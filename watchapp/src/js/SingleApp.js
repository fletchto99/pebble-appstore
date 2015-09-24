var functions = require('functions');
var Vector2 = require('vector2');
var UI = require('ui');
var ajax = require('ajax');

var SingleApp = module.exports;

SingleApp.display = function (appid) {
    var data = {
        method: 'single_app',
        platform: 'basalt',
        app_id: appid
    };
    var onSuccess = function(data) {
        var options = [
            {
                title: 'Info'
            },{
                title: 'Images'
            }, {
                title: 'Install'
            }
        ];
        var menu = new UI.Menu({
            sections: [
                {
                    title: data.appinfo.title,
                    items: options
                }
            ]
        });
        menu.on('select',function(e) {
           if (e.itemIndex == 0) {
               functions.showCard(null, data.appinfo.title, 'by: ' + data.appinfo.author, data.appinfo.description, functions.getColorOptions('DATA'));
           } else if (e.itemIndex == 1) {
               var generateImage = function(index) {
                   return new UI.Image({
                       position: new Vector2(0, 0),
                       size: new Vector2(144, 168),
                       image: data.appinfo.screenshot_images[index]['144x168']
                   });
               };
               var image_index = 0;
               var image = generateImage(image_index);


               var container = new UI.Window({
                   fullscreen: true,
                   scrollable: false
               });

               var updateImage = function(dir) {
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
               container.on('click', 'down', function() {
                   if (image_index+1 < data.appinfo.screenshot_images.length) {
                       updateImage('down');
                   }
               });
               container.on('click', 'up', function() {
                   if (image_index > 0) {
                       updateImage('up');
                   }
               });
           } else if (e.itemIndex == 2) {
                //Install via Pebble Protocall as seen in CloudPebble
                var connection = new WebSocket('ws://localhost:9000');
                connection.binaryType = "arraybuffer";
                connection.onmessage = handle_socket_message;
                connection.onopen = function() {
                    connection.send(new Uint8Array([0x09, 1, 0]));
                };
               connection.onerror = function(e) {
                 console.log("error opening connection" + e.data);
               };
                console.log("Starting install process.");

                //var request = new XMLHttpRequest();
                //request.open('get', data.appinfo.latest_release.pbw_file, true);
                //request.responseType = "arraybuffer";
                //putbytes_sent = 0;
                //request.onload = function(event) {
                //    var buffer = request.response;
                //    if(buffer) {
                //        buffer = new Uint8Array(buffer);
                //        var final_buffer = new Uint8Array(buffer.length + 1);
                //        final_buffer.set(buffer, 1);
                //        final_buffer.set([4]);
                //        connection.send(final_buffer);
                //        console.log("Installing?");
                //    }
                //};
                //request.send();
           }
        });
        menu.show();
    };
    functions.apiCall('Loading app',data,onSuccess);
};

function handle_socket_message(e) {
    console.log('message recieved');
    var data = new Uint8Array(e.data);
    if(data[0] == 0x09) {
        if(data[1] == 0x00) {
            self.trigger('proxy:waiting');
            console.log("Authenticated successfully.");
            mIsAuthenticated = true;
        } else {
            console.log("Authentication failed.");
            self.trigger('error', "Proxy rejected authentication token.");
        }
    } else if(data[0] == 0x08) {
        if(data[1] == 0xFF) {
            console.log("Connected successfully.");
            mIsConnected = true;
            self.trigger('open');
        } else if(data[1] == 0x00) {
            console.log("Connection closed remotely.");
            self.trigger('close', {wasClean: true});
        }
    } else {
        self.trigger('message', data);
    }
}