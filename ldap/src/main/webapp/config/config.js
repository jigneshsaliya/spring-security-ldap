/**
* Some js config
*/
(function() {
angular.module('config', [])
.constant('ENV', {
  'name': 'localServer',
  'baseURL': 'http://10.156.74.161:8090/'
})
.constant('DASHBOARD_API_URL',"FSNT/DashboardDetails")
.constant('CONFIG_API_URL', {
  'getConfig': 'FSNT/SystemData',
  'pauseFSNT': 'FSNT/SystemStatus',
  'resumeFSNT':'FSNT/SystemStatus',
  'updateFSNTDealy':'FSNT/SystemDelay'
})
/*.constant('ENV', {
  'name': 'localJson',
  'baseURL': 'data/'
})
.constant('DASHBOARD_API_URL',"dash.json")
.constant('CONFIG_API_URL', {
  'getConfig': 'configMgt.json',
  'pauseFSNT': 'pausePost.json',
  'resumeFSNT':'resumePost.json',
  'updateFSNTDealy':'delayPost.json'
})*/
.constant('REPORTS_URL','http://10.156.74.172/SpotfireWeb/ViewAnalysis.aspx?file=/FSNT%20Reporting&waid=b2a4d5ee8ef8d7d1cad67-2904145191fe04')
.constant('errorDefaultPopupAttributes', {
	'popupHeading':'Opps! An error has occurred',
	'leftButtonText':'CANCEL',
	'rightButtonText':'OK'
})
.constant('AUTO_REFRESH_INTERVAL',30000)
.constant('ERROR_DEFAULT_POPUP_ATTRIBUTES', {
	'popupHeading':'Opps! An error has occurred',
	'leftButtonText':'OK',
	'rightButtonText':''
})
.constant('CONFIG_MGT_POPUP_ATTRIBUTES',{
	'puasePopupAttributes' : {
    	'popupHeading':'Pause FSN-T Notification Processing',
    	'leftButtonText':'CANCEL',
    	'rightButtonText':'YES'
    },
    'resumePopupAttributes' : {
    	'popupHeading':'Resume FSN-T Notification Processing',
    	'leftButtonText':'CANCEL',
    	'rightButtonText':'YES'
    },
    'configureDelayPopupAttributes' : {
    	'popupHeading':'Configure FSN-T Notification Delay',
    	'leftButtonText':'CANCEL',
    	'rightButtonText':'EDIT'
    },
    'editFSNTDelayPopupAttributes' : {
    	'popupHeading':'Configure FSN-T Notification Delay',
    	'leftButtonText':'CANCEL',
    	'rightButtonText':'CONFIRM'
    },
    'updateFSNTDelayPopupAttributes' : {
    	'popupHeading':'Configure FSN-T Notification Delay',
    	'leftButtonText':'EDIT',
    	'rightButtonText':'OK'
    }
})
.constant('ICON_DETAILS', {
  'DepGate': 'DepGate',
  'EstArrTime': 'EstArrTime',
  'EstDepTime': 'EstDepTime',
  'FlightCancelled': 'FlightCancelled',
  'StubNewOrigin': 'StubNewOrigin',
  'UndelayArrTime': 'UndelayArrTime',
  'UndelayDepTime': 'UndelayDepTime'
})
// production
// .constant('FSN_T_UI_GROUPS', {
//   'admin': 'FSN_T_Admin',
//   'user': 'FSN_T_User'
// });

.constant('FSN_T_UI_GROUPS', {
  'admin': 'ITDevContractors',
  'user': 'FSNT_UI_USER'
});

})();