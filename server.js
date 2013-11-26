var express = require('express'),
    app = express(),
    util = require('util'),
    port = 1337;

app.configure(function () {
    var hourMs = 1000 * 60 * 60;

    app.use(express.static(__dirname + '/', {
        maxAge: hourMs
    }));

    app.use(express.directory(__dirname + '/'));
    app.use(express.errorHandler());
});

app.listen(port);

util.puts('Listening on ' + port + '...');
util.puts('Press Ctrl + C to stop.');
