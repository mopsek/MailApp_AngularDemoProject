'use strict';

const mainView = angular.module('main-view', []);

mainView.directive('mainContainer', require('./main-container-directive/main-container-directive'));
mainView.directive('contacts', require('./contacts-directive/contactsDirective'));
mainView.directive('letter', require('./letter-directive/letter-directive'));
mainView.directive('loading', require('./loading-directive/loading-directive'));
mainView.directive('preview', require('./preview-directive/preview-directive'));
mainView.directive('user', require('./user-directive/user-directive'));
mainView.directive('inboxLetters', require('./letters-directories-directives/inbox-directive'));
mainView.directive('sentLetters', require('./letters-directories-directives/sent-directive'));
mainView.directive('cartLetters', require('./letters-directories-directives/trash-directive'));
mainView.directive('newLetter', require('./letters-directories-directives/newLetter-directive'));
mainView.directive('drafts', require('./letters-directories-directives/drafts-directive'));
mainView.directive('favorites', require('./letters-directories-directives/favorites-directive'));
mainView.directive('filteredLetters', require('./letters-directories-directives/filtered-directive'));


module.exports = mainView;