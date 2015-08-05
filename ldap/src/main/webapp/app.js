 /**
   * @class MainCtrl
   * @version 1.0.0
   * @classdesc Main Controller 
   */
////////// MAIN APP ///////////////////////// 
(function() {
'use strict';
function setroot ($rootScope) {
        $rootScope.lastRefreshTime = new Date();
        $rootScope.showLoading=false;
}
////////// ROUTING /////////////////////////
function config ($httpProvider,$routeSegmentProvider,$routeProvider) {
		 $httpProvider.defaults.useXDomain = true;
	   delete $httpProvider.defaults.headers.common['X-Requested-With'];
     var checkLoggedin = function($rootScope,$location,$q,$timeout,LoginService){
        var deferred = $q.defer();
        if(LoginService.userData.isLogged){
                  $timeout(deferred.resolve, 0);
        }else{
          $timeout(function(){deferred.reject();}, 0);
          $location.url('/login');
          $rootScope.showLoading=false;
        }
     }
     var checkAdmin = function($rootScope,$location,$q,$timeout,LoginService){
             var deferred = $q.defer();
              if(LoginService.userData.isLogged && LoginService.userData.userRole==="admin"){
              $timeout(deferred.resolve, 0);
            }else{
              $timeout(function(){deferred.reject();}, 0);
              $rootScope.showLoading=false;
              if(LoginService.userData.isLogged){
                $location.url('/dashboard');
              }else{
              $location.url('/login');
              }
            }
     }
     checkLoggedin.$inject = ['$rootScope','$location','$q','$timeout','LoginService'];
     checkAdmin.$inject = ['$rootScope','$location','$q','$timeout','LoginService'];
	     $routeSegmentProvider
        .when('/',          'login')
	     .when('/dashboard','main.dashboard')
	     .when('/configMgt','main.configMgt')
       .segment('login', {
            templateUrl: 'partials/login.html',
            controller: 'LoginController'})
	     .segment('main', {
            templateUrl: 'partials/FSNTMain.html',
            controller: 'MainController'})
        .within()
            .segment('dashboard', {
                'default': true,
                templateUrl: 'partials/dashboard.html',
                controller: 'DashboardController',
                resolve:['$rootScope','$location','$q','$timeout','LoginService',checkLoggedin]})
            .segment('configMgt', {
                templateUrl: 'partials/configMgt.html',
                controller: 'ConfigMgtController',
                resolve:['$rootScope','$location','$q','$timeout','LoginService',checkAdmin]})
		$routeProvider
		.otherwise({ redirectTo: '/'});
// ./config
}
angular.module('app', ['ngRoute','route-segment', 'view-segment','config'])
.config(['$httpProvider','$routeSegmentProvider','$routeProvider',config])
.run(['$rootScope',setroot]);
})();