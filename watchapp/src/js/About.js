var functions = require('functions');

var About = module.exports;

About.display = function () {
    functions.showCard(null, 'Appstore', 'By Matt Langlois', 'Enables users to browse the Pebble app store directly from their watch.', functions.getColorOptions('DATA'));
};