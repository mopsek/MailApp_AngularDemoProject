/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

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

	mailApp.filter('short_content', __webpack_require__(42));

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
	                event.stopPropagation();
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
	        template: filteredLetters,
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

	'use strict';

	module.exports = function () {
	    return function (content) {
	        return content.slice(0, 220) + '...';
	    };
		};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDNjZDA1MGNjMjZmYjM5ZGQ5NDViIiwid2VicGFjazovLy9qcy9tYWlsLWFwcC5qcyIsIndlYnBhY2s6Ly8vanMvYXBwL2luZGV4LmpzIiwid2VicGFjazovLy9qcy9hcHAvYXV0aG9yaXphdGlvbi1tb2R1bGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9hdXRob3JpemF0aW9uLW1vZHVsZS9hdXRob3JpemF0aW9uLWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvYXV0aG9yaXphdGlvbi1tb2R1bGUvdGVtcGxhdGUvYXV0aG9yaXphdGlvbi5odG1sIiwid2VicGFjazovLy9qcy9hcHAvbWVudS1tb2R1bGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9tZW51LW1vZHVsZS9kaXJlY3Rvcmllcy1tZW51L2RpcmVjdG9yaWVzLW1lbnUtZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC9tZW51LW1vZHVsZS9kaXJlY3Rvcmllcy1tZW51L3RlbXBsYXRlL2RpcmVjdG9yaWVzLW1lbnUuaHRtbCIsIndlYnBhY2s6Ly8vanMvYXBwL21lbnUtbW9kdWxlL21lbnUvbWVudS1kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL21lbnUtbW9kdWxlL21lbnUvdGVtcGxhdGUvbWVudS5odG1sIiwid2VicGFjazovLy9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9pbmRleC5qcyIsIndlYnBhY2s6Ly8vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbWFpbi1jb250YWluZXItZGlyZWN0aXZlL21haW4tY29udGFpbmVyLWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vanMvYXBwL21haW4tdmlldy1tb2R1bGUvY29udGFjdHMtZGlyZWN0aXZlL2NvbnRhY3RzRGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL2NvbnRhY3RzLWRpcmVjdGl2ZS90ZW1wbGF0ZS9jb250YWN0cy5odG1sIiwid2VicGFjazovLy9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9sZXR0ZXItZGlyZWN0aXZlL2xldHRlci1kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVyLWRpcmVjdGl2ZS90ZW1wbGF0ZS9sZXR0ZXIuaHRtbCIsIndlYnBhY2s6Ly8vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbG9hZGluZy1kaXJlY3RpdmUvbG9hZGluZy1kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbG9hZGluZy1kaXJlY3RpdmUvdGVtcGxhdGUvbG9hZGluZy5odG1sIiwid2VicGFjazovLy9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9wcmV2aWV3LWRpcmVjdGl2ZS9wcmV2aWV3LWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9wcmV2aWV3LWRpcmVjdGl2ZS90ZW1wbGF0ZS9wcmV2aWV3Lmh0bWwiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL3VzZXItZGlyZWN0aXZlL3VzZXItZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL3VzZXItZGlyZWN0aXZlL3RlbXBsYXRlL3VzZXIuaHRtbCIsIndlYnBhY2s6Ly8vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL2luYm94LWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9sZXR0ZXJzLWRpcmVjdG9yaWVzLWRpcmVjdGl2ZXMvdGVtcGxhdGVzL2luYm94TGV0dGVycy5odG1sIiwid2VicGFjazovLy9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9sZXR0ZXJzLWRpcmVjdG9yaWVzLWRpcmVjdGl2ZXMvc2VudC1kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL3RlbXBsYXRlcy9zZW50TGV0dGVycy5odG1sIiwid2VicGFjazovLy9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9sZXR0ZXJzLWRpcmVjdG9yaWVzLWRpcmVjdGl2ZXMvdHJhc2gtZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy90ZW1wbGF0ZXMvY2FydExldHRlcnMuaHRtbCIsIndlYnBhY2s6Ly8vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL25ld0xldHRlci1kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL3RlbXBsYXRlcy9uZXdMZXR0ZXIuaHRtbCIsIndlYnBhY2s6Ly8vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL2RyYWZ0cy1kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL3RlbXBsYXRlcy9kcmFmdHMuaHRtbCIsIndlYnBhY2s6Ly8vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL2Zhdm9yaXRlcy1kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL3RlbXBsYXRlcy9mYXZvcml0ZXMuaHRtbCIsIndlYnBhY2s6Ly8vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL2ZpbHRlcmVkLWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9sZXR0ZXJzLWRpcmVjdG9yaWVzLWRpcmVjdGl2ZXMvdGVtcGxhdGVzL2ZpbHRlcmVkTGV0dGVycy5odG1sIiwid2VicGFjazovLy9qcy9hcHAvc2VydmljZXMvYW5pbWF0aW9uU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vanMvYXBwL3NlcnZpY2VzL2F1dGhvcml6YXRpb25TZXJ2aWNlLmpzIiwid2VicGFjazovLy9qcy9hcHAvc2VydmljZXMvZGF0YVNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZXJ2aWNlcy9pbml0aWFsaXphdGlvblNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vL2pzL2FwcC9zZXJ2aWNlcy9sZXR0ZXJTZXJ2aWNlLmpzIiwid2VicGFjazovLy9qcy9hcHAvc2VydmljZXMvc3RhdGVTZXJ2aWNlLmpzIiwid2VicGFjazovLy9qcy9hcHAvc2VydmljZXMvZmlsdGVycy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDNjZDA1MGNjMjZmYjM5ZGQ5NDViXG4gKiovIiwicmVxdWlyZSgnLi9hcHAnKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9tYWlsLWFwcC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IG1haWxBcHAgPSBhbmd1bGFyLm1vZHVsZSgnbWFpbEFwcCcsIFsndWkucm91dGVyJywgcmVxdWlyZSgnLi9hdXRob3JpemF0aW9uLW1vZHVsZScpLm5hbWUsIHJlcXVpcmUoJy4vbWVudS1tb2R1bGUnKS5uYW1lLCByZXF1aXJlKCcuL21haW4tdmlldy1tb2R1bGUnKS5uYW1lXSk7XHJcblxyXG5tYWlsQXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcbiAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgIC5zdGF0ZSgnc2lnbkluJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvc2lnbmluJyxcclxuICAgICAgICAgICAgdGVtcGxhdGU6ICc8c2lnbi1pbj48L3NpZ24taW4+J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdtYWlsJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvbWFpbCcsXHJcbiAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL21haW4tY29udGFpbmVyLWRpcmVjdGl2ZS90ZW1wbGF0ZS9tYWluLmh0bWwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ21haWwuaW5ib3gnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9pbmJveCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPGluYm94LWxldHRlcnMgbGV0dGVycz1cImRpcmVjdG9yeS5iYXNlLmxldHRlcnMuaW5ib3hcIj48L2luYm94LWxldHRlcnM+J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdtYWlsLmxvYWRpbmcnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvbG9hZGluZ1wiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxsb2FkaW5nPjwvbG9hZGluZz4nXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ21haWwuc2VudCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL3NlbnQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxzZW50LWxldHRlcnMgbGV0dGVycz1cImRpcmVjdG9yeS5iYXNlLmxldHRlcnMuc2VudFwiPjwvc2VudC1sZXR0ZXJzPidcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbWFpbC50cmFzaCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL3RyYXNoJyxcclxuICAgICAgICAgICAgdGVtcGxhdGU6ICc8Y2FydC1sZXR0ZXJzIGxldHRlcnM9XCJkaXJlY3RvcnkuYmFzZS5sZXR0ZXJzLnRyYXNoXCI+PC9jYXJ0LWxldHRlcnM+J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdtYWlsLmRyYWZ0cycsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2RyYWZ0cycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPGRyYWZ0cyBsZXR0ZXJzPVwiZGlyZWN0b3J5LmJhc2UubGV0dGVycy5kcmFmdHNcIj48L2RyYWZ0cz4nXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ21haWwuZmF2b3JpdGVzJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvZmF2b3JpdGVzJyxcclxuICAgICAgICAgICAgdGVtcGxhdGU6ICc8ZmF2b3JpdGVzIGluYm94PVwiZGlyZWN0b3J5LmJhc2UubGV0dGVycy5pbmJveFwiIHNlbnQ9XCJkaXJlY3RvcnkuYmFzZS5sZXR0ZXJzLnNlbnRcIj48L2Zhdm9yaXRlcz4nXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ21haWwubmV3TGV0dGVyRm9ybScsIHtcclxuICAgICAgICAgICAgdXJsOiAnL25ld19sZXR0ZXInLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxuZXctbGV0dGVyIG5ldz1cImRpcmVjdG9yeS5uZXdMZXR0ZXJcIj48L25ldy1sZXR0ZXI+J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdtYWlsLmNvbnRhY3RzJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvY29udGFjdHMnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxjb250YWN0cyB1c2Vycz1cImRpcmVjdG9yeS5iYXNlLnVzZXJzXCI+PC9jb250YWN0cz4nXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ21haWwucHJldmlldycsIHtcclxuICAgICAgICAgICAgdXJsOiAnLzpkaXJlY3RvcnkvOmluZGV4JyxcclxuICAgICAgICAgICAgdGVtcGxhdGU6ICc8cHJldmlldyBzZWxlY3RlZD1cImRpcmVjdG9yeS5zZWxlY3RlZFwiPjwvcHJldmlldz4nXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ21haWwuZmlsdGVyZWQnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9maWx0ZXJlZCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPGZpbHRlcmVkLWxldHRlcnMgbGV0dGVycz1cImRpcmVjdG9yeS5iYXNlLmxldHRlcnMuaW5ib3hcIiB1c2VyPVwiZGlyZWN0b3J5LnNlbGVjdGVkLnVzZXJcIj48L2ZpbHRlcmVkLWxldHRlcnM+J1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKGZ1bmN0aW9uICgkaW5qZWN0b3IpIHtcclxuICAgICAgICBpZiAoJGluamVjdG9yLmdldCgnYXV0aG9yaXphdGlvblNlcnZpY2UnKS5nZXRQZXJtaXNzaW9uKCkpIHJldHVybiAnL21haWwvaW5ib3gnO1xyXG4gICAgICAgIHJldHVybiAnL3NpZ25pbic7XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5tYWlsQXBwLnJ1bihmdW5jdGlvbigkcm9vdFNjb3BlLCAkc3RhdGUsIGF1dGhvcml6YXRpb25TZXJ2aWNlLCBkYXRhU2VydmljZSkge1xyXG4gICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24oZXZlbnQsIHRvU3RhdGUpIHtcclxuICAgICAgICBpZiAoIChkb2N1bWVudC5jb29raWUuaW5kZXhPZignc2Vzc2lvbicpICsgMSkgJiYgIWRhdGFTZXJ2aWNlLmJhc2UubGV0dGVycykge1xyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uU2VydmljZS5jb250aW51ZVNlc3Npb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodG9TdGF0ZS5uYW1lICE9PSdzaWduSW4nICYmICFhdXRob3JpemF0aW9uU2VydmljZS5nZXRQZXJtaXNzaW9uKCkpIHtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdzaWduSW4nKTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5tYWlsQXBwLnNlcnZpY2UoJ2FuaW1hdGlvblNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL2FuaW1hdGlvblNlcnZpY2UnKSk7XHJcbm1haWxBcHAuc2VydmljZSgnYXV0aG9yaXphdGlvblNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL2F1dGhvcml6YXRpb25TZXJ2aWNlJykpO1xyXG5tYWlsQXBwLnNlcnZpY2UoJ2RhdGFTZXJ2aWNlJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9kYXRhU2VydmljZScpKTtcclxubWFpbEFwcC5zZXJ2aWNlKCdpbml0aWFsaXphdGlvblNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL2luaXRpYWxpemF0aW9uU2VydmljZScpKTtcclxubWFpbEFwcC5zZXJ2aWNlKCdsZXR0ZXJTZXJ2aWNlJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9sZXR0ZXJTZXJ2aWNlJykpO1xyXG5tYWlsQXBwLnNlcnZpY2UoJ3N0YXRlU2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvc3RhdGVTZXJ2aWNlJykpO1xyXG5cclxubWFpbEFwcC5maWx0ZXIoJ3Nob3J0X2NvbnRlbnQnLCByZXF1aXJlKCcuL3NlcnZpY2VzL2ZpbHRlcnMnKSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtYWlsQXBwO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IGF1dGhvcml6YXRpb24gPSBhbmd1bGFyLm1vZHVsZSgnYXV0aG9yaXphdGlvbicsIFtdKTtcclxuXHJcbmF1dGhvcml6YXRpb24uZGlyZWN0aXZlKCdzaWduSW4nLCByZXF1aXJlKCcuL2F1dGhvcml6YXRpb24tZGlyZWN0aXZlJykpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBhdXRob3JpemF0aW9uO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9hdXRob3JpemF0aW9uLW1vZHVsZS9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBhdXRoVGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlL2F1dGhvcml6YXRpb24uaHRtbCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICB0ZW1wbGF0ZTogYXV0aFRlbXBsYXRlLFxyXG4gICAgICAgIHNjb3BlOiB7fSxcclxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbihhdXRob3JpemF0aW9uU2VydmljZSl7XHJcbiAgICAgICAgICAgIHRoaXMubG9naW4gPSAnJztcclxuICAgICAgICAgICAgdGhpcy5wYXNzd29yZCA9ICcnO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5lbnRlciA9IGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLmtleUNvZGUgPT09IDEzKSB0aGlzLnNpZ25JbigpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5zaWduSW4gPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGF1dGhvcml6YXRpb25TZXJ2aWNlLnNpZ25Jbih7bG9naW46IHRoaXMubG9naW4sIHBhc3N3b3JkOiB0aGlzLnBhc3N3b3JkfSlcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJMUyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCF3aW5kb3cubG9jYWxTdG9yYWdlIHx8ICF3aW5kb3cubG9jYWxTdG9yYWdlLnVzZXJzICYmICF3aW5kb3cubG9jYWxTdG9yYWdlLmxldHRlcnMpIGFsZXJ0KCfQlNCw0L3QvdGL0YUg0L3QtdGCISDQo9C00LDQu9GP0YLRjCDQvdC10YfQtdCz0L4hJyk7XHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS51c2VycyB8fCB3aW5kb3cubG9jYWxTdG9yYWdlLmxldHRlcnMpIHtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ3VzZXJzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5yZW1vdmVJdGVtKCdsZXR0ZXJzJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ9CU0LDQvdC90YvQtSDRg9GB0L/QtdGI0L3QviDRg9C00LDQu9C10L3RiyEnKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udHJvbGxlckFzOiAndXNlcicsXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUpIHtcclxuICAgICAgICAgICAgc2NvcGUuZiA9IDEwO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvYXV0aG9yaXphdGlvbi1tb2R1bGUvYXV0aG9yaXphdGlvbi1kaXJlY3RpdmUuanNcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxoMT7QktGF0L7QtDwvaDE+IDx0YWJsZT4gPHRyPiA8dGQ+0JvQvtCz0LjQvTo8L3RkPiA8dGQ+PGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5nLW1vZGVsPVxcXCJ1c2VyLmxvZ2luXFxcIiBuZy1rZXlwcmVzcz1cXFwidXNlci5lbnRlcigkZXZlbnQpXFxcIj48L3RkPiA8L3RyPiA8dHI+IDx0ZD7Qn9Cw0YDQvtC70Yw6PC90ZD4gPHRkPjxpbnB1dCB0eXBlPVxcXCJwYXNzd29yZFxcXCIgbmctbW9kZWw9XFxcInVzZXIucGFzc3dvcmRcXFwiIG5nLWtleXByZXNzPVxcXCJ1c2VyLmVudGVyKCRldmVudClcXFwiPjwvdGQ+IDwvdHI+IDwvdGFibGU+IDxkaXYgY2xhc3M9XFxcInNpZ25JblxcXCIgbmctY2xpY2s9XFxcInVzZXIuc2lnbkluKClcXFwiPtCS0L7QudGC0Lg8L2Rpdj4gPGRpdiBpZD1cXFwibm90ZVxcXCI+IDxzcGFuIGNsYXNzPVxcXCJ6XFxcIj7Qm9C+0LPQuNC9Ojwvc3Bhbj5cXG48c3Bhbj50ZXN0PC9zcGFuPlxcbjxzcGFuIGNsYXNzPVxcXCJ6XFxcIj7Qn9C+0YDQvtC70Yw6PC9zcGFuPlxcbjxzcGFuPjEyMzwvc3Bhbj4gPGRpdiBjbGFzcz1cXFwiY2xlYXJMU1xcXCIgbmctY2xpY2s9XFxcInVzZXIuY2xlYXJMUygpXFxcIj7QntGH0LjRgdGC0LjRgtGMIExvY2FsU3RvcmFnZTwvZGl2PiA8L2Rpdj5cIjtcbm5nTW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLGZ1bmN0aW9uKGMpe2MucHV0KFwiYXV0aG9yaXphdGlvbi5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9hdXRob3JpemF0aW9uLW1vZHVsZS90ZW1wbGF0ZS9hdXRob3JpemF0aW9uLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBtZW51ID0gYW5ndWxhci5tb2R1bGUoJ21lbnUnLCBbXSk7XHJcblxyXG5tZW51LmRpcmVjdGl2ZSgnbWFpbERpcmVjdG9yaWVzJywgcmVxdWlyZSgnLi9kaXJlY3Rvcmllcy1tZW51L2RpcmVjdG9yaWVzLW1lbnUtZGlyZWN0aXZlJykpO1xyXG5tZW51LmRpcmVjdGl2ZSgnbWVudScsIHJlcXVpcmUoJy4vbWVudS9tZW51LWRpcmVjdGl2ZScpKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbWVudTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvbWVudS1tb2R1bGUvaW5kZXguanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgZGlyVGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlL2RpcmVjdG9yaWVzLW1lbnUuaHRtbCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgdGVtcGxhdGU6IGRpclRlbXBsYXRlLFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uIChzdGF0ZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXQgPSBzdGF0ZVNlcnZpY2Uuc2V0QWN0aXZlU3RhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tDbGFzcyA9IHN0YXRlU2VydmljZS5jaGVja0RpckNsYXNzO1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udHJvbGxlckFzOiAnZGlyZWN0b3J5J1xyXG4gICAgfVxyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9tZW51LW1vZHVsZS9kaXJlY3Rvcmllcy1tZW51L2RpcmVjdG9yaWVzLW1lbnUtZGlyZWN0aXZlLmpzXG4gKiovIiwidmFyIGFuZ3VsYXI9d2luZG93LmFuZ3VsYXIsbmdNb2R1bGU7XG50cnkge25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFtcIm5nXCJdKX1cbmNhdGNoKGUpe25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFwibmdcIixbXSl9XG52YXIgdjE9XCI8ZGl2IGlkPVxcXCJtYWlsRGlyXFxcIj4gPGRpdiBpZD1cXFwiaW5ib3hcXFwiIG5nLWNsaWNrPVxcXCJkaXJlY3Rvcnkuc2V0KCdpbmJveCcpXFxcIiBuZy1jbGFzcz1cXFwiZGlyZWN0b3J5LmNoZWNrQ2xhc3MoJ2luYm94JylcXFwiPjxzcGFuPtCS0YXQvtC00Y/RidC40LU8L3NwYW4+PC9kaXY+IDxkaXYgaWQ9XFxcImNoXFxcIiBuZy1jbGljaz1cXFwiZGlyZWN0b3J5LnNldCgnZHJhZnRzJylcXFwiIG5nLWNsYXNzPVxcXCJkaXJlY3RvcnkuY2hlY2tDbGFzcygnZHJhZnRzJylcXFwiPjxzcGFuPtCn0LXRgNC90L7QstC40LrQuDwvc3Bhbj48L2Rpdj4gPGRpdiBpZD1cXFwic2VudFxcXCIgbmctY2xpY2s9XFxcImRpcmVjdG9yeS5zZXQoJ3NlbnQnKVxcXCIgbmctY2xhc3M9XFxcImRpcmVjdG9yeS5jaGVja0NsYXNzKCdzZW50JylcXFwiPjxzcGFuPtCe0YLQv9GA0LDQstC70LXQvdC90YvQtTwvc3Bhbj48L2Rpdj4gPGRpdiBpZD1cXFwiZmF2b3JpdGVzXFxcIiBuZy1jbGljaz1cXFwiZGlyZWN0b3J5LnNldCgnZmF2b3JpdGVzJylcXFwiIG5nLWNsYXNzPVxcXCJkaXJlY3RvcnkuY2hlY2tDbGFzcygnZmF2b3JpdGVzJylcXFwiPjxzcGFuPtCY0LfQsdGA0LDQvdC90L7QtTwvc3Bhbj48L2Rpdj4gPGRpdiBpZD1cXFwiY2FydFxcXCIgbmctY2xpY2s9XFxcImRpcmVjdG9yeS5zZXQoJ3RyYXNoJylcXFwiIG5nLWNsYXNzPVxcXCJkaXJlY3RvcnkuY2hlY2tDbGFzcygndHJhc2gnKVxcXCI+PHNwYW4+0JrQvtGA0LfQuNC90LA8L3NwYW4+PC9kaXY+IDwvZGl2PlwiO1xubmdNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsZnVuY3Rpb24oYyl7Yy5wdXQoXCJkaXJlY3Rvcmllcy1tZW51Lmh0bWxcIix2MSl9XSk7XG5tb2R1bGUuZXhwb3J0cz12MTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL21lbnUtbW9kdWxlL2RpcmVjdG9yaWVzLW1lbnUvdGVtcGxhdGUvZGlyZWN0b3JpZXMtbWVudS5odG1sXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IG1lbnVUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUvbWVudS5odG1sJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCRkb2N1bWVudCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHRlbXBsYXRlOiBtZW51VGVtcGxhdGUsXHJcbiAgICAgICAgc2NvcGU6IHt9LFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uIChzdGF0ZVNlcnZpY2UsIGxldHRlclNlcnZpY2UsICRzdGF0ZVBhcmFtcywgYXV0aG9yaXphdGlvblNlcnZpY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXREaXJlY3RvcnkgPSBzdGF0ZVNlcnZpY2Uuc2V0QWN0aXZlU3RhdGU7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFN0YXRlID0gc3RhdGVTZXJ2aWNlLmN1cnJlbnRTdGF0ZTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMuZ2V0UHJldmlld0RpciA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKCFsZXR0ZXJTZXJ2aWNlLnNlbGVjdGVkLmxldHRlcikgcmV0dXJuO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuICRzdGF0ZVBhcmFtcy5kaXJlY3Rvcnk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlbW92ZSA9IGxldHRlclNlcnZpY2UucmVtb3ZlTGV0dGVyO1xyXG4gICAgICAgICAgICB0aGlzLnJlY292ZXIgPSBsZXR0ZXJTZXJ2aWNlLnJlY292ZXJMZXR0ZXI7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZCA9IGxldHRlclNlcnZpY2UubW92ZU5ld0xldHRlcjtcclxuICAgICAgICAgICAgdGhpcy5lZGl0ID0gbGV0dGVyU2VydmljZS5lZGl0RHJhZnQ7XHJcbiAgICAgICAgICAgIHRoaXMubG9naW5PdXQgPSBhdXRob3JpemF0aW9uU2VydmljZS5sb2dpbk91dDtcclxuXHJcbiAgICAgICAgICAgIHRoaXMubmV3TGV0dGVyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBsZXR0ZXJTZXJ2aWNlLm5ld0xldHRlci5sZXR0ZXIgPSB7fTtcclxuICAgICAgICAgICAgICAgIHN0YXRlU2VydmljZS5zZXRBY3RpdmVTdGF0ZSgnbmV3TGV0dGVyRm9ybScpO1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5yZXBsYXkgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldHRlclNlcnZpY2UubmV3TGV0dGVyLmxldHRlci50byA9IGxldHRlclNlcnZpY2Uuc2VsZWN0ZWQubGV0dGVyLnNlbmRlcjtcclxuICAgICAgICAgICAgICAgIHN0YXRlU2VydmljZS5zZXRBY3RpdmVTdGF0ZSgnbmV3TGV0dGVyRm9ybScpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udHJvbGxlckFzOiAnbWVudScsXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUpIHtcclxuICAgICAgICAgICAgc2NvcGUuc2hvd01lbnUgPSBmYWxzZTtcclxuICAgICAgICAgICAgJGRvY3VtZW50Lm9uKCdjbGljaycsIGZ1bmN0aW9uKGUpIHtcclxuICAgICAgICAgICAgICAgIGlmIChlLnRhcmdldC5pZCA9PT0gJ3NldHRpbmdzQnV0dG9uJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLnNob3dNZW51ID0gIXNjb3BlLnNob3dNZW51O1xyXG4gICAgICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC50b2dnbGUoJ2FjdGl2ZVNldHRpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgICAgICB9IGVsc2UgaWYgKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXR0aW5nc0J1dHRvbicpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuc2hvd01lbnUgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgICAgICBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnc2V0dGluZ3NCdXR0b24nKS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmVTZXR0aW5nJyk7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuJGRpZ2VzdCgpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9tZW51LW1vZHVsZS9tZW51L21lbnUtZGlyZWN0aXZlLmpzXG4gKiovIiwidmFyIGFuZ3VsYXI9d2luZG93LmFuZ3VsYXIsbmdNb2R1bGU7XG50cnkge25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFtcIm5nXCJdKX1cbmNhdGNoKGUpe25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFwibmdcIixbXSl9XG52YXIgdjE9XCI8ZGl2PiA8ZGl2IGlkPVxcXCJ1c2VyXFxcIj7QnNC+0Y9f0J/QvtGH0YLQsEDQs9C00LUt0YLQvi7RgtCw0Lw8L2Rpdj4gPGRpdiBjbGFzcz1cXFwidXNlclNldHRpbmdzXFxcIj4gPGRpdiBpZD1cXFwibG9naW5PdXRcXFwiIG5nLWNsaWNrPVxcXCJtZW51LmxvZ2luT3V0KClcXFwiPtCS0YvQudGC0Lg8L2Rpdj4gPGRpdiBpZD1cXFwic2V0dGluZ3NCdXR0b25cXFwiPjwvZGl2PiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwic2V0dGluZ3NNZW51XFxcIiBuZy1zaG93PVxcXCJzaG93TWVudVxcXCI+IDx1bD4gPGxpIG5nLWNsaWNrPVxcXCJtZW51LnNldERpcmVjdG9yeSgnY29udGFjdHMnKVxcXCI+0JrQvtC90YLQsNC60YLRizwvbGk+IDwvdWw+IDwvZGl2PiA8ZGl2IGlkPVxcXCJuZXdMZXR0ZXJcXFwiIG5nLWNsaWNrPVxcXCJtZW51Lm5ld0xldHRlcigpXFxcIj7QndCw0L/QuNGB0LDRgtGMINC/0LjRgdGM0LzQvjwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJuZXdMZXR0ZXJNZW51XFxcIiBuZy1zaG93PVxcXCJtZW51LmN1cnJlbnRTdGF0ZSgpID09PSAnbmV3TGV0dGVyRm9ybSdcXFwiPiA8ZGl2IGlkPVxcXCJzZW5kXFxcIiBuZy1jbGljaz1cXFwibWVudS5zZW5kKCdzZW50JylcXFwiPtCe0YLQv9GA0LDQstC40YLRjDwvZGl2PiA8ZGl2IGlkPVxcXCJzYXZlXFxcIiBuZy1jbGljaz1cXFwibWVudS5zZW5kKCdkcmFmdHMnKVxcXCI+0KHQvtGF0YDQsNC90LjRgtGMINGH0LXRgNC90L7QstC40Lo8L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9XFxcInByZXZpZXdMZXR0ZXJNZW51XFxcIiBuZy1zaG93PVxcXCJtZW51LmN1cnJlbnRTdGF0ZSgpID09PSAncHJldmlldydcXFwiPiA8ZGl2IGlkPVxcXCJyZXBseVxcXCIgbmctc2hvdz1cXFwibWVudS5nZXRQcmV2aWV3RGlyKCkgPT09ICdpbmJveCdcXFwiIG5nLWNsaWNrPVxcXCJtZW51LnJlcGxheSgpXFxcIj7QntGC0LLQtdGC0LjRgtGMPC9kaXY+IDxkaXYgaWQ9XFxcInJlY292ZXJcXFwiIG5nLXNob3c9XFxcIm1lbnUuZ2V0UHJldmlld0RpcigpID09PSAndHJhc2gnXFxcIiBuZy1jbGljaz1cXFwibWVudS5yZWNvdmVyKClcXFwiPtCS0L7RgdGB0YLQsNC90L7QstC40YLRjDwvZGl2PiA8ZGl2IGlkPVxcXCJlZGl0XFxcIiBuZy1zaG93PVxcXCJtZW51LmdldFByZXZpZXdEaXIoKSA9PT0gJ2RyYWZ0cydcXFwiIG5nLWNsaWNrPVxcXCJtZW51LmVkaXQoKVxcXCI+0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0Ywg0YfQtdGA0L3QvtCy0LjQujwvZGl2PiA8ZGl2IGlkPVxcXCJkZWxldGVcXFwiIG5nLWNsaWNrPVxcXCJtZW51LnJlbW92ZSgpXFxcIj7Qo9C00LDQu9C40YLRjDwvZGl2PiA8L2Rpdj4gPC9kaXY+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcIm1lbnUuaHRtbFwiLHYxKX1dKTtcbm1vZHVsZS5leHBvcnRzPXYxO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvbWVudS1tb2R1bGUvbWVudS90ZW1wbGF0ZS9tZW51Lmh0bWxcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBtYWluVmlldyA9IGFuZ3VsYXIubW9kdWxlKCdtYWluLXZpZXcnLCBbXSk7XHJcblxyXG5tYWluVmlldy5kaXJlY3RpdmUoJ21haW5Db250YWluZXInLCByZXF1aXJlKCcuL21haW4tY29udGFpbmVyLWRpcmVjdGl2ZS9tYWluLWNvbnRhaW5lci1kaXJlY3RpdmUnKSk7XHJcbm1haW5WaWV3LmRpcmVjdGl2ZSgnY29udGFjdHMnLCByZXF1aXJlKCcuL2NvbnRhY3RzLWRpcmVjdGl2ZS9jb250YWN0c0RpcmVjdGl2ZScpKTtcclxubWFpblZpZXcuZGlyZWN0aXZlKCdsZXR0ZXInLCByZXF1aXJlKCcuL2xldHRlci1kaXJlY3RpdmUvbGV0dGVyLWRpcmVjdGl2ZScpKTtcclxubWFpblZpZXcuZGlyZWN0aXZlKCdsb2FkaW5nJywgcmVxdWlyZSgnLi9sb2FkaW5nLWRpcmVjdGl2ZS9sb2FkaW5nLWRpcmVjdGl2ZScpKTtcclxubWFpblZpZXcuZGlyZWN0aXZlKCdwcmV2aWV3JywgcmVxdWlyZSgnLi9wcmV2aWV3LWRpcmVjdGl2ZS9wcmV2aWV3LWRpcmVjdGl2ZScpKTtcclxubWFpblZpZXcuZGlyZWN0aXZlKCd1c2VyJywgcmVxdWlyZSgnLi91c2VyLWRpcmVjdGl2ZS91c2VyLWRpcmVjdGl2ZScpKTtcclxubWFpblZpZXcuZGlyZWN0aXZlKCdpbmJveExldHRlcnMnLCByZXF1aXJlKCcuL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy9pbmJveC1kaXJlY3RpdmUnKSk7XHJcbm1haW5WaWV3LmRpcmVjdGl2ZSgnc2VudExldHRlcnMnLCByZXF1aXJlKCcuL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy9zZW50LWRpcmVjdGl2ZScpKTtcclxubWFpblZpZXcuZGlyZWN0aXZlKCdjYXJ0TGV0dGVycycsIHJlcXVpcmUoJy4vbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL3RyYXNoLWRpcmVjdGl2ZScpKTtcclxubWFpblZpZXcuZGlyZWN0aXZlKCduZXdMZXR0ZXInLCByZXF1aXJlKCcuL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy9uZXdMZXR0ZXItZGlyZWN0aXZlJykpO1xyXG5tYWluVmlldy5kaXJlY3RpdmUoJ2RyYWZ0cycsIHJlcXVpcmUoJy4vbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL2RyYWZ0cy1kaXJlY3RpdmUnKSk7XHJcbm1haW5WaWV3LmRpcmVjdGl2ZSgnZmF2b3JpdGVzJywgcmVxdWlyZSgnLi9sZXR0ZXJzLWRpcmVjdG9yaWVzLWRpcmVjdGl2ZXMvZmF2b3JpdGVzLWRpcmVjdGl2ZScpKTtcclxubWFpblZpZXcuZGlyZWN0aXZlKCdmaWx0ZXJlZExldHRlcnMnLCByZXF1aXJlKCcuL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy9maWx0ZXJlZC1kaXJlY3RpdmUnKSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtYWluVmlldztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9pbmRleC5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OidBRScsXHJcbiAgICAgICAgc2NvcGU6IHRydWUsXHJcbiAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24obGV0dGVyU2VydmljZSwgZGF0YVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5iYXNlID0gZGF0YVNlcnZpY2UuYmFzZTtcclxuICAgICAgICAgICAgdGhpcy5zZWxlY3RlZCA9IGxldHRlclNlcnZpY2Uuc2VsZWN0ZWQ7XHJcbiAgICAgICAgICAgIHRoaXMubmV3TGV0dGVyID0gbGV0dGVyU2VydmljZS5uZXdMZXR0ZXI7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb250cm9sbGVyQXM6ICdkaXJlY3RvcnknXHJcbiAgICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL21haW4tdmlldy1tb2R1bGUvbWFpbi1jb250YWluZXItZGlyZWN0aXZlL21haW4tY29udGFpbmVyLWRpcmVjdGl2ZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBjb250YWN0c1RlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS9jb250YWN0cy5odG1sJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKGxldHRlclNlcnZpY2UsIHN0YXRlU2VydmljZSwgZGF0YVNlcnZpY2UpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICB0ZW1wbGF0ZTogY29udGFjdHNUZW1wbGF0ZSxcclxuICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICB1c2VyczogJz0nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSkge1xyXG4gICAgICAgICAgICBzY29wZS5uZXdVc2VyID0ge307XHJcbiAgICAgICAgICAgIHNjb3BlLmFkZENvbnRhY3QgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLnVzZXJzLnB1c2goc2NvcGUubmV3VXNlcik7XHJcbiAgICAgICAgICAgICAgICBzY29wZS5uZXdVc2VyID0ge307XHJcbiAgICAgICAgICAgICAgICBkYXRhU2VydmljZS5zYXZlVXNlclRvU3RvcmFnZSgpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzY29wZS5yZW1vdmVDb250YWN0ID0gZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICAgICAgICAgIHNjb3BlLnVzZXJzLnNwbGljZShpZCwgMSk7XHJcbiAgICAgICAgICAgICAgICBkYXRhU2VydmljZS5zYXZlVXNlclRvU3RvcmFnZSgpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICBzY29wZS5tYWlsVG8gPSBmdW5jdGlvbihtYWlsKSB7XHJcbiAgICAgICAgICAgICAgICBsZXR0ZXJTZXJ2aWNlLm5ld0xldHRlci5sZXR0ZXIgPSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdG86IG1haWxcclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgICAgICBzdGF0ZVNlcnZpY2Uuc2V0QWN0aXZlU3RhdGUoJ25ld0xldHRlckZvcm0nKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9tYWluLXZpZXctbW9kdWxlL2NvbnRhY3RzLWRpcmVjdGl2ZS9jb250YWN0c0RpcmVjdGl2ZS5qc1xuICoqLyIsInZhciBhbmd1bGFyPXdpbmRvdy5hbmd1bGFyLG5nTW9kdWxlO1xudHJ5IHtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShbXCJuZ1wiXSl9XG5jYXRjaChlKXtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShcIm5nXCIsW10pfVxudmFyIHYxPVwiPGRpdiBjbGFzcz1cXFwidGl0dGxlXFxcIj4gPGgyPtCa0L7QvdGC0LDQutGC0Ys8L2gyPiA8ZGl2IGNsYXNzPVxcXCJsaW5lXFxcIj48L2Rpdj4gPC9kaXY+IDx1c2VyIG5nLXJlcGVhdD1cXFwidXNlciBpbiB1c2Vyc1xcXCI+PC91c2VyPiA8ZGl2IGNsYXNzPVxcXCJuZXdVc2VyXFxcIj4gPGRpdiBjbGFzcz1cXFwibmV3VXNlclRpdHRsZVxcXCI+0JTQvtCx0LDQstC40YLRjCDQutC+0L3RgtCw0LrRgjo8L2Rpdj4gPHRhYmxlIGNsYXNzPVxcXCJpbmZvXFxcIj4gPHRyPiA8dGQgY2xhc3M9XFxcImtleXNcXFwiPtCY0LzRjzo8L3RkPiA8dGQ+IDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwibmV3VXNlci5uYW1lXFxcIj4gPC90ZD4gPC90cj4gPHRyPiA8dGQgY2xhc3M9XFxcImtleXNcXFwiPtCU0LDRgtCwINGA0L7QttC00LXQvdC40Y86PC90ZD4gPHRkPiA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcIm5ld1VzZXIuYmlydGhEYXRlXFxcIj4gPC90ZD4gPC90cj4gPHRyPiA8dGQgY2xhc3M9XFxcImtleXNcXFwiPtCf0L7Quzo8L3RkPiA8dGQ+IDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwibmV3VXNlci5nZW5kZXJcXFwiPiA8L3RkPiA8L3RyPiA8dHI+IDx0ZCBjbGFzcz1cXFwia2V5c1xcXCI+0JDQtNGA0LXRgTo8L3RkPiA8dGQ+IDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwibmV3VXNlci5hZGRyZXNzXFxcIj4gPC90ZD4gPC90cj4gPHRyPiA8dGQgY2xhc3M9XFxcImtleXNcXFwiPkVtYWlsOjwvdGQ+IDx0ZD4gPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5nLW1vZGVsPVxcXCJuZXdVc2VyLmVtYWlsXFxcIj4gPC90ZD4gPC90cj4gPHRyPiA8dGQgY2xhc3M9XFxcImtleXNcXFwiPkF2YXRhclVybDo8L3RkPiA8dGQ+IDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwibmV3VXNlci5hdmF0YXJcXFwiPiA8L3RkPiA8L3RyPiA8L3RhYmxlPiA8ZGl2IGNsYXNzPVxcXCJhZGRDb250YWN0XFxcIiBuZy1jbGljaz1cXFwiYWRkQ29udGFjdCgpXFxcIj7QlNC+0LHQsNCy0LjRgtGMPC9kaXY+IDwvZGl2PlwiO1xubmdNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsZnVuY3Rpb24oYyl7Yy5wdXQoXCJjb250YWN0cy5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL2NvbnRhY3RzLWRpcmVjdGl2ZS90ZW1wbGF0ZS9jb250YWN0cy5odG1sXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBsZXR0ZXJUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUvbGV0dGVyLmh0bWwnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGV0dGVyU2VydmljZSwgc3RhdGVTZXJ2aWNlLCBkYXRhU2VydmljZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHRlbXBsYXRlOiBsZXR0ZXJUZW1wbGF0ZSxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSkge1xyXG5cclxuICAgICAgICAgICAgc2NvcGUucmVtb3ZlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgbGV0dGVyU2VydmljZS5yZW1vdmVMZXR0ZXIoc2NvcGUubGV0dGVyKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc2NvcGUucHJldmlldyA9IGZ1bmN0aW9uKHNjb3BlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlyZWN0b3J5ID0gc2NvcGUuZGlyZWN0b3J5O1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdG9yeSA9PT0gJ2ZpbHRlcmVkJykgZGlyZWN0b3J5ID0gJ2luYm94JztcclxuICAgICAgICAgICAgICAgIGlmIChkaXJlY3RvcnkgPT09ICdmYXZvcml0ZXMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0b3J5ID0gc2NvcGUubGV0dGVyLmRpcmVjdG9yeTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IChkYXRhU2VydmljZS5iYXNlLmxldHRlcnNbZGlyZWN0b3J5XS5pbmRleE9mKHNjb3BlLmxldHRlcikpICsgJ18nICsgZGlyZWN0b3J5O1xyXG4gICAgICAgICAgICAgICAgc3RhdGVTZXJ2aWNlLnNldEFjdGl2ZVN0YXRlKCdwcmV2aWV3Jyx7ZGlyOiBzY29wZS5kaXJlY3RvcnksIGluZGV4OiBpbmRleH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNjb3BlLmxldHRlci51bnJlYWQpIHNjb3BlLmxldHRlci51bnJlYWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGRhdGFTZXJ2aWNlLnNhdmVMZXR0ZXJzVG9TdG9yYWdlKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzY29wZS50b2dnbGVGYXZvcml0ZSA9IGZ1bmN0aW9uKGxldHRlciwgZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmKGV2ZW50KSBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGxldHRlclNlcnZpY2UudG9nZ2xlRmF2b3JpdGUobGV0dGVyKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHNjb3BlLmNoZWNrVW5yZWFkQ2xhc3MgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzY29wZS5sZXR0ZXIudW5yZWFkID8gJ3VucmVhZCcgOiAnJ1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc2NvcGUuY2hlY2tGYXZvcml0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjb3BlLmxldHRlci5mYXZvcml0ZSA/ICdhY3RpdmVGYXZvcml0ZScgOiAnJ1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVyLWRpcmVjdGl2ZS9sZXR0ZXItZGlyZWN0aXZlLmpzXG4gKiovIiwidmFyIGFuZ3VsYXI9d2luZG93LmFuZ3VsYXIsbmdNb2R1bGU7XG50cnkge25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFtcIm5nXCJdKX1cbmNhdGNoKGUpe25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFwibmdcIixbXSl9XG52YXIgdjE9XCI8ZGl2IGNsYXNzPVxcXCJtYWlsXFxcIj4gPGRpdiBjbGFzcz1cXFwibWFpbEhlYWRlclxcXCIgbmctY2xhc3M9XFxcImNoZWNrVW5yZWFkQ2xhc3MoKVxcXCI+IDxkaXYgY2xhc3M9XFxcIm1haWxEYXRlXFxcIj57eyBsZXR0ZXIuZGF0ZSB8IGRhdGU6ICdFRUUsIGRkIE1NTU0geXl5eSAtIEhIOm1tJ319PC9kaXY+IDxkaXYgY2xhc3M9XFxcInNlbmRlck5hbWVcXFwiPnt7IGxldHRlci5zZW5kZXIgfX08L2Rpdj4gPGRpdiBjbGFzcz1cXFwibWFpbFRpdGxlXFxcIj57eyBsZXR0ZXIudGl0dGxlIH19PC9kaXY+IDwvZGl2PiA8cCBjbGFzcz1cXFwibWFpbENvbnRlbnRcXFwiPiB7eyBsZXR0ZXIuY29udGVudCB8IHNob3J0X2NvbnRlbnQgfX0gPC9wPiA8ZGl2IGNsYXNzPVxcXCJyZW1vdmVcXFwiIG5nLWNsaWNrPVxcXCJyZW1vdmUoJGV2ZW50KVxcXCI+PC9kaXY+IDxkaXYgY2xhc3M9XFxcImFkZFRvRmF2b3JpdGVcXFwiIG5nLWNsaWNrPVxcXCJ0b2dnbGVGYXZvcml0ZShsZXR0ZXIsICRldmVudClcXFwiIG5nLWNsYXNzPVxcXCJjaGVja0Zhdm9yaXRlKClcXFwiPjwvZGl2PiA8L2Rpdj5cIjtcbm5nTW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLGZ1bmN0aW9uKGMpe2MucHV0KFwibGV0dGVyLmh0bWxcIix2MSl9XSk7XG5tb2R1bGUuZXhwb3J0cz12MTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVyLWRpcmVjdGl2ZS90ZW1wbGF0ZS9sZXR0ZXIuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgbG9hZGluZ1RlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS9sb2FkaW5nLmh0bWwnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oYW5pbWF0aW9uU2VydmljZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHRlbXBsYXRlOiBsb2FkaW5nVGVtcGxhdGUsXHJcblxyXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKGluaXRpYWxpemF0aW9uU2VydmljZSwgJHN0YXRlKSB7XHJcbiAgICAgICAgICAgIGlmICghaW5pdGlhbGl6YXRpb25TZXJ2aWNlLmdldEluaXQoKSkgJHN0YXRlLmdvKCdtYWlsLmluYm94Jyk7XHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCkge1xyXG4gICAgICAgICAgICBhbmltYXRpb25TZXJ2aWNlLmxvYWRpbmcoZWxlbWVudC5jaGlsZHJlbigpWzBdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL21haW4tdmlldy1tb2R1bGUvbG9hZGluZy1kaXJlY3RpdmUvbG9hZGluZy1kaXJlY3RpdmUuanNcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxkaXY+TG9hZGluZyBsZXR0ZXJzPC9kaXY+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcImxvYWRpbmcuaHRtbFwiLHYxKX1dKTtcbm1vZHVsZS5leHBvcnRzPXYxO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9sb2FkaW5nLWRpcmVjdGl2ZS90ZW1wbGF0ZS9sb2FkaW5nLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IHByZXZpZXdUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUvcHJldmlldy5odG1sJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHRlbXBsYXRlOiBwcmV2aWV3VGVtcGxhdGUsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgc2VsZWN0ZWQ6ICc9J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHN0YXRlUGFyYW1zLCBsZXR0ZXJTZXJ2aWNlLCBzdGF0ZVNlcnZpY2UsIGRhdGFTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHZhciBkaXJlY3RvcnkgPSAkc3RhdGVQYXJhbXMuZGlyZWN0b3J5LFxyXG4gICAgICAgICAgICAgICAgaW5kZXggPSAkc3RhdGVQYXJhbXMuaW5kZXguc2xpY2UoMCwgMSk7XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3RvcnkgPT09ICdmaWx0ZXJlZCcpIGRpcmVjdG9yeSA9ICdpbmJveCc7XHJcbiAgICAgICAgICAgIGlmIChkaXJlY3RvcnkgPT09ICdmYXZvcml0ZXMnKSB7XHJcbiAgICAgICAgICAgICAgICBkaXJlY3RvcnkgPSAkc3RhdGVQYXJhbXMuaW5kZXguc2xpY2UoMik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbGV0dGVyU2VydmljZS5zZWxlY3RlZC5sZXR0ZXIgPSBkYXRhU2VydmljZS5iYXNlLmxldHRlcnNbZGlyZWN0b3J5XVtpbmRleF07XHJcblxyXG4gICAgICAgICAgICB0aGlzLmJhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHN0YXRlU2VydmljZS5zZXRBY3RpdmVTdGF0ZSgkc3RhdGVQYXJhbXMuZGlyZWN0b3J5KVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb250cm9sbGVyQXM6ICdwcmV2aWV3J1xyXG4gICAgfVxyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9tYWluLXZpZXctbW9kdWxlL3ByZXZpZXctZGlyZWN0aXZlL3ByZXZpZXctZGlyZWN0aXZlLmpzXG4gKiovIiwidmFyIGFuZ3VsYXI9d2luZG93LmFuZ3VsYXIsbmdNb2R1bGU7XG50cnkge25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFtcIm5nXCJdKX1cbmNhdGNoKGUpe25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFwibmdcIixbXSl9XG52YXIgdjE9XCI8ZGl2IGNsYXNzPVxcXCJoZWFkZXIgZ3JvdXBcXFwiPiA8ZGl2IGNsYXNzPVxcXCJiYWNrXFxcIiBuZy1jbGljaz1cXFwicHJldmlldy5iYWNrKClcXFwiPiYjODU5MiA8ZGl2IGNsYXNzPVxcXCJiYWNrVGV4dFxcXCI+0J3QsNC30LDQtDwvZGl2PjwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJmcm9tXFxcIj7QntGCINC60L7Qs9C+OiA8c3Bhbj57eyBzZWxlY3RlZC5sZXR0ZXIuc2VuZGVyIH19PC9zcGFuPjwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJkYXRlXFxcIj7QlNCw0YLQsDogPHNwYW4+e3sgc2VsZWN0ZWQubGV0dGVyLmRhdGUgfCBkYXRlOiAnRUVFLCBkZCBNTU1NIHl5eXkgLSBISDptbScgfX08L3NwYW4+PC9kaXY+IDxkaXYgY2xhc3M9XFxcInRvXFxcIj7QmtC+0LzRgzogPHNwYW4+e3sgc2VsZWN0ZWQubGV0dGVyLnRvIH19PC9zcGFuPjwvZGl2PiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwidGl0bGVcXFwiPnt7IHNlbGVjdGVkLmxldHRlci50aXR0bGUgfX08L2Rpdj4gPHAgY2xhc3M9XFxcImNvbnRlbnRcXFwiPnt7IHNlbGVjdGVkLmxldHRlci5jb250ZW50IH19PC9wPlwiO1xubmdNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsZnVuY3Rpb24oYyl7Yy5wdXQoXCJwcmV2aWV3Lmh0bWxcIix2MSl9XSk7XG5tb2R1bGUuZXhwb3J0cz12MTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvcHJldmlldy1kaXJlY3RpdmUvdGVtcGxhdGUvcHJldmlldy5odG1sXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCB1c2VyVGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlL3VzZXIuaHRtbCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsZXR0ZXJTZXJ2aWNlLCBzdGF0ZVNlcnZpY2UsIGRhdGFTZXJ2aWNlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgdGVtcGxhdGU6IHVzZXJUZW1wbGF0ZSxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSkge1xyXG4gICAgICAgICAgICBzY29wZS5lZGl0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzY29wZS50b2dnbGVNb2RlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS5lZGl0TW9kZSA9ICFzY29wZS5lZGl0TW9kZTtcclxuICAgICAgICAgICAgICAgIGRhdGFTZXJ2aWNlLnNhdmVVc2VyVG9TdG9yYWdlKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzY29wZS5zZWxlY3RVc2VyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNjb3BlLnVzZXIuZW1haWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgn0KMg0LTQsNC90L3QvtCz0L4g0LrQvtC90YLQsNC60YLQsCDQvdC10YIgRW1haWwhISEnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0dGVyU2VydmljZS5zZWxlY3RlZC51c2VyID0gc2NvcGUudXNlci5uYW1lO1xyXG4gICAgICAgICAgICAgICAgc3RhdGVTZXJ2aWNlLnNldEFjdGl2ZVN0YXRlKCdmaWx0ZXJlZCcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL21haW4tdmlldy1tb2R1bGUvdXNlci1kaXJlY3RpdmUvdXNlci1kaXJlY3RpdmUuanNcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxkaXYgY2xhc3M9XFxcImNvbnRhY3QgZ3JvdXBcXFwiPiA8ZGl2IGNsYXNzPVxcXCJhdmF0YXJcXFwiPiA8aW1nIG5nLXNyYz1cXFwie3sgdXNlci5hdmF0YXIgfHwgJ2ltZy9kZWZhdWx0QXZhdGFyLnBuZycgfX1cXFwiPiA8L2Rpdj4gPHRhYmxlIGNsYXNzPVxcXCJpbmZvXFxcIj4gPHRyPiA8dGQgY2xhc3M9XFxcImtleXNcXFwiPtCY0LzRjzo8L3RkPiA8dGQ+IDxkaXYgbmctc2hvdz1cXFwiIWVkaXRNb2RlXFxcIj57eyB1c2VyLm5hbWUgfX08L2Rpdj4gPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5nLW1vZGVsPVxcXCJ1c2VyLm5hbWVcXFwiIG5nLXNob3c9XFxcImVkaXRNb2RlXFxcIj48L3RkPiA8L3RyPiA8dHI+IDx0ZCBjbGFzcz1cXFwia2V5c1xcXCI+0JTQsNGC0LAg0YDQvtC20LTQtdC90LjRjzo8L3RkPiA8dGQ+IDxkaXYgbmctc2hvdz1cXFwiIWVkaXRNb2RlXFxcIj57eyB1c2VyLmJpcnRoRGF0ZSB9fTwvZGl2PiA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcInVzZXIuYmlydGhEYXRlXFxcIiBuZy1zaG93PVxcXCJlZGl0TW9kZVxcXCI+PC90ZD4gPC90cj4gPHRyPiA8dGQgY2xhc3M9XFxcImtleXNcXFwiPtCf0L7Quzo8L3RkPiA8dGQ+IDxkaXYgbmctc2hvdz1cXFwiIWVkaXRNb2RlXFxcIj57eyB1c2VyLmdlbmRlciB9fTwvZGl2PiA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcInVzZXIuZ2VuZGVyXFxcIiBuZy1zaG93PVxcXCJlZGl0TW9kZVxcXCI+PC90ZD4gPC90cj4gPHRyPiA8dGQgY2xhc3M9XFxcImtleXNcXFwiPtCQ0LTRgNC10YE6PC90ZD4gPHRkPiA8ZGl2IG5nLXNob3c9XFxcIiFlZGl0TW9kZVxcXCI+e3sgdXNlci5hZGRyZXNzIH19PC9kaXY+IDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwidXNlci5hZGRyZXNzXFxcIiBuZy1zaG93PVxcXCJlZGl0TW9kZVxcXCI+PC90ZD4gPC90cj4gPHRyPiA8dGQgY2xhc3M9XFxcImtleXNcXFwiPkVtYWlsOjwvdGQ+IDx0ZD4gPGRpdiBjbGFzcz1cXFwiY29udGFjdEVtYWlsXFxcIiBuZy1jbGljaz1cXFwibWFpbFRvKHVzZXIuZW1haWwpXFxcIiBuZy1zaG93PVxcXCIhZWRpdE1vZGVcXFwiPnt7IHVzZXIuZW1haWwgfX08L2Rpdj4gPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5nLW1vZGVsPVxcXCJ1c2VyLmVtYWlsXFxcIiBuZy1zaG93PVxcXCJlZGl0TW9kZVxcXCI+PC90ZD4gPC90cj4gPC90YWJsZT4gPGRpdiBjbGFzcz1cXFwiZWRpdFxcXCIgbmctY2xpY2s9XFxcInRvZ2dsZU1vZGUoKVxcXCIgbmctc2hvdz1cXFwiIWVkaXRNb2RlXFxcIj7QoNC10LTQsNC60YLQuNGA0L7QstCw0YLRjDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJzYXZlXFxcIiBuZy1jbGljaz1cXFwidG9nZ2xlTW9kZSgpXFxcIiBuZy1zaG93PVxcXCJlZGl0TW9kZVxcXCI+0KHQvtGF0YDQsNC90LjRgtGMPC9kaXY+IDxkaXYgY2xhc3M9XFxcInJlbW92ZUNvbnRhY3RcXFwiIG5nLWNsaWNrPVxcXCJyZW1vdmVDb250YWN0KCRpbmRleClcXFwiPtCj0LTQsNC70LjRgtGMPC9kaXY+IDxkaXYgY2xhc3M9XFxcInNlbGVjdFVzZXJcXFwiIG5nLWNsaWNrPVxcXCJzZWxlY3RVc2VyKClcXFwiPtCf0L7QutCw0LfQsNGC0Ywg0L/QuNGB0YzQvNCwINGN0YLQvtCz0L4g0LrQvtC90YLQsNC60YLQsDwvZGl2PiA8L2Rpdj5cIjtcbm5nTW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLGZ1bmN0aW9uKGMpe2MucHV0KFwidXNlci5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL3VzZXItZGlyZWN0aXZlL3RlbXBsYXRlL3VzZXIuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDIxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgaW5ib3hUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2luYm94TGV0dGVycy5odG1sJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHRlbXBsYXRlOiBpbmJveFRlbXBsYXRlLFxyXG4gICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgIGxldHRlcnM6ICc9J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUpIHtcclxuICAgICAgICAgICAgc2NvcGUuZGlyZWN0b3J5ID0gJ2luYm94JztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL2luYm94LWRpcmVjdGl2ZS5qc1xuICoqLyIsInZhciBhbmd1bGFyPXdpbmRvdy5hbmd1bGFyLG5nTW9kdWxlO1xudHJ5IHtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShbXCJuZ1wiXSl9XG5jYXRjaChlKXtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShcIm5nXCIsW10pfVxudmFyIHYxPVwiPGxldHRlciBuZy1yZXBlYXQ9XFxcImxldHRlciBpbiBsZXR0ZXJzIHwgb3JkZXJCeTogJ2RhdGUnOiB0cnVlXFxcIiBuZy1jbGljaz1cXFwicHJldmlldyh0aGlzKVxcXCI+PC9sZXR0ZXI+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcImluYm94TGV0dGVycy5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy90ZW1wbGF0ZXMvaW5ib3hMZXR0ZXJzLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IHNlbnRUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL3NlbnRMZXR0ZXJzLmh0bWwnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgdGVtcGxhdGU6IHNlbnRUZW1wbGF0ZSxcclxuICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICBsZXR0ZXJzOiAnPSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlKSB7XHJcbiAgICAgICAgICAgIHNjb3BlLmRpcmVjdG9yeSA9ICdzZW50J1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9sZXR0ZXJzLWRpcmVjdG9yaWVzLWRpcmVjdGl2ZXMvc2VudC1kaXJlY3RpdmUuanNcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxsZXR0ZXIgbmctcmVwZWF0PVxcXCJsZXR0ZXIgaW4gbGV0dGVycyB8IG9yZGVyQnk6ICdkYXRlJzogdHJ1ZVxcXCIgbmctY2xpY2s9XFxcInByZXZpZXcodGhpcylcXFwiPjwvbGV0dGVyPlwiO1xubmdNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsZnVuY3Rpb24oYyl7Yy5wdXQoXCJzZW50TGV0dGVycy5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy90ZW1wbGF0ZXMvc2VudExldHRlcnMuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgdHJhc2hUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2NhcnRMZXR0ZXJzLmh0bWwnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgdGVtcGxhdGU6IHRyYXNoVGVtcGxhdGUsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgbGV0dGVyczogJz0nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSkge1xyXG4gICAgICAgICAgICBzY29wZS5kaXJlY3RvcnkgPSAndHJhc2gnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9tYWluLXZpZXctbW9kdWxlL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy90cmFzaC1kaXJlY3RpdmUuanNcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxsZXR0ZXIgbmctcmVwZWF0PVxcXCJsZXR0ZXIgaW4gbGV0dGVycyB8IG9yZGVyQnk6ICdkYXRlJzogdHJ1ZVxcXCIgbmctY2xpY2s9XFxcInByZXZpZXcodGhpcylcXFwiPjwvbGV0dGVyPlwiO1xubmdNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsZnVuY3Rpb24oYyl7Yy5wdXQoXCJjYXJ0TGV0dGVycy5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy90ZW1wbGF0ZXMvY2FydExldHRlcnMuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDI3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgbmV3TGV0dGVyVGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy9uZXdMZXR0ZXIuaHRtbCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICB0ZW1wbGF0ZTogbmV3TGV0dGVyVGVtcGxhdGUsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgbmV3OiAnPSdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL25ld0xldHRlci1kaXJlY3RpdmUuanNcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxkaXYgY2xhc3M9XFxcIm5ld0xldHRlckZvcm1cXFwiPiA8Zm9ybSBuYW1lPVxcXCJuZXdMZXR0ZXJcXFwiPiA8ZGl2IGNsYXNzPVxcXCJhZGRyZXNzZWVcXFwiPiA8bGFiZWw+PGRpdj5Ubzo8L2Rpdj48aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcIm5ldy5sZXR0ZXIudG9cXFwiPjwvbGFiZWw+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJ0aXRsZVxcXCI+IDxsYWJlbD48ZGl2PlRpdGxlOjwvZGl2PjxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwibmV3LmxldHRlci50aXR0bGVcXFwiPjwvbGFiZWw+IDwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJockxpbmVcXFwiPjwvZGl2PiA8dGV4dGFyZWEgbmctbW9kZWw9XFxcIm5ldy5sZXR0ZXIuY29udGVudFxcXCI+PC90ZXh0YXJlYT4gPC9mb3JtPiA8L2Rpdj5cIjtcbm5nTW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLGZ1bmN0aW9uKGMpe2MucHV0KFwibmV3TGV0dGVyLmh0bWxcIix2MSl9XSk7XG5tb2R1bGUuZXhwb3J0cz12MTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL3RlbXBsYXRlcy9uZXdMZXR0ZXIuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDI5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgZHJhZnRzVGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy9kcmFmdHMuaHRtbCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICB0ZW1wbGF0ZTogZHJhZnRzVGVtcGxhdGUsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgbGV0dGVyczogJz0nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSkge1xyXG4gICAgICAgICAgICBzY29wZS5kaXJlY3RvcnkgPSAnZHJhZnRzJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9sZXR0ZXJzLWRpcmVjdG9yaWVzLWRpcmVjdGl2ZXMvZHJhZnRzLWRpcmVjdGl2ZS5qc1xuICoqLyIsInZhciBhbmd1bGFyPXdpbmRvdy5hbmd1bGFyLG5nTW9kdWxlO1xudHJ5IHtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShbXCJuZ1wiXSl9XG5jYXRjaChlKXtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShcIm5nXCIsW10pfVxudmFyIHYxPVwiPGxldHRlciBuZy1yZXBlYXQ9XFxcImxldHRlciBpbiBsZXR0ZXJzIHwgb3JkZXJCeTogJ2RhdGUnOiB0cnVlXFxcIiBuZy1jbGljaz1cXFwicHJldmlldyh0aGlzKVxcXCI+PC9sZXR0ZXI+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcImRyYWZ0cy5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy90ZW1wbGF0ZXMvZHJhZnRzLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IGZhdm9yaXRlc1RlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvZmF2b3JpdGVzLmh0bWwnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgdGVtcGxhdGU6IGZhdm9yaXRlc1RlbXBsYXRlLFxyXG4gICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgIGluYm94OiAnPScsXHJcbiAgICAgICAgICAgIHNlbnQ6ICc9J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUpIHtcclxuICAgICAgICAgICAgc2NvcGUubGV0dGVycyA9IHNjb3BlLmluYm94LmNvbmNhdChzY29wZS5zZW50KTtcclxuICAgICAgICAgICAgc2NvcGUuZGlyZWN0b3J5ID0gJ2Zhdm9yaXRlcydcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL2Zhdm9yaXRlcy1kaXJlY3RpdmUuanNcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxsZXR0ZXIgbmctcmVwZWF0PVxcXCJsZXR0ZXIgaW4gbGV0dGVycyB8IGZpbHRlcjoge2Zhdm9yaXRlOiB0cnVlfSB8IG9yZGVyQnk6ICdkYXRlJzogdHJ1ZVxcXCIgbmctY2xpY2s9XFxcInByZXZpZXcodGhpcylcXFwiPjwvbGV0dGVyPlwiO1xubmdNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsZnVuY3Rpb24oYyl7Yy5wdXQoXCJmYXZvcml0ZXMuaHRtbFwiLHYxKX1dKTtcbm1vZHVsZS5leHBvcnRzPXYxO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9sZXR0ZXJzLWRpcmVjdG9yaWVzLWRpcmVjdGl2ZXMvdGVtcGxhdGVzL2Zhdm9yaXRlcy5odG1sXG4gKiogbW9kdWxlIGlkID0gMzNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBmaWx0ZXJlZFRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvZmlsdGVyZWRMZXR0ZXJzLmh0bWwnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgdGVtcGxhdGU6IGZpbHRlcmVkTGV0dGVycyxcclxuICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICBsZXR0ZXJzOiAnPScsXHJcbiAgICAgICAgICAgIHVzZXI6ICc9J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oc3RhdGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYmFjayA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgc3RhdGVTZXJ2aWNlLnNldEFjdGl2ZVN0YXRlKCdjb250YWN0cycpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ2ZpbHRlckRpcicsXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUpIHtcclxuICAgICAgICAgICAgc2NvcGUuZGlyZWN0b3J5ID0gJ2ZpbHRlcmVkJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL2ZpbHRlcmVkLWRpcmVjdGl2ZS5qc1xuICoqLyIsInZhciBhbmd1bGFyPXdpbmRvdy5hbmd1bGFyLG5nTW9kdWxlO1xudHJ5IHtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShbXCJuZ1wiXSl9XG5jYXRjaChlKXtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShcIm5nXCIsW10pfVxudmFyIHYxPVwiPGRpdiBjbGFzcz1cXFwiYmFja1xcXCIgbmctY2xpY2s9XFxcImZpbHRlckRpci5iYWNrKClcXFwiPiYjODU5MiA8ZGl2IGNsYXNzPVxcXCJiYWNrVGV4dFxcXCI+0JLQtdGA0L3Rg9GC0YzRgdGPINC6INC60L7QvdGC0LDQutGC0LDQvDwvZGl2PjwvZGl2PiA8bGV0dGVyIG5nLXJlcGVhdD1cXFwibGV0dGVyIGluIGxldHRlcnMgfCBmaWx0ZXI6IHVzZXIgfCBvcmRlckJ5OiAnZGF0ZSc6IHRydWVcXFwiIG5nLWNsaWNrPVxcXCJwcmV2aWV3KHRoaXMpXFxcIj48L2xldHRlcj5cIjtcbm5nTW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLGZ1bmN0aW9uKGMpe2MucHV0KFwiZmlsdGVyZWRMZXR0ZXJzLmh0bWxcIix2MSl9XSk7XG5tb2R1bGUuZXhwb3J0cz12MTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL3RlbXBsYXRlcy9maWx0ZXJlZExldHRlcnMuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDM1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgZnVuY3Rpb24gbGlnaHQoZWxlbSkge1xyXG4gICAgICAgIHZhciBzaGFkb3cxID0gJzNweCAwcHggOXB4IHJnYmEoMCwgMjU1LCAwLCAnLFxyXG4gICAgICAgICAgICBzaGFkb3cyID0gJyknLFxyXG4gICAgICAgICAgICBvcGFjaXR5ID0gMDtcclxuXHJcbiAgICAgICAgZnVuY3Rpb24gaW5jcigpIHtcclxuICAgICAgICAgICAgaWYgKG9wYWNpdHkgPCAwLjkpIHtcclxuICAgICAgICAgICAgICAgIG9wYWNpdHkgKz0gMC4wNTtcclxuICAgICAgICAgICAgICAgIGVsZW0uc3R5bGUudGV4dFNoYWRvdyA9IHNoYWRvdzEgKyBvcGFjaXR5ICsgc2hhZG93MjtcclxuICAgICAgICAgICAgICAgIHNldFRpbWVvdXQoaW5jciwgNzUpO1xyXG4gICAgICAgICAgICB9IGVsc2UgcmV0dXJuIGRlY3IoKTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGRlY3IoKSB7XHJcbiAgICAgICAgICAgIGlmIChvcGFjaXR5ID4gMC4yKSB7XHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5IC09IDAuMDU7XHJcbiAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLnRleHRTaGFkb3cgPSBzaGFkb3cxICsgb3BhY2l0eSArIHNoYWRvdzI7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGRlY3IsIDc1KTtcclxuICAgICAgICAgICAgfSBlbHNlIHJldHVybiBpbmNyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBpbmNyKCk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gYWRkQ29tYShlbGVtKSB7XHJcbiAgICAgICAgZnVuY3Rpb24gYWRkKCkge1xyXG4gICAgICAgICAgICBpZihlbGVtLmlubmVySFRNTC5sZW5ndGggPT09IDIxKSBlbGVtLmlubmVySFRNTCA9ICdMb2FkaW5nIGxldHRlcnMnO1xyXG4gICAgICAgICAgICBlbGVtLmlubmVySFRNTCArPSAnLic7XHJcbiAgICAgICAgICAgIHNldFRpbWVvdXQoYWRkLCA1MDApXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGFkZCgpXHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9hZGluZyhlbGVtZW50KSB7XHJcbiAgICAgICAgbGlnaHQoZWxlbWVudCk7XHJcbiAgICAgICAgYWRkQ29tYShlbGVtZW50KVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgbG9hZGluZzogbG9hZGluZ1xyXG5cclxuICAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9zZXJ2aWNlcy9hbmltYXRpb25TZXJ2aWNlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkaHR0cCwgJHN0YXRlLCBsZXR0ZXJTZXJ2aWNlLCBpbml0aWFsaXphdGlvblNlcnZpY2UsIGRhdGFTZXJ2aWNlKSB7XHJcblxyXG4gICAgdmFyIHBlcm1pc3Npb24gPSBmYWxzZTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRQZXJtaXNzaW9uKCkge1xyXG4gICAgICAgIHJldHVybiBwZXJtaXNzaW9uO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRQZXJtaXNzaW9uKHZhbCkge1xyXG4gICAgICAgIGlmKHZhbCA9PT0gdHJ1ZSB8fCB2YWwgPT09IGZhbHNlKSBwZXJtaXNzaW9uID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbnRpbnVlU2Vzc2lvbigpIHtcclxuICAgICAgICBkYXRhU2VydmljZS5iYXNlLnVzZXJzID0gd2luZG93LmxvY2FsU3RvcmFnZS51c2VycyA/IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS51c2VycykgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKCFkYXRhU2VydmljZS5iYXNlLnVzZXJzKSBkYXRhU2VydmljZS5nZXRVc2VycygpO1xyXG5cclxuICAgICAgICByZXR1cm4gJGh0dHAoe21ldGhvZDogJ0dFVCcsIHVybDogJ2RhdGEvSlNPTi9tYWlscy5qc29uJ30pLlxyXG4gICAgICAgICAgICB0aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5sZXR0ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0UGVybWlzc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGV0dGVycyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldHRlcnMuZGF0YSA9IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5sZXR0ZXJzKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhU2VydmljZS5iYXNlLmxldHRlcnMgPSBsZXR0ZXJzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6YXRpb25TZXJ2aWNlLmZpbmlzaEluaXQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0UGVybWlzc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhU2VydmljZS5iYXNlLmxldHRlcnMgPSBkYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6YXRpb25TZXJ2aWNlLmZpbmlzaEluaXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9naW5PdXQoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gJ3Nlc3Npb249JyArICc7IG1heC1hZ2U9MCc7XHJcbiAgICAgICAgc2V0UGVybWlzc2lvbihmYWxzZSk7XHJcbiAgICAgICAgbGV0dGVyU2VydmljZS5yZXNldFNlbGVjdGVkKCk7XHJcbiAgICAgICAgZGF0YVNlcnZpY2UucmVzZXRCYXNlKCk7XHJcbiAgICAgICAgaW5pdGlhbGl6YXRpb25TZXJ2aWNlLnJlc2V0SW5pdCgpO1xyXG4gICAgICAgICRzdGF0ZS5nbygnc2lnbkluJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2lnbkluKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YS5sb2dpbiAhPT0gJ3Rlc3QnKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCfQotCw0LrQvtCz0L4g0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPINC90LUg0YHRg9GJ0LXRgdGC0LLRg9C10YIhJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRhdGEubG9naW4gPT09ICd0ZXN0JyAmJiBkYXRhLnBhc3N3b3JkID09PSAnMTIzJykge1xyXG4gICAgICAgICAgICBzZXRQZXJtaXNzaW9uKHRydWUpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ21haWwubG9hZGluZycpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YVNlcnZpY2UuaW5pdCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCfQktCy0LXQtNC10L3QvdGL0Lkg0L/QvtGA0L7Qu9GMINC90LUg0LLQtdGA0LXQvSEnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuLypcclxuICAgIGZ1bmN0aW9uIHNpZ25JbihkYXRhKSB7XHJcbiAgICAgICAgJGh0dHAuZ2V0KCdkYXRhL3VzZXJzUHJvZmlsZXMuanNvbicpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHByb2ZpbGVzKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9maWxlcyA9IHByb2ZpbGVzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXByb2ZpbGVzW2RhdGEubG9naW5dKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ9Ci0LDQutC+0LPQviDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y8g0L3QtSDRgdGD0YnQtdGB0YLQstGD0LXRgiEnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvZmlsZXNbZGF0YS5sb2dpbl0gPT09IGRhdGEucGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgnS0gnKTtcclxuICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ21haWwubG9hZGluZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFTZXJ2aWNlLmluaXQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ9CS0LLQtdC00LXQvdC90YvQuSDQv9C+0YDQvtC70Ywg0L3QtSDQstC10YDQtdC9IScpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ9Cd0LUg0YPQtNCw0LvQvtGB0Ywg0LfQsNCz0YDRg9C30LjRgtGMINCx0LDQt9GLLi4uJylcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAqL1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0UGVybWlzc2lvbjogZ2V0UGVybWlzc2lvbixcclxuICAgICAgICBzaWduSW46IHNpZ25JbixcclxuICAgICAgICBsb2dpbk91dDogbG9naW5PdXQsXHJcbiAgICAgICAgY29udGludWVTZXNzaW9uOiBjb250aW51ZVNlc3Npb24sXHJcbiAgICAgICAgc2V0UGVybWlzc2lvbjogc2V0UGVybWlzc2lvblxyXG4gICAgfVxyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9zZXJ2aWNlcy9hdXRob3JpemF0aW9uU2VydmljZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHJvb3RTY29wZSwgJGh0dHAsICRxLCAkdGltZW91dCwgaW5pdGlhbGl6YXRpb25TZXJ2aWNlLCBzdGF0ZVNlcnZpY2UpIHtcclxuICAgIHZhciBiYXNlID0ge307XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0VXNlcnMoKSB7XHJcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCgnZGF0YS9KU09OL3VzZXJzLmpzb24nKS5cclxuICAgICAgICAgICAgdGhlbihmdW5jdGlvbihkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBiYXNlLnVzZXJzID0gZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuZGF0YTtcclxuICAgICAgICAgICAgfSwgZnVuY3Rpb24oZXJyLHN0YXR1cyl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhlcnIgKyBzdGF0dXMpO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBnZXRMZXR0ZXJzKCkge1xyXG4gICAgICAgIHZhciBkZWYgPSAkcS5kZWZlcigpO1xyXG5cclxuICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLmxldHRlcnMpIHtcclxuICAgICAgICAgICAgICAgIGxldCBkYXRhID0ge307XHJcbiAgICAgICAgICAgICAgICBkYXRhLmRhdGEgPSBKU09OLnBhcnNlKHdpbmRvdy5sb2NhbFN0b3JhZ2UubGV0dGVycyk7XHJcbiAgICAgICAgICAgICAgICBkZWYucmVzb2x2ZShkYXRhKTtcclxuICAgICAgICAgICAgfVxyXG5cclxuICAgICAgICAgICAgJGh0dHAoe21ldGhvZDogJ0dFVCcsIHVybDogJ2RhdGEvSlNPTi9tYWlscy5qc29uJ30pLlxyXG4gICAgICAgICAgICAgICAgdGhlbigoZGF0YSkgPT4geyBkZWYucmVzb2x2ZShkYXRhKX0sIChlcnIpID0+IGNvbnNvbGUubG9nKGVyciArIHN0YXR1cykpO1xyXG5cclxuICAgICAgICB9LCA1MDAwKTtcclxuXHJcbiAgICAgICAgcmV0dXJuIGRlZi5wcm9taXNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNhdmVMZXR0ZXJzVG9TdG9yYWdlKCkge1xyXG4gICAgICAgIGlmICghd2luZG93LmxvY2FsU3RvcmFnZSkgcmV0dXJuO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UubGV0dGVycyA9IEpTT04uc3RyaW5naWZ5KGJhc2UubGV0dGVycyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2F2ZVVzZXJzVG9TdG9yYWdlKCkge1xyXG4gICAgICAgIGlmICghd2luZG93LmxvY2FsU3RvcmFnZSkgcmV0dXJuO1xyXG4gICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UudXNlcnMgPSBKU09OLnN0cmluZ2lmeShiYXNlLnVzZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBpbml0aWFsaXNhdGlvbigpIHtcclxuICAgICAgICBiYXNlLnVzZXJzID0gd2luZG93LmxvY2FsU3RvcmFnZS51c2VycyA/IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS51c2VycykgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKCFiYXNlLnVzZXJzKSBnZXRVc2VycygpO1xyXG5cclxuICAgICAgICByZXR1cm4gZ2V0TGV0dGVycygpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uIChkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICBiYXNlLmxldHRlcnMgPSBkYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICBpbml0aWFsaXphdGlvblNlcnZpY2UuZmluaXNoSW5pdCgpO1xyXG4gICAgICAgICAgICAgICAgc3RhdGVTZXJ2aWNlLnNldEFjdGl2ZVN0YXRlKCdpbmJveCcpO1xyXG4gICAgICAgICAgICAgICAgZG9jdW1lbnQuY29va2llID0gJ3Nlc3Npb249JyArIChNYXRoLnJhbmRvbSgpICsgJycpLnNsaWNlKDIpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIGRhdGEuZGF0YTtcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gcmVzZXRCYXNlKCkge1xyXG4gICAgICAgIGRlbGV0ZSBiYXNlLmxldHRlcnM7XHJcbiAgICAgICAgZGVsZXRlIGJhc2UudXNlcnM7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBiYXNlOiBiYXNlLFxyXG4gICAgICAgIGluaXQ6IGluaXRpYWxpc2F0aW9uLFxyXG4gICAgICAgIHNhdmVVc2VyVG9TdG9yYWdlOiBzYXZlVXNlcnNUb1N0b3JhZ2UsXHJcbiAgICAgICAgc2F2ZUxldHRlcnNUb1N0b3JhZ2U6IHNhdmVMZXR0ZXJzVG9TdG9yYWdlLFxyXG4gICAgICAgIGdldFVzZXJzOiBnZXRVc2VycyxcclxuICAgICAgICBnZXRMZXR0ZXJzOiBnZXRMZXR0ZXJzLFxyXG4gICAgICAgIHJlc2V0QmFzZTogcmVzZXRCYXNlXHJcbiAgICB9XHJcbn07XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKioganMvYXBwL3NlcnZpY2VzL2RhdGFTZXJ2aWNlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHZhciBpbml0aWFsaXphdGlvbiA9IHRydWU7XHJcblxyXG4gICAgZnVuY3Rpb24gZ2V0SW5pdCgpIHtcclxuICAgICAgICByZXR1cm4gaW5pdGlhbGl6YXRpb247XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gZmluaXNoSW5pdCgpIHtcclxuICAgICAgICBpbml0aWFsaXphdGlvbiA9IGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlc2V0SW5pdCgpIHtcclxuICAgICAgICBpbml0aWFsaXphdGlvbiA9IHRydWU7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBnZXRJbml0OiBnZXRJbml0LFxyXG4gICAgICAgIGZpbmlzaEluaXQ6IGZpbmlzaEluaXQsXHJcbiAgICAgICAgcmVzZXRJbml0OiByZXNldEluaXRcclxuICAgIH1cclxufTtcclxuXHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9zZXJ2aWNlcy9pbml0aWFsaXphdGlvblNlcnZpY2UuanNcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHN0YXRlU2VydmljZSwgJHN0YXRlUGFyYW1zLCBkYXRhU2VydmljZSkge1xyXG4gICAgdmFyIHNlbGVjdGVkID0ge30sXHJcbiAgICAgICAgbmV3TGV0dGVyID0ge1xyXG4gICAgICAgICAgICBsZXR0ZXI6IHt9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBtb3ZlVG9EaXIoZGlyKSB7XHJcbiAgICAgICAgZGF0YVNlcnZpY2UuYmFzZS5sZXR0ZXJzW2Rpcl0ucHVzaChzZWxlY3RlZC5sZXR0ZXIpO1xyXG4gICAgICAgIGRhdGFTZXJ2aWNlLnNhdmVMZXR0ZXJzVG9TdG9yYWdlKClcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVGcm9tRGlyKCkge1xyXG4gICAgICAgIHZhciBjdXJyZW50RGlyID0gc3RhdGVTZXJ2aWNlLmN1cnJlbnRTdGF0ZSgpO1xyXG4gICAgICAgIGlmIChjdXJyZW50RGlyID09PSAncHJldmlldycpIGN1cnJlbnREaXIgPSAkc3RhdGVQYXJhbXMuZGlyZWN0b3J5O1xyXG4gICAgICAgIGlmIChjdXJyZW50RGlyID09PSAnZmF2b3JpdGVzJyB8fCBjdXJyZW50RGlyID09PSAnZmlsdGVyZWQnKSBjdXJyZW50RGlyID0gc2VsZWN0ZWQubGV0dGVyLmRpcmVjdG9yeTtcclxuICAgICAgICB2YXIgaW5kZXggPSBkYXRhU2VydmljZS5iYXNlLmxldHRlcnNbY3VycmVudERpcl0uaW5kZXhPZihzZWxlY3RlZC5sZXR0ZXIpO1xyXG5cclxuICAgICAgICBkYXRhU2VydmljZS5iYXNlLmxldHRlcnNbY3VycmVudERpcl0uc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICAgICAgZGF0YVNlcnZpY2Uuc2F2ZUxldHRlcnNUb1N0b3JhZ2UoKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZUxldHRlcihsZXR0ZXIpIHtcclxuICAgICAgICBpZiAobGV0dGVyKSBzZWxlY3RlZC5sZXR0ZXIgPSBsZXR0ZXI7XHJcbiAgICAgICAgdmFyIGN1cnJlbnREaXIgPSBzdGF0ZVNlcnZpY2UuY3VycmVudFN0YXRlKCk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnREaXIgPT09ICdwcmV2aWV3JykgY3VycmVudERpciA9ICRzdGF0ZVBhcmFtcy5kaXJlY3Rvcnk7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkLmxldHRlci5mYXZvcml0ZSkge1xyXG4gICAgICAgICAgICB0b2dnbGVGYXZvcml0ZShzZWxlY3RlZC5sZXR0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZW1vdmVGcm9tRGlyKCk7XHJcbiAgICAgICAgc3RhdGVTZXJ2aWNlLnNldEFjdGl2ZVN0YXRlKGN1cnJlbnREaXIpO1xyXG4gICAgICAgIGlmKHNlbGVjdGVkLmxldHRlci5kZWxldGVkID09PSBmYWxzZSAmJiBzZWxlY3RlZC5sZXR0ZXIuZGlyZWN0b3J5ICE9PSAnZHJhZnRzJykge1xyXG4gICAgICAgICAgICBzZWxlY3RlZC5sZXR0ZXIuZGVsZXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIG1vdmVUb0RpcigndHJhc2gnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWNvdmVyTGV0dGVyKCkge1xyXG4gICAgICAgIHJlbW92ZUZyb21EaXIoKTtcclxuICAgICAgICBtb3ZlVG9EaXIoc2VsZWN0ZWQubGV0dGVyLmRpcmVjdG9yeSk7XHJcbiAgICAgICAgc2VsZWN0ZWQubGV0dGVyLmRlbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgICBzdGF0ZVNlcnZpY2Uuc2V0QWN0aXZlU3RhdGUoc2VsZWN0ZWQubGV0dGVyLmRpcmVjdG9yeSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRJbmZvKGRpcikge1xyXG4gICAgICAgIHZhciBvYmogPSB7XHJcbiAgICAgICAgICAgIHNlbmRlcjogJ0knLFxyXG4gICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcclxuICAgICAgICAgICAgZmF2b3JpdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB1bnJlYWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBkZWxldGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgZGlyZWN0b3J5OiBkaXJcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSBzZWxlY3RlZC5sZXR0ZXJba2V5XSA9IG9ialtrZXldO1xyXG4gICAgICAgIHNlbGVjdGVkLmxldHRlci50aXR0bGUgPSBzZWxlY3RlZC5sZXR0ZXIudGl0dGxlIHx8ICfQkdC10Lcg0YLQtdC80YsuLi4nO1xyXG4gICAgICAgIHNlbGVjdGVkLmxldHRlci5jb250ZW50ID0gc2VsZWN0ZWQubGV0dGVyLmNvbnRlbnQgfHwgJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW92ZU5ld0xldHRlcihkaXIpIHtcclxuICAgICAgICBzZWxlY3RlZC5sZXR0ZXIgPSBuZXdMZXR0ZXIubGV0dGVyO1xyXG4gICAgICAgIHNldEluZm8oZGlyKTtcclxuICAgICAgICBpZiAoZGlyID09PSAnc2VudCcgJiYgIXNlbGVjdGVkLmxldHRlci50bykge1xyXG4gICAgICAgICAgICBhbGVydCgn0J3QtdGCINCw0LTRgNC10YHQsCDQv9C+0LvRg9GH0LDRgtC10LvRjyEhIScpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1vdmVUb0RpcihkaXIpO1xyXG4gICAgICAgIHN0YXRlU2VydmljZS5zZXRBY3RpdmVTdGF0ZShkaXIpO1xyXG4gICAgICAgIG5ld0xldHRlci5sZXR0ZXIgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBlZGl0RHJhZnQoKSB7XHJcbiAgICAgICAgbmV3TGV0dGVyLmxldHRlciA9IHNlbGVjdGVkLmxldHRlcjtcclxuICAgICAgICBzZWxlY3RlZC5sZXR0ZXIgPSB7fTtcclxuICAgICAgICByZW1vdmVGcm9tRGlyKCk7XHJcbiAgICAgICAgc3RhdGVTZXJ2aWNlLnNldEFjdGl2ZVN0YXRlKCduZXdMZXR0ZXJGb3JtJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9nZ2xlRmF2b3JpdGUobGV0dGVyKSB7XHJcbiAgICAgICAgbGV0dGVyLmZhdm9yaXRlID0gIWxldHRlci5mYXZvcml0ZTtcclxuICAgICAgICBkYXRhU2VydmljZS5zYXZlTGV0dGVyc1RvU3RvcmFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlc2V0U2VsZWN0ZWQoKSB7XHJcbiAgICAgICAgZGVsZXRlIHNlbGVjdGVkLmxldHRlcjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZCxcclxuICAgICAgICBuZXdMZXR0ZXI6IG5ld0xldHRlcixcclxuICAgICAgICBtb3ZlVG9EaXI6IG1vdmVUb0RpcixcclxuICAgICAgICByZW1vdmVGcm9tRGlyOiByZW1vdmVGcm9tRGlyLFxyXG4gICAgICAgIHJlbW92ZUxldHRlcjogcmVtb3ZlTGV0dGVyLFxyXG4gICAgICAgIHJlY292ZXJMZXR0ZXI6IHJlY292ZXJMZXR0ZXIsXHJcbiAgICAgICAgbW92ZU5ld0xldHRlcjogbW92ZU5ld0xldHRlcixcclxuICAgICAgICBlZGl0RHJhZnQ6IGVkaXREcmFmdCxcclxuICAgICAgICB0b2dnbGVGYXZvcml0ZTogdG9nZ2xlRmF2b3JpdGUsXHJcbiAgICAgICAgcmVzZXRTZWxlY3RlZDogcmVzZXRTZWxlY3RlZFxyXG4gICAgfVxyXG5cclxufTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvc2VydmljZXMvbGV0dGVyU2VydmljZS5qc1xuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJHN0YXRlLCBpbml0aWFsaXphdGlvblNlcnZpY2UpIHtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRTdGF0ZSgpIHtcclxuICAgICAgICByZXR1cm4gICRzdGF0ZS5jdXJyZW50Lm5hbWUuc2xpY2UoNSk7XHJcbiAgICB9XHJcblxyXG5cclxuICAgIGZ1bmN0aW9uIHNldEFjdGl2ZVN0YXRlKHZhbCwgcGFyYW1zX29iaikge1xyXG4gICAgICAgIGlmIChpbml0aWFsaXphdGlvblNlcnZpY2UuZ2V0SW5pdCgpKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHZhbCA9PT0gJ3ByZXZpZXcnKSB7XHJcbiAgICAgICAgICAgICRzdGF0ZS5nbygnbWFpbC4nICsgdmFsLCB7ZGlyZWN0b3J5OiBwYXJhbXNfb2JqLmRpciwgaW5kZXg6IHBhcmFtc19vYmouaW5kZXh9KTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICAkc3RhdGUuZ28oJ21haWwuJyArIHZhbClcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXREaXJBY3RpdmVDbGFzcyh2YWwpIHtcclxuICAgICAgICB2YXIgYWN0aXZlQ2xhc3MgPSBnZXRTdGF0ZSgpID09PSB2YWwgPyAnYWN0aXZlRGlyJyA6ICcnO1xyXG5cclxuICAgICAgICByZXR1cm4gYWN0aXZlQ2xhc3M7XHJcbiAgICB9XHJcblxyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICBjaGVja0RpckNsYXNzOiBzZXREaXJBY3RpdmVDbGFzcyxcclxuICAgICAgICBzZXRBY3RpdmVTdGF0ZTogc2V0QWN0aXZlU3RhdGUsXHJcbiAgICAgICAgY3VycmVudFN0YXRlOiBnZXRTdGF0ZVxyXG4gICAgfVxyXG59O1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiBqcy9hcHAvc2VydmljZXMvc3RhdGVTZXJ2aWNlLmpzXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiBmdW5jdGlvbihjb250ZW50KSB7XHJcbiAgICAgICAgcmV0dXJuIGNvbnRlbnQuc2xpY2UoMCwgMjIwKSArICcuLi4nO1xyXG4gICAgfVxyXG59O1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIGpzL2FwcC9zZXJ2aWNlcy9maWx0ZXJzLmpzXG4gKiovIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7Ozs7QUN0Q0E7Ozs7OztBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFIQTtBQU1BO0FBQ0E7QUFDQTtBQVJBO0FBV0E7QUFDQTtBQVpBO0FBZUE7QUFDQTtBQWhCQTtBQW1CQTtBQUNBO0FBcEJBO0FBdUJBO0FBQ0E7QUF4QkE7QUEyQkE7QUFDQTtBQTVCQTtBQStCQTtBQUNBO0FBaENBO0FBbUNBO0FBQ0E7QUFwQ0E7QUF1Q0E7QUFDQTtBQXhDQTtBQTJDQTtBQUNBO0FBNUNBO0FBK0NBO0FBQ0E7QUFoREE7QUFDQTtBQW1EQTtBQUNBO0FBQ0E7QUFGQTtBQXJEQTtBQUNBO0FBMERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBTEE7QUFEQTtBQUNBO0FBWUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7Ozs7OztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFGQTtBQVpBO0FBcUJBO0FBQ0E7QUFDQTtBQURBO0FBMUJBO0FBREE7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFQQTtBQURBOzs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQXBCQTtBQTBCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUNBO0FBQ0E7QUFIQTtBQUxBO0FBRkE7QUEvQkE7QUFEQTs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7O0FDbkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQVJBO0FBREE7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQUtBO0FBQ0E7QUFDQTtBQUZBO0FBSUE7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUpBO0FBWEE7QUFOQTtBQURBOzs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBVEE7QUFDQTtBQVdBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFEQTtBQTVCQTtBQUhBO0FBREE7Ozs7OztBQ0pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQURBO0FBUEE7QUFEQTs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBVEE7QUFhQTtBQW5CQTtBQURBOzs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQURBO0FBR0E7QUFDQTtBQUxBO0FBUEE7QUFIQTtBQURBOzs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUFOQTtBQURBOzs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUFOQTtBQURBOzs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUFOQTtBQURBOzs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFIQTtBQURBOzs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFHQTtBQUNBO0FBREE7QUFOQTtBQURBOzs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBUEE7QUFEQTs7Ozs7O0FDSkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFEQTtBQURBO0FBS0E7QUFDQTtBQUNBO0FBREE7QUFiQTtBQURBOzs7Ozs7QUNKQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFEQTtBQUNBO0FBT0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBREE7QUFDQTtBQU9BO0FBckJBO0FBQ0E7QUF1QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBS0E7QUFOQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUZBO0FBdkNBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFDQTtBQUlBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUxBO0FBT0E7QUFDQTtBQUNBO0FBVEE7QUFEQTtBQUxBO0FBQ0E7QUFtQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQUNBO0FBUUE7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFLQTtBQUxBO0FBTEE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQTFDQTtBQStFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTEE7QUE5RUE7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUZBO0FBSUE7QUFEQTtBQUxBO0FBQ0E7QUFTQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSEE7QUFDQTtBQUtBO0FBQ0E7QUFBQTtBQUFBO0FBQUE7QUFSQTtBQUNBO0FBV0E7QUFmQTtBQUNBO0FBaUJBO0FBQ0E7QUFDQTtBQUZBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMQTtBQUxBO0FBQ0E7QUFhQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVBBO0FBNURBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBREE7QUFDQTtBQUdBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFIQTtBQWZBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUNBO0FBR0E7QUFDQTtBQUNBO0FBRkE7QUFDQTtBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQVJBO0FBQ0E7QUFVQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFEQTtBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFGQTtBQVRBO0FBQ0E7QUFjQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBSkE7QUFDQTtBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOQTtBQUNBO0FBUUE7QUFBQTtBQUFBO0FBRUE7QUFaQTtBQUNBO0FBY0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQUNBO0FBQ0E7QUFUQTtBQUNBO0FBV0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUpBO0FBQ0E7QUFNQTtBQUNBO0FBQ0E7QUFGQTtBQUNBO0FBSUE7QUFDQTtBQURBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBVkE7QUF2RkE7Ozs7OztBQ0ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQURBO0FBQ0E7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRkE7QUFJQTtBQU5BO0FBQ0E7QUFRQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBQ0E7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUhBO0FBdEJBOzs7Ozs7QUNGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBREE7QUFEQTs7OyIsInNvdXJjZVJvb3QiOiIifQ==