requirejs.config({
    'baseUrl': 'js/vendor',
    'shim': {
      'handlebars': {
        exports: 'Handlebars'
      },
      'underscore': {
        exports: '_'
      }
    },
    'paths': {
      'app': '/js/app',
      'templates': '../app/templates',
      'handlebars': 'handlebars-v1.1.2',
      'jquery': 'jquery-1.10.2.min',
      'underscore': 'underscore-min'
    }
});

// Load the main app module to start the app
requirejs(['app/main']);