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

	__webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	const mailApp = angular.module('mailApp', ['ui.router', __webpack_require__(2).name, __webpack_require__(5).name, __webpack_require__(10).name]);

	mailApp.config(function($stateProvider, $urlRouterProvider) {
	    $stateProvider
	        .state('signIn', {
	            url: '/signin',
	            template: '<sign-in></sign-in>'
	        })
	        .state('mail', {
	            url: '/mail',
	            abstract: true,
	            templateUrl: 'js/app/main-view-module/main-container-directive/template/main.html'
	        })
	        .state('mail.inbox', {
	            url: '/inbox',
	            template: '<inbox-letters letters="directory.base.letters.inbox"></inbox-letters>'
	        })
	        .state('mail.loading', {
	            url: "/loading",
	            template: '<loading></loading>'
	        })
	        .state('mail.sent', {
	            url: '/sent',
	            template: '<sent-letters letters="directory.base.letters.sent"></sent-letters>'
	        })
	        .state('mail.trash', {
	            url: '/trash',
	            template: '<cart-letters letters="directory.base.letters.trash"></cart-letters>'
	        })
	        .state('mail.drafts', {
	            url: '/drafts',
	            template: '<drafts letters="directory.base.letters.drafts"></drafts>'
	        })
	        .state('mail.favorites', {
	            url: '/favorites',
	            template: '<favorites inbox="directory.base.letters.inbox" sent="directory.base.letters.sent"></favorites>'
	        })
	        .state('mail.newLetterForm', {
	            url: '/new_letter',
	            template: '<new-letter new="directory.newLetter"></new-letter>'
	        })
	        .state('mail.contacts', {
	            url: '/contacts',
	            template: '<contacts users="directory.base.users"></contacts>'
	        })
	        .state('mail.preview', {
	            url: '/:directory/:index',
	            template: '<preview selected="directory.selected"></preview>'
	        })
	        .state('mail.filtered', {
	            url: '/filtered',
	            template: '<filtered-letters letters="directory.base.letters.inbox" user="directory.selected.user"></filtered-letters>'
	        });


	    $urlRouterProvider.otherwise(function ($injector) {
	        if ($injector.get('authorizationService').getPermission()) return '/mail/inbox';
	        return '/signin';
	    });
	});

	mailApp.run(function($rootScope, $state, authorizationService, dataService) {
	    $rootScope.$on('$stateChangeStart', function(event, toState) {
	        if ( (document.cookie.indexOf('session') + 1) && !dataService.base.letters) {
	            authorizationService.continueSession();
	            return;
	        }
	        if (toState.name !=='signIn' && !authorizationService.getPermission()) {
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

	const authorization = angular.module('authorization', []);

	authorization.directive('signIn', __webpack_require__(3));

	module.exports = authorization;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	let authTemplate = __webpack_require__(4);

	module.exports = function() {
	    return {
	        restrict: 'E',
	        template: authTemplate,
	        scope: {},
	        controller: function(authorizationService){
	            this.login = '';
	            this.password = '';

	            this.enter = function(e) {
	                if (e.keyCode === 13) this.signIn();
	            };

	            this.signIn = function() {
	                authorizationService.signIn({login: this.login, password: this.password})
	            };

	            this.clearLS = function() {
	                if (!window.localStorage || !window.localStorage.users && !window.localStorage.letters) alert('Данных нет! Удалять нечего!');
	                if (window.localStorage.users || window.localStorage.letters) {
	                    window.localStorage.removeItem('users');
	                    window.localStorage.removeItem('letters');
	                    alert('Данные успешно удалены!');
	                }
	            }
	        },
	        controllerAs: 'user',
	        link: function(scope) {
	            scope.f = 10;
	        }
	    }
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

	const menu = angular.module('menu', []);

	menu.directive('mailDirectories', __webpack_require__(6));
	menu.directive('menu', __webpack_require__(8));

	module.exports = menu;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	let dirTemplate = __webpack_require__(7);

	module.exports = function () {
	    return {
	        restrict: 'E',
	        template: dirTemplate,
	        controller: function (stateService) {
	            this.set = stateService.setActiveState;
	            this.checkClass = stateService.checkDirClass;
	        },
	        controllerAs: 'directory'
	    }
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

	let menuTemplate = __webpack_require__(9);

	module.exports = function($document) {
	    return {
	        restrict: 'E',
	        template: menuTemplate,
	        scope: {},
	        controller: function (stateService, letterService, $stateParams, authorizationService) {
	            this.setDirectory = stateService.setActiveState;
	            this.currentState = stateService.currentState;

	            this.getPreviewDir = function() {
	                if (!letterService.selected.letter) return;
	                return $stateParams.directory;
	            };

	            this.remove = letterService.removeLetter;
	            this.recover = letterService.recoverLetter;
	            this.send = letterService.moveNewLetter;
	            this.edit = letterService.editDraft;
	            this.loginOut = authorizationService.loginOut;

	            this.newLetter = function() {
	                letterService.newLetter.letter = {};
	                stateService.setActiveState('newLetterForm');
	            };

	            this.replay = function() {
	                letterService.newLetter.letter.to = letterService.selected.letter.sender;
	                stateService.setActiveState('newLetterForm');
	            }

	        },
	        controllerAs: 'menu',
	        link: function(scope) {
	            scope.showMenu = false;
	            $document.on('click', function(e) {
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
	    }
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

	const mainView = angular.module('main-view', []);

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

	module.exports = function() {
	    return {
	        restrict:'AE',
	        scope: true,
	        controller: function(letterService, dataService) {
	            this.base = dataService.base;
	            this.selected = letterService.selected;
	            this.newLetter = letterService.newLetter;
	        },
	        controllerAs: 'directory'
	    }
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	let contactsTemplate = __webpack_require__(13);

	module.exports = function(letterService, stateService, dataService) {
	    return {
	        restrict: 'E',
	        template: contactsTemplate,
	        scope: {
	            users: '='
	        },
	        link: function(scope) {
	            scope.newUser = {};
	            scope.addContact = function() {
	                scope.users.push(scope.newUser);
	                scope.newUser = {};
	                dataService.saveUserToStorage();
	            };
	            scope.removeContact = function(id) {
	                scope.users.splice(id, 1);
	                dataService.saveUserToStorage();
	            };
	            scope.mailTo = function(mail) {
	                letterService.newLetter.letter = {
	                    to: mail
	                };
	                stateService.setActiveState('newLetterForm')
	            }
	        }
	    }
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

	let letterTemplate = __webpack_require__(15);

	module.exports = function(letterService, stateService, dataService) {
	    return {
	        restrict: 'E',
	        template: letterTemplate,
	        link: function(scope) {

	            scope.remove = function(event) {
	                event.stopPropagation();
	                letterService.removeLetter(scope.letter)
	            };

	            scope.preview = function(scope) {
	                var directory = scope.directory;
	                if (directory === 'filtered') directory = 'inbox';
	                if (directory === 'favorites') {
	                    directory = scope.letter.directory;
	                }
	                var index = (dataService.base.letters[directory].indexOf(scope.letter)) + '_' + directory;
	                stateService.setActiveState('preview',{dir: scope.directory, index: index});
	                if (scope.letter.unread) scope.letter.unread = false;
	                dataService.saveLettersToStorage();
	            };

	            scope.toggleFavorite = function(letter, event) {
	                if(event) event.stopPropagation();
	                letterService.toggleFavorite(letter);
	            };

	            scope.checkUnreadClass = function() {
	                return scope.letter.unread ? 'unread' : ''
	            };

	            scope.checkFavorite = function() {
	                return scope.letter.favorite ? 'activeFavorite' : ''
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

	let loadingTemplate = __webpack_require__(17);

	module.exports = function(animationService) {
	    return {
	        restrict: 'E',
	        template: loadingTemplate,

	        controller: function(initializationService, $state) {
	            if (!initializationService.getInit()) $state.go('mail.inbox');
	        },
	        link: function(scope, element) {
	            animationService.loading(element.children()[0]);
	        }
	    }
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

	let previewTemplate = __webpack_require__(19);

	module.exports = function() {
	    return {
	        restrict: 'E',
	        template: previewTemplate,
	        scope: {
	            selected: '='
	        },
	        controller: function($stateParams, letterService, stateService, dataService) {
	            var directory = $stateParams.directory,
	                index = $stateParams.index.slice(0, 1);
	            if (directory === 'filtered') directory = 'inbox';
	            if (directory === 'favorites') {
	                directory = $stateParams.index.slice(2);
	            }
	            letterService.selected.letter = dataService.base.letters[directory][index];

	            this.back = function() {
	                stateService.setActiveState($stateParams.directory)
	            }
	        },
	        controllerAs: 'preview'
	    }
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

	let userTemplate = __webpack_require__(21);

	module.exports = function(letterService, stateService, dataService) {
	    return {
	        restrict: 'E',
	        template: userTemplate,
	        link: function(scope) {
	            scope.editMode = false;
	            scope.toggleMode = function() {
	                scope.editMode = !scope.editMode;
	                dataService.saveUserToStorage();
	            };

	            scope.selectUser = function() {
	                if (!scope.user.email) {
	                    alert('У данного контакта нет Email!!!')
	                }
	                letterService.selected.user = scope.user.name;
	                stateService.setActiveState('filtered')
	            }
	        }
	    }
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

	let inboxTemplate = __webpack_require__(23);

	module.exports = function() {
	    return {
	        restrict: 'E',
	        template: inboxTemplate,
	        scope: {
	            letters: '='
	        },
	        link: function(scope) {
	            scope.directory = 'inbox';
	        }
	    }
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

	let sentTemplate = __webpack_require__(25);

	module.exports = function() {
	    return {
	        restrict: 'E',
	        template: sentTemplate,
	        scope: {
	            letters: '='
	        },
	        link: function(scope) {
	            scope.directory = 'sent'
	        }
	    }
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

	let trashTemplate = __webpack_require__(27);

	module.exports = function() {
	    return {
	        restrict: 'E',
	        template: trashTemplate,
	        scope: {
	            letters: '='
	        },
	        link: function(scope) {
	            scope.directory = 'trash'
	        }
	    }
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

	let newLetterTemplate = __webpack_require__(29);

	module.exports = function() {
	    return {
	        restrict: 'E',
	        template: newLetterTemplate,
	        scope: {
	            new: '='
	        }
	    }
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

	let draftsTemplate = __webpack_require__(31);

	module.exports = function() {
	    return {
	        restrict: 'E',
	        template: draftsTemplate,
	        scope: {
	            letters: '='
	        },
	        link: function(scope) {
	            scope.directory = 'drafts'
	        }
	    }
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

	let favoritesTemplate = __webpack_require__(33);

	module.exports = function() {
	    return {
	        restrict: 'E',
	        template: favoritesTemplate,
	        scope: {
	            inbox: '=',
	            sent: '='
	        },
	        link: function(scope) {
	            scope.letters = scope.inbox.concat(scope.sent);
	            scope.directory = 'favorites'
	        }
	    }
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

	let filteredTemplate = __webpack_require__(35);

	module.exports = function() {
	    return {
	        restrict: 'E',
	        template: filteredLetters,
	        scope: {
	            letters: '=',
	            user: '='
	        },
	        controller: function(stateService) {
	            this.back = function() {
	                stateService.setActiveState('contacts')
	            }
	        },
	        controllerAs: 'filterDir',
	        link: function(scope) {
	            scope.directory = 'filtered';
	        }
	    }
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

	module.exports = function() {
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
	            if(elem.innerHTML.length === 21) elem.innerHTML = 'Loading letters';
	            elem.innerHTML += '.';
	            setTimeout(add, 500)
	        }
	        add()
	    }

	    function loading(element) {
	        light(element);
	        addComa(element)
	    }

	    return {
	        loading: loading

	    }
	}

/***/ },
/* 37 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function($http, $state, letterService, initializationService, dataService) {

	    var permission = false;

	    function getPermission() {
	        return permission;

	    }

	    function setPermission(val) {
	        if(val === true || val === false) permission = val;
	    }

	    function continueSession() {
	        dataService.base.users = window.localStorage.users ? JSON.parse(window.localStorage.users) : undefined;
	        if (!dataService.base.users) dataService.getUsers();

	        return $http({method: 'GET', url: 'data/JSON/mails.json'}).
	            then((data) => {
	                if (window.localStorage.letters) {
	                    setPermission(true);
	                    let letters = {};
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
	            alert('Введенный пороль не верен!')
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
	    }
	};

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function($rootScope, $http, $q, $timeout, initializationService, stateService) {
	    var base = {};

	    function getUsers() {
	        return $http.get('data/JSON/users.json').
	            then(function(data) {
	                base.users = data.data;
	                return data.data;
	            }, function(err,status){
	                console.log(err + status);
	            });
	    }

	    function getLetters() {
	        var def = $q.defer();

	        $timeout(function () {
	            if (window.localStorage.letters) {
	                let data = {};
	                data.data = JSON.parse(window.localStorage.letters);
	                def.resolve(data);
	            }

	            $http({method: 'GET', url: 'data/JSON/mails.json'}).
	                then((data) => { def.resolve(data)}, (err) => console.log(err + status));

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

	        return getLetters()
	            .then(function (data) {
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
	    }
	};

/***/ },
/* 39 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function() {
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
	    }
	};



/***/ },
/* 40 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function(stateService, $stateParams, dataService) {
	    var selected = {},
	        newLetter = {
	            letter: {}
	        };

	    function moveToDir(dir) {
	        dataService.base.letters[dir].push(selected.letter);
	        dataService.saveLettersToStorage()
	    }

	    function removeFromDir() {
	        var currentDir = stateService.currentState();
	        if (currentDir === 'preview') currentDir = $stateParams.directory;
	        if (currentDir === 'favorites' || currentDir === 'filtered') currentDir = selected.letter.directory;
	        var index = dataService.base.letters[currentDir].indexOf(selected.letter);

	        dataService.base.letters[currentDir].splice(index, 1);

	        dataService.saveLettersToStorage()
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
	        if(selected.letter.deleted === false && selected.letter.directory !== 'drafts') {
	            selected.letter.deleted = true;
	            moveToDir('trash')
	        }
	    }

	    function recoverLetter() {
	        removeFromDir();
	        moveToDir(selected.letter.directory);
	        selected.letter.deleted = false;
	        stateService.setActiveState(selected.letter.directory)
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

	        for (var key in obj) selected.letter[key] = obj[key];
	        selected.letter.tittle = selected.letter.tittle || 'Без темы...';
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
	    }

	};

/***/ },
/* 41 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function($state, initializationService) {

	    function getState() {
	        return  $state.current.name.slice(5);
	    }


	    function setActiveState(val, params_obj) {
	        if (initializationService.getInit()) return;
	        if (val === 'preview') {
	            $state.go('mail.' + val, {directory: params_obj.dir, index: params_obj.index});
	            return;
	        }
	        $state.go('mail.' + val)
	    }

	    function setDirActiveClass(val) {
	        var activeClass = getState() === val ? 'activeDir' : '';

	        return activeClass;
	    }

	    return {
	        checkDirClass: setDirActiveClass,
	        setActiveState: setActiveState,
	        currentState: getState
	    }
	};


/***/ },
/* 42 */
/***/ function(module, exports) {

	'use strict';

	module.exports = function() {
	    return function(content) {
	        return content.slice(0, 220) + '...';
	    }
	};

/***/ }
/******/ ]);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVuZGxlLmpzIiwic291cmNlcyI6WyJ3ZWJwYWNrOi8vL3dlYnBhY2svYm9vdHN0cmFwIDMxMzFkZTA4ZjRmNjY4OWNkYTczIiwid2VicGFjazovLy8uL2pzL21haWwtYXBwLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvYXV0aG9yaXphdGlvbi1tb2R1bGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL2F1dGhvcml6YXRpb24tbW9kdWxlL2F1dGhvcml6YXRpb24tZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC9hdXRob3JpemF0aW9uLW1vZHVsZS90ZW1wbGF0ZS9hdXRob3JpemF0aW9uLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL21lbnUtbW9kdWxlL2luZGV4LmpzIiwid2VicGFjazovLy8uL2pzL2FwcC9tZW51LW1vZHVsZS9kaXJlY3Rvcmllcy1tZW51L2RpcmVjdG9yaWVzLW1lbnUtZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC9tZW51LW1vZHVsZS9kaXJlY3Rvcmllcy1tZW51L3RlbXBsYXRlL2RpcmVjdG9yaWVzLW1lbnUuaHRtbCIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbWVudS1tb2R1bGUvbWVudS9tZW51LWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbWVudS1tb2R1bGUvbWVudS90ZW1wbGF0ZS9tZW51Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbWFpbi1jb250YWluZXItZGlyZWN0aXZlL21haW4tY29udGFpbmVyLWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9jb250YWN0cy1kaXJlY3RpdmUvY29udGFjdHNEaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvY29udGFjdHMtZGlyZWN0aXZlL3RlbXBsYXRlL2NvbnRhY3RzLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVyLWRpcmVjdGl2ZS9sZXR0ZXItZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL2xldHRlci1kaXJlY3RpdmUvdGVtcGxhdGUvbGV0dGVyLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbG9hZGluZy1kaXJlY3RpdmUvbG9hZGluZy1kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbG9hZGluZy1kaXJlY3RpdmUvdGVtcGxhdGUvbG9hZGluZy5odG1sIiwid2VicGFjazovLy8uL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL3ByZXZpZXctZGlyZWN0aXZlL3ByZXZpZXctZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL3ByZXZpZXctZGlyZWN0aXZlL3RlbXBsYXRlL3ByZXZpZXcuaHRtbCIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS91c2VyLWRpcmVjdGl2ZS91c2VyLWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS91c2VyLWRpcmVjdGl2ZS90ZW1wbGF0ZS91c2VyLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL2luYm94LWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9sZXR0ZXJzLWRpcmVjdG9yaWVzLWRpcmVjdGl2ZXMvdGVtcGxhdGVzL2luYm94TGV0dGVycy5odG1sIiwid2VicGFjazovLy8uL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy9zZW50LWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9sZXR0ZXJzLWRpcmVjdG9yaWVzLWRpcmVjdGl2ZXMvdGVtcGxhdGVzL3NlbnRMZXR0ZXJzLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL3RyYXNoLWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9sZXR0ZXJzLWRpcmVjdG9yaWVzLWRpcmVjdGl2ZXMvdGVtcGxhdGVzL2NhcnRMZXR0ZXJzLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL25ld0xldHRlci1kaXJlY3RpdmUuanMiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL3RlbXBsYXRlcy9uZXdMZXR0ZXIuaHRtbCIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9sZXR0ZXJzLWRpcmVjdG9yaWVzLWRpcmVjdGl2ZXMvZHJhZnRzLWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9sZXR0ZXJzLWRpcmVjdG9yaWVzLWRpcmVjdGl2ZXMvdGVtcGxhdGVzL2RyYWZ0cy5odG1sIiwid2VicGFjazovLy8uL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy9mYXZvcml0ZXMtZGlyZWN0aXZlLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy90ZW1wbGF0ZXMvZmF2b3JpdGVzLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL2ZpbHRlcmVkLWRpcmVjdGl2ZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9sZXR0ZXJzLWRpcmVjdG9yaWVzLWRpcmVjdGl2ZXMvdGVtcGxhdGVzL2ZpbHRlcmVkTGV0dGVycy5odG1sIiwid2VicGFjazovLy8uL2pzL2FwcC9zZXJ2aWNlcy9hbmltYXRpb25TZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC9zZXJ2aWNlcy9hdXRob3JpemF0aW9uU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvc2VydmljZXMvZGF0YVNlcnZpY2UuanMiLCJ3ZWJwYWNrOi8vLy4vanMvYXBwL3NlcnZpY2VzL2luaXRpYWxpemF0aW9uU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvc2VydmljZXMvbGV0dGVyU2VydmljZS5qcyIsIndlYnBhY2s6Ly8vLi9qcy9hcHAvc2VydmljZXMvc3RhdGVTZXJ2aWNlLmpzIiwid2VicGFjazovLy8uL2pzL2FwcC9zZXJ2aWNlcy9maWx0ZXJzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgMzEzMWRlMDhmNGY2Njg5Y2RhNzNcbiAqKi8iLCJyZXF1aXJlKCcuL2FwcCcpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9tYWlsLWFwcC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmNvbnN0IG1haWxBcHAgPSBhbmd1bGFyLm1vZHVsZSgnbWFpbEFwcCcsIFsndWkucm91dGVyJywgcmVxdWlyZSgnLi9hdXRob3JpemF0aW9uLW1vZHVsZScpLm5hbWUsIHJlcXVpcmUoJy4vbWVudS1tb2R1bGUnKS5uYW1lLCByZXF1aXJlKCcuL21haW4tdmlldy1tb2R1bGUnKS5uYW1lXSk7XHJcblxyXG5tYWlsQXBwLmNvbmZpZyhmdW5jdGlvbigkc3RhdGVQcm92aWRlciwgJHVybFJvdXRlclByb3ZpZGVyKSB7XHJcbiAgICAkc3RhdGVQcm92aWRlclxyXG4gICAgICAgIC5zdGF0ZSgnc2lnbkluJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvc2lnbmluJyxcclxuICAgICAgICAgICAgdGVtcGxhdGU6ICc8c2lnbi1pbj48L3NpZ24taW4+J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdtYWlsJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvbWFpbCcsXHJcbiAgICAgICAgICAgIGFic3RyYWN0OiB0cnVlLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZVVybDogJ2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL21haW4tY29udGFpbmVyLWRpcmVjdGl2ZS90ZW1wbGF0ZS9tYWluLmh0bWwnXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ21haWwuaW5ib3gnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9pbmJveCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPGluYm94LWxldHRlcnMgbGV0dGVycz1cImRpcmVjdG9yeS5iYXNlLmxldHRlcnMuaW5ib3hcIj48L2luYm94LWxldHRlcnM+J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdtYWlsLmxvYWRpbmcnLCB7XHJcbiAgICAgICAgICAgIHVybDogXCIvbG9hZGluZ1wiLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxsb2FkaW5nPjwvbG9hZGluZz4nXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ21haWwuc2VudCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL3NlbnQnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxzZW50LWxldHRlcnMgbGV0dGVycz1cImRpcmVjdG9yeS5iYXNlLmxldHRlcnMuc2VudFwiPjwvc2VudC1sZXR0ZXJzPidcclxuICAgICAgICB9KVxyXG4gICAgICAgIC5zdGF0ZSgnbWFpbC50cmFzaCcsIHtcclxuICAgICAgICAgICAgdXJsOiAnL3RyYXNoJyxcclxuICAgICAgICAgICAgdGVtcGxhdGU6ICc8Y2FydC1sZXR0ZXJzIGxldHRlcnM9XCJkaXJlY3RvcnkuYmFzZS5sZXR0ZXJzLnRyYXNoXCI+PC9jYXJ0LWxldHRlcnM+J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdtYWlsLmRyYWZ0cycsIHtcclxuICAgICAgICAgICAgdXJsOiAnL2RyYWZ0cycsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPGRyYWZ0cyBsZXR0ZXJzPVwiZGlyZWN0b3J5LmJhc2UubGV0dGVycy5kcmFmdHNcIj48L2RyYWZ0cz4nXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ21haWwuZmF2b3JpdGVzJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvZmF2b3JpdGVzJyxcclxuICAgICAgICAgICAgdGVtcGxhdGU6ICc8ZmF2b3JpdGVzIGluYm94PVwiZGlyZWN0b3J5LmJhc2UubGV0dGVycy5pbmJveFwiIHNlbnQ9XCJkaXJlY3RvcnkuYmFzZS5sZXR0ZXJzLnNlbnRcIj48L2Zhdm9yaXRlcz4nXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ21haWwubmV3TGV0dGVyRm9ybScsIHtcclxuICAgICAgICAgICAgdXJsOiAnL25ld19sZXR0ZXInLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxuZXctbGV0dGVyIG5ldz1cImRpcmVjdG9yeS5uZXdMZXR0ZXJcIj48L25ldy1sZXR0ZXI+J1xyXG4gICAgICAgIH0pXHJcbiAgICAgICAgLnN0YXRlKCdtYWlsLmNvbnRhY3RzJywge1xyXG4gICAgICAgICAgICB1cmw6ICcvY29udGFjdHMnLFxyXG4gICAgICAgICAgICB0ZW1wbGF0ZTogJzxjb250YWN0cyB1c2Vycz1cImRpcmVjdG9yeS5iYXNlLnVzZXJzXCI+PC9jb250YWN0cz4nXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ21haWwucHJldmlldycsIHtcclxuICAgICAgICAgICAgdXJsOiAnLzpkaXJlY3RvcnkvOmluZGV4JyxcclxuICAgICAgICAgICAgdGVtcGxhdGU6ICc8cHJldmlldyBzZWxlY3RlZD1cImRpcmVjdG9yeS5zZWxlY3RlZFwiPjwvcHJldmlldz4nXHJcbiAgICAgICAgfSlcclxuICAgICAgICAuc3RhdGUoJ21haWwuZmlsdGVyZWQnLCB7XHJcbiAgICAgICAgICAgIHVybDogJy9maWx0ZXJlZCcsXHJcbiAgICAgICAgICAgIHRlbXBsYXRlOiAnPGZpbHRlcmVkLWxldHRlcnMgbGV0dGVycz1cImRpcmVjdG9yeS5iYXNlLmxldHRlcnMuaW5ib3hcIiB1c2VyPVwiZGlyZWN0b3J5LnNlbGVjdGVkLnVzZXJcIj48L2ZpbHRlcmVkLWxldHRlcnM+J1xyXG4gICAgICAgIH0pO1xyXG5cclxuXHJcbiAgICAkdXJsUm91dGVyUHJvdmlkZXIub3RoZXJ3aXNlKGZ1bmN0aW9uICgkaW5qZWN0b3IpIHtcclxuICAgICAgICBpZiAoJGluamVjdG9yLmdldCgnYXV0aG9yaXphdGlvblNlcnZpY2UnKS5nZXRQZXJtaXNzaW9uKCkpIHJldHVybiAnL21haWwvaW5ib3gnO1xyXG4gICAgICAgIHJldHVybiAnL3NpZ25pbic7XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5tYWlsQXBwLnJ1bihmdW5jdGlvbigkcm9vdFNjb3BlLCAkc3RhdGUsIGF1dGhvcml6YXRpb25TZXJ2aWNlLCBkYXRhU2VydmljZSkge1xyXG4gICAgJHJvb3RTY29wZS4kb24oJyRzdGF0ZUNoYW5nZVN0YXJ0JywgZnVuY3Rpb24oZXZlbnQsIHRvU3RhdGUpIHtcclxuICAgICAgICBpZiAoIChkb2N1bWVudC5jb29raWUuaW5kZXhPZignc2Vzc2lvbicpICsgMSkgJiYgIWRhdGFTZXJ2aWNlLmJhc2UubGV0dGVycykge1xyXG4gICAgICAgICAgICBhdXRob3JpemF0aW9uU2VydmljZS5jb250aW51ZVNlc3Npb24oKTtcclxuICAgICAgICAgICAgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodG9TdGF0ZS5uYW1lICE9PSdzaWduSW4nICYmICFhdXRob3JpemF0aW9uU2VydmljZS5nZXRQZXJtaXNzaW9uKCkpIHtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdzaWduSW4nKTtcclxuICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9KTtcclxufSk7XHJcblxyXG5tYWlsQXBwLnNlcnZpY2UoJ2FuaW1hdGlvblNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL2FuaW1hdGlvblNlcnZpY2UnKSk7XHJcbm1haWxBcHAuc2VydmljZSgnYXV0aG9yaXphdGlvblNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL2F1dGhvcml6YXRpb25TZXJ2aWNlJykpO1xyXG5tYWlsQXBwLnNlcnZpY2UoJ2RhdGFTZXJ2aWNlJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9kYXRhU2VydmljZScpKTtcclxubWFpbEFwcC5zZXJ2aWNlKCdpbml0aWFsaXphdGlvblNlcnZpY2UnLCByZXF1aXJlKCcuL3NlcnZpY2VzL2luaXRpYWxpemF0aW9uU2VydmljZScpKTtcclxubWFpbEFwcC5zZXJ2aWNlKCdsZXR0ZXJTZXJ2aWNlJywgcmVxdWlyZSgnLi9zZXJ2aWNlcy9sZXR0ZXJTZXJ2aWNlJykpO1xyXG5tYWlsQXBwLnNlcnZpY2UoJ3N0YXRlU2VydmljZScsIHJlcXVpcmUoJy4vc2VydmljZXMvc3RhdGVTZXJ2aWNlJykpO1xyXG5cclxubWFpbEFwcC5maWx0ZXIoJ3Nob3J0X2NvbnRlbnQnLCByZXF1aXJlKCcuL3NlcnZpY2VzL2ZpbHRlcnMnKSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtYWlsQXBwO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBhdXRob3JpemF0aW9uID0gYW5ndWxhci5tb2R1bGUoJ2F1dGhvcml6YXRpb24nLCBbXSk7XHJcblxyXG5hdXRob3JpemF0aW9uLmRpcmVjdGl2ZSgnc2lnbkluJywgcmVxdWlyZSgnLi9hdXRob3JpemF0aW9uLWRpcmVjdGl2ZScpKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gYXV0aG9yaXphdGlvbjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL2F1dGhvcml6YXRpb24tbW9kdWxlL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IGF1dGhUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUvYXV0aG9yaXphdGlvbi5odG1sJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHRlbXBsYXRlOiBhdXRoVGVtcGxhdGUsXHJcbiAgICAgICAgc2NvcGU6IHt9LFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKGF1dGhvcml6YXRpb25TZXJ2aWNlKXtcclxuICAgICAgICAgICAgdGhpcy5sb2dpbiA9ICcnO1xyXG4gICAgICAgICAgICB0aGlzLnBhc3N3b3JkID0gJyc7XHJcblxyXG4gICAgICAgICAgICB0aGlzLmVudGVyID0gZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUua2V5Q29kZSA9PT0gMTMpIHRoaXMuc2lnbkluKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLnNpZ25JbiA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgYXV0aG9yaXphdGlvblNlcnZpY2Uuc2lnbkluKHtsb2dpbjogdGhpcy5sb2dpbiwgcGFzc3dvcmQ6IHRoaXMucGFzc3dvcmR9KVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5jbGVhckxTID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXdpbmRvdy5sb2NhbFN0b3JhZ2UgfHwgIXdpbmRvdy5sb2NhbFN0b3JhZ2UudXNlcnMgJiYgIXdpbmRvdy5sb2NhbFN0b3JhZ2UubGV0dGVycykgYWxlcnQoJ9CU0LDQvdC90YvRhSDQvdC10YIhINCj0LTQsNC70Y/RgtGMINC90LXRh9C10LPQviEnKTtcclxuICAgICAgICAgICAgICAgIGlmICh3aW5kb3cubG9jYWxTdG9yYWdlLnVzZXJzIHx8IHdpbmRvdy5sb2NhbFN0b3JhZ2UubGV0dGVycykge1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5sb2NhbFN0b3JhZ2UucmVtb3ZlSXRlbSgndXNlcnMnKTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cubG9jYWxTdG9yYWdlLnJlbW92ZUl0ZW0oJ2xldHRlcnMnKTtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgn0JTQsNC90L3Ri9C1INGD0YHQv9C10YjQvdC+INGD0LTQsNC70LXQvdGLIScpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb250cm9sbGVyQXM6ICd1c2VyJyxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSkge1xyXG4gICAgICAgICAgICBzY29wZS5mID0gMTA7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvYXV0aG9yaXphdGlvbi1tb2R1bGUvYXV0aG9yaXphdGlvbi1kaXJlY3RpdmUuanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxoMT7QktGF0L7QtDwvaDE+IDx0YWJsZT4gPHRyPiA8dGQ+0JvQvtCz0LjQvTo8L3RkPiA8dGQ+PGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5nLW1vZGVsPVxcXCJ1c2VyLmxvZ2luXFxcIiBuZy1rZXlwcmVzcz1cXFwidXNlci5lbnRlcigkZXZlbnQpXFxcIj48L3RkPiA8L3RyPiA8dHI+IDx0ZD7Qn9Cw0YDQvtC70Yw6PC90ZD4gPHRkPjxpbnB1dCB0eXBlPVxcXCJwYXNzd29yZFxcXCIgbmctbW9kZWw9XFxcInVzZXIucGFzc3dvcmRcXFwiIG5nLWtleXByZXNzPVxcXCJ1c2VyLmVudGVyKCRldmVudClcXFwiPjwvdGQ+IDwvdHI+IDwvdGFibGU+IDxkaXYgY2xhc3M9XFxcInNpZ25JblxcXCIgbmctY2xpY2s9XFxcInVzZXIuc2lnbkluKClcXFwiPtCS0L7QudGC0Lg8L2Rpdj4gPGRpdiBpZD1cXFwibm90ZVxcXCI+IDxzcGFuIGNsYXNzPVxcXCJ6XFxcIj7Qm9C+0LPQuNC9Ojwvc3Bhbj5cXG48c3Bhbj50ZXN0PC9zcGFuPlxcbjxzcGFuIGNsYXNzPVxcXCJ6XFxcIj7Qn9C+0YDQvtC70Yw6PC9zcGFuPlxcbjxzcGFuPjEyMzwvc3Bhbj4gPGRpdiBjbGFzcz1cXFwiY2xlYXJMU1xcXCIgbmctY2xpY2s9XFxcInVzZXIuY2xlYXJMUygpXFxcIj7QntGH0LjRgdGC0LjRgtGMIExvY2FsU3RvcmFnZTwvZGl2PiA8L2Rpdj5cIjtcbm5nTW9kdWxlLnJ1bihbXCIkdGVtcGxhdGVDYWNoZVwiLGZ1bmN0aW9uKGMpe2MucHV0KFwiYXV0aG9yaXphdGlvbi5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9hdXRob3JpemF0aW9uLW1vZHVsZS90ZW1wbGF0ZS9hdXRob3JpemF0aW9uLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBtZW51ID0gYW5ndWxhci5tb2R1bGUoJ21lbnUnLCBbXSk7XHJcblxyXG5tZW51LmRpcmVjdGl2ZSgnbWFpbERpcmVjdG9yaWVzJywgcmVxdWlyZSgnLi9kaXJlY3Rvcmllcy1tZW51L2RpcmVjdG9yaWVzLW1lbnUtZGlyZWN0aXZlJykpO1xyXG5tZW51LmRpcmVjdGl2ZSgnbWVudScsIHJlcXVpcmUoJy4vbWVudS9tZW51LWRpcmVjdGl2ZScpKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gbWVudTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL21lbnUtbW9kdWxlL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IGRpclRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS9kaXJlY3Rvcmllcy1tZW51Lmh0bWwnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHRlbXBsYXRlOiBkaXJUZW1wbGF0ZSxcclxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiAoc3RhdGVTZXJ2aWNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0ID0gc3RhdGVTZXJ2aWNlLnNldEFjdGl2ZVN0YXRlO1xyXG4gICAgICAgICAgICB0aGlzLmNoZWNrQ2xhc3MgPSBzdGF0ZVNlcnZpY2UuY2hlY2tEaXJDbGFzcztcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ2RpcmVjdG9yeSdcclxuICAgIH1cclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL21lbnUtbW9kdWxlL2RpcmVjdG9yaWVzLW1lbnUvZGlyZWN0b3JpZXMtbWVudS1kaXJlY3RpdmUuanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxkaXYgaWQ9XFxcIm1haWxEaXJcXFwiPiA8ZGl2IGlkPVxcXCJpbmJveFxcXCIgbmctY2xpY2s9XFxcImRpcmVjdG9yeS5zZXQoJ2luYm94JylcXFwiIG5nLWNsYXNzPVxcXCJkaXJlY3RvcnkuY2hlY2tDbGFzcygnaW5ib3gnKVxcXCI+PHNwYW4+0JLRhdC+0LTRj9GJ0LjQtTwvc3Bhbj48L2Rpdj4gPGRpdiBpZD1cXFwiY2hcXFwiIG5nLWNsaWNrPVxcXCJkaXJlY3Rvcnkuc2V0KCdkcmFmdHMnKVxcXCIgbmctY2xhc3M9XFxcImRpcmVjdG9yeS5jaGVja0NsYXNzKCdkcmFmdHMnKVxcXCI+PHNwYW4+0KfQtdGA0L3QvtCy0LjQutC4PC9zcGFuPjwvZGl2PiA8ZGl2IGlkPVxcXCJzZW50XFxcIiBuZy1jbGljaz1cXFwiZGlyZWN0b3J5LnNldCgnc2VudCcpXFxcIiBuZy1jbGFzcz1cXFwiZGlyZWN0b3J5LmNoZWNrQ2xhc3MoJ3NlbnQnKVxcXCI+PHNwYW4+0J7RgtC/0YDQsNCy0LvQtdC90L3Ri9C1PC9zcGFuPjwvZGl2PiA8ZGl2IGlkPVxcXCJmYXZvcml0ZXNcXFwiIG5nLWNsaWNrPVxcXCJkaXJlY3Rvcnkuc2V0KCdmYXZvcml0ZXMnKVxcXCIgbmctY2xhc3M9XFxcImRpcmVjdG9yeS5jaGVja0NsYXNzKCdmYXZvcml0ZXMnKVxcXCI+PHNwYW4+0JjQt9Cx0YDQsNC90L3QvtC1PC9zcGFuPjwvZGl2PiA8ZGl2IGlkPVxcXCJjYXJ0XFxcIiBuZy1jbGljaz1cXFwiZGlyZWN0b3J5LnNldCgndHJhc2gnKVxcXCIgbmctY2xhc3M9XFxcImRpcmVjdG9yeS5jaGVja0NsYXNzKCd0cmFzaCcpXFxcIj48c3Bhbj7QmtC+0YDQt9C40L3QsDwvc3Bhbj48L2Rpdj4gPC9kaXY+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcImRpcmVjdG9yaWVzLW1lbnUuaHRtbFwiLHYxKX1dKTtcbm1vZHVsZS5leHBvcnRzPXYxO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvbWVudS1tb2R1bGUvZGlyZWN0b3JpZXMtbWVudS90ZW1wbGF0ZS9kaXJlY3Rvcmllcy1tZW51Lmh0bWxcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgbWVudVRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZS9tZW51Lmh0bWwnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oJGRvY3VtZW50KSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgdGVtcGxhdGU6IG1lbnVUZW1wbGF0ZSxcclxuICAgICAgICBzY29wZToge30sXHJcbiAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gKHN0YXRlU2VydmljZSwgbGV0dGVyU2VydmljZSwgJHN0YXRlUGFyYW1zLCBhdXRob3JpemF0aW9uU2VydmljZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldERpcmVjdG9yeSA9IHN0YXRlU2VydmljZS5zZXRBY3RpdmVTdGF0ZTtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50U3RhdGUgPSBzdGF0ZVNlcnZpY2UuY3VycmVudFN0YXRlO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5nZXRQcmV2aWV3RGlyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWxldHRlclNlcnZpY2Uuc2VsZWN0ZWQubGV0dGVyKSByZXR1cm47XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gJHN0YXRlUGFyYW1zLmRpcmVjdG9yeTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHRoaXMucmVtb3ZlID0gbGV0dGVyU2VydmljZS5yZW1vdmVMZXR0ZXI7XHJcbiAgICAgICAgICAgIHRoaXMucmVjb3ZlciA9IGxldHRlclNlcnZpY2UucmVjb3ZlckxldHRlcjtcclxuICAgICAgICAgICAgdGhpcy5zZW5kID0gbGV0dGVyU2VydmljZS5tb3ZlTmV3TGV0dGVyO1xyXG4gICAgICAgICAgICB0aGlzLmVkaXQgPSBsZXR0ZXJTZXJ2aWNlLmVkaXREcmFmdDtcclxuICAgICAgICAgICAgdGhpcy5sb2dpbk91dCA9IGF1dGhvcml6YXRpb25TZXJ2aWNlLmxvZ2luT3V0O1xyXG5cclxuICAgICAgICAgICAgdGhpcy5uZXdMZXR0ZXIgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIGxldHRlclNlcnZpY2UubmV3TGV0dGVyLmxldHRlciA9IHt9O1xyXG4gICAgICAgICAgICAgICAgc3RhdGVTZXJ2aWNlLnNldEFjdGl2ZVN0YXRlKCduZXdMZXR0ZXJGb3JtJyk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICB0aGlzLnJlcGxheSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgbGV0dGVyU2VydmljZS5uZXdMZXR0ZXIubGV0dGVyLnRvID0gbGV0dGVyU2VydmljZS5zZWxlY3RlZC5sZXR0ZXIuc2VuZGVyO1xyXG4gICAgICAgICAgICAgICAgc3RhdGVTZXJ2aWNlLnNldEFjdGl2ZVN0YXRlKCduZXdMZXR0ZXJGb3JtJyk7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb250cm9sbGVyQXM6ICdtZW51JyxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSkge1xyXG4gICAgICAgICAgICBzY29wZS5zaG93TWVudSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAkZG9jdW1lbnQub24oJ2NsaWNrJywgZnVuY3Rpb24oZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGUudGFyZ2V0LmlkID09PSAnc2V0dGluZ3NCdXR0b24nKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2NvcGUuc2hvd01lbnUgPSAhc2NvcGUuc2hvd01lbnU7XHJcbiAgICAgICAgICAgICAgICAgICAgZS50YXJnZXQuY2xhc3NMaXN0LnRvZ2dsZSgnYWN0aXZlU2V0dGluZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIHNjb3BlLiRkaWdlc3QoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3NldHRpbmdzQnV0dG9uJykpIHtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS5zaG93TWVudSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdzZXR0aW5nc0J1dHRvbicpLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZVNldHRpbmcnKTtcclxuICAgICAgICAgICAgICAgICAgICBzY29wZS4kZGlnZXN0KCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcclxuXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tZW51LW1vZHVsZS9tZW51L21lbnUtZGlyZWN0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFuZ3VsYXI9d2luZG93LmFuZ3VsYXIsbmdNb2R1bGU7XG50cnkge25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFtcIm5nXCJdKX1cbmNhdGNoKGUpe25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFwibmdcIixbXSl9XG52YXIgdjE9XCI8ZGl2PiA8ZGl2IGlkPVxcXCJ1c2VyXFxcIj7QnNC+0Y9f0J/QvtGH0YLQsEDQs9C00LUt0YLQvi7RgtCw0Lw8L2Rpdj4gPGRpdiBjbGFzcz1cXFwidXNlclNldHRpbmdzXFxcIj4gPGRpdiBpZD1cXFwibG9naW5PdXRcXFwiIG5nLWNsaWNrPVxcXCJtZW51LmxvZ2luT3V0KClcXFwiPtCS0YvQudGC0Lg8L2Rpdj4gPGRpdiBpZD1cXFwic2V0dGluZ3NCdXR0b25cXFwiPjwvZGl2PiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwic2V0dGluZ3NNZW51XFxcIiBuZy1zaG93PVxcXCJzaG93TWVudVxcXCI+IDx1bD4gPGxpIG5nLWNsaWNrPVxcXCJtZW51LnNldERpcmVjdG9yeSgnY29udGFjdHMnKVxcXCI+0JrQvtC90YLQsNC60YLRizwvbGk+IDwvdWw+IDwvZGl2PiA8ZGl2IGlkPVxcXCJuZXdMZXR0ZXJcXFwiIG5nLWNsaWNrPVxcXCJtZW51Lm5ld0xldHRlcigpXFxcIj7QndCw0L/QuNGB0LDRgtGMINC/0LjRgdGM0LzQvjwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJuZXdMZXR0ZXJNZW51XFxcIiBuZy1zaG93PVxcXCJtZW51LmN1cnJlbnRTdGF0ZSgpID09PSAnbmV3TGV0dGVyRm9ybSdcXFwiPiA8ZGl2IGlkPVxcXCJzZW5kXFxcIiBuZy1jbGljaz1cXFwibWVudS5zZW5kKCdzZW50JylcXFwiPtCe0YLQv9GA0LDQstC40YLRjDwvZGl2PiA8ZGl2IGlkPVxcXCJzYXZlXFxcIiBuZy1jbGljaz1cXFwibWVudS5zZW5kKCdkcmFmdHMnKVxcXCI+0KHQvtGF0YDQsNC90LjRgtGMINGH0LXRgNC90L7QstC40Lo8L2Rpdj4gPC9kaXY+IDxkaXYgY2xhc3M9XFxcInByZXZpZXdMZXR0ZXJNZW51XFxcIiBuZy1zaG93PVxcXCJtZW51LmN1cnJlbnRTdGF0ZSgpID09PSAncHJldmlldydcXFwiPiA8ZGl2IGlkPVxcXCJyZXBseVxcXCIgbmctc2hvdz1cXFwibWVudS5nZXRQcmV2aWV3RGlyKCkgPT09ICdpbmJveCdcXFwiIG5nLWNsaWNrPVxcXCJtZW51LnJlcGxheSgpXFxcIj7QntGC0LLQtdGC0LjRgtGMPC9kaXY+IDxkaXYgaWQ9XFxcInJlY292ZXJcXFwiIG5nLXNob3c9XFxcIm1lbnUuZ2V0UHJldmlld0RpcigpID09PSAndHJhc2gnXFxcIiBuZy1jbGljaz1cXFwibWVudS5yZWNvdmVyKClcXFwiPtCS0L7RgdGB0YLQsNC90L7QstC40YLRjDwvZGl2PiA8ZGl2IGlkPVxcXCJlZGl0XFxcIiBuZy1zaG93PVxcXCJtZW51LmdldFByZXZpZXdEaXIoKSA9PT0gJ2RyYWZ0cydcXFwiIG5nLWNsaWNrPVxcXCJtZW51LmVkaXQoKVxcXCI+0KDQtdC00LDQutGC0LjRgNC+0LLQsNGC0Ywg0YfQtdGA0L3QvtCy0LjQujwvZGl2PiA8ZGl2IGlkPVxcXCJkZWxldGVcXFwiIG5nLWNsaWNrPVxcXCJtZW51LnJlbW92ZSgpXFxcIj7Qo9C00LDQu9C40YLRjDwvZGl2PiA8L2Rpdj4gPC9kaXY+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcIm1lbnUuaHRtbFwiLHYxKX1dKTtcbm1vZHVsZS5leHBvcnRzPXYxO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvbWVudS1tb2R1bGUvbWVudS90ZW1wbGF0ZS9tZW51Lmh0bWxcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5jb25zdCBtYWluVmlldyA9IGFuZ3VsYXIubW9kdWxlKCdtYWluLXZpZXcnLCBbXSk7XHJcblxyXG5tYWluVmlldy5kaXJlY3RpdmUoJ21haW5Db250YWluZXInLCByZXF1aXJlKCcuL21haW4tY29udGFpbmVyLWRpcmVjdGl2ZS9tYWluLWNvbnRhaW5lci1kaXJlY3RpdmUnKSk7XHJcbm1haW5WaWV3LmRpcmVjdGl2ZSgnY29udGFjdHMnLCByZXF1aXJlKCcuL2NvbnRhY3RzLWRpcmVjdGl2ZS9jb250YWN0c0RpcmVjdGl2ZScpKTtcclxubWFpblZpZXcuZGlyZWN0aXZlKCdsZXR0ZXInLCByZXF1aXJlKCcuL2xldHRlci1kaXJlY3RpdmUvbGV0dGVyLWRpcmVjdGl2ZScpKTtcclxubWFpblZpZXcuZGlyZWN0aXZlKCdsb2FkaW5nJywgcmVxdWlyZSgnLi9sb2FkaW5nLWRpcmVjdGl2ZS9sb2FkaW5nLWRpcmVjdGl2ZScpKTtcclxubWFpblZpZXcuZGlyZWN0aXZlKCdwcmV2aWV3JywgcmVxdWlyZSgnLi9wcmV2aWV3LWRpcmVjdGl2ZS9wcmV2aWV3LWRpcmVjdGl2ZScpKTtcclxubWFpblZpZXcuZGlyZWN0aXZlKCd1c2VyJywgcmVxdWlyZSgnLi91c2VyLWRpcmVjdGl2ZS91c2VyLWRpcmVjdGl2ZScpKTtcclxubWFpblZpZXcuZGlyZWN0aXZlKCdpbmJveExldHRlcnMnLCByZXF1aXJlKCcuL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy9pbmJveC1kaXJlY3RpdmUnKSk7XHJcbm1haW5WaWV3LmRpcmVjdGl2ZSgnc2VudExldHRlcnMnLCByZXF1aXJlKCcuL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy9zZW50LWRpcmVjdGl2ZScpKTtcclxubWFpblZpZXcuZGlyZWN0aXZlKCdjYXJ0TGV0dGVycycsIHJlcXVpcmUoJy4vbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL3RyYXNoLWRpcmVjdGl2ZScpKTtcclxubWFpblZpZXcuZGlyZWN0aXZlKCduZXdMZXR0ZXInLCByZXF1aXJlKCcuL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy9uZXdMZXR0ZXItZGlyZWN0aXZlJykpO1xyXG5tYWluVmlldy5kaXJlY3RpdmUoJ2RyYWZ0cycsIHJlcXVpcmUoJy4vbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL2RyYWZ0cy1kaXJlY3RpdmUnKSk7XHJcbm1haW5WaWV3LmRpcmVjdGl2ZSgnZmF2b3JpdGVzJywgcmVxdWlyZSgnLi9sZXR0ZXJzLWRpcmVjdG9yaWVzLWRpcmVjdGl2ZXMvZmF2b3JpdGVzLWRpcmVjdGl2ZScpKTtcclxubWFpblZpZXcuZGlyZWN0aXZlKCdmaWx0ZXJlZExldHRlcnMnLCByZXF1aXJlKCcuL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy9maWx0ZXJlZC1kaXJlY3RpdmUnKSk7XHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBtYWluVmlldztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6J0FFJyxcclxuICAgICAgICBzY29wZTogdHJ1ZSxcclxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbihsZXR0ZXJTZXJ2aWNlLCBkYXRhU2VydmljZSkge1xyXG4gICAgICAgICAgICB0aGlzLmJhc2UgPSBkYXRhU2VydmljZS5iYXNlO1xyXG4gICAgICAgICAgICB0aGlzLnNlbGVjdGVkID0gbGV0dGVyU2VydmljZS5zZWxlY3RlZDtcclxuICAgICAgICAgICAgdGhpcy5uZXdMZXR0ZXIgPSBsZXR0ZXJTZXJ2aWNlLm5ld0xldHRlcjtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbnRyb2xsZXJBczogJ2RpcmVjdG9yeSdcclxuICAgIH1cclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbWFpbi1jb250YWluZXItZGlyZWN0aXZlL21haW4tY29udGFpbmVyLWRpcmVjdGl2ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgY29udGFjdHNUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUvY29udGFjdHMuaHRtbCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsZXR0ZXJTZXJ2aWNlLCBzdGF0ZVNlcnZpY2UsIGRhdGFTZXJ2aWNlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgdGVtcGxhdGU6IGNvbnRhY3RzVGVtcGxhdGUsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgdXNlcnM6ICc9J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUpIHtcclxuICAgICAgICAgICAgc2NvcGUubmV3VXNlciA9IHt9O1xyXG4gICAgICAgICAgICBzY29wZS5hZGRDb250YWN0ID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS51c2Vycy5wdXNoKHNjb3BlLm5ld1VzZXIpO1xyXG4gICAgICAgICAgICAgICAgc2NvcGUubmV3VXNlciA9IHt9O1xyXG4gICAgICAgICAgICAgICAgZGF0YVNlcnZpY2Uuc2F2ZVVzZXJUb1N0b3JhZ2UoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2NvcGUucmVtb3ZlQ29udGFjdCA9IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS51c2Vycy5zcGxpY2UoaWQsIDEpO1xyXG4gICAgICAgICAgICAgICAgZGF0YVNlcnZpY2Uuc2F2ZVVzZXJUb1N0b3JhZ2UoKTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgc2NvcGUubWFpbFRvID0gZnVuY3Rpb24obWFpbCkge1xyXG4gICAgICAgICAgICAgICAgbGV0dGVyU2VydmljZS5uZXdMZXR0ZXIubGV0dGVyID0ge1xyXG4gICAgICAgICAgICAgICAgICAgIHRvOiBtYWlsXHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICAgICAgc3RhdGVTZXJ2aWNlLnNldEFjdGl2ZVN0YXRlKCduZXdMZXR0ZXJGb3JtJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvY29udGFjdHMtZGlyZWN0aXZlL2NvbnRhY3RzRGlyZWN0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gMTJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhbmd1bGFyPXdpbmRvdy5hbmd1bGFyLG5nTW9kdWxlO1xudHJ5IHtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShbXCJuZ1wiXSl9XG5jYXRjaChlKXtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShcIm5nXCIsW10pfVxudmFyIHYxPVwiPGRpdiBjbGFzcz1cXFwidGl0dGxlXFxcIj4gPGgyPtCa0L7QvdGC0LDQutGC0Ys8L2gyPiA8ZGl2IGNsYXNzPVxcXCJsaW5lXFxcIj48L2Rpdj4gPC9kaXY+IDx1c2VyIG5nLXJlcGVhdD1cXFwidXNlciBpbiB1c2Vyc1xcXCI+PC91c2VyPiA8ZGl2IGNsYXNzPVxcXCJuZXdVc2VyXFxcIj4gPGRpdiBjbGFzcz1cXFwibmV3VXNlclRpdHRsZVxcXCI+0JTQvtCx0LDQstC40YLRjCDQutC+0L3RgtCw0LrRgjo8L2Rpdj4gPHRhYmxlIGNsYXNzPVxcXCJpbmZvXFxcIj4gPHRyPiA8dGQgY2xhc3M9XFxcImtleXNcXFwiPtCY0LzRjzo8L3RkPiA8dGQ+IDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwibmV3VXNlci5uYW1lXFxcIj4gPC90ZD4gPC90cj4gPHRyPiA8dGQgY2xhc3M9XFxcImtleXNcXFwiPtCU0LDRgtCwINGA0L7QttC00LXQvdC40Y86PC90ZD4gPHRkPiA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcIm5ld1VzZXIuYmlydGhEYXRlXFxcIj4gPC90ZD4gPC90cj4gPHRyPiA8dGQgY2xhc3M9XFxcImtleXNcXFwiPtCf0L7Quzo8L3RkPiA8dGQ+IDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwibmV3VXNlci5nZW5kZXJcXFwiPiA8L3RkPiA8L3RyPiA8dHI+IDx0ZCBjbGFzcz1cXFwia2V5c1xcXCI+0JDQtNGA0LXRgTo8L3RkPiA8dGQ+IDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwibmV3VXNlci5hZGRyZXNzXFxcIj4gPC90ZD4gPC90cj4gPHRyPiA8dGQgY2xhc3M9XFxcImtleXNcXFwiPkVtYWlsOjwvdGQ+IDx0ZD4gPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5nLW1vZGVsPVxcXCJuZXdVc2VyLmVtYWlsXFxcIj4gPC90ZD4gPC90cj4gPHRyPiA8dGQgY2xhc3M9XFxcImtleXNcXFwiPkF2YXRhclVybDo8L3RkPiA8dGQ+IDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwibmV3VXNlci5hdmF0YXJcXFwiPiA8L3RkPiA8L3RyPiA8L3RhYmxlPiA8ZGl2IGNsYXNzPVxcXCJhZGRDb250YWN0XFxcIiBuZy1jbGljaz1cXFwiYWRkQ29udGFjdCgpXFxcIj7QlNC+0LHQsNCy0LjRgtGMPC9kaXY+IDwvZGl2PlwiO1xubmdNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsZnVuY3Rpb24oYyl7Yy5wdXQoXCJjb250YWN0cy5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL2NvbnRhY3RzLWRpcmVjdGl2ZS90ZW1wbGF0ZS9jb250YWN0cy5odG1sXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBsZXR0ZXJUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGUvbGV0dGVyLmh0bWwnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24obGV0dGVyU2VydmljZSwgc3RhdGVTZXJ2aWNlLCBkYXRhU2VydmljZSkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHRlbXBsYXRlOiBsZXR0ZXJUZW1wbGF0ZSxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSkge1xyXG5cclxuICAgICAgICAgICAgc2NvcGUucmVtb3ZlID0gZnVuY3Rpb24oZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xyXG4gICAgICAgICAgICAgICAgbGV0dGVyU2VydmljZS5yZW1vdmVMZXR0ZXIoc2NvcGUubGV0dGVyKVxyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc2NvcGUucHJldmlldyA9IGZ1bmN0aW9uKHNjb3BlKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgZGlyZWN0b3J5ID0gc2NvcGUuZGlyZWN0b3J5O1xyXG4gICAgICAgICAgICAgICAgaWYgKGRpcmVjdG9yeSA9PT0gJ2ZpbHRlcmVkJykgZGlyZWN0b3J5ID0gJ2luYm94JztcclxuICAgICAgICAgICAgICAgIGlmIChkaXJlY3RvcnkgPT09ICdmYXZvcml0ZXMnKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZGlyZWN0b3J5ID0gc2NvcGUubGV0dGVyLmRpcmVjdG9yeTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHZhciBpbmRleCA9IChkYXRhU2VydmljZS5iYXNlLmxldHRlcnNbZGlyZWN0b3J5XS5pbmRleE9mKHNjb3BlLmxldHRlcikpICsgJ18nICsgZGlyZWN0b3J5O1xyXG4gICAgICAgICAgICAgICAgc3RhdGVTZXJ2aWNlLnNldEFjdGl2ZVN0YXRlKCdwcmV2aWV3Jyx7ZGlyOiBzY29wZS5kaXJlY3RvcnksIGluZGV4OiBpbmRleH0pO1xyXG4gICAgICAgICAgICAgICAgaWYgKHNjb3BlLmxldHRlci51bnJlYWQpIHNjb3BlLmxldHRlci51bnJlYWQgPSBmYWxzZTtcclxuICAgICAgICAgICAgICAgIGRhdGFTZXJ2aWNlLnNhdmVMZXR0ZXJzVG9TdG9yYWdlKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzY29wZS50b2dnbGVGYXZvcml0ZSA9IGZ1bmN0aW9uKGxldHRlciwgZXZlbnQpIHtcclxuICAgICAgICAgICAgICAgIGlmKGV2ZW50KSBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcclxuICAgICAgICAgICAgICAgIGxldHRlclNlcnZpY2UudG9nZ2xlRmF2b3JpdGUobGV0dGVyKTtcclxuICAgICAgICAgICAgfTtcclxuXHJcbiAgICAgICAgICAgIHNjb3BlLmNoZWNrVW5yZWFkQ2xhc3MgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzY29wZS5sZXR0ZXIudW5yZWFkID8gJ3VucmVhZCcgOiAnJ1xyXG4gICAgICAgICAgICB9O1xyXG5cclxuICAgICAgICAgICAgc2NvcGUuY2hlY2tGYXZvcml0ZSA9IGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNjb3BlLmxldHRlci5mYXZvcml0ZSA/ICdhY3RpdmVGYXZvcml0ZScgOiAnJ1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgIH1cclxuICAgIH07XHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL2xldHRlci1kaXJlY3RpdmUvbGV0dGVyLWRpcmVjdGl2ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxkaXYgY2xhc3M9XFxcIm1haWxcXFwiPiA8ZGl2IGNsYXNzPVxcXCJtYWlsSGVhZGVyXFxcIiBuZy1jbGFzcz1cXFwiY2hlY2tVbnJlYWRDbGFzcygpXFxcIj4gPGRpdiBjbGFzcz1cXFwibWFpbERhdGVcXFwiPnt7IGxldHRlci5kYXRlIHwgZGF0ZTogJ0VFRSwgZGQgTU1NTSB5eXl5IC0gSEg6bW0nfX08L2Rpdj4gPGRpdiBjbGFzcz1cXFwic2VuZGVyTmFtZVxcXCI+e3sgbGV0dGVyLnNlbmRlciB9fTwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJtYWlsVGl0bGVcXFwiPnt7IGxldHRlci50aXR0bGUgfX08L2Rpdj4gPC9kaXY+IDxwIGNsYXNzPVxcXCJtYWlsQ29udGVudFxcXCI+IHt7IGxldHRlci5jb250ZW50IHwgc2hvcnRfY29udGVudCB9fSA8L3A+IDxkaXYgY2xhc3M9XFxcInJlbW92ZVxcXCIgbmctY2xpY2s9XFxcInJlbW92ZSgkZXZlbnQpXFxcIj48L2Rpdj4gPGRpdiBjbGFzcz1cXFwiYWRkVG9GYXZvcml0ZVxcXCIgbmctY2xpY2s9XFxcInRvZ2dsZUZhdm9yaXRlKGxldHRlciwgJGV2ZW50KVxcXCIgbmctY2xhc3M9XFxcImNoZWNrRmF2b3JpdGUoKVxcXCI+PC9kaXY+IDwvZGl2PlwiO1xubmdNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsZnVuY3Rpb24oYyl7Yy5wdXQoXCJsZXR0ZXIuaHRtbFwiLHYxKX1dKTtcbm1vZHVsZS5leHBvcnRzPXYxO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9sZXR0ZXItZGlyZWN0aXZlL3RlbXBsYXRlL2xldHRlci5odG1sXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBsb2FkaW5nVGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlL2xvYWRpbmcuaHRtbCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihhbmltYXRpb25TZXJ2aWNlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgdGVtcGxhdGU6IGxvYWRpbmdUZW1wbGF0ZSxcclxuXHJcbiAgICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oaW5pdGlhbGl6YXRpb25TZXJ2aWNlLCAkc3RhdGUpIHtcclxuICAgICAgICAgICAgaWYgKCFpbml0aWFsaXphdGlvblNlcnZpY2UuZ2V0SW5pdCgpKSAkc3RhdGUuZ28oJ21haWwuaW5ib3gnKTtcclxuICAgICAgICB9LFxyXG4gICAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGFuaW1hdGlvblNlcnZpY2UubG9hZGluZyhlbGVtZW50LmNoaWxkcmVuKClbMF0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbG9hZGluZy1kaXJlY3RpdmUvbG9hZGluZy1kaXJlY3RpdmUuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFuZ3VsYXI9d2luZG93LmFuZ3VsYXIsbmdNb2R1bGU7XG50cnkge25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFtcIm5nXCJdKX1cbmNhdGNoKGUpe25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFwibmdcIixbXSl9XG52YXIgdjE9XCI8ZGl2PkxvYWRpbmcgbGV0dGVyczwvZGl2PlwiO1xubmdNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsZnVuY3Rpb24oYyl7Yy5wdXQoXCJsb2FkaW5nLmh0bWxcIix2MSl9XSk7XG5tb2R1bGUuZXhwb3J0cz12MTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbG9hZGluZy1kaXJlY3RpdmUvdGVtcGxhdGUvbG9hZGluZy5odG1sXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBwcmV2aWV3VGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlL3ByZXZpZXcuaHRtbCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICB0ZW1wbGF0ZTogcHJldmlld1RlbXBsYXRlLFxyXG4gICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgIHNlbGVjdGVkOiAnPSdcclxuICAgICAgICB9LFxyXG4gICAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzdGF0ZVBhcmFtcywgbGV0dGVyU2VydmljZSwgc3RhdGVTZXJ2aWNlLCBkYXRhU2VydmljZSkge1xyXG4gICAgICAgICAgICB2YXIgZGlyZWN0b3J5ID0gJHN0YXRlUGFyYW1zLmRpcmVjdG9yeSxcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gJHN0YXRlUGFyYW1zLmluZGV4LnNsaWNlKDAsIDEpO1xyXG4gICAgICAgICAgICBpZiAoZGlyZWN0b3J5ID09PSAnZmlsdGVyZWQnKSBkaXJlY3RvcnkgPSAnaW5ib3gnO1xyXG4gICAgICAgICAgICBpZiAoZGlyZWN0b3J5ID09PSAnZmF2b3JpdGVzJykge1xyXG4gICAgICAgICAgICAgICAgZGlyZWN0b3J5ID0gJHN0YXRlUGFyYW1zLmluZGV4LnNsaWNlKDIpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGxldHRlclNlcnZpY2Uuc2VsZWN0ZWQubGV0dGVyID0gZGF0YVNlcnZpY2UuYmFzZS5sZXR0ZXJzW2RpcmVjdG9yeV1baW5kZXhdO1xyXG5cclxuICAgICAgICAgICAgdGhpcy5iYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZVNlcnZpY2Uuc2V0QWN0aXZlU3RhdGUoJHN0YXRlUGFyYW1zLmRpcmVjdG9yeSlcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udHJvbGxlckFzOiAncHJldmlldydcclxuICAgIH1cclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvcHJldmlldy1kaXJlY3RpdmUvcHJldmlldy1kaXJlY3RpdmUuanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFuZ3VsYXI9d2luZG93LmFuZ3VsYXIsbmdNb2R1bGU7XG50cnkge25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFtcIm5nXCJdKX1cbmNhdGNoKGUpe25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFwibmdcIixbXSl9XG52YXIgdjE9XCI8ZGl2IGNsYXNzPVxcXCJoZWFkZXIgZ3JvdXBcXFwiPiA8ZGl2IGNsYXNzPVxcXCJiYWNrXFxcIiBuZy1jbGljaz1cXFwicHJldmlldy5iYWNrKClcXFwiPiYjODU5MiA8ZGl2IGNsYXNzPVxcXCJiYWNrVGV4dFxcXCI+0J3QsNC30LDQtDwvZGl2PjwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJmcm9tXFxcIj7QntGCINC60L7Qs9C+OiA8c3Bhbj57eyBzZWxlY3RlZC5sZXR0ZXIuc2VuZGVyIH19PC9zcGFuPjwvZGl2PiA8ZGl2IGNsYXNzPVxcXCJkYXRlXFxcIj7QlNCw0YLQsDogPHNwYW4+e3sgc2VsZWN0ZWQubGV0dGVyLmRhdGUgfCBkYXRlOiAnRUVFLCBkZCBNTU1NIHl5eXkgLSBISDptbScgfX08L3NwYW4+PC9kaXY+IDxkaXYgY2xhc3M9XFxcInRvXFxcIj7QmtC+0LzRgzogPHNwYW4+e3sgc2VsZWN0ZWQubGV0dGVyLnRvIH19PC9zcGFuPjwvZGl2PiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwidGl0bGVcXFwiPnt7IHNlbGVjdGVkLmxldHRlci50aXR0bGUgfX08L2Rpdj4gPHAgY2xhc3M9XFxcImNvbnRlbnRcXFwiPnt7IHNlbGVjdGVkLmxldHRlci5jb250ZW50IH19PC9wPlwiO1xubmdNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsZnVuY3Rpb24oYyl7Yy5wdXQoXCJwcmV2aWV3Lmh0bWxcIix2MSl9XSk7XG5tb2R1bGUuZXhwb3J0cz12MTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvcHJldmlldy1kaXJlY3RpdmUvdGVtcGxhdGUvcHJldmlldy5odG1sXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCB1c2VyVGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlL3VzZXIuaHRtbCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbihsZXR0ZXJTZXJ2aWNlLCBzdGF0ZVNlcnZpY2UsIGRhdGFTZXJ2aWNlKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgdGVtcGxhdGU6IHVzZXJUZW1wbGF0ZSxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSkge1xyXG4gICAgICAgICAgICBzY29wZS5lZGl0TW9kZSA9IGZhbHNlO1xyXG4gICAgICAgICAgICBzY29wZS50b2dnbGVNb2RlID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzY29wZS5lZGl0TW9kZSA9ICFzY29wZS5lZGl0TW9kZTtcclxuICAgICAgICAgICAgICAgIGRhdGFTZXJ2aWNlLnNhdmVVc2VyVG9TdG9yYWdlKCk7XHJcbiAgICAgICAgICAgIH07XHJcblxyXG4gICAgICAgICAgICBzY29wZS5zZWxlY3RVc2VyID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXNjb3BlLnVzZXIuZW1haWwpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgn0KMg0LTQsNC90L3QvtCz0L4g0LrQvtC90YLQsNC60YLQsCDQvdC10YIgRW1haWwhISEnKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgbGV0dGVyU2VydmljZS5zZWxlY3RlZC51c2VyID0gc2NvcGUudXNlci5uYW1lO1xyXG4gICAgICAgICAgICAgICAgc3RhdGVTZXJ2aWNlLnNldEFjdGl2ZVN0YXRlKCdmaWx0ZXJlZCcpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL3VzZXItZGlyZWN0aXZlL3VzZXItZGlyZWN0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhbmd1bGFyPXdpbmRvdy5hbmd1bGFyLG5nTW9kdWxlO1xudHJ5IHtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShbXCJuZ1wiXSl9XG5jYXRjaChlKXtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShcIm5nXCIsW10pfVxudmFyIHYxPVwiPGRpdiBjbGFzcz1cXFwiY29udGFjdCBncm91cFxcXCI+IDxkaXYgY2xhc3M9XFxcImF2YXRhclxcXCI+IDxpbWcgbmctc3JjPVxcXCJ7eyB1c2VyLmF2YXRhciB8fCAnaW1nL2RlZmF1bHRBdmF0YXIucG5nJyB9fVxcXCI+IDwvZGl2PiA8dGFibGUgY2xhc3M9XFxcImluZm9cXFwiPiA8dHI+IDx0ZCBjbGFzcz1cXFwia2V5c1xcXCI+0JjQvNGPOjwvdGQ+IDx0ZD4gPGRpdiBuZy1zaG93PVxcXCIhZWRpdE1vZGVcXFwiPnt7IHVzZXIubmFtZSB9fTwvZGl2PiA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcInVzZXIubmFtZVxcXCIgbmctc2hvdz1cXFwiZWRpdE1vZGVcXFwiPjwvdGQ+IDwvdHI+IDx0cj4gPHRkIGNsYXNzPVxcXCJrZXlzXFxcIj7QlNCw0YLQsCDRgNC+0LbQtNC10L3QuNGPOjwvdGQ+IDx0ZD4gPGRpdiBuZy1zaG93PVxcXCIhZWRpdE1vZGVcXFwiPnt7IHVzZXIuYmlydGhEYXRlIH19PC9kaXY+IDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwidXNlci5iaXJ0aERhdGVcXFwiIG5nLXNob3c9XFxcImVkaXRNb2RlXFxcIj48L3RkPiA8L3RyPiA8dHI+IDx0ZCBjbGFzcz1cXFwia2V5c1xcXCI+0J/QvtC7OjwvdGQ+IDx0ZD4gPGRpdiBuZy1zaG93PVxcXCIhZWRpdE1vZGVcXFwiPnt7IHVzZXIuZ2VuZGVyIH19PC9kaXY+IDxpbnB1dCB0eXBlPVxcXCJ0ZXh0XFxcIiBuZy1tb2RlbD1cXFwidXNlci5nZW5kZXJcXFwiIG5nLXNob3c9XFxcImVkaXRNb2RlXFxcIj48L3RkPiA8L3RyPiA8dHI+IDx0ZCBjbGFzcz1cXFwia2V5c1xcXCI+0JDQtNGA0LXRgTo8L3RkPiA8dGQ+IDxkaXYgbmctc2hvdz1cXFwiIWVkaXRNb2RlXFxcIj57eyB1c2VyLmFkZHJlc3MgfX08L2Rpdj4gPGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5nLW1vZGVsPVxcXCJ1c2VyLmFkZHJlc3NcXFwiIG5nLXNob3c9XFxcImVkaXRNb2RlXFxcIj48L3RkPiA8L3RyPiA8dHI+IDx0ZCBjbGFzcz1cXFwia2V5c1xcXCI+RW1haWw6PC90ZD4gPHRkPiA8ZGl2IGNsYXNzPVxcXCJjb250YWN0RW1haWxcXFwiIG5nLWNsaWNrPVxcXCJtYWlsVG8odXNlci5lbWFpbClcXFwiIG5nLXNob3c9XFxcIiFlZGl0TW9kZVxcXCI+e3sgdXNlci5lbWFpbCB9fTwvZGl2PiA8aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcInVzZXIuZW1haWxcXFwiIG5nLXNob3c9XFxcImVkaXRNb2RlXFxcIj48L3RkPiA8L3RyPiA8L3RhYmxlPiA8ZGl2IGNsYXNzPVxcXCJlZGl0XFxcIiBuZy1jbGljaz1cXFwidG9nZ2xlTW9kZSgpXFxcIiBuZy1zaG93PVxcXCIhZWRpdE1vZGVcXFwiPtCg0LXQtNCw0LrRgtC40YDQvtCy0LDRgtGMPC9kaXY+IDxkaXYgY2xhc3M9XFxcInNhdmVcXFwiIG5nLWNsaWNrPVxcXCJ0b2dnbGVNb2RlKClcXFwiIG5nLXNob3c9XFxcImVkaXRNb2RlXFxcIj7QodC+0YXRgNCw0L3QuNGC0Yw8L2Rpdj4gPGRpdiBjbGFzcz1cXFwicmVtb3ZlQ29udGFjdFxcXCIgbmctY2xpY2s9XFxcInJlbW92ZUNvbnRhY3QoJGluZGV4KVxcXCI+0KPQtNCw0LvQuNGC0Yw8L2Rpdj4gPGRpdiBjbGFzcz1cXFwic2VsZWN0VXNlclxcXCIgbmctY2xpY2s9XFxcInNlbGVjdFVzZXIoKVxcXCI+0J/QvtC60LDQt9Cw0YLRjCDQv9C40YHRjNC80LAg0Y3RgtC+0LPQviDQutC+0L3RgtCw0LrRgtCwPC9kaXY+IDwvZGl2PlwiO1xubmdNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsZnVuY3Rpb24oYyl7Yy5wdXQoXCJ1c2VyLmh0bWxcIix2MSl9XSk7XG5tb2R1bGUuZXhwb3J0cz12MTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvdXNlci1kaXJlY3RpdmUvdGVtcGxhdGUvdXNlci5odG1sXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBpbmJveFRlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvaW5ib3hMZXR0ZXJzLmh0bWwnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgdGVtcGxhdGU6IGluYm94VGVtcGxhdGUsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgbGV0dGVyczogJz0nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSkge1xyXG4gICAgICAgICAgICBzY29wZS5kaXJlY3RvcnkgPSAnaW5ib3gnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL2luYm94LWRpcmVjdGl2ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxsZXR0ZXIgbmctcmVwZWF0PVxcXCJsZXR0ZXIgaW4gbGV0dGVycyB8IG9yZGVyQnk6ICdkYXRlJzogdHJ1ZVxcXCIgbmctY2xpY2s9XFxcInByZXZpZXcodGhpcylcXFwiPjwvbGV0dGVyPlwiO1xubmdNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsZnVuY3Rpb24oYyl7Yy5wdXQoXCJpbmJveExldHRlcnMuaHRtbFwiLHYxKX1dKTtcbm1vZHVsZS5leHBvcnRzPXYxO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9sZXR0ZXJzLWRpcmVjdG9yaWVzLWRpcmVjdGl2ZXMvdGVtcGxhdGVzL2luYm94TGV0dGVycy5odG1sXG4gKiogbW9kdWxlIGlkID0gMjNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBzZW50VGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy9zZW50TGV0dGVycy5odG1sJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHRlbXBsYXRlOiBzZW50VGVtcGxhdGUsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgbGV0dGVyczogJz0nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSkge1xyXG4gICAgICAgICAgICBzY29wZS5kaXJlY3RvcnkgPSAnc2VudCdcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy9zZW50LWRpcmVjdGl2ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDI0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxsZXR0ZXIgbmctcmVwZWF0PVxcXCJsZXR0ZXIgaW4gbGV0dGVycyB8IG9yZGVyQnk6ICdkYXRlJzogdHJ1ZVxcXCIgbmctY2xpY2s9XFxcInByZXZpZXcodGhpcylcXFwiPjwvbGV0dGVyPlwiO1xubmdNb2R1bGUucnVuKFtcIiR0ZW1wbGF0ZUNhY2hlXCIsZnVuY3Rpb24oYyl7Yy5wdXQoXCJzZW50TGV0dGVycy5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy90ZW1wbGF0ZXMvc2VudExldHRlcnMuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDI1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5sZXQgdHJhc2hUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL2NhcnRMZXR0ZXJzLmh0bWwnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgdGVtcGxhdGU6IHRyYXNoVGVtcGxhdGUsXHJcbiAgICAgICAgc2NvcGU6IHtcclxuICAgICAgICAgICAgbGV0dGVyczogJz0nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSkge1xyXG4gICAgICAgICAgICBzY29wZS5kaXJlY3RvcnkgPSAndHJhc2gnXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvbWFpbi12aWV3LW1vZHVsZS9sZXR0ZXJzLWRpcmVjdG9yaWVzLWRpcmVjdGl2ZXMvdHJhc2gtZGlyZWN0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gMjZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhbmd1bGFyPXdpbmRvdy5hbmd1bGFyLG5nTW9kdWxlO1xudHJ5IHtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShbXCJuZ1wiXSl9XG5jYXRjaChlKXtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShcIm5nXCIsW10pfVxudmFyIHYxPVwiPGxldHRlciBuZy1yZXBlYXQ9XFxcImxldHRlciBpbiBsZXR0ZXJzIHwgb3JkZXJCeTogJ2RhdGUnOiB0cnVlXFxcIiBuZy1jbGljaz1cXFwicHJldmlldyh0aGlzKVxcXCI+PC9sZXR0ZXI+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcImNhcnRMZXR0ZXJzLmh0bWxcIix2MSl9XSk7XG5tb2R1bGUuZXhwb3J0cz12MTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL3RlbXBsYXRlcy9jYXJ0TGV0dGVycy5odG1sXG4gKiogbW9kdWxlIGlkID0gMjdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbmxldCBuZXdMZXR0ZXJUZW1wbGF0ZSA9IHJlcXVpcmUoJy4vdGVtcGxhdGVzL25ld0xldHRlci5odG1sJyk7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgcmV0dXJuIHtcclxuICAgICAgICByZXN0cmljdDogJ0UnLFxyXG4gICAgICAgIHRlbXBsYXRlOiBuZXdMZXR0ZXJUZW1wbGF0ZSxcclxuICAgICAgICBzY29wZToge1xyXG4gICAgICAgICAgICBuZXc6ICc9J1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL25ld0xldHRlci1kaXJlY3RpdmUuanNcbiAqKiBtb2R1bGUgaWQgPSAyOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwidmFyIGFuZ3VsYXI9d2luZG93LmFuZ3VsYXIsbmdNb2R1bGU7XG50cnkge25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFtcIm5nXCJdKX1cbmNhdGNoKGUpe25nTW9kdWxlPWFuZ3VsYXIubW9kdWxlKFwibmdcIixbXSl9XG52YXIgdjE9XCI8ZGl2IGNsYXNzPVxcXCJuZXdMZXR0ZXJGb3JtXFxcIj4gPGZvcm0gbmFtZT1cXFwibmV3TGV0dGVyXFxcIj4gPGRpdiBjbGFzcz1cXFwiYWRkcmVzc2VlXFxcIj4gPGxhYmVsPjxkaXY+VG86PC9kaXY+PGlucHV0IHR5cGU9XFxcInRleHRcXFwiIG5nLW1vZGVsPVxcXCJuZXcubGV0dGVyLnRvXFxcIj48L2xhYmVsPiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwidGl0bGVcXFwiPiA8bGFiZWw+PGRpdj5UaXRsZTo8L2Rpdj48aW5wdXQgdHlwZT1cXFwidGV4dFxcXCIgbmctbW9kZWw9XFxcIm5ldy5sZXR0ZXIudGl0dGxlXFxcIj48L2xhYmVsPiA8L2Rpdj4gPGRpdiBjbGFzcz1cXFwiaHJMaW5lXFxcIj48L2Rpdj4gPHRleHRhcmVhIG5nLW1vZGVsPVxcXCJuZXcubGV0dGVyLmNvbnRlbnRcXFwiPjwvdGV4dGFyZWE+IDwvZm9ybT4gPC9kaXY+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcIm5ld0xldHRlci5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy90ZW1wbGF0ZXMvbmV3TGV0dGVyLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAyOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IGRyYWZ0c1RlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvZHJhZnRzLmh0bWwnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgdGVtcGxhdGU6IGRyYWZ0c1RlbXBsYXRlLFxyXG4gICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgIGxldHRlcnM6ICc9J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUpIHtcclxuICAgICAgICAgICAgc2NvcGUuZGlyZWN0b3J5ID0gJ2RyYWZ0cydcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy9kcmFmdHMtZGlyZWN0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gMzBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhbmd1bGFyPXdpbmRvdy5hbmd1bGFyLG5nTW9kdWxlO1xudHJ5IHtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShbXCJuZ1wiXSl9XG5jYXRjaChlKXtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShcIm5nXCIsW10pfVxudmFyIHYxPVwiPGxldHRlciBuZy1yZXBlYXQ9XFxcImxldHRlciBpbiBsZXR0ZXJzIHwgb3JkZXJCeTogJ2RhdGUnOiB0cnVlXFxcIiBuZy1jbGljaz1cXFwicHJldmlldyh0aGlzKVxcXCI+PC9sZXR0ZXI+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcImRyYWZ0cy5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy90ZW1wbGF0ZXMvZHJhZnRzLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAzMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IGZhdm9yaXRlc1RlbXBsYXRlID0gcmVxdWlyZSgnLi90ZW1wbGF0ZXMvZmF2b3JpdGVzLmh0bWwnKTtcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHJlc3RyaWN0OiAnRScsXHJcbiAgICAgICAgdGVtcGxhdGU6IGZhdm9yaXRlc1RlbXBsYXRlLFxyXG4gICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgIGluYm94OiAnPScsXHJcbiAgICAgICAgICAgIHNlbnQ6ICc9J1xyXG4gICAgICAgIH0sXHJcbiAgICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUpIHtcclxuICAgICAgICAgICAgc2NvcGUubGV0dGVycyA9IHNjb3BlLmluYm94LmNvbmNhdChzY29wZS5zZW50KTtcclxuICAgICAgICAgICAgc2NvcGUuZGlyZWN0b3J5ID0gJ2Zhdm9yaXRlcydcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy9mYXZvcml0ZXMtZGlyZWN0aXZlLmpzXG4gKiogbW9kdWxlIGlkID0gMzJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsInZhciBhbmd1bGFyPXdpbmRvdy5hbmd1bGFyLG5nTW9kdWxlO1xudHJ5IHtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShbXCJuZ1wiXSl9XG5jYXRjaChlKXtuZ01vZHVsZT1hbmd1bGFyLm1vZHVsZShcIm5nXCIsW10pfVxudmFyIHYxPVwiPGxldHRlciBuZy1yZXBlYXQ9XFxcImxldHRlciBpbiBsZXR0ZXJzIHwgZmlsdGVyOiB7ZmF2b3JpdGU6IHRydWV9IHwgb3JkZXJCeTogJ2RhdGUnOiB0cnVlXFxcIiBuZy1jbGljaz1cXFwicHJldmlldyh0aGlzKVxcXCI+PC9sZXR0ZXI+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcImZhdm9yaXRlcy5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy90ZW1wbGF0ZXMvZmF2b3JpdGVzLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAzM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubGV0IGZpbHRlcmVkVGVtcGxhdGUgPSByZXF1aXJlKCcuL3RlbXBsYXRlcy9maWx0ZXJlZExldHRlcnMuaHRtbCcpO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgcmVzdHJpY3Q6ICdFJyxcclxuICAgICAgICB0ZW1wbGF0ZTogZmlsdGVyZWRMZXR0ZXJzLFxyXG4gICAgICAgIHNjb3BlOiB7XHJcbiAgICAgICAgICAgIGxldHRlcnM6ICc9JyxcclxuICAgICAgICAgICAgdXNlcjogJz0nXHJcbiAgICAgICAgfSxcclxuICAgICAgICBjb250cm9sbGVyOiBmdW5jdGlvbihzdGF0ZVNlcnZpY2UpIHtcclxuICAgICAgICAgICAgdGhpcy5iYWNrID0gZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZVNlcnZpY2Uuc2V0QWN0aXZlU3RhdGUoJ2NvbnRhY3RzJylcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0sXHJcbiAgICAgICAgY29udHJvbGxlckFzOiAnZmlsdGVyRGlyJyxcclxuICAgICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSkge1xyXG4gICAgICAgICAgICBzY29wZS5kaXJlY3RvcnkgPSAnZmlsdGVyZWQnO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL21haW4tdmlldy1tb2R1bGUvbGV0dGVycy1kaXJlY3Rvcmllcy1kaXJlY3RpdmVzL2ZpbHRlcmVkLWRpcmVjdGl2ZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJ2YXIgYW5ndWxhcj13aW5kb3cuYW5ndWxhcixuZ01vZHVsZTtcbnRyeSB7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoW1wibmdcIl0pfVxuY2F0Y2goZSl7bmdNb2R1bGU9YW5ndWxhci5tb2R1bGUoXCJuZ1wiLFtdKX1cbnZhciB2MT1cIjxkaXYgY2xhc3M9XFxcImJhY2tcXFwiIG5nLWNsaWNrPVxcXCJmaWx0ZXJEaXIuYmFjaygpXFxcIj4mIzg1OTIgPGRpdiBjbGFzcz1cXFwiYmFja1RleHRcXFwiPtCS0LXRgNC90YPRgtGM0YHRjyDQuiDQutC+0L3RgtCw0LrRgtCw0Lw8L2Rpdj48L2Rpdj4gPGxldHRlciBuZy1yZXBlYXQ9XFxcImxldHRlciBpbiBsZXR0ZXJzIHwgZmlsdGVyOiB1c2VyIHwgb3JkZXJCeTogJ2RhdGUnOiB0cnVlXFxcIiBuZy1jbGljaz1cXFwicHJldmlldyh0aGlzKVxcXCI+PC9sZXR0ZXI+XCI7XG5uZ01vZHVsZS5ydW4oW1wiJHRlbXBsYXRlQ2FjaGVcIixmdW5jdGlvbihjKXtjLnB1dChcImZpbHRlcmVkTGV0dGVycy5odG1sXCIsdjEpfV0pO1xubW9kdWxlLmV4cG9ydHM9djE7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2pzL2FwcC9tYWluLXZpZXctbW9kdWxlL2xldHRlcnMtZGlyZWN0b3JpZXMtZGlyZWN0aXZlcy90ZW1wbGF0ZXMvZmlsdGVyZWRMZXR0ZXJzLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAzNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIGZ1bmN0aW9uIGxpZ2h0KGVsZW0pIHtcclxuICAgICAgICB2YXIgc2hhZG93MSA9ICczcHggMHB4IDlweCByZ2JhKDAsIDI1NSwgMCwgJyxcclxuICAgICAgICAgICAgc2hhZG93MiA9ICcpJyxcclxuICAgICAgICAgICAgb3BhY2l0eSA9IDA7XHJcblxyXG4gICAgICAgIGZ1bmN0aW9uIGluY3IoKSB7XHJcbiAgICAgICAgICAgIGlmIChvcGFjaXR5IDwgMC45KSB7XHJcbiAgICAgICAgICAgICAgICBvcGFjaXR5ICs9IDAuMDU7XHJcbiAgICAgICAgICAgICAgICBlbGVtLnN0eWxlLnRleHRTaGFkb3cgPSBzaGFkb3cxICsgb3BhY2l0eSArIHNoYWRvdzI7XHJcbiAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGluY3IsIDc1KTtcclxuICAgICAgICAgICAgfSBlbHNlIHJldHVybiBkZWNyKCk7XHJcbiAgICAgICAgfVxyXG5cclxuICAgICAgICBmdW5jdGlvbiBkZWNyKCkge1xyXG4gICAgICAgICAgICBpZiAob3BhY2l0eSA+IDAuMikge1xyXG4gICAgICAgICAgICAgICAgb3BhY2l0eSAtPSAwLjA1O1xyXG4gICAgICAgICAgICAgICAgZWxlbS5zdHlsZS50ZXh0U2hhZG93ID0gc2hhZG93MSArIG9wYWNpdHkgKyBzaGFkb3cyO1xyXG4gICAgICAgICAgICAgICAgc2V0VGltZW91dChkZWNyLCA3NSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSByZXR1cm4gaW5jcigpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgaW5jcigpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGFkZENvbWEoZWxlbSkge1xyXG4gICAgICAgIGZ1bmN0aW9uIGFkZCgpIHtcclxuICAgICAgICAgICAgaWYoZWxlbS5pbm5lckhUTUwubGVuZ3RoID09PSAyMSkgZWxlbS5pbm5lckhUTUwgPSAnTG9hZGluZyBsZXR0ZXJzJztcclxuICAgICAgICAgICAgZWxlbS5pbm5lckhUTUwgKz0gJy4nO1xyXG4gICAgICAgICAgICBzZXRUaW1lb3V0KGFkZCwgNTAwKVxyXG4gICAgICAgIH1cclxuICAgICAgICBhZGQoKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGxvYWRpbmcoZWxlbWVudCkge1xyXG4gICAgICAgIGxpZ2h0KGVsZW1lbnQpO1xyXG4gICAgICAgIGFkZENvbWEoZWxlbWVudClcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGxvYWRpbmc6IGxvYWRpbmdcclxuXHJcbiAgICB9XHJcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL3NlcnZpY2VzL2FuaW1hdGlvblNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAzNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkaHR0cCwgJHN0YXRlLCBsZXR0ZXJTZXJ2aWNlLCBpbml0aWFsaXphdGlvblNlcnZpY2UsIGRhdGFTZXJ2aWNlKSB7XHJcblxyXG4gICAgdmFyIHBlcm1pc3Npb24gPSBmYWxzZTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRQZXJtaXNzaW9uKCkge1xyXG4gICAgICAgIHJldHVybiBwZXJtaXNzaW9uO1xyXG5cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRQZXJtaXNzaW9uKHZhbCkge1xyXG4gICAgICAgIGlmKHZhbCA9PT0gdHJ1ZSB8fCB2YWwgPT09IGZhbHNlKSBwZXJtaXNzaW9uID0gdmFsO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGNvbnRpbnVlU2Vzc2lvbigpIHtcclxuICAgICAgICBkYXRhU2VydmljZS5iYXNlLnVzZXJzID0gd2luZG93LmxvY2FsU3RvcmFnZS51c2VycyA/IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS51c2VycykgOiB1bmRlZmluZWQ7XHJcbiAgICAgICAgaWYgKCFkYXRhU2VydmljZS5iYXNlLnVzZXJzKSBkYXRhU2VydmljZS5nZXRVc2VycygpO1xyXG5cclxuICAgICAgICByZXR1cm4gJGh0dHAoe21ldGhvZDogJ0dFVCcsIHVybDogJ2RhdGEvSlNPTi9tYWlscy5qc29uJ30pLlxyXG4gICAgICAgICAgICB0aGVuKChkYXRhKSA9PiB7XHJcbiAgICAgICAgICAgICAgICBpZiAod2luZG93LmxvY2FsU3RvcmFnZS5sZXR0ZXJzKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0UGVybWlzc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBsZXQgbGV0dGVycyA9IHt9O1xyXG4gICAgICAgICAgICAgICAgICAgIGxldHRlcnMuZGF0YSA9IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5sZXR0ZXJzKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhU2VydmljZS5iYXNlLmxldHRlcnMgPSBsZXR0ZXJzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6YXRpb25TZXJ2aWNlLmZpbmlzaEluaXQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgc2V0UGVybWlzc2lvbih0cnVlKTtcclxuICAgICAgICAgICAgICAgICAgICBkYXRhU2VydmljZS5iYXNlLmxldHRlcnMgPSBkYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICAgICAgaW5pdGlhbGl6YXRpb25TZXJ2aWNlLmZpbmlzaEluaXQoKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbG9naW5PdXQoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gJ3Nlc3Npb249JyArICc7IG1heC1hZ2U9MCc7XHJcbiAgICAgICAgc2V0UGVybWlzc2lvbihmYWxzZSk7XHJcbiAgICAgICAgbGV0dGVyU2VydmljZS5yZXNldFNlbGVjdGVkKCk7XHJcbiAgICAgICAgZGF0YVNlcnZpY2UucmVzZXRCYXNlKCk7XHJcbiAgICAgICAgaW5pdGlhbGl6YXRpb25TZXJ2aWNlLnJlc2V0SW5pdCgpO1xyXG4gICAgICAgICRzdGF0ZS5nbygnc2lnbkluJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2lnbkluKGRhdGEpIHtcclxuICAgICAgICBpZiAoZGF0YS5sb2dpbiAhPT0gJ3Rlc3QnKSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCfQotCw0LrQvtCz0L4g0L/QvtC70YzQt9C+0LLQsNGC0LXQu9GPINC90LUg0YHRg9GJ0LXRgdGC0LLRg9C10YIhJyk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGRhdGEubG9naW4gPT09ICd0ZXN0JyAmJiBkYXRhLnBhc3N3b3JkID09PSAnMTIzJykge1xyXG4gICAgICAgICAgICBzZXRQZXJtaXNzaW9uKHRydWUpO1xyXG4gICAgICAgICAgICAkc3RhdGUuZ28oJ21haWwubG9hZGluZycpO1xyXG4gICAgICAgICAgICByZXR1cm4gZGF0YVNlcnZpY2UuaW5pdCgpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFsZXJ0KCfQktCy0LXQtNC10L3QvdGL0Lkg0L/QvtGA0L7Qu9GMINC90LUg0LLQtdGA0LXQvSEnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuLypcclxuICAgIGZ1bmN0aW9uIHNpZ25JbihkYXRhKSB7XHJcbiAgICAgICAgJGh0dHAuZ2V0KCdkYXRhL3VzZXJzUHJvZmlsZXMuanNvbicpXHJcbiAgICAgICAgICAgIC50aGVuKGZ1bmN0aW9uKHByb2ZpbGVzKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9maWxlcyA9IHByb2ZpbGVzLmRhdGE7XHJcbiAgICAgICAgICAgICAgICBpZiAoIXByb2ZpbGVzW2RhdGEubG9naW5dKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ9Ci0LDQutC+0LPQviDQv9C+0LvRjNC30L7QstCw0YLQtdC70Y8g0L3QtSDRgdGD0YnQtdGB0YLQstGD0LXRgiEnKTtcclxuICAgICAgICAgICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBpZiAocHJvZmlsZXNbZGF0YS5sb2dpbl0gPT09IGRhdGEucGFzc3dvcmQpIHtcclxuICAgICAgICAgICAgICAgICAgICBhbGVydCgnS0gnKTtcclxuICAgICAgICAgICAgICAgICAgICBwZXJtaXNzaW9uID0gdHJ1ZTtcclxuICAgICAgICAgICAgICAgICAgICAkc3RhdGUuZ28oJ21haWwubG9hZGluZycpO1xyXG4gICAgICAgICAgICAgICAgICAgIGRhdGFTZXJ2aWNlLmluaXQoKTtcclxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAgICAgYWxlcnQoJ9CS0LLQtdC00LXQvdC90YvQuSDQv9C+0YDQvtC70Ywg0L3QtSDQstC10YDQtdC9IScpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0sIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgYWxlcnQoJ9Cd0LUg0YPQtNCw0LvQvtGB0Ywg0LfQsNCz0YDRg9C30LjRgtGMINCx0LDQt9GLLi4uJylcclxuICAgICAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICAqL1xyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0UGVybWlzc2lvbjogZ2V0UGVybWlzc2lvbixcclxuICAgICAgICBzaWduSW46IHNpZ25JbixcclxuICAgICAgICBsb2dpbk91dDogbG9naW5PdXQsXHJcbiAgICAgICAgY29udGludWVTZXNzaW9uOiBjb250aW51ZVNlc3Npb24sXHJcbiAgICAgICAgc2V0UGVybWlzc2lvbjogc2V0UGVybWlzc2lvblxyXG4gICAgfVxyXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvc2VydmljZXMvYXV0aG9yaXphdGlvblNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSAzN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkcm9vdFNjb3BlLCAkaHR0cCwgJHEsICR0aW1lb3V0LCBpbml0aWFsaXphdGlvblNlcnZpY2UsIHN0YXRlU2VydmljZSkge1xyXG4gICAgdmFyIGJhc2UgPSB7fTtcclxuXHJcbiAgICBmdW5jdGlvbiBnZXRVc2VycygpIHtcclxuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KCdkYXRhL0pTT04vdXNlcnMuanNvbicpLlxyXG4gICAgICAgICAgICB0aGVuKGZ1bmN0aW9uKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGJhc2UudXNlcnMgPSBkYXRhLmRhdGE7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICB9LCBmdW5jdGlvbihlcnIsc3RhdHVzKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGVyciArIHN0YXR1cyk7XHJcbiAgICAgICAgICAgIH0pO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGdldExldHRlcnMoKSB7XHJcbiAgICAgICAgdmFyIGRlZiA9ICRxLmRlZmVyKCk7XHJcblxyXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKHdpbmRvdy5sb2NhbFN0b3JhZ2UubGV0dGVycykge1xyXG4gICAgICAgICAgICAgICAgbGV0IGRhdGEgPSB7fTtcclxuICAgICAgICAgICAgICAgIGRhdGEuZGF0YSA9IEpTT04ucGFyc2Uod2luZG93LmxvY2FsU3RvcmFnZS5sZXR0ZXJzKTtcclxuICAgICAgICAgICAgICAgIGRlZi5yZXNvbHZlKGRhdGEpO1xyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkaHR0cCh7bWV0aG9kOiAnR0VUJywgdXJsOiAnZGF0YS9KU09OL21haWxzLmpzb24nfSkuXHJcbiAgICAgICAgICAgICAgICB0aGVuKChkYXRhKSA9PiB7IGRlZi5yZXNvbHZlKGRhdGEpfSwgKGVycikgPT4gY29uc29sZS5sb2coZXJyICsgc3RhdHVzKSk7XHJcblxyXG4gICAgICAgIH0sIDUwMDApO1xyXG5cclxuICAgICAgICByZXR1cm4gZGVmLnByb21pc2U7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gc2F2ZUxldHRlcnNUb1N0b3JhZ2UoKSB7XHJcbiAgICAgICAgaWYgKCF3aW5kb3cubG9jYWxTdG9yYWdlKSByZXR1cm47XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS5sZXR0ZXJzID0gSlNPTi5zdHJpbmdpZnkoYmFzZS5sZXR0ZXJzKTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzYXZlVXNlcnNUb1N0b3JhZ2UoKSB7XHJcbiAgICAgICAgaWYgKCF3aW5kb3cubG9jYWxTdG9yYWdlKSByZXR1cm47XHJcbiAgICAgICAgd2luZG93LmxvY2FsU3RvcmFnZS51c2VycyA9IEpTT04uc3RyaW5naWZ5KGJhc2UudXNlcnMpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGluaXRpYWxpc2F0aW9uKCkge1xyXG4gICAgICAgIGJhc2UudXNlcnMgPSB3aW5kb3cubG9jYWxTdG9yYWdlLnVzZXJzID8gSlNPTi5wYXJzZSh3aW5kb3cubG9jYWxTdG9yYWdlLnVzZXJzKSA6IHVuZGVmaW5lZDtcclxuICAgICAgICBpZiAoIWJhc2UudXNlcnMpIGdldFVzZXJzKCk7XHJcblxyXG4gICAgICAgIHJldHVybiBnZXRMZXR0ZXJzKClcclxuICAgICAgICAgICAgLnRoZW4oZnVuY3Rpb24gKGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGJhc2UubGV0dGVycyA9IGRhdGEuZGF0YTtcclxuICAgICAgICAgICAgICAgIGluaXRpYWxpemF0aW9uU2VydmljZS5maW5pc2hJbml0KCk7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZVNlcnZpY2Uuc2V0QWN0aXZlU3RhdGUoJ2luYm94Jyk7XHJcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5jb29raWUgPSAnc2Vzc2lvbj0nICsgKE1hdGgucmFuZG9tKCkgKyAnJykuc2xpY2UoMik7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gZGF0YS5kYXRhO1xyXG4gICAgICAgICAgICB9KTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXNldEJhc2UoKSB7XHJcbiAgICAgICAgZGVsZXRlIGJhc2UubGV0dGVycztcclxuICAgICAgICBkZWxldGUgYmFzZS51c2VycztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGJhc2U6IGJhc2UsXHJcbiAgICAgICAgaW5pdDogaW5pdGlhbGlzYXRpb24sXHJcbiAgICAgICAgc2F2ZVVzZXJUb1N0b3JhZ2U6IHNhdmVVc2Vyc1RvU3RvcmFnZSxcclxuICAgICAgICBzYXZlTGV0dGVyc1RvU3RvcmFnZTogc2F2ZUxldHRlcnNUb1N0b3JhZ2UsXHJcbiAgICAgICAgZ2V0VXNlcnM6IGdldFVzZXJzLFxyXG4gICAgICAgIGdldExldHRlcnM6IGdldExldHRlcnMsXHJcbiAgICAgICAgcmVzZXRCYXNlOiByZXNldEJhc2VcclxuICAgIH1cclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL3NlcnZpY2VzL2RhdGFTZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gMzhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICB2YXIgaW5pdGlhbGl6YXRpb24gPSB0cnVlO1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldEluaXQoKSB7XHJcbiAgICAgICAgcmV0dXJuIGluaXRpYWxpemF0aW9uO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIGZpbmlzaEluaXQoKSB7XHJcbiAgICAgICAgaW5pdGlhbGl6YXRpb24gPSBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZXNldEluaXQoKSB7XHJcbiAgICAgICAgaW5pdGlhbGl6YXRpb24gPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiB7XHJcbiAgICAgICAgZ2V0SW5pdDogZ2V0SW5pdCxcclxuICAgICAgICBmaW5pc2hJbml0OiBmaW5pc2hJbml0LFxyXG4gICAgICAgIHJlc2V0SW5pdDogcmVzZXRJbml0XHJcbiAgICB9XHJcbn07XHJcblxyXG5cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL3NlcnZpY2VzL2luaXRpYWxpemF0aW9uU2VydmljZS5qc1xuICoqIG1vZHVsZSBpZCA9IDM5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIndXNlIHN0cmljdCc7XHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKHN0YXRlU2VydmljZSwgJHN0YXRlUGFyYW1zLCBkYXRhU2VydmljZSkge1xyXG4gICAgdmFyIHNlbGVjdGVkID0ge30sXHJcbiAgICAgICAgbmV3TGV0dGVyID0ge1xyXG4gICAgICAgICAgICBsZXR0ZXI6IHt9XHJcbiAgICAgICAgfTtcclxuXHJcbiAgICBmdW5jdGlvbiBtb3ZlVG9EaXIoZGlyKSB7XHJcbiAgICAgICAgZGF0YVNlcnZpY2UuYmFzZS5sZXR0ZXJzW2Rpcl0ucHVzaChzZWxlY3RlZC5sZXR0ZXIpO1xyXG4gICAgICAgIGRhdGFTZXJ2aWNlLnNhdmVMZXR0ZXJzVG9TdG9yYWdlKClcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZW1vdmVGcm9tRGlyKCkge1xyXG4gICAgICAgIHZhciBjdXJyZW50RGlyID0gc3RhdGVTZXJ2aWNlLmN1cnJlbnRTdGF0ZSgpO1xyXG4gICAgICAgIGlmIChjdXJyZW50RGlyID09PSAncHJldmlldycpIGN1cnJlbnREaXIgPSAkc3RhdGVQYXJhbXMuZGlyZWN0b3J5O1xyXG4gICAgICAgIGlmIChjdXJyZW50RGlyID09PSAnZmF2b3JpdGVzJyB8fCBjdXJyZW50RGlyID09PSAnZmlsdGVyZWQnKSBjdXJyZW50RGlyID0gc2VsZWN0ZWQubGV0dGVyLmRpcmVjdG9yeTtcclxuICAgICAgICB2YXIgaW5kZXggPSBkYXRhU2VydmljZS5iYXNlLmxldHRlcnNbY3VycmVudERpcl0uaW5kZXhPZihzZWxlY3RlZC5sZXR0ZXIpO1xyXG5cclxuICAgICAgICBkYXRhU2VydmljZS5iYXNlLmxldHRlcnNbY3VycmVudERpcl0uc3BsaWNlKGluZGV4LCAxKTtcclxuXHJcbiAgICAgICAgZGF0YVNlcnZpY2Uuc2F2ZUxldHRlcnNUb1N0b3JhZ2UoKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlbW92ZUxldHRlcihsZXR0ZXIpIHtcclxuICAgICAgICBpZiAobGV0dGVyKSBzZWxlY3RlZC5sZXR0ZXIgPSBsZXR0ZXI7XHJcbiAgICAgICAgdmFyIGN1cnJlbnREaXIgPSBzdGF0ZVNlcnZpY2UuY3VycmVudFN0YXRlKCk7XHJcbiAgICAgICAgaWYgKGN1cnJlbnREaXIgPT09ICdwcmV2aWV3JykgY3VycmVudERpciA9ICRzdGF0ZVBhcmFtcy5kaXJlY3Rvcnk7XHJcbiAgICAgICAgaWYgKHNlbGVjdGVkLmxldHRlci5mYXZvcml0ZSkge1xyXG4gICAgICAgICAgICB0b2dnbGVGYXZvcml0ZShzZWxlY3RlZC5sZXR0ZXIpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZW1vdmVGcm9tRGlyKCk7XHJcbiAgICAgICAgc3RhdGVTZXJ2aWNlLnNldEFjdGl2ZVN0YXRlKGN1cnJlbnREaXIpO1xyXG4gICAgICAgIGlmKHNlbGVjdGVkLmxldHRlci5kZWxldGVkID09PSBmYWxzZSAmJiBzZWxlY3RlZC5sZXR0ZXIuZGlyZWN0b3J5ICE9PSAnZHJhZnRzJykge1xyXG4gICAgICAgICAgICBzZWxlY3RlZC5sZXR0ZXIuZGVsZXRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIG1vdmVUb0RpcigndHJhc2gnKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiByZWNvdmVyTGV0dGVyKCkge1xyXG4gICAgICAgIHJlbW92ZUZyb21EaXIoKTtcclxuICAgICAgICBtb3ZlVG9EaXIoc2VsZWN0ZWQubGV0dGVyLmRpcmVjdG9yeSk7XHJcbiAgICAgICAgc2VsZWN0ZWQubGV0dGVyLmRlbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgICBzdGF0ZVNlcnZpY2Uuc2V0QWN0aXZlU3RhdGUoc2VsZWN0ZWQubGV0dGVyLmRpcmVjdG9yeSlcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBzZXRJbmZvKGRpcikge1xyXG4gICAgICAgIHZhciBvYmogPSB7XHJcbiAgICAgICAgICAgIHNlbmRlcjogJ0knLFxyXG4gICAgICAgICAgICBkYXRlOiBuZXcgRGF0ZSgpLmdldFRpbWUoKSxcclxuICAgICAgICAgICAgZmF2b3JpdGU6IGZhbHNlLFxyXG4gICAgICAgICAgICB1bnJlYWQ6IGZhbHNlLFxyXG4gICAgICAgICAgICBkZWxldGVkOiBmYWxzZSxcclxuICAgICAgICAgICAgZGlyZWN0b3J5OiBkaXJcclxuICAgICAgICB9O1xyXG5cclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gb2JqKSBzZWxlY3RlZC5sZXR0ZXJba2V5XSA9IG9ialtrZXldO1xyXG4gICAgICAgIHNlbGVjdGVkLmxldHRlci50aXR0bGUgPSBzZWxlY3RlZC5sZXR0ZXIudGl0dGxlIHx8ICfQkdC10Lcg0YLQtdC80YsuLi4nO1xyXG4gICAgICAgIHNlbGVjdGVkLmxldHRlci5jb250ZW50ID0gc2VsZWN0ZWQubGV0dGVyLmNvbnRlbnQgfHwgJyc7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gbW92ZU5ld0xldHRlcihkaXIpIHtcclxuICAgICAgICBzZWxlY3RlZC5sZXR0ZXIgPSBuZXdMZXR0ZXIubGV0dGVyO1xyXG4gICAgICAgIHNldEluZm8oZGlyKTtcclxuICAgICAgICBpZiAoZGlyID09PSAnc2VudCcgJiYgIXNlbGVjdGVkLmxldHRlci50bykge1xyXG4gICAgICAgICAgICBhbGVydCgn0J3QtdGCINCw0LTRgNC10YHQsCDQv9C+0LvRg9GH0LDRgtC10LvRjyEhIScpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIG1vdmVUb0RpcihkaXIpO1xyXG4gICAgICAgIHN0YXRlU2VydmljZS5zZXRBY3RpdmVTdGF0ZShkaXIpO1xyXG4gICAgICAgIG5ld0xldHRlci5sZXR0ZXIgPSB7fTtcclxuICAgIH1cclxuXHJcbiAgICBmdW5jdGlvbiBlZGl0RHJhZnQoKSB7XHJcbiAgICAgICAgbmV3TGV0dGVyLmxldHRlciA9IHNlbGVjdGVkLmxldHRlcjtcclxuICAgICAgICBzZWxlY3RlZC5sZXR0ZXIgPSB7fTtcclxuICAgICAgICByZW1vdmVGcm9tRGlyKCk7XHJcbiAgICAgICAgc3RhdGVTZXJ2aWNlLnNldEFjdGl2ZVN0YXRlKCduZXdMZXR0ZXJGb3JtJyk7XHJcbiAgICB9XHJcblxyXG4gICAgZnVuY3Rpb24gdG9nZ2xlRmF2b3JpdGUobGV0dGVyKSB7XHJcbiAgICAgICAgbGV0dGVyLmZhdm9yaXRlID0gIWxldHRlci5mYXZvcml0ZTtcclxuICAgICAgICBkYXRhU2VydmljZS5zYXZlTGV0dGVyc1RvU3RvcmFnZSgpO1xyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHJlc2V0U2VsZWN0ZWQoKSB7XHJcbiAgICAgICAgZGVsZXRlIHNlbGVjdGVkLmxldHRlcjtcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIHNlbGVjdGVkOiBzZWxlY3RlZCxcclxuICAgICAgICBuZXdMZXR0ZXI6IG5ld0xldHRlcixcclxuICAgICAgICBtb3ZlVG9EaXI6IG1vdmVUb0RpcixcclxuICAgICAgICByZW1vdmVGcm9tRGlyOiByZW1vdmVGcm9tRGlyLFxyXG4gICAgICAgIHJlbW92ZUxldHRlcjogcmVtb3ZlTGV0dGVyLFxyXG4gICAgICAgIHJlY292ZXJMZXR0ZXI6IHJlY292ZXJMZXR0ZXIsXHJcbiAgICAgICAgbW92ZU5ld0xldHRlcjogbW92ZU5ld0xldHRlcixcclxuICAgICAgICBlZGl0RHJhZnQ6IGVkaXREcmFmdCxcclxuICAgICAgICB0b2dnbGVGYXZvcml0ZTogdG9nZ2xlRmF2b3JpdGUsXHJcbiAgICAgICAgcmVzZXRTZWxlY3RlZDogcmVzZXRTZWxlY3RlZFxyXG4gICAgfVxyXG5cclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL3NlcnZpY2VzL2xldHRlclNlcnZpY2UuanNcbiAqKiBtb2R1bGUgaWQgPSA0MFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiJ3VzZSBzdHJpY3QnO1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigkc3RhdGUsIGluaXRpYWxpemF0aW9uU2VydmljZSkge1xyXG5cclxuICAgIGZ1bmN0aW9uIGdldFN0YXRlKCkge1xyXG4gICAgICAgIHJldHVybiAgJHN0YXRlLmN1cnJlbnQubmFtZS5zbGljZSg1KTtcclxuICAgIH1cclxuXHJcblxyXG4gICAgZnVuY3Rpb24gc2V0QWN0aXZlU3RhdGUodmFsLCBwYXJhbXNfb2JqKSB7XHJcbiAgICAgICAgaWYgKGluaXRpYWxpemF0aW9uU2VydmljZS5nZXRJbml0KCkpIHJldHVybjtcclxuICAgICAgICBpZiAodmFsID09PSAncHJldmlldycpIHtcclxuICAgICAgICAgICAgJHN0YXRlLmdvKCdtYWlsLicgKyB2YWwsIHtkaXJlY3Rvcnk6IHBhcmFtc19vYmouZGlyLCBpbmRleDogcGFyYW1zX29iai5pbmRleH0pO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgICRzdGF0ZS5nbygnbWFpbC4nICsgdmFsKVxyXG4gICAgfVxyXG5cclxuICAgIGZ1bmN0aW9uIHNldERpckFjdGl2ZUNsYXNzKHZhbCkge1xyXG4gICAgICAgIHZhciBhY3RpdmVDbGFzcyA9IGdldFN0YXRlKCkgPT09IHZhbCA/ICdhY3RpdmVEaXInIDogJyc7XHJcblxyXG4gICAgICAgIHJldHVybiBhY3RpdmVDbGFzcztcclxuICAgIH1cclxuXHJcbiAgICByZXR1cm4ge1xyXG4gICAgICAgIGNoZWNrRGlyQ2xhc3M6IHNldERpckFjdGl2ZUNsYXNzLFxyXG4gICAgICAgIHNldEFjdGl2ZVN0YXRlOiBzZXRBY3RpdmVTdGF0ZSxcclxuICAgICAgICBjdXJyZW50U3RhdGU6IGdldFN0YXRlXHJcbiAgICB9XHJcbn07XHJcblxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9qcy9hcHAvc2VydmljZXMvc3RhdGVTZXJ2aWNlLmpzXG4gKiogbW9kdWxlIGlkID0gNDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIid1c2Ugc3RyaWN0JztcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICByZXR1cm4gZnVuY3Rpb24oY29udGVudCkge1xyXG4gICAgICAgIHJldHVybiBjb250ZW50LnNsaWNlKDAsIDIyMCkgKyAnLi4uJztcclxuICAgIH1cclxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vanMvYXBwL3NlcnZpY2VzL2ZpbHRlcnMuanNcbiAqKiBtb2R1bGUgaWQgPSA0MlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sIm1hcHBpbmdzIjoiO0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdENBOzs7Ozs7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ3RGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNQQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7Ozs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNuQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ0xBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDaEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUMxQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDeEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ1pBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7OztBQ2ZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDTEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNqQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN0QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7O0FDN0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN2RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUN0R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7O0FDN0JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Iiwic291cmNlUm9vdCI6IiJ9