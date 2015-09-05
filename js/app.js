'use strict';

/* App Module */

var maintenancePage = angular.module('maintenanceApp', [
  'ngRoute',
  'maintenanceControllers',
]);

maintenancePage.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/processes', {
        templateUrl: 'partials/processList.html',
        controller: 'processListCtrl'
      }).
      when('/meminfo', {
        templateUrl: 'partials/meminfo.html',
        controller: 'meminfoCtrl'
      }).
	  when('/deviceControl', {
        templateUrl: 'partials/deviceControl.html',
        controller: ''
	  }).
      otherwise({
        redirectTo: '/meminfo'
      });
  }]);
