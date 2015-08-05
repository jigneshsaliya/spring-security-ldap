 /**
  * @class PauseResumeOverlay
  * @version 1.0.0
  * @classdesc timer directive  
  */
(function() {
      'use strict';
function init(){
return {
      restrict: 'E',
      transclude: true,
      replace: true,
      scope: {
      'popupAttributes': '=',
      'close': '&onClose',
      'leftButtonClick': '&leftButtonClick',
      'rightButtonClick': '&rightButtonClick'
      },
      templateUrl: 'partials/modals/modalPause.html',
      link: function (scope, element) {
      }
    };
} 
angular.module('app').directive('pauseOverlay',[init]);
})();