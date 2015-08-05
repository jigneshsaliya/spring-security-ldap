(function() {
      'use strict';
 /**
   * @class ConfigMgtDataService version: 1.0.1
   * @classdes Service to fetch ConfigMgt related information
   */
function init($http) {
	var loginDataUrl = "/JBAuthService/ajaxlogin2";
	var loginDataUrl = "data/login.json";
    var userDataService={};
    userDataService.userData = {'isLogged':false,
    'firstName':'',
    'userName':'',
    'userRole':''
    };
	
userDataService.getLoginResponse = function(loginData){
		var loginPromise = $http({
			method: 'get',
			url: loginDataUrl,
			data: loginData
		});
		return loginPromise;
	} 
 	return userDataService;

}
 angular.module('app').factory('LoginService',['$http',init]);
})();