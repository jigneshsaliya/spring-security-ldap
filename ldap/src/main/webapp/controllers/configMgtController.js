 /**
  * @class ConfigMgtController 
  * @version 1.0.0
  * @classdesc ConfigMgtController
  */
(function() {
      'use strict';
function init($scope,$rootScope,$interval,AUTO_REFRESH_INTERVAL,ERROR_DEFAULT_POPUP_ATTRIBUTES,CONFIG_MGT_POPUP_ATTRIBUTES,configMgtDataService,LoginService){
	var getUpdatedData,stopInterval,intervalPromise,shownOverlay,showOverlay,PauseResumeText,
    pauseResumeData,delayData,convertToET;
	pauseResumeData={'action' : 'pause',
		'actionBy' : LoginService.userData.firstName,
		'userId' : LoginService.userData.userName
	};
    //delayData="action=delay&delayedValue=59&delayedBy=andrew&delayedOn=2014-11-20T03:21:31.841-05:00";
    delayData = {'delayedValue' : '59',
        'delayedBy' : LoginService.userData.firstName,
        'userId' : LoginService.userData.userName,
        'action' : 'delay'
    };
    PauseResumeText ={'pause':'Resume',
        'resume':'Pause'
    };
    $scope.pauseResumeButtonText = PauseResumeText['resume'];
    shownOverlay = 'none';
    convertToET = function(dateTime){
        var etTimeZone,newDateToEt;
        if(dateTime){
        etTimeZone =moment(dateTime).tz("America/New_York").format('z');
        newDateToEt= new Date(dateTime);
        if(etTimeZone == "EDT"){
            newDateToEt.setHours(newDateToEt.getHours() - 4);
        }else if(etTimeZone == "EST"){
             newDateToEt.setHours(newDateToEt.getHours() - 5);
        }
    }
        return newDateToEt;
    }
    showOverlay = function(popupName){
        shownOverlay = popupName;
    }
    $scope.puasePopupAttributes =CONFIG_MGT_POPUP_ATTRIBUTES.puasePopupAttributes;
    $scope.resumePopupAttributes =CONFIG_MGT_POPUP_ATTRIBUTES.resumePopupAttributes;
    $scope.configureDelayPopupAttributes =CONFIG_MGT_POPUP_ATTRIBUTES.configureDelayPopupAttributes;
    $scope.editFSNTDelayPopupAttributes =CONFIG_MGT_POPUP_ATTRIBUTES.editFSNTDelayPopupAttributes;
    $scope.updateFSNTDelayPopupAttributes =CONFIG_MGT_POPUP_ATTRIBUTES.updateFSNTDelayPopupAttributes;
    $scope.errorDefaultPopupAttributes =ERROR_DEFAULT_POPUP_ATTRIBUTES;
	$scope.delayValue = {'newDelayDuration': 0,
        'currentDelayDuration':''
    };
    getUpdatedData = function(){
    var tempData ={};
	configMgtDataService.fetchconfigMgtData().
    then(function(response){
         $rootScope.showLoading=false;
        if(response.data.statusCode==200){
            $rootScope.lastRefreshTime = new Date();
    		$scope.fsntStatus = response.data.pauseModeStatus;
    		$scope.pauseResumeButtonText = PauseResumeText[$scope.fsntStatus];
    		$scope.delayValue.currentDelayDuration = response.data.delayedValue;
    		$scope.delayValue.newDelayDuration = $scope.delayValue.currentDelayDuration;
            $scope.pauseScheduledToResume = convertToET(response.data.pauseScheduledToResume);
        }else{
            tempData = configMgtDataService.getconfigData();
            $scope.fsntStatus = tempData.pauseModeStatus;
            $scope.pauseResumeButtonText = PauseResumeText[$scope.fsntStatus];
            $scope.delayValue.currentDelayDuration = tempData.delayedValue;
            $scope.delayValue.newDelayDuration = $scope.delayValue.currentDelayDuration;
            $scope.pauseScheduledToResume = convertToET(tempData.pauseScheduledToResume);
            showOverlay('errorDefault');
        }
    	},
    	function(response){
            $rootScope.showLoading=false;
            tempData = configMgtDataService.getconfigData();
            $scope.fsntStatus = tempData.pauseModeStatus;
            $scope.pauseResumeButtonText = PauseResumeText[$scope.fsntStatus];
            $scope.delayValue.currentDelayDuration = tempData.delayedValue;
            $scope.delayValue.newDelayDuration = $scope.delayValue.currentDelayDuration;
            $scope.pauseScheduledToResume = convertToET(tempData.pauseScheduledToResume);
            console.log("error");
            showOverlay('errorDefault');
    	});
    }
    $scope.pauseResumeClick = function(){
		if($scope.fsntStatus =='resume'){
			showOverlay('pause');
		}else{
			showOverlay('resume');
		}
	}
	$scope.pauseFSNT = function(){
        $rootScope.showLoading=true;
        pauseResumeData.action ="pause";
		configMgtDataService.requestFSNTPause(pauseResumeData).
		    then(function(response){
            $rootScope.showLoading=false;
            if(response.data.statusCode==200){
              if(response.data.pauseModeStatus=="pause"){
    		  $scope.fsntStatus = response.data.pauseModeStatus;
    		  $scope.pauseResumeButtonText = PauseResumeText[$scope.fsntStatus];
              $scope.pauseScheduledToResume = convertToET(response.data.pauseScheduledToResume);
    		  $scope.hideOverlay();
			  console.log("FSNT Paused");
            }else{
            $scope.fsntStatus = "pause";
            $scope.pauseResumeButtonText = PauseResumeText[$scope.fsntStatus];
            $scope.pauseScheduledToResume = convertToET(response.data.pauseScheduledToResume);
            $scope.hideOverlay();
            }
        }else{
            showOverlay('errorDefault');
        }
    	},
    	function(response){
    		console.log("error");
            showOverlay('errorDefault');
             $rootScope.showLoading=false;
    	});
	}
	$scope.resumeFSNT = function(){
        $rootScope.showLoading=true;
        pauseResumeData.action ="resume";
		configMgtDataService.requestFSNTResume(pauseResumeData).
		    then(function(response){
            $rootScope.showLoading=false; 
            if(response.data.statusCode==200){    
              if(response.data.pauseModeStatus=="resume"){
    		  $scope.fsntStatus = response.data.pauseModeStatus;
    		  $scope.pauseResumeButtonText = PauseResumeText[$scope.fsntStatus];
    		  $scope.hideOverlay();
			 console.log("FSNT Resumed");
            }else{
              $scope.fsntStatus = "resume";
              $scope.pauseResumeButtonText = PauseResumeText[$scope.fsntStatus];
              $scope.hideOverlay();
              }
            }else{  
                showOverlay('errorDefault');
            }
                	},
    	function(response){
    		console.log(response);
            showOverlay('errorDefault');
    	});	
	}
	$scope.configureFSNTDelay = function(){
		showOverlay('configureDelay');
		console.log("configuring delay");
	}
	$scope.editFSNTDelay = function(){
		showOverlay('editFSNTDelay');
	}
	$scope.confirmFSNTDelay = function(){
        if(!isNaN($scope.delayValue.newDelayDuration) && $scope.delayValue.newDelayDuration>=0 && $scope.delayValue.newDelayDuration!= ""){
		showOverlay('updateFSNTDelay');
        }
	}
	$scope.updateFSNTDelay = function(){
         $rootScope.showLoading=true;
        delayData.delayedValue = $scope.delayValue.newDelayDuration;
		configMgtDataService.requestFSNTDelay(delayData).
		    then(function(response){
            $rootScope.showLoading=false;
    		if(response.data.statusCode==200){ 
            $scope.delayValue.currentDelayDuration = response.data.delayedValue;
    		//$scope.delayValue.currentDelayDuration = $scope.delayValue.newDelayDuration;
			$scope.hideOverlay();
			console.log("FSNT delay updated");
         }else{
            showOverlay('errorDefault');
         }
		},
    	function(response){
            showOverlay('errorDefault');
            $rootScope.showLoading=false;
    	});		
	}
	$scope.hideOverlay = function(){
        if(shownOverlay == 'editFSNTDelay'){
            $scope.delayValue.newDelayDuration= $scope.delayValue.currentDelayDuration;
        }
	    shownOverlay = 'none';
	}
	$scope.hidePopup = function(popupName){
		return !(shownOverlay == popupName);
	}
    stopInterval = function(){
        $interval.cancel(intervalPromise);
    }
    getUpdatedData();
    intervalPromise = $interval(getUpdatedData,AUTO_REFRESH_INTERVAL,0,false);
    $scope.$on('$destroy',stopInterval);
} 
angular.module('app')
	.controller('ConfigMgtController',[
		'$scope',
		'$rootScope',
        '$interval',
        'AUTO_REFRESH_INTERVAL',
        'ERROR_DEFAULT_POPUP_ATTRIBUTES',
        'CONFIG_MGT_POPUP_ATTRIBUTES',
		'configMgtDataService',
        'LoginService'
		,init]);
})();