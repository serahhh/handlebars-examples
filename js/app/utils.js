define(function (require) {
    /*
        Crockford
        http://javascript.crockford.com/remedial.html
    */
    if (!String.prototype.supplant) {
        String.prototype.supplant = function (o) {
            return this.replace(
                /\{([^{}]*)\}/g,
                function (a, b) {
                    var r = o[b];
                    return typeof r === 'string' || typeof r === 'number' ? r : a;
                }
            );
        };
    }

    return {

        sanitise: function (str) {
            return str.replace(/\W/g, '_');
        },

        reduceToSum: function (previousValue, value) {
            return previousValue + value;
        },

        createParamString: function (params) {
            var paramStr = "",
                param;

            for (param in params) {
                if (params.hasOwnProperty(param)) {
                    paramStr = paramStr + (paramStr ? "&" : "?") + param + "=" + params[param];
                }
            }

            return paramStr;
        }
    };
});