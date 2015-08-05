
(function() {
      'use strict';
function init($location){
return function () {
    	if($location.path()=='/' || $location.path()=="/login")
          {
             	$('.jb-fsnt-username-input').focus();
          }   
    }
} 
angular.module('app').directive('inputfocus',['$location',init]);
})();