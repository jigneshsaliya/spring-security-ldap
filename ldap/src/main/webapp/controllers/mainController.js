 /**
  * @class MainController 
  * @version 1.0.0
  * @classdesc MainController
  */
(function() {
      'use strict';
function init($scope,$rootScope,$location,$window,REPORTS_URL,dashboardDataService,LoginService){
  var reportsURL,role,roleText;
  roleText ={"admin":"Admin",
  "user":"Visitor"}
  reportsURL = REPORTS_URL;
  role= LoginService.userData.userRole;
  $scope.firstName = LoginService.userData.firstName;
  $scope.userRoleText = roleText[role];
  $scope.$watch(function(){
      return dashboardDataService.getNotificationStatsData();
    },
    function(newVal,oldVal){
      $scope.notificationStats =newVal.notificationStats;
      console.log($scope.lastRefreshTime);
      console.log("dashboard service main controller"+JSON.stringify($scope.notificationStats));
    },true);
  $scope.goToConfigMgt = function(){
    if($location.path() !='/configMgt'){
      $rootScope.showLoading=true;
      $location.path('configMgt');
    }
  }
  $scope.goToDashboard = function(){
     if($location.path() !='/' && $location.path() !='/dashboard'){
        $rootScope.showLoading=true;
        $location.path('dashboard');
      }
  }
  $scope.goToReports = function(){
    console.log("go to reports portal");
    $window.open( reportsURL, '_blank');
  } 
  $scope.isActive = function(route) {
        return route === $location.path();
    }
  $scope.isReadOnly = function() {
        return role !='admin';
    }
    $scope.isDashboard = function(){
           return ($location.path() =='/' || $location.path() =='/dashboard');
    }
} 
angular.module('app').controller('MainController',['$scope','$rootScope','$location','$window','REPORTS_URL','DashboardDataService','LoginService',init]);
})();