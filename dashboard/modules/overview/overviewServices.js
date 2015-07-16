/**
 * Created by Shivali on 7/7/15.
 */
angular.module("senta-overview")
    .factory('OverviewServices', ["$http", "$q", function ($http, $q) {
        return {
            retrieveOverviewLineChart: function (params) {

                var defer = $q.defer();

//                $http.get("http://www.json-generator.com/api/json/get/cmZipvMLdu?indent=2&chartType="+params.type+"&dateRangeType="+params.dateRangeType)
                $http.post("https://demo1.sentadata.com/SentaDCaaS.cgi",params)

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

                var json='WsJson=yes&WsJsonData={"login": {"username": "demo@sentadata.com", "password": "DDdem0"},"operation": {"object":"XaPages", "event":"XaDashboard"},"params":[ {"name":"output","value":"counters"} ]}';

                $http.post("https://demo1.sentadata.com/SentaDCaaS.cgi",json)
//                $http.get("http://www.json-generator.com/api/json/get/bNMHDIrbEy?indent=2&widgetType="+params.type)
                    .success(function (result) {
                        defer.resolve(result)
                    })
                    .error(function (error) {
                        defer.reject(error)
                    });
                return defer.promise;
            },
            retrieveNewRegisterDevices: function (params) {

                var defer = $q.defer();
                $http.post("https://demo1.sentadata.com/SentaDCaaS.cgi",params)
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