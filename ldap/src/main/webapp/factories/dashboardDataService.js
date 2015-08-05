(function() {
      'use strict';
 /**
   * @class DashboardDataService version: 1.0.1
   * @classdes Service to fetch dashboard related information
   */
function init($http,$rootScope,ENV,DASHBOARD_API_URL) {
	console.log("init dashboard service");
	var url,promise,notificationTable,notificationStatsData,dashboardData,lastUpdatedTime,data;
	url = ENV.baseURL+DASHBOARD_API_URL;
	//url = 'data/dash.json'
	//url = 'http://10.156.74.63:8090/FSNT/Dashboard'
	data = {'dateTimeInUTC':''}
	notificationTable=[];
	notificationStatsData={};
	dashboardData = {};
	dashboardData.fetchDashboardData =function(){
		var tempDateTime = new Date();
		data.dateTimeInUTC = tempDateTime.toISOString();
    	promise = $http({
    		method: 'post',
    		headers: {'Content-Type': 'application/x-www-form-urlencoded'},
    		transformRequest: function(obj) {
    			var str = [];
    			for(var p in obj)
    				str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
    			return str.join("&");
    		},
    		data:data,
    		url: url
    	}).success(function(response) {
    		if(response.statusCode==200){
    		if(response.notificationTable instanceof Array){
	    		notificationTable = response.notificationTable;
	    	}else{
	    		notificationTable=[];
	    		notificationTable.push(response.notificationTable);
	    	}
			notificationStatsData.notificationStats =response.notificationStats;
			$rootScope.lastRefreshTime = new Date();
			}	
		});
		return promise;
    }
	dashboardData.getNotificationTableData = function(){
		return notificationTable;
	}
	dashboardData.getNotificationStatsData = function(){
		return notificationStatsData;
	}
	  return dashboardData;
}
 angular.module('app').factory('DashboardDataService',['$http','$rootScope','ENV','DASHBOARD_API_URL',init]);
})();