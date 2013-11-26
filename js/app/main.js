define(function (require) {
    var $ = require('jquery'),
        Demo = require('app/demo');

    $(function () {
        Demo.init({
            selector: '#main'
        });

        Demo.render();
    });
});