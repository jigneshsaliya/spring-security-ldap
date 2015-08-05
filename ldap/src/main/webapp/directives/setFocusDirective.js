(function() {
      'use strict';
function init($timeout){
return {
	restrict : 'A',
    link: function ($scope, $element, $attrs) {
    	$scope.$watch($attrs.focus, 
    	function(newVal){
    		!newVal ? $timeout(function(){
    		   $element[0].focus();
    			}):$element[0].blur();
    	});   
    }
    };
} 
angular.module('app').directive('focus',['$timeout',init]);
})();