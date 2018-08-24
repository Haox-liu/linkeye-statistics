angular.module('AppRoute').controller("ElementsCtrl", ["$scope", "$http", '$httpParamSerializer', '$filter',
  function($scope, $http, $httpParamSerializer, $filter) {

    $scope.submit = submit;

    function submit() {
      $http({
          method: 'GET',
          url: 'http://127.0.0.1:3000/'
    }).then(function successCallback(response) {
            console.log('response....', response);
          }, function errorCallback(response) {
              // 请求失败执行代码
      });
    }






  }
]);
