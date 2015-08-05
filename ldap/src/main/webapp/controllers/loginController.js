 /**
  * @class TempController
  * @version 1.0.0
  * @classdesc Example of controller.
  */
 (function() {
     'use strict';
     function init($scope, $rootScope, $location, LoginService,FSN_T_UI_GROUPS,ERROR_DEFAULT_POPUP_ATTRIBUTES) {
        var shownOverlay,showOverlay;
        shownOverlay = 'none';
    showOverlay = function(popupName){
        console.info ("showoverlay??? " + popupName );
        shownOverlay = popupName;
    }
    $scope.errorDefaultPopupAttributes =ERROR_DEFAULT_POPUP_ATTRIBUTES;
    $scope.errorMessage = "";
    $scope.hideOverlay = function(){
        shownOverlay = 'none';
    }
    $scope.hidePopup = function(popupName){
        return !(shownOverlay == popupName);
    }
             $scope.setLogin = function() {
                 if ($scope.user != undefined) {
                     if ($scope.user.trim() != "") {
                         if ($scope.psssword != undefined && $scope.psssword != "") {
                             $rootScope.showLoading = true;
                             var loginData = {
                                 'j_username': $scope.user,
                                 'j_password': $scope.psssword
                             };
                             LoginService.getLoginResponse(loginData).
                             then(function(response) {
                                if(response.data.statusCode==200){
                                        console.info ("************* RESPONSE FROM JBAUTHSERVICE*****");
                                        console.info ("please make sure console are off for IE ;-)");
                                         
                                        console.info ("@@@@@@@@ RESPONSE***** status ***************");
                                        console.info("thank you for using FSN-T-U! - ! DETAILS:");
                                            // var getData = JSON.parse(response.data.data);
                                            var getData = response.data.data;
                                            LoginService.userData.userName = $scope.user;
                                                console.info (getData.firstName);
                                                console.info (getData.lastName);
                                                console.info (getData.userAuthorities.length);
                                                console.info (getData.userAuthorities[0]);
                                                console.info (getData.userAuthorities[1]);
                                                if(getData.userAuthorities.indexOf(FSN_T_UI_GROUPS.admin) > -1){
                                                    LoginService.userData.isLogged = true;
                                                    LoginService.userData.userRole ="admin";
                                                    LoginService.userData.firstName = getData.firstName;
                                                    $location.path('dashboard');
                                                }else if (getData.userAuthorities.indexOf(FSN_T_UI_GROUPS.user) > -1){
                                                    LoginService.userData.isLogged = true;
                                                    LoginService.userData.userRole ="user";
                                                    LoginService.userData.firstName = getData.firstName;
                                                    $location.path('dashboard');
                                                }else{
                                                    LoginService.userData.isLogged = false;
                                                    LoginService.userData.userRole ="";
                                                    $scope.errorMessage = "Please contact the FSN-T Administrator to access this application.";
                                                    showOverlay('errorDefault');
                                                    //if authenticated but not in any FSN-T-UI groups then also show an modal alert.
                                                }
                                    // if getData.userAuthorities contains "FSNT-UI-ADMIN" visitor is admin.
                                    // else if the userAuthorities array contains "FSNT-UI-USER" user. 
                                    // if not not authorized, show an modal alert they are not not authorized. 
                                    // if authenticated but not in any FSN-T-UI groups then also show an modal alert.

                                    // when not authorized the response is a 401 
                                    // {"errorMessage":"Bad credentials","statusCode":"401","data":"{}","status":"UNAUTHORIZED"}

                                    // when authorized the result is: the userAuthorities us an array and will change.
                                    //{"errorMessage":"","statusCode":"200","data":"{\"firstName\":\"macarbone\",\"lastName\":\"\",\"userAuthorities\":[\"ITDevContractors\",\"Domain Users\"]}","status":"OK"}
    
                                    // note: firstName and lastName are still being worked on. LastName is blank. 
                                    // once the developer makes an update both first and last names will appear. 
                                    // AT THE MOMENT THE FSN-T USER GROUPS ARE NOT AVAILABLE SO LEAVE As ADMIN.
                                }else if(response.data.statusCode==401){
                                    $rootScope.showLoading = false;
                                    LoginService.userData.isLogged = false;
                                    $scope.errorMessage = "Your login name is not authorized, please contact the Help Desk for assistance.";
                                     showOverlay('errorDefault');
                                    //if not not authorized, show an modal alert they are not not authorized.
                                }else{
                                    $rootScope.showLoading = false;
                                    LoginService.userData.isLogged = false;
                                     $scope.errorMessage = "Please notify the FSN-T Administrator and try again later.";
                                     showOverlay('errorDefault');
                                }
                             }, function(response) {
                                 LoginService.userData.isLogged = false;
                                 $rootScope.showLoading = false;
                                 $scope.errorMessage = "Please notify the FSN-T Administrator and try again later.";
                                 showOverlay('errorDefault');
                             });
                         } else {
                             $scope.showPasswordMessage = true;
                             $scope.showUserMessage = false;
                             $('.jb-fsnt-password-input').focus();
                         }
                     } else if ($scope.user.trim() == "") {
                         $scope.showUserMessage = true;
                         $('.jb-fsnt-username-input').focus();
                         if ($scope.psssword == undefined || $scope.psssword == "") {
                             $scope.showPasswordMessage = true;
                         } else {
                             $scope.showPasswordMessage = false;
                         }
                     }
                 } else if ($scope.user == undefined) {
                     $scope.showUserMessage = true;
                     $('.jb-fsnt-username-input').focus();
                     if ($scope.psssword == undefined || $scope.psssword == "") {
                         $scope.showPasswordMessage = true;
                     } else {
                         $scope.showPasswordMessage = false;
                     }
                 }
             }
             $scope.setFocus = function(target) {
                 $('.jb-fsnt-username-input').focus();
				  $scope.showPasswordMessage = false;
                  $scope.showUserMessage = false;
             }
             $scope.removeSpaces = function(){
             	var inputValue=$('.jb-fsnt-username-input').val().trim();
             	inputValue = inputValue.replace(/\s+/g," ");
             	$('.jb-fsnt-username-input').val(inputValue);
             	}
         } 
     angular.module('app').controller('LoginController', init);
     init.$inject = ['$scope', '$rootScope', '$location', 'LoginService','FSN_T_UI_GROUPS','ERROR_DEFAULT_POPUP_ATTRIBUTES'];
 })();