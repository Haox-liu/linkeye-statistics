var app = angular.module("appIndex", []);

app.constant('RequestPath', 'http://localhost:7000');

app.controller("appIndexCtrl", ['$scope', '$http', '$httpParamSerializer','RequestPath',
  function($scope, $http, $httpParamSerializer, RequestPath) {

    //$scope.mobile = '18515882328';
    //$scope.password = 'hao123';

    $scope.login = function() {
      if ($scope.mobile.trim() == '' || $scope.password.trim() == '') {
        clear();
        return;
      }

      //请求参数
      var params = {
        mobile: $scope.mobile.trim(),
        password: $scope.password.trim()
      };
      // console.log('params....', params);
      $http({
          method: 'POST',
          url: RequestPath + '/login',
          headers: {
            'Content-Type': 'application/json;charset=UTF-8'
          },
          //data: $httpParamSerializer(params)
          data: params
        }).then(function successCallback(response) {
              console.log("response......", response);
              if (response.data.retCode == '9999') {
                clear();
                alert(response.data.retMsg);
              } else if (response.data.retCode == '0000') {
                window.location.href="/statistics";
                //window.location.href="/statistics?star=" + response.data.data.userId;
              } else {
                clear();
                alert("账号或密码错误！");
              }

          }, function errorCallback(response) {
              // 请求失败执行代码
      });


      function clear() {
        $scope.mobile = '';
        $scope.password = '';
      }
    }

  }
]);
