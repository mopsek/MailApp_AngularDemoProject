
// Karma configuration
// Generated on Sun Feb 14 2016 13:36:00 GMT+0300 (RTZ 2 (зима))

//var webpackConfig = require('./webpack.config');
//var path = require('path');
//var entry = path.resolve(webpackConfig.entry);
var preprocessors = {};
//preprocessors[entry] = ['webpack'];
//preprocessors['bundle.js'] = ['coverage'];

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine'],


        // list of files / patterns to load in the browser
        files: [
            'node_modules/angular/angular.js',
            'node_modules/angular-mocks/angular-mocks.js',
            'node_modules/angular-ui-router/release/angular-ui-router.js',
            'bundle.js',
            'js/app/services/tests/services-tests.js',
            'js/app/authorization-module/tests/tests.js',
            'js/app/menu-module/directories-menu/tests/tests.js',
            'js/app/menu-module/menu/tests/tests.js',
            'js/app/main-view-module/contacts-directive/tests/tests.js',
            'js/app/main-view-module/letter-directive/tests/tests.js',
            'js/app/main-view-module/main-container-directive/test/test.js',
            'js/app/main-view-module/user-directive/tests/test.js',
            'js/app/main-view-module/letters-directories-directives/tests/tests.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'bundle.js': ['coverage']
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress', 'coverage'],


        coverageReporter: {
            type: 'html',
            dir: 'coverage/'
        },

        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: false,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: true,

        // Concurrency level
        // how many browser should be started simultaneous
        concurrency: Infinity/*,

        plugins: [
            'karma-webpack',
            'karma-jasmine',
            'karma-chrome-launcher',
            'karma-coverage'
        ]*/
    })
};
