define(function (require) {
    var $ = require('jquery'),
        Utils = require('app/utils');

    var defaults = {
            apiURL: "http://api.flickr.com/services/rest/",
            basePhotoURL: "http://farm{farm}.staticflickr.com/{server}/{id}_{secret}_{size}.jpg",
            baseParams: {
                "method": "flickr.photos.search",
                "api_key": "45a83a34e3417bb74aaa6f6acdbac679",
                "format": "json",
                "jsoncallback": "?"
            },
            pictureSize: "z"
        },

        callback = function (deferred, data) {
            if (data && data.stat === "ok") {
                deferred.resolve(_getPhotoSrcURL(data.photos.photo[0]));
            } else {
                deferred.reject('Error loading photos.');
            }
        },

        _getPhotoSrcURL = function (photo) {
            return defaults.basePhotoURL.supplant($.extend(photo, {
                size: defaults.pictureSize
            }));
        };

    return {
        search: function (searchTerm) {
            var paramString = Utils.createParamString($.extend({}, defaults.baseParams, {
                    per_page: 1,
                    text: window.encodeURIComponent(searchTerm),
                    sort: "relevance" // "interestingness-asc"
                })),
                deferred = $.Deferred();

            $.ajax({
                type: "GET",
                cache: true,
                url: defaults.apiURL + paramString,
                dataType: 'jsonp',
                success: callback.bind(this, deferred)
            });

            return deferred;
        }
    };
});