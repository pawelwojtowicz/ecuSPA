'use strict';

var maintenanceControllers = angular.module('maintenanceControllers', []);

maintenanceControllers.controller('processListCtrl', function( $scope, $http)
	{ 
		$http.get('cgi-bin/controller?command_name=controller&api_name=get_process_list').success(function(responseData)
		{
			$scope.ctrl.processes = responseData.get_process_list.data.processList;
		}).error(function(data, status, headers, config)
		{ 
			$scope.processes = processList;
		});
	});

maintenanceControllers.controller('meminfoCtrl', function( $scope, $http)
	{ 
		$http.get('cgi-bin/controller?command_name=getMemInfo').success(function(responseData)
		{
			$scope.ctrl.memtotal 	= responseData.getMemInfo.data.meminfo.MemTotal;
			$scope.ctrl.memfree 	= responseData.getMemInfo.data.meminfo.MemFree,
			$scope.ctrl.buffers 	= responseData.getMemInfo.data.meminfo.Buffers;
			$scope.ctrl.cached	 	= responseData.getMemInfo.data.meminfo.Cached;
			$scope.ctrl.swapcached= responseData.getMemInfo.data.meminfo.SwapCached;
			$scope.ctrl.active	 	= responseData.getMemInfo.data.meminfo.Active;
			$scope.ctrl.inactive 	= responseData.getMemInfo.data.meminfo.Inactive;
			$scope.ctrl.shmem		 	= responseData.getMemInfo.data.meminfo.Shmem;
		}).error(function(data, status, headers, config)
		{ 
			$scope.ctrl = [];
		});
	});
	
maintenanceControllers.controller('screenFlowCtrl', function($scope, $routeParams, $location)
	{
    $scope.changeScreen = function(viewName)
		{
        $location.url('/'+viewName);
		};
	});

maintenanceControllers.controller('statusUpdater', function($scope, $interval, $http)
	{
		$scope.number = 5;
		$scope.statusText = 'no connection';
		$scope.footerStyleClass = 'ok';
		$interval( function() 	{ 
									$scope.number++; 
									$http.get('index.html').success(function(responseData)
									{
										$scope.statusText = "connection OK";
										$scope.footerStyleClass = "ok";
									}).error(function(data, status, headers, config)
									{ 
										$scope.statusText = "connection FAILURE";
										$scope.footerStyleClass = "nok";
									});
								}, 5000 );
	});

maintenanceControllers.controller('netControl', function($scope, $interval, $http)
	{
		$scope.networkConfigurationMode = 'auto';
		$scope.message = '-';
		$scope.ipAddress = '192.168.10.1';
		$scope.mask = '255.255.255.0';
		$scope.gateway = '192.168.10.100';
		$scope.isStatic = function()
		{
			return ( $scope.networkConfigurationMode == 'manual');
		};
		$scope.applySettings = function() 
		{
			$scope.message = "Setting up the IPs to "+$scope.ipAddress; 
		};
	});