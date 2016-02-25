/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var mailApp = angular.module('mailApp', ['ui.router', __webpack_require__(2).name, __webpack_require__(5).name, __webpack_require__(10).name]);
	
	mailApp.config(function ($stateProvider, $urlRouterProvider) {
	    $stateProvider.state('signIn', {
	        url: '/signin',
	        template: '<sign-in></sign-in>'
	    }).state('mail', {
	        url: '/mail',
	        abstract: true,
	        templateUrl: 'js/app/main-view-module/main-container-directive/template/main.html'
	    }).state('mail.inbox', {
	        url: '/inbox',
	        template: '<inbox-letters letters="directory.base.letters.inbox"></inbox-letters>'
	    }).state('mail.loading', {
	        url: "/loading",
	        template: '<loading></loading>'
	    }).state('mail.sent', {
	        url: '/sent',
	        template: '<sent-letters letters="directory.base.letters.sent"></sent-letters>'
	    }).state('mail.trash', {
	        url: '/trash',
	        template: '<cart-letters letters="directory.base.letters.trash"></cart-letters>'
	    }).state('mail.drafts', {
	        url: '/drafts',
	        template: '<drafts letters="directory.base.letters.drafts"></drafts>'
	    }).state('mail.favorites', {
	        url: '/favorites',
	        template: '<favorites inbox="directory.base.letters.inbox" sent="directory.base.letters.sent"></favorites>'
	    }).state('mail.newLetterForm', {
	        url: '/new_letter',
	        template: '<new-letter new="directory.newLetter"></new-letter>'
	    }).state('mail.contacts', {
	        url: '/contacts',
	        template: '<contacts users="directory.base.users"></contacts>'
	    }).state('mail.preview', {
	        url: '/:directory/:index',
	        template: '<preview selected="directory.selected"></preview>'
	    }).state('mail.filtered', {
	        url: '/filtered',
	        template: '<filtered-letters letters="directory.base.letters.inbox" user="directory.selected.user"></filtered-letters>'
	    });
	
	    $urlRouterProvider.otherwise(function ($injector) {
	        if ($injector.get('authorizationService').getPermission()) return '/mail/inbox';
	        return '/signin';
	    });
	});
	
	mailApp.run(function ($rootScope, $state, authorizationService, dataService) {
	    $rootScope.$on('$stateChangeStart', function (event, toState) {
	        if (document.cookie.indexOf('session') + 1 && !dataService.base.letters) {
	            authorizationService.continueSession();
	            return;
	        }
	        if (toState.name !== 'signIn' && !authorizationService.getPermission()) {
	            $state.go('signIn');
	            event.preventDefault();
	        }
	    });
	});
	
	mailApp.service('animationService', __webpack_require__(36));
	mailApp.service('authorizationService', __webpack_require__(37));
	mailApp.service('dataService', __webpack_require__(38));
	mailApp.service('initializationService', __webpack_require__(39));
	mailApp.service('letterService', __webpack_require__(40));
	mailApp.service('stateService', __webpack_require__(41));
	
	mailApp.service('mails', __webpack_require__(42));
	mailApp.service('profiles', __webpack_require__(43));
	mailApp.service('users', __webpack_require__(44));
	
	mailApp.filter('short_content', __webpack_require__(45));
	
	module.exports = mailApp;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var authorization = angular.module('authorization', []);
	
	authorization.directive('signIn', __webpack_require__(3));
	
	module.exports = authorization;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var authTemplate = __webpack_require__(4);
	
	module.exports = function () {
	    return {
	        restrict: 'E',
	        template: authTemplate,
	        scope: {},
	        controller: function controller(authorizationService) {
	            this.login = '';
	            this.password = '';
	
	            this.enter = function (e) {
	                if (e.keyCode === 13) this.signIn();
	            };
	
	            this.signIn = function () {
	                authorizationService.signIn({ login: this.login, password: this.password });
	            };
	
	            this.clearLS = function () {
	                if (!window.localStorage || !window.localStorage.users && !window.localStorage.letters) alert('Данных нет! Удалять нечего!');
	                if (window.localStorage.users || window.localStorage.letters) {
	                    window.localStorage.removeItem('users');
	                    window.localStorage.removeItem('letters');
	                    alert('Данные успешно удалены!');
	                }
	            };
	        },
	        controllerAs: 'user',
	        link: function link(scope) {
	            scope.f = 10;
	        }
	    };
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<h1>Вход</h1> <table> <tr> <td>Логин:</td> <td><input type=\"text\" ng-model=\"user.login\" ng-keypress=\"user.enter($event)\"></td> </tr> <tr> <td>Пароль:</td> <td><input type=\"password\" ng-model=\"user.password\" ng-keypress=\"user.enter($event)\"></td> </tr> </table> <div class=\"signIn\" ng-click=\"user.signIn()\">Войти</div> <div id=\"note\"> <span class=\"z\">Логин:</span>\n<span>test</span>\n<span class=\"z\">Пороль:</span>\n<span>123</span> <div class=\"clearLS\" ng-click=\"user.clearLS()\">Очистить LocalStorage</div> </div>";
	ngModule.run(["$templateCache",function(c){c.put("authorization.html",v1)}]);
	module.exports=v1;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var menu = angular.module('menu', []);
	
	menu.directive('mailDirectories', __webpack_require__(6));
	menu.directive('menu', __webpack_require__(8));
	
	module.exports = menu;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var dirTemplate = __webpack_require__(7);
	
	module.exports = function () {
	    return {
	        restrict: 'E',
	        template: dirTemplate,
	        controller: function controller(stateService) {
	            this.set = stateService.setActiveState;
	            this.checkClass = stateService.checkDirClass;
	        },
	        controllerAs: 'directory'
	    };
	};

/***/ },
/* 7 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div id=\"mailDir\"> <div id=\"inbox\" ng-click=\"directory.set('inbox')\" ng-class=\"directory.checkClass('inbox')\"><span>Входящие</span></div> <div id=\"ch\" ng-click=\"directory.set('drafts')\" ng-class=\"directory.checkClass('drafts')\"><span>Черновики</span></div> <div id=\"sent\" ng-click=\"directory.set('sent')\" ng-class=\"directory.checkClass('sent')\"><span>Отправленные</span></div> <div id=\"favorites\" ng-click=\"directory.set('favorites')\" ng-class=\"directory.checkClass('favorites')\"><span>Избранное</span></div> <div id=\"cart\" ng-click=\"directory.set('trash')\" ng-class=\"directory.checkClass('trash')\"><span>Корзина</span></div> </div>";
	ngModule.run(["$templateCache",function(c){c.put("directories-menu.html",v1)}]);
	module.exports=v1;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var menuTemplate = __webpack_require__(9);
	
	module.exports = function ($document) {
	    return {
	        restrict: 'E',
	        template: menuTemplate,
	        scope: {},
	        controller: function controller(stateService, letterService, $stateParams, authorizationService) {
	            this.setDirectory = stateService.setActiveState;
	            this.currentState = stateService.currentState;
	
	            this.getPreviewDir = function () {
	                if (!letterService.selected.letter) return;
	                return $stateParams.directory;
	            };
	
	            this.remove = letterService.removeLetter;
	            this.recover = letterService.recoverLetter;
	            this.send = letterService.moveNewLetter;
	            this.edit = letterService.editDraft;
	            this.loginOut = authorizationService.loginOut;
	
	            this.newLetter = function () {
	                letterService.newLetter.letter = {};
	                stateService.setActiveState('newLetterForm');
	            };
	
	            this.replay = function () {
	                letterService.newLetter.letter.to = letterService.selected.letter.sender;
	                stateService.setActiveState('newLetterForm');
	            };
	        },
	        controllerAs: 'menu',
	        link: function link(scope) {
	            scope.showMenu = false;
	            $document.on('click', function (e) {
	                if (e.target.id === 'settingsButton') {
	                    scope.showMenu = !scope.showMenu;
	                    e.target.classList.toggle('activeSetting');
	                    scope.$digest();
	                } else if (document.getElementById('settingsButton')) {
	                    scope.showMenu = false;
	                    document.getElementById('settingsButton').classList.remove('activeSetting');
	                    scope.$digest();
	                }
	            });
	        }
	    };
	};

/***/ },
/* 9 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div> <div id=\"user\">Моя_Почта@где-то.там</div> <div class=\"userSettings\"> <div id=\"loginOut\" ng-click=\"menu.loginOut()\">Выйти</div> <div id=\"settingsButton\"></div> </div> <div class=\"settingsMenu\" ng-show=\"showMenu\"> <ul> <li ng-click=\"menu.setDirectory('contacts')\">Контакты</li> </ul> </div> <div id=\"newLetter\" ng-click=\"menu.newLetter()\">Написать письмо</div> <div class=\"newLetterMenu\" ng-show=\"menu.currentState() === 'newLetterForm'\"> <div id=\"send\" ng-click=\"menu.send('sent')\">Отправить</div> <div id=\"save\" ng-click=\"menu.send('drafts')\">Сохранить черновик</div> </div> <div class=\"previewLetterMenu\" ng-show=\"menu.currentState() === 'preview'\"> <div id=\"reply\" ng-show=\"menu.getPreviewDir() === 'inbox'\" ng-click=\"menu.replay()\">Ответить</div> <div id=\"recover\" ng-show=\"menu.getPreviewDir() === 'trash'\" ng-click=\"menu.recover()\">Восстановить</div> <div id=\"edit\" ng-show=\"menu.getPreviewDir() === 'drafts'\" ng-click=\"menu.edit()\">Редактировать черновик</div> <div id=\"delete\" ng-click=\"menu.remove()\">Удалить</div> </div> </div>";
	ngModule.run(["$templateCache",function(c){c.put("menu.html",v1)}]);
	module.exports=v1;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var mainView = angular.module('main-view', []);
	
	mainView.directive('mainContainer', __webpack_require__(11));
	mainView.directive('contacts', __webpack_require__(12));
	mainView.directive('letter', __webpack_require__(14));
	mainView.directive('loading', __webpack_require__(16));
	mainView.directive('preview', __webpack_require__(18));
	mainView.directive('user', __webpack_require__(20));
	mainView.directive('inboxLetters', __webpack_require__(22));
	mainView.directive('sentLetters', __webpack_require__(24));
	mainView.directive('cartLetters', __webpack_require__(26));
	mainView.directive('newLetter', __webpack_require__(28));
	mainView.directive('drafts', __webpack_require__(30));
	mainView.directive('favorites', __webpack_require__(32));
	mainView.directive('filteredLetters', __webpack_require__(34));
	
	module.exports = mainView;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
	    return {
	        restrict: 'AE',
	        scope: true,
	        controller: function controller(letterService, dataService) {
	            this.base = dataService.base;
	            this.selected = letterService.selected;
	            this.newLetter = letterService.newLetter;
	        },
	        controllerAs: 'directory'
	    };
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var contactsTemplate = __webpack_require__(13);
	
	module.exports = function (letterService, stateService, dataService) {
	    return {
	        restrict: 'E',
	        template: contactsTemplate,
	        scope: {
	            users: '='
	        },
	        link: function link(scope) {
	            scope.newUser = {};
	            scope.addContact = function () {
	                scope.users.push(scope.newUser);
	                scope.newUser = {};
	                dataService.saveUserToStorage();
	            };
	            scope.removeContact = function (id) {
	                scope.users.splice(id, 1);
	                dataService.saveUserToStorage();
	            };
	            scope.mailTo = function (mail) {
	                letterService.newLetter.letter = {
	                    to: mail
	                };
	                stateService.setActiveState('newLetterForm');
	            };
	        }
	    };
	};

/***/ },
/* 13 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div class=\"tittle\"> <h2>Контакты</h2> <div class=\"line\"></div> </div> <user ng-repeat=\"user in users\"></user> <div class=\"newUser\"> <div class=\"newUserTittle\">Добавить контакт:</div> <table class=\"info\"> <tr> <td class=\"keys\">Имя:</td> <td> <input type=\"text\" ng-model=\"newUser.name\"> </td> </tr> <tr> <td class=\"keys\">Дата рождения:</td> <td> <input type=\"text\" ng-model=\"newUser.birthDate\"> </td> </tr> <tr> <td class=\"keys\">Пол:</td> <td> <input type=\"text\" ng-model=\"newUser.gender\"> </td> </tr> <tr> <td class=\"keys\">Адрес:</td> <td> <input type=\"text\" ng-model=\"newUser.address\"> </td> </tr> <tr> <td class=\"keys\">Email:</td> <td> <input type=\"text\" ng-model=\"newUser.email\"> </td> </tr> <tr> <td class=\"keys\">AvatarUrl:</td> <td> <input type=\"text\" ng-model=\"newUser.avatar\"> </td> </tr> </table> <div class=\"addContact\" ng-click=\"addContact()\">Добавить</div> </div>";
	ngModule.run(["$templateCache",function(c){c.put("contacts.html",v1)}]);
	module.exports=v1;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var letterTemplate = __webpack_require__(15);
	
	module.exports = function (letterService, stateService, dataService) {
	    return {
	        restrict: 'E',
	        template: letterTemplate,
	        link: function link(scope) {
	
	            scope.remove = function (event) {
	                if (event) event.stopPropagation();
	                letterService.removeLetter(scope.letter);
	            };
	
	            scope.preview = function (scope) {
	                var directory = scope.directory;
	                if (directory === 'filtered') directory = 'inbox';
	                if (directory === 'favorites') {
	                    directory = scope.letter.directory;
	                }
	                var index = dataService.base.letters[directory].indexOf(scope.letter) + '_' + directory;
	                stateService.setActiveState('preview', { dir: scope.directory, index: index });
	                if (scope.letter.unread) scope.letter.unread = false;
	                dataService.saveLettersToStorage();
	            };
	
	            scope.toggleFavorite = function (letter, event) {
	                if (event) event.stopPropagation();
	                letterService.toggleFavorite(letter);
	            };
	
	            scope.checkUnreadClass = function () {
	                return scope.letter.unread ? 'unread' : '';
	            };
	
	            scope.checkFavorite = function () {
	                return scope.letter.favorite ? 'activeFavorite' : '';
	            };
	        }
	    };
	};

/***/ },
/* 15 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div class=\"mail\"> <div class=\"mailHeader\" ng-class=\"checkUnreadClass()\"> <div class=\"mailDate\">{{ letter.date | date: 'EEE, dd MMMM yyyy - HH:mm'}}</div> <div class=\"senderName\">{{ letter.sender }}</div> <div class=\"mailTitle\">{{ letter.tittle }}</div> </div> <p class=\"mailContent\"> {{ letter.content | short_content }} </p> <div class=\"remove\" ng-click=\"remove($event)\"></div> <div class=\"addToFavorite\" ng-click=\"toggleFavorite(letter, $event)\" ng-class=\"checkFavorite()\"></div> </div>";
	ngModule.run(["$templateCache",function(c){c.put("letter.html",v1)}]);
	module.exports=v1;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var loadingTemplate = __webpack_require__(17);
	
	module.exports = function (animationService) {
	    return {
	        restrict: 'E',
	        template: loadingTemplate,
	
	        controller: function controller(initializationService, $state) {
	            if (!initializationService.getInit()) $state.go('mail.inbox');
	        },
	        link: function link(scope, element) {
	            animationService.loading(element.children()[0]);
	        }
	    };
	};

/***/ },
/* 17 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div>Loading letters</div>";
	ngModule.run(["$templateCache",function(c){c.put("loading.html",v1)}]);
	module.exports=v1;

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var previewTemplate = __webpack_require__(19);
	
	module.exports = function () {
	    return {
	        restrict: 'E',
	        template: previewTemplate,
	        scope: {
	            selected: '='
	        },
	        controller: function controller($stateParams, letterService, stateService, dataService) {
	            var directory = $stateParams.directory,
	                index = $stateParams.index.slice(0, 1);
	            if (directory === 'filtered') directory = 'inbox';
	            if (directory === 'favorites') {
	                directory = $stateParams.index.slice(2);
	            }
	            letterService.selected.letter = dataService.base.letters[directory][index];
	
	            this.back = function () {
	                stateService.setActiveState($stateParams.directory);
	            };
	        },
	        controllerAs: 'preview'
	    };
	};

/***/ },
/* 19 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div class=\"header group\"> <div class=\"back\" ng-click=\"preview.back()\">&#8592 <div class=\"backText\">Назад</div></div> <div class=\"from\">От кого: <span>{{ selected.letter.sender }}</span></div> <div class=\"date\">Дата: <span>{{ selected.letter.date | date: 'EEE, dd MMMM yyyy - HH:mm' }}</span></div> <div class=\"to\">Кому: <span>{{ selected.letter.to }}</span></div> </div> <div class=\"title\">{{ selected.letter.tittle }}</div> <p class=\"content\">{{ selected.letter.content }}</p>";
	ngModule.run(["$templateCache",function(c){c.put("preview.html",v1)}]);
	module.exports=v1;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var userTemplate = __webpack_require__(21);
	
	module.exports = function (letterService, stateService, dataService) {
	    return {
	        restrict: 'E',
	        template: userTemplate,
	        link: function link(scope) {
	            scope.editMode = false;
	            scope.toggleMode = function () {
	                scope.editMode = !scope.editMode;
	                dataService.saveUserToStorage();
	            };
	
	            scope.selectUser = function () {
	                if (!scope.user.email) {
	                    alert('У данного контакта нет Email!!!');
	                }
	                letterService.selected.user = scope.user.name;
	                stateService.setActiveState('filtered');
	            };
	        }
	    };
	};

/***/ },
/* 21 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div class=\"contact group\"> <div class=\"avatar\"> <img ng-src=\"{{ user.avatar || 'img/defaultAvatar.png' }}\"> </div> <table class=\"info\"> <tr> <td class=\"keys\">Имя:</td> <td> <div ng-show=\"!editMode\">{{ user.name }}</div> <input type=\"text\" ng-model=\"user.name\" ng-show=\"editMode\"></td> </tr> <tr> <td class=\"keys\">Дата рождения:</td> <td> <div ng-show=\"!editMode\">{{ user.birthDate }}</div> <input type=\"text\" ng-model=\"user.birthDate\" ng-show=\"editMode\"></td> </tr> <tr> <td class=\"keys\">Пол:</td> <td> <div ng-show=\"!editMode\">{{ user.gender }}</div> <input type=\"text\" ng-model=\"user.gender\" ng-show=\"editMode\"></td> </tr> <tr> <td class=\"keys\">Адрес:</td> <td> <div ng-show=\"!editMode\">{{ user.address }}</div> <input type=\"text\" ng-model=\"user.address\" ng-show=\"editMode\"></td> </tr> <tr> <td class=\"keys\">Email:</td> <td> <div class=\"contactEmail\" ng-click=\"mailTo(user.email)\" ng-show=\"!editMode\">{{ user.email }}</div> <input type=\"text\" ng-model=\"user.email\" ng-show=\"editMode\"></td> </tr> </table> <div class=\"edit\" ng-click=\"toggleMode()\" ng-show=\"!editMode\">Редактировать</div> <div class=\"save\" ng-click=\"toggleMode()\" ng-show=\"editMode\">Сохранить</div> <div class=\"removeContact\" ng-click=\"removeContact($index)\">Удалить</div> <div class=\"selectUser\" ng-click=\"selectUser()\">Показать письма этого контакта</div> </div>";
	ngModule.run(["$templateCache",function(c){c.put("user.html",v1)}]);
	module.exports=v1;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var inboxTemplate = __webpack_require__(23);
	
	module.exports = function () {
	    return {
	        restrict: 'E',
	        template: inboxTemplate,
	        scope: {
	            letters: '='
	        },
	        link: function link(scope) {
	            scope.directory = 'inbox';
	        }
	    };
	};

/***/ },
/* 23 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<letter ng-repeat=\"letter in letters | orderBy: 'date': true\" ng-click=\"preview(this)\"></letter>";
	ngModule.run(["$templateCache",function(c){c.put("inboxLetters.html",v1)}]);
	module.exports=v1;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var sentTemplate = __webpack_require__(25);
	
	module.exports = function () {
	    return {
	        restrict: 'E',
	        template: sentTemplate,
	        scope: {
	            letters: '='
	        },
	        link: function link(scope) {
	            scope.directory = 'sent';
	        }
	    };
	};

/***/ },
/* 25 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<letter ng-repeat=\"letter in letters | orderBy: 'date': true\" ng-click=\"preview(this)\"></letter>";
	ngModule.run(["$templateCache",function(c){c.put("sentLetters.html",v1)}]);
	module.exports=v1;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var trashTemplate = __webpack_require__(27);
	
	module.exports = function () {
	    return {
	        restrict: 'E',
	        template: trashTemplate,
	        scope: {
	            letters: '='
	        },
	        link: function link(scope) {
	            scope.directory = 'trash';
	        }
	    };
	};

/***/ },
/* 27 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<letter ng-repeat=\"letter in letters | orderBy: 'date': true\" ng-click=\"preview(this)\"></letter>";
	ngModule.run(["$templateCache",function(c){c.put("cartLetters.html",v1)}]);
	module.exports=v1;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var newLetterTemplate = __webpack_require__(29);
	
	module.exports = function () {
	    return {
	        restrict: 'E',
	        template: newLetterTemplate,
	        scope: {
	            new: '='
	        }
	    };
	};

/***/ },
/* 29 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div class=\"newLetterForm\"> <form name=\"newLetter\"> <div class=\"addressee\"> <label><div>To:</div><input type=\"text\" ng-model=\"new.letter.to\"></label> </div> <div class=\"title\"> <label><div>Title:</div><input type=\"text\" ng-model=\"new.letter.tittle\"></label> </div> <div class=\"hrLine\"></div> <textarea ng-model=\"new.letter.content\"></textarea> </form> </div>";
	ngModule.run(["$templateCache",function(c){c.put("newLetter.html",v1)}]);
	module.exports=v1;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var draftsTemplate = __webpack_require__(31);
	
	module.exports = function () {
	    return {
	        restrict: 'E',
	        template: draftsTemplate,
	        scope: {
	            letters: '='
	        },
	        link: function link(scope) {
	            scope.directory = 'drafts';
	        }
	    };
	};

/***/ },
/* 31 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<letter ng-repeat=\"letter in letters | orderBy: 'date': true\" ng-click=\"preview(this)\"></letter>";
	ngModule.run(["$templateCache",function(c){c.put("drafts.html",v1)}]);
	module.exports=v1;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var favoritesTemplate = __webpack_require__(33);
	
	module.exports = function () {
	    return {
	        restrict: 'E',
	        template: favoritesTemplate,
	        scope: {
	            inbox: '=',
	            sent: '='
	        },
	        link: function link(scope) {
	            scope.letters = scope.inbox.concat(scope.sent);
	            scope.directory = 'favorites';
	        }
	    };
	};

/***/ },
/* 33 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<letter ng-repeat=\"letter in letters | filter: {favorite: true} | orderBy: 'date': true\" ng-click=\"preview(this)\"></letter>";
	ngModule.run(["$templateCache",function(c){c.put("favorites.html",v1)}]);
	module.exports=v1;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	var filteredTemplate = __webpack_require__(35);
	
	module.exports = function () {
	    return {
	        restrict: 'E',
	        template: filteredTemplate,
	        scope: {
	            letters: '=',
	            user: '='
	        },
	        controller: function controller(stateService) {
	            this.back = function () {
	                stateService.setActiveState('contacts');
	            };
	        },
	        controllerAs: 'filterDir',
	        link: function link(scope) {
	            scope.directory = 'filtered';
	        }
	    };
	};

/***/ },
/* 35 */
/***/ function(module, exports) {

	var angular=window.angular,ngModule;
	try {ngModule=angular.module(["ng"])}
	catch(e){ngModule=angular.module("ng",[])}
	var v1="<div class=\"back\" ng-click=\"filterDir.back()\">&#8592 <div class=\"backText\">Вернуться к контактам</div></div> <letter ng-repeat=\"letter in letters | filter: user | orderBy: 'date': true\" ng-click=\"preview(this)\"></letter>";
	ngModule.run(["$templateCache",function(c){c.put("filteredLetters.html",v1)}]);
	module.exports=v1;

/***/ },
/* 36 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
	    function light(elem) {
	        var shadow1 = '3px 0px 9px rgba(0, 255, 0, ',
	            shadow2 = ')',
	            opacity = 0;
	
	        function incr() {
	            if (opacity < 0.9) {
	                opacity += 0.05;
	                elem.style.textShadow = shadow1 + opacity + shadow2;
	                setTimeout(incr, 75);
	            } else return decr();
	        }
	
	        function decr() {
	            if (opacity > 0.2) {
	                opacity -= 0.05;
	                elem.style.textShadow = shadow1 + opacity + shadow2;
	                setTimeout(decr, 75);
	            } else return incr();
	        }
	
	        incr();
	    }
	
	    function addComa(elem) {
	        function add() {
	            if (elem.innerHTML.length === 21) elem.innerHTML = 'Loading letters';
	            elem.innerHTML += '.';
	            setTimeout(add, 500);
	        }
	        add();
	    }
	
	    function loading(element) {
	        light(element);
	        addComa(element);
	    }
	
	    return {
	        loading: loading
	
	    };
	};

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function ($http, $state, letterService, initializationService, dataService) {
	
	    var permission = false;
	
	    function getPermission() {
	        return permission;
	    }
	
	    function setPermission(val) {
	        if (val === true || val === false) permission = val;
	    }
	
	    function continueSession() {
	        dataService.base.users = window.localStorage.users ? JSON.parse(window.localStorage.users) : undefined;
	        if (!dataService.base.users) dataService.getUsers();
	
	        return $http({ method: 'GET', url: 'data/JSON/mails.json' }).then(function (data) {
	            if (window.localStorage.letters) {
	                setPermission(true);
	                var letters = {};
	                letters.data = JSON.parse(window.localStorage.letters);
	                dataService.base.letters = letters.data;
	                initializationService.finishInit();
	            } else {
	                setPermission(true);
	                dataService.base.letters = data.data;
	                initializationService.finishInit();
	            }
	        });
	    }
	
	    function loginOut() {
	        document.cookie = 'session=' + '; max-age=0';
	        setPermission(false);
	        letterService.resetSelected();
	        dataService.resetBase();
	        initializationService.resetInit();
	        $state.go('signIn');
	    }
	
	    function signIn(data) {
	        if (data.login !== 'test') {
	            alert('Такого пользователя не существует!');
	            return;
	        }
	        if (data.login === 'test' && data.password === '123') {
	            setPermission(true);
	            $state.go('mail.loading');
	            return dataService.init();
	        } else {
	            alert('Введенный пороль не верен!');
	        }
	    }
	    /*
	        function signIn(data) {
	            $http.get('data/usersProfiles.json')
	                .then(function(profiles) {
	                    profiles = profiles.data;
	                    if (!profiles[data.login]) {
	                        alert('Такого пользователя не существует!');
	                        return;
	                    }
	                    if (profiles[data.login] === data.password) {
	                        alert('KH');
	                        permission = true;
	                        $state.go('mail.loading');
	                        dataService.init();
	                    } else {
	                        alert('Введенный пороль не верен!')
	                    }
	                }, function() {
	                    alert('Не удалось загрузить базы...')
	                });
	        }
	        */
	
	    return {
	        getPermission: getPermission,
	        signIn: signIn,
	        loginOut: loginOut,
	        continueSession: continueSession,
	        setPermission: setPermission
	    };
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function ($rootScope, $http, $q, $timeout, initializationService, stateService) {
	    var base = {};
	
	    function getUsers() {
	        return $http.get('data/JSON/users.json').then(function (data) {
	            base.users = data.data;
	            return data.data;
	        }, function (err, status) {
	            console.log(err + status);
	        });
	    }
	
	    function getLetters() {
	        var def = $q.defer();
	
	        $timeout(function () {
	            if (window.localStorage.letters) {
	                var data = {};
	                data.data = JSON.parse(window.localStorage.letters);
	                def.resolve(data);
	            }
	
	            $http({ method: 'GET', url: 'data/JSON/mails.json' }).then(function (data) {
	                def.resolve(data);
	            }, function (err) {
	                return console.log(err + status);
	            });
	        }, 5000);
	
	        return def.promise;
	    }
	
	    function saveLettersToStorage() {
	        if (!window.localStorage) return;
	        window.localStorage.letters = JSON.stringify(base.letters);
	    }
	
	    function saveUsersToStorage() {
	        if (!window.localStorage) return;
	        window.localStorage.users = JSON.stringify(base.users);
	    }
	
	    function initialisation() {
	        base.users = window.localStorage.users ? JSON.parse(window.localStorage.users) : undefined;
	        if (!base.users) getUsers();
	
	        return getLetters().then(function (data) {
	            base.letters = data.data;
	            initializationService.finishInit();
	            stateService.setActiveState('inbox');
	            document.cookie = 'session=' + (Math.random() + '').slice(2);
	            return data.data;
	        });
	    }
	
	    function resetBase() {
	        delete base.letters;
	        delete base.users;
	    }
	
	    return {
	        base: base,
	        init: initialisation,
	        saveUserToStorage: saveUsersToStorage,
	        saveLettersToStorage: saveLettersToStorage,
	        getUsers: getUsers,
	        getLetters: getLetters,
	        resetBase: resetBase
	    };
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
	    var initialization = true;
	
	    function getInit() {
	        return initialization;
	    }
	
	    function finishInit() {
	        initialization = false;
	    }
	
	    function resetInit() {
	        initialization = true;
	    }
	
	    return {
	        getInit: getInit,
	        finishInit: finishInit,
	        resetInit: resetInit
	    };
	};

/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function (stateService, $stateParams, dataService) {
	    var selected = {},
	        newLetter = {
	        letter: {}
	    };
	
	    function moveToDir(dir) {
	        dataService.base.letters[dir].push(selected.letter);
	        dataService.saveLettersToStorage();
	    }
	
	    function removeFromDir() {
	        var currentDir = stateService.currentState();
	        if (currentDir === 'preview') currentDir = $stateParams.directory;
	        if (currentDir === 'favorites' || currentDir === 'filtered') currentDir = selected.letter.directory;
	        var index = dataService.base.letters[currentDir].indexOf(selected.letter);
	
	        dataService.base.letters[currentDir].splice(index, 1);
	
	        dataService.saveLettersToStorage();
	    }
	
	    function removeLetter(letter) {
	        if (letter) selected.letter = letter;
	        var currentDir = stateService.currentState();
	        if (currentDir === 'preview') currentDir = $stateParams.directory;
	        if (selected.letter.favorite) {
	            toggleFavorite(selected.letter);
	        }
	        removeFromDir();
	        stateService.setActiveState(currentDir);
	        if (selected.letter.deleted === false && selected.letter.directory !== 'drafts') {
	            selected.letter.deleted = true;
	            moveToDir('trash');
	        }
	    }
	
	    function recoverLetter() {
	        removeFromDir();
	        moveToDir(selected.letter.directory);
	        selected.letter.deleted = false;
	        stateService.setActiveState(selected.letter.directory);
	    }
	
	    function setInfo(dir) {
	        var obj = {
	            sender: 'I',
	            date: new Date().getTime(),
	            favorite: false,
	            unread: false,
	            deleted: false,
	            directory: dir
	        };
	
	        for (var key in obj) {
	            selected.letter[key] = obj[key];
	        }selected.letter.tittle = selected.letter.tittle || 'Без темы...';
	        selected.letter.content = selected.letter.content || '';
	    }
	
	    function moveNewLetter(dir) {
	        selected.letter = newLetter.letter;
	        setInfo(dir);
	        if (dir === 'sent' && !selected.letter.to) {
	            alert('Нет адреса получателя!!!');
	            return;
	        }
	        moveToDir(dir);
	        stateService.setActiveState(dir);
	        newLetter.letter = {};
	    }
	
	    function editDraft() {
	        newLetter.letter = selected.letter;
	        selected.letter = {};
	        removeFromDir();
	        stateService.setActiveState('newLetterForm');
	    }
	
	    function toggleFavorite(letter) {
	        letter.favorite = !letter.favorite;
	        dataService.saveLettersToStorage();
	    }
	
	    function resetSelected() {
	        delete selected.letter;
	    }
	
	    return {
	        selected: selected,
	        newLetter: newLetter,
	        moveToDir: moveToDir,
	        removeFromDir: removeFromDir,
	        removeLetter: removeLetter,
	        recoverLetter: recoverLetter,
	        moveNewLetter: moveNewLetter,
	        editDraft: editDraft,
	        toggleFavorite: toggleFavorite,
	        resetSelected: resetSelected
	    };
	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function ($state, initializationService) {
	
	    function getState() {
	        return $state.current.name.slice(5);
	    }
	
	    function setActiveState(val, params_obj) {
	        if (initializationService.getInit()) return;
	        if (val === 'preview') {
	            $state.go('mail.' + val, { directory: params_obj.dir, index: params_obj.index });
	            return;
	        }
	        $state.go('mail.' + val);
	    }
	
	    function setDirActiveClass(val) {
	        var activeClass = getState() === val ? 'activeDir' : '';
	
	        return activeClass;
	    }
	
	    return {
	        checkDirClass: setDirActiveClass,
	        setActiveState: setActiveState,
	        currentState: getState
	    };
	};

/***/ },
/* 42 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function () {
	    return {
	        "inbox": [{
	            "date": 1111111117915,
	            "sender": "Петров Петр",
	            "to": "Me",
	            "tittle": "1230 123 kik20 23",
	            "content": "mklmkwlef wekfwle fwekf lk232342394234 340248 2405094580294 04 502984 0928 4092 40958 2094 50924 50924 5092 459 2495 245 294 52094 50924 509248 520345820485029480925809485 2094850298 40958 20948 509284 095 2094 50 98928 0928450928 0928 4095 2094 094 2945 34538450 934095 309458 039508495830 45829470385760835706987508274 0587 204857 2094870284705982740985720498 57209 457094 570928 475098240958274085729485702948 0948 509284 50928 45729847509487509847 509847 5098475 09284750928475 092847 502948 570948 5702984 75029847509284709582740985720948750 2984 52984 50982 45709824750982 7450982 47095 240587 2498572495827 40958 274958204958 7204 52094857 0294857 0928475 092847 5092847 5092847 5092847 5092847 5092847 5092845 ",
	            "favorite": false,
	            "unread": false,
	            "directory": "inbox",
	            "deleted": false
	        }, {
	            "date": 1222224887915,
	            "sender": "Петров Петр",
	            "to": "Me",
	            "tittle": "faefmke e JNNKJNK NKn nkenfkwe jjjjJJJJJJ!",
	            "content": "fkaldmflka dflkamdslfk aelk w;jtkr gwtr gw;jr w;jr fwekjr fwjrk fwkjrnf;kjwnr e;fkj wr;kjnf ;wjkr g;jkwrn g;jkwr g;kjw r;gjknfs;kjnsf;kjdn wkrg ;wkjrgn;kjnfg;skjdfngkjw rgkjwrng;jksnfoig[origj[woirmgwr gwkjrgkwjfng;kjndf;jgksn;kgnw; gw;krg;kwfng;skndfg;jkwnr;gkjwnr;gjnsfogmsodifmgwoeikmrgwej rgkjwerng;jkwe rgwnrgjwke rgkj gs;dfjkvfgn wjrgnwejrng;jdfg sdfgerfkqwrf ekgs fdgsndf glwekjrgn;wjerngwkjr gw;ekjrgnwirjfpoirgjsogkjernglkj rekjnrka dvnz;dfjk va; naif ka dfjvnainvna fvjka d;ifna;j ja rj aerjg eirgn;ajk gajr ;gkja er;gjknrg;jks gkjs r;ijgnerign;j rg;k r;gjn;ireng;sing;isngoinreg[oiwnrg[oiw gwnrgiwnrger g",
	            "favorite": true,
	            "unread": false,
	            "directory": "inbox",
	            "deleted": false
	        }, {
	            "date": 1474294087915,
	            "sender": "Натальина Наталья",
	            "to": "Me",
	            "tittle": "Самое первое письмо на данный момент",
	            "content": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec faucibus, elit vitae elementum convallis, mauris ipsum posuere magna, sit amet sodales quam enim a libero. Phasellus consectetur blandit velit eget varius. Pellentesque volutpat, elit molestie finibus pharetra, tortor urna egestas neque, at gravida ligula turpis a lorem. Nullam non lorem id neque ultrices dignissim. Aliquam ipsum nulla, pellentesque ut diam id, faucibus cursus lectus. Cras sodales consequat ex vel aliquet. Sed sit amet laoreet magna, ac convallis augue. Ut diam nisi, placerat eu nibh sit amet, euismod fringilla urna. Integer hendrerit tellus non diam congue dapibus. Nunc pretium sem felis, semper iaculis sapien ornare eu. Quisque nec luctus tortor.Donec ullamcorper, dolor ac maximus ornare, nulla nulla facilisis ipsum, id laoreet arcu erat eu mi. Morbi quam libero, vehicula eu felis at, bibendum rutrum nibh. Morbi vel sapien a turpis rhoncus tempor. Etiam scelerisque magna ac leo lacinia, sed accumsan ipsum lacinia. Cras leo metus, laoreet vitae ipsum et, mattis molestie tellus. Morbi pharetra diam sit amet velit gravida volutpat. Etiam vel blandit arcu, a accumsan quam.Vestibulum ac neque turpis. Curabitur convallis leo risus, eget ornare lorem sollicitudin a. Praesent in quam ipsum. Aenean ornare feugiat mauris, a iaculis nulla rhoncus et. Cras scelerisque risus vel leo finibus dapibus. Ut interdum tincidunt nisi sed mattis. Donec quis finibus sapien. Quisque porta posuere tristique. Integer in interdum eros, vel eleifend dolor. Sed sed lacinia enim, in interdum dolor.In posuere tellus id ante suscipit, id sollicitudin erat facilisis. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Mauris tincidunt, ipsum iaculis eleifend sagittis, magna nisi malesuada nunc, congue rutrum sem nunc in ligula. Aliquam ut eros fermentum, tincidunt nibh sed, mattis urna. Proin velit dui, scelerisque a ullamcorper sit amet, porttitor at dui. Nunc nec eros leo. Curabitur hendrerit accumsan condimentum. Morbi tincidunt ornare scelerisque. Donec vel efficitur nibh. Ut eu aliquet velit, id viverra mauris.",
	            "favorite": false,
	            "unread": true,
	            "directory": "inbox",
	            "deleted": false
	        }, {
	            "date": 1424246887915,
	            "sender": "Иванов Иван",
	            "to": "Me",
	            "tittle": "Просто обычная тема для нового письма",
	            "content": "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?",
	            "favorite": false,
	            "unread": true,
	            "directory": "inbox",
	            "deleted": false
	        }, {
	            "date": 1414274887915,
	            "sender": "Петров Петр",
	            "to": "Me",
	            "tittle": "Вот такая вот тема у письма",
	            "content": "Нет ни элитных, ни «слабеньких». В самой крупной школе страны учится 960 учеников. В самой маленькой — 11. Все имеют абсолютно одинаковое оборудование, возможности и пропорциональное финансирование. Почти все школы — государственные, есть десяток частно-государственных. Разница, кроме того, что родители вносят частичную оплату, — в повышенных требованиях к ученикам. Как правило, это своеобразные «педагогические» лаборатории, следующие выбранной педагогике: Монтессори, Френе, Мортана и Вальдорфская школы. К частным относятся и учреждения с преподаванием на английском, немецком, французском Следуя принципу равенства, в Финляндии существует параллельная система образования «от детских садов до университетов» на шведском языке. Не забыты и интересы саамского народа, на севере страны можно обучаться на родном языке.До недавнего времени финнам было запрещено выбирать школу, следовало отдавать детей в «ближайшую». Запрет сняли, но большинство родителей так и отдают детей «поближе», ведь все школы одинаково хороши.",
	            "favorite": true,
	            "unread": false,
	            "directory": "inbox",
	            "deleted": false
	        }, {
	            "date": 1288320000000,
	            "sender": "Masha Dashkina",
	            "to": "Me",
	            "tittle": "Letter not Found",
	            "content": "Mopnn fyc hvh hctrxxrc vguutdc c hh! Jbvgh ug hvnv  v uyuyguy uygug v vjk jgcxdxseetk. Lnjnkvzwyuo[lkdx",
	            "favorite": false,
	            "unread": false,
	            "directory": "inbox",
	            "deleted": false
	        }, {
	            "date": 1288323623006,
	            "sender": "Masha Dashkina",
	            "to": "Me",
	            "tittle": "Hello! It`s your turn!",
	            "content": "mkmklmklkj bouiytf rt utrdutrf tfyf yguyg uhiuhiuh igkvf yvf ytvy tvf ytft",
	            "favorite": true,
	            "unread": false,
	            "directory": "inbox",
	            "deleted": false
	        }],
	        "sent": [{
	            "date": 1288323333333,
	            "sender": "I",
	            "to": "Petya Koshkin",
	            "tittle": "Big news today! ",
	            "content": "Omkwefkwe wefkmwkef krg wkjrg wongowt gwotgmwormgwkrg ka! Pmskld sdslv sb s bs bkrmbkamdfkl avalfkvmalf vakvlakv l?sdsl,dsdf sfkfkfml!",
	            "favorite": true,
	            "unread": false,
	            "directory": "sent",
	            "deleted": false
	        }, {
	            "date": 1288321111111,
	            "sender": "I",
	            "to": "Masha Dashkina",
	            "tittle": "Letter not Found",
	            "content": "Not for this sdmklsf law !ml efmwlefm wklmP fmwelkmfw .wefwef wefwefwlkmefl weflkwmefwdioidvsoidnwoefnwke fwkefdkfmsdfef wefkmdlfkmsdf",
	            "favorite": false,
	            "unread": false,
	            "directory": "sent",
	            "deleted": false
	        }, {
	            "date": 1288326666666,
	            "sender": "I",
	            "to": "Vasya Petkin",
	            "tittle": "Realy very-very-very big-big-big title!!!!!!!",
	            "content": "nothing interesting nothing interesting nothing interesting nothing interesting nothing interesting nothing interesting nothing interesting nothing interesting",
	            "favorite": false,
	            "unread": false,
	            "directory": "sent",
	            "deleted": false
	        }],
	        "trash": [{
	            "date": 1288323623006,
	            "sender": "Katya Dikaya",
	            "to": "Me",
	            "tittle": "!!!Nice to eat you!!!",
	            "content": "Vary tasty! Vary tasty! Vary tasty! Vary tasty! Vary tasty! Vary tasty! Vary tasty! Vary tasty! Vary tasty! Vary tasty! Vary tasty! Vary tasty! Vary tasty! Vary tasty! ",
	            "favorite": false,
	            "unread": false,
	            "directory": "inbox",
	            "deleted": true
	        }],
	        "drafts": [{
	            "date": 1288326232323,
	            "sender": "I",
	            "to": "",
	            "tittle": "Без темы...",
	            "content": "",
	            "favorite": false,
	            "unread": false,
	            "directory": "drafts",
	            "deleted": false
	        }]
	    };
	};

/***/ },
/* 43 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function () {
	    return {
	        "test": "123"
	    };
	};

/***/ },
/* 44 */
/***/ function(module, exports) {

	"use strict";
	
	module.exports = function () {
	    var users = [{
	        "name": "Иванов Иван",
	        "birthDate": "1976.10.10",
	        "gender": "М",
	        "address": "ул. Звенигороская, 47б",
	        "email": "ivanov@mail.ru",
	        "avatar": "https://randomuser.me/api/portraits/thumb/men/57.jpg"
	    }, {
	        "name": "Василий Юрочкин",
	        "birthDate": "09.02.1980",
	        "gender": "М",
	        "address": "ул. Ваньковского, 23/3-70",
	        "email": "goopv123@mail.com"
	    }, {
	        "name": "Петров Петр",
	        "birthDate": "1957.01.14",
	        "gender": "М",
	        "address": "ул.Пушкиская, 13",
	        "email": "petrov@mail.ru",
	        "avatar": "https://randomuser.me/api/portraits/thumb/men/7.jpg"
	    }, {
	        "name": "Натальина Наталья",
	        "birthDate": "1990.07.03",
	        "gender": "Ж",
	        "address": "ул. Лермонтова, 59",
	        "email": "natali@mail.ru",
	        "avatar": "https://randomuser.me/api/portraits/thumb/women/7.jpg"
	    }, {
	        "name": "Юрий Васичкин",
	        "birthDate": "19.12.1973",
	        "gender": "М",
	        "address": "ул. Коржумякиного, 3/20-98",
	        "email": "goopv123@mail.com"
	    }];
	
	    return users;
	};

/***/ },
/* 45 */
/***/ function(module, exports) {

	'use strict';
	
	module.exports = function () {
	    return function (content) {
	        return content.slice(0, 220) + '...';
	    };
	};

/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map