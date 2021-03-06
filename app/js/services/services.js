'use strict';
/* Services */
angular.module('contactServices', ['ngResource']).factory('requestData', ['$http', 'APP_CONTANTS',
  function($http, APP_CONTANTS) {
    var _url = APP_CONTANTS.urlJsonFile,
        _settings = {
          method: 'GET',
          cache: false,
          headers: {
            'Content-Type': 'application/json'
          }
        };

    return {
      getData: function() {
         return $http.get(_url, _settings);
      }
    };
  }
])