/**
 * Created by Shivali on 7/7/15.
 */
angular.module("senta-overview")
    .factory('OverviewServices', ["$http", "$q", function ($http, $q) {
        return {
            retrieveOverviewLineChart: function (params) {

                var defer = $q.defer();
                $http.get("http://www.json-generator.com/api/json/get/cmZipvMLdu?indent=2&chartType="+params.type+"&dateRangeType="+params.dateRangeType)

                    .success(function (result) {
                        defer.resolve(result)
                    })
                    .error(function (error) {
                        defer.reject(error)
                    });
                return defer.promise;
            },
            retrieveOverviewWidgets: function (params) {

                var defer = $q.defer();
                $http.get("http://www.json-generator.com/api/json/get/bNMHDIrbEy?indent=2&widgetType="+params.type)
                    .success(function (result) {
                        defer.resolve(result)
                    })
                    .error(function (error) {
                        defer.reject(error)
                    });
                return defer.promise;
            },
            retrieveNewRegisterDevices: function () {

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