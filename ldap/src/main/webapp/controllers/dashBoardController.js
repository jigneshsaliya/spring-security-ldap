 /**
  * @class DashboardController 
  * @version 1.0.0
  * @classdesc DashboardController
  */
(function() {
      'use strict';
function init($scope,$rootScope,$interval,AUTO_REFRESH_INTERVAL,ERROR_DEFAULT_POPUP_ATTRIBUTES,ICON_DETAILS,dashboardDataService){
	var getUpdatedData,intervalPromise,stopInterval,shownOverlay,showOverlay,scopeChanged;
	scopeChanged = true; // for showing error only when page changes and not in autorefresh
	$scope.notificationTable =[];
	$scope.notificationIconTitle = ICON_DETAILS;
	shownOverlay = 'none';
	showOverlay = function(popupName){
		console.info ("showoverlay??? " + popupName );
		shownOverlay = popupName;
	}
	$scope.errorDefaultPopupAttributes =ERROR_DEFAULT_POPUP_ATTRIBUTES;
	$scope.hideOverlay = function(){
		shownOverlay = 'none';
	}
	$scope.hidePopup = function(popupName){
		return !(shownOverlay == popupName);
	}
	$scope.errorDefaultOK = function(){
		$scope.hideOverlay();
		console.log("error popup default hidden");
	}
	getUpdatedData = function(){
		dashboardDataService.fetchDashboardData().
	    then(function(response){
	    	$rootScope.showLoading=false;
	    	if(response.data.statusCode==200){
	    		if(response.data.notificationTable instanceof Array){
	    			$scope.notificationTable = response.data.notificationTable;
	    		}else{
	    			$scope.notificationTable=[];
	    			$scope.notificationTable.push(response.data.notificationTable);
	    		}
				}else{
					$scope.notificationTable = dashboardDataService.getNotificationTableData();
					if(scopeChanged){
						showOverlay('errorDefault');
					}
				}
				scopeChanged = false;
			},
			function(data){
				$scope.notificationTable = dashboardDataService.getNotificationTableData();
				console.log("error");
				if(scopeChanged){
						showOverlay('errorDefault');
					}
				 scopeChanged = false;
				 $rootScope.showLoading=false;
			});
	}
	stopInterval = function(){
		$interval.cancel(intervalPromise);
	}
	getUpdatedData();
	intervalPromise = $interval(getUpdatedData,AUTO_REFRESH_INTERVAL,0,false);
	$scope.$on('$destroy',stopInterval);
} 
angular.module('app')
	.controller('DashboardController',[
		'$scope',
		'$rootScope',
		'$interval',
		'AUTO_REFRESH_INTERVAL',
		'ERROR_DEFAULT_POPUP_ATTRIBUTES',
		'ICON_DETAILS',
		'DashboardDataService',
		init]);
})();