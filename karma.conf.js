// Karma configuration
// Generated on Sun Feb 14 2016 13:36:00 GMT+0300 (RTZ 2 (зима))

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
            'mailApp/ngMockHttp.js',
            'mailApp/mail_app.js',
            'mailApp/router-config.js',
            'mailApp/app/services/*.js',
            'data/js/mailsService.js',
            'data/js/userService.js',
            'data/js/profileService.js',
            'mailApp/app/main-view-module/module.js',
            'mailApp/app/menu-module/module.js',
            'mailApp/app/authorization-module/module.js',
            'mailApp/app/authorization-module/authorization-directive.js',
            'mailApp/app/main-view-module/**/*.js',
            'mailApp/app/menu-module/**/*.js',
            'mailApp/app/services/tests/services-tests.js'
        ],


        // list of files to exclude
        exclude: [],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'mailApp/app/*/*.js': ['coverage'],

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
        concurrency: Infinity
    })
};
