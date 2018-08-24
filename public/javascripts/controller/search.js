angular.module('AppRoute').controller("SearchCtrl", ["$scope", "$http", "$filter","RequestPath",
  function($scope, $http, $filter, RequestPath) {

    var userInfo = {
      realName: '---',
      serialNumber: '---',
      mobile: '---',
      calcScore: '---',
      isAuth: '---',
      isPhoto: '---',
      isFace: '---',
      isBank: '---',
      isAsset: '---',
      isCareer: '---',
      isEducation: '---',
      todaySignFlag: '---',
      validSignCount: '---',
      validInviteCount: '---',
      createTime: '---',
    };

    $scope.userInfo = userInfo;
    // $scope.mobile = '18515882328';

    //提交, 查询数据
    $scope.search = function () {
      if ($scope.mobile == undefined || $scope.mobile.trim() == '') {
        $scope.tip1 = true;
        return;
      } else {
        $scope.tip1 = false;
      }

      userInfoSearch($scope.mobile.trim());
      userTokenSearch($scope.mobile.trim());
      scoreRecordSearch($scope.mobile.trim());
    }

    //用户信息
    function userInfoSearch(mobile) {
      $http({
          method: 'GET',
          url: RequestPath + '/user/userInfoSearch',
          params: {mobile: mobile}
      }).then(function successCallback(response) {
            // console.log('response...', response);
            if (response.data.data == 'NULL') {
              $scope.tip2 = true;
              $scope.userInfo = userInfo;
              return;
            } else {
              $scope.tip2 = false;
              $scope.userInfo = response.data.data;
              // console.log('$scope.userInfo.....', $scope.userInfo);
            }
        }, function errorCallback(response) {
            console.log('response...', response);
            if (response.status == 401) {
              window.location.href="/login";
            }
      });
    }

    $scope.userTokenList = [{tokenType: '---', tokenNumber: '---', frozenAccount: '---'}];
    $scope.tokenRecordList = [{tokenType: '---', operationType: '---', tokenNumberSum: '---'}];
    //资产信息
    function userTokenSearch(mobile) {
      $http({
          method: 'GET',
          url: RequestPath + '/user/userTokenSearch',
          params: {mobile: mobile}
      }).then(function successCallback(response) {
            //console.log('response...', response);
            $scope.userTokenList = response.data.userTokens;
            $scope.tokenRecordList = response.data.tokenRecords;
        }, function errorCallback(response) {
            console.log('response...', response);
            if (response.status == 401) {
              window.location.href="/login";
            }
      });
    }

    $scope.socreRecordList = [
      {operationType: '---', score: '---', preScore: '---', afterScore: '---',
      operationDescribe: '---', isValid: '---', createTime: '---'}
    ];
    //算力记录
    function scoreRecordSearch(mobile) {
      $http({
          method: 'GET',
          url: RequestPath + '/user/scoreRecordSearch',
          params: {mobile: mobile}
      }).then(function successCallback(response) {
            console.log('response...', response);
            $scope.socreRecordList = response.data.scoreRecords;
        }, function errorCallback(response) {
            console.log('response...', response);
            if (response.status == 401) {
              window.location.href="/login";
            }
      });
    }


  }
]);
