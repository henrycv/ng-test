'use strict';

/* Controllers */

var contactsControllers = angular.module('contactsControllers', [])

.controller('contactListCtrl', ['$scope', 'storeData', 'APP_CONTANTS',
  function($scope, storeData, APP_CONTANTS) {

    if (!storeData.isLoaded()) {
      storeData.getData()
        .then(
          function(response){
            $scope.contacts = response.data.contacts;
          }
        );
    } else {
      $scope.contacts = storeData.data.contacts;
    }

    $scope.orderProp = 'id';
    $scope.APP_CONTANTS = APP_CONTANTS;
  }])


.controller('contactDetailCtrl', ['$scope', '$routeParams', 'storeData', 'APP_CONTANTS', 'personClass', 'contactClass', 'groupClass',
  function($scope, $routeParams, storeData, APP_CONTANTS, personClass, contactClass, groupClass) {

    if ($routeParams.contactId === 'read') {
      $scope.contact = new personClass({});
    } else {
      if (!storeData.isLoaded()) {
        storeData.getData()
          .then(
            function(response){
              var contactFound = storeData.findContactById($routeParams.contactId);
              if (contactFound) {
                $scope.contact = storeData.findContactById($routeParams.contactId);
                $scope.master = angular.copy($scope.contact);
                $scope.groups = storeData.data.groups;
              }
            }
          );
      } else {
        $scope.contact = storeData.findContactById($routeParams.contactId);
        $scope.master = angular.copy($scope.contact);
        $scope.groups = storeData.data.groups;
      }
    }

    $scope.toggleDropdown = function($event) {
      $event.preventDefault();
      $("#userAgeLabel").text($event.target.innerText)
    };

    $scope.reset = function(contact) {
      $scope.contact = angular.copy(contact);
    };

    $scope.APP_CONTANTS = APP_CONTANTS;
  }])

.controller('groupListCtrl', ['$scope', 'storeData',
  function($scope, storeData) {

    if (!storeData.isLoaded()) {
      storeData.getData()
        .then(
          function(response){
            $scope.groups = response.data.groups;
          }
        );
    } else {
      $scope.groups = storeData.data.groups;
    }

    $scope.orderProp = 'id';
  }])