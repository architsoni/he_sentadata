/**
 * Created by Shivali on 7/7/15.
 */

angular.module('senta-app')
    .config(['$stateProvider', '$urlRouterProvider',
        function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider
                .otherwise('overview');
            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: "modules/login/login.html",
                    controller: "LoginController",
                    resolve: load(['modules/login/loginController.js'/*, 'modules/capture/deviceDashboard/deviceDashboardServices.js'*/])
                })
                .state('signUp', {
                    url: '/signUp',
                    templateUrl: "modules/signUp/singUp.html",
                    controller: "SignUpController",
                    resolve: load(['modules/signUp/signUpController.js'/*, 'modules/capture/deviceDashboard/deviceDashboardServices.js'*/])
                })
                .state('overview', {
                    url: '/overview',
                    templateUrl: "modules/overview/views/overview.html",
                    controller: "OverviewController",
                    resolve: load(['modules/overview/overviewController.js', 'modules/overview/overviewServices.js'])
                })
                .state('capture', {
                    abstract: true,
                    url: '/capture',
                    template: '<div ui-view></div>'
                })
                .state('capture.deviceDashboard', {
                    url: '/deviceDashboard',
                    templateUrl: "modules/capture/deviceDashboard/views/deviceDashboard.html",
                    controller: "DeviceDashboardController",
                    resolve: load(['modules/capture/deviceDashboard/deviceDashboardController.js'/*, 'modules/capture/deviceDashboard/deviceDashboardServices.js'*/])
                })
                .state('capture.deviceList', {
                    url: '/deviceList',
                    templateUrl: "modules/capture/deviceList/views/deviceList.html"
                })
                .state('capture.appDashboard', {
                    url: '/applicationDashboard',
                    templateUrl: "modules/capture/appDashboard/views/appDashboard.html",
                    controller: "AppDashboardController",
                    resolve: load(['modules/capture/appDashboard/appDashboardController.js'/*, 'modules/appDashboard/appDashboardServices.js'*/])
                })
            ;


            function load(srcs, callback) {
                return {
                    deps: ['$ocLazyLoad', '$q',
                        function ($ocLazyLoad, $q) {
                            var deferred = $q.defer();
                            var promise = false;
                            srcs = angular.isArray(srcs) ? srcs : srcs.split(/\s+/);
                            if (!promise) {
                                promise = deferred.promise;
                            }
                            angular.forEach(srcs, function (src) {
                                promise = promise.then(function () {
                                    name = src;
                                    return $ocLazyLoad.load(name);
                                });
                            });
                            deferred.resolve();
                            return callback ? promise.then(function () {
                                return callback();
                            }) : promise;
                        }]
                }
            }
        }
    ]
    );
