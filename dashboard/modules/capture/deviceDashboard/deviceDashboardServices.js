/**
 * Created by Shivali on 7/7/15.
 */
angular.module("senta-overview")
    .factory('OverviewServices', ["$http", "$q", function ($http, $q) {
        return {
            retrieveActiveUsers: function () {

                var defer = $q.defer();
                $http.get("http://www.json-generator.com/api/json/get/cmZipvMLdu?indent=2")
                    .success(function (result) {
                        defer.resolve(result)
                    })
                    .error(function (error) {
                        defer.reject(error)
                    });
                return defer.promise;
            },retrieveInstallRate: function () {

                var defer = $q.defer();
                $http.get("http://www.json-generator.com/api/json/get/cmZipvMLdu?indent=2")
                    .success(function (result) {
                        defer.resolve(result)
                    })
                    .error(function (error) {
                        defer.reject(error)
                    });
                return defer.promise;
            },retrieveUnInstallRate: function () {

                var defer = $q.defer();
                $http.get("http://www.json-generator.com/api/json/get/cmZipvMLdu?indent=2")
                    .success(function (result) {
                        defer.resolve(result)
                    })
                    .error(function (error) {
                        defer.reject(error)
                    });
                return defer.promise;
            },
            retrieveRegisterDevice: function () {

                var defer = $q.defer();
                $http.get("http://www.json-generator.com/api/json/get/bNMHDIrbEy?indent=2")
                    .success(function (result) {
                        defer.resolve(result)
                    })
                    .error(function (error) {
                        defer.reject(error)
                    });
                return defer.promise;
            },
            retrieveDeRegisterDevice: function () {

                var defer = $q.defer();
                $http.get("http://www.json-generator.com/api/json/get/bNMHDIrbEy?indent=2")
                    .success(function (result) {
                        defer.resolve(result)
                    })
                    .error(function (error) {
                        defer.reject(error)
                    });
                return defer.promise;
            },
            retrieveTransimissions: function () {

                var defer = $q.defer();
                $http.get("http://www.json-generator.com/api/json/get/bNMHDIrbEy?indent=2")
                    .success(function (result) {
                        defer.resolve(result)
                    })
                    .error(function (error) {
                        defer.reject(error)
                    });
                return defer.promise;
            },
            retrieveParameters: function () {

                var defer = $q.defer();
                $http.get("http://www.json-generator.com/api/json/get/bNMHDIrbEy?indent=2")
                    .success(function (result) {
                        defer.resolve(result)
                    })
                    .error(function (error) {
                        defer.reject(error)
                    });
                return defer.promise;
            },
            retrieveNonRegisterDevices: function () {

                var defer = $q.defer();
                $http.get("http://www.json-generator.com/api/json/get/bVccorcZiW?indent=2")
                    .success(function (result) {
                        defer.resolve(result)
                    })
                    .error(function (error) {
                        defer.reject(error)
                    });
                return defer.promise;
            }
        }
    }])