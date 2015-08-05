// truncateFilter.js version: 1.0.0 - 20140930...

(function() {
      'use strict';
function ignoreTimeZone () {
    return function(val){
    	var newDate;
    	if(val){
      		newDate = new Date(val.slice(0, -6)+"Z");
  		}
     	return newDate;
  };
}
      angular
          .module('app')
          .filter('ignoreTimeZone', ignoreTimeZone);
  })();