(function() {
      'use strict';
 /**
   * @class ConfigMgtDataService version: 1.0.1
   * @classdes Service to fetch ConfigMgt related information
   */
function init($http,ENV,CONFIG_API_URL) {
	console.log("init configMgtData service");
	var postRequest, getConfigUrl, 
	    pauseFSNTUrl,resumeFSNTUrl,delayFSNTUrl,promise,getConfigPromise,configMgtData,configMgtDataModel;
	getConfigUrl = ENV.baseURL+CONFIG_API_URL.getConfig;//"http://10.156.74.63:8090/FSNT/ConfigMgt";
	pauseFSNTUrl = ENV.baseURL+CONFIG_API_URL.pauseFSNT;
	resumeFSNTUrl= ENV.baseURL+CONFIG_API_URL.resumeFSNT;
	delayFSNTUrl = ENV.baseURL+CONFIG_API_URL.updateFSNTDealy;
	configMgtDataModel = {};
	configMgtData = {};
    postRequest = function(url,data){
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
    	});
		return promise;
    }
	configMgtData.fetchconfigMgtData = function(){
		console.log("fetching configMgtData data");
		getConfigPromise = $http({method: 'GET',url: getConfigUrl})
			.success(function(response) {
    		if(response.statusCode==200){
    		//$rootScope.lastRefreshTime = new Date();
			configMgtDataModel =response.data;
			}	
		})
		return getConfigPromise;
	}
	configMgtData.getconfigData = function(){
		return configMgtDataModel;
	}
	configMgtData.requestFSNTPause = function(puaseData){
		return postRequest(pauseFSNTUrl,puaseData);
	} 
	configMgtData.requestFSNTResume = function(resumeData){
		return postRequest(resumeFSNTUrl,resumeData);
	} 
	configMgtData.requestFSNTDelay = function(delayData){
		return postRequest(delayFSNTUrl,delayData);
	} 
	  return configMgtData;
}
 angular.module('app').factory('configMgtDataService',['$http','ENV','CONFIG_API_URL',init]);
})();