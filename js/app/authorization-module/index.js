'use strict';

const authorization = angular.module('authorization', []);

authorization.directive('signIn', require('./authorization-directive'));

module.exports = authorization;