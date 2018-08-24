var appRoute = angular.module('AppRoute', ['oc.lazyLoad', 'ngRoute']);

//方法2定义全局变量 phonecatApp.value('test',{"test":"test222","test1":"test111"});
//方法3定义全局变量 phonecatApp.constant('constanttest', 'this is constanttest');
appRoute.constant('RequestPath', 'http://localhost:7000');

appRoute.config(function ($routeProvider, $ocLazyLoadProvider) {
    $routeProvider.
    // when('/dashboard', {
    //     templateUrl: 'templates/dashboard.html',
    //     controller: 'DashboardCtrl',
    //     resolve: {
    //         deps: ['$ocLazyLoad', function ($ocLazyLoad) {
    //             return $ocLazyLoad.load(['javascripts/controller/dashboard.js']);
    //         }]
    //     }
    // }).
    when('/search', {
        templateUrl: 'templates/search.html',
        controller: 'SearchCtrl',
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load(['javascripts/controller/search.js']);
            }]
        }
    }).
    when('/tables', {
        templateUrl: 'templates/tables.html',
        controller: 'TablesCtrl',
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load(['javascripts/controller/tables.js']);
            }]
        }
    }).
    when('/elements', {
        templateUrl: 'templates/elements.html',
        controller: 'ElementsCtrl',
        resolve: {
            deps: ['$ocLazyLoad', function ($ocLazyLoad) {
                return $ocLazyLoad.load(['javascripts/controller/elements.js']);
            }]
        }
    }).
    otherwise({
        redirectTo: '/search'
    });
});
