define(function (require) {
    var Handlebars = require('handlebars'),
        Utils = require('app/utils'),
        _ = require('underscore'),
        Flickr = require('app/flickr');

    Handlebars.registerHelper('total', function (animals) {
        return _.values(animals).reduceRight(Utils.reduceToSum);
    });

    Handlebars.registerHelper('pbj', function (pb, j, options) {
        if (pb && j) {
            return options.fn(this);
        }

        return options.inverse(this);
    });

    Handlebars.registerHelper('isActiveId', function (activeId, id, options) {
        if (activeId === id) {
            return options.fn(this);
        }
    });

    Handlebars.registerHelper('flickr', function (searchTerm, options) {
        var deferred = Flickr.search(searchTerm),
            id = 'flickr_{searchTerm}'.supplant({
                searchTerm: Utils.sanitise(searchTerm)
            });

        deferred.done(function (url) {
            var img = document.createElement('img');

            img.src = url;

            $('#' + id).append(img);
        });

        return '<div class="flickrImg" id="' + id + '"/>';
    });
});