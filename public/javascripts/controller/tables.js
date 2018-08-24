angular.module('AppRoute').controller("TablesCtrl", ["$scope", "$http", "$filter", "RequestPath",
  function($scope, $http, $filter, RequestPath) {
    //请求参数
    var params = {
      beginTime: '',
      endTime: ''
    };

    $scope.tableData = [];

    //初始dashboard
    initDashboard();
    function initDashboard() {
      //本周星期一与星期天的日期
      var now = new Date();
      // var dayNum = now.getDay();
      var oneDayLong = 24 * 60 * 60 * 1000;
      var beginDayTime = now.getTime() - 7 * oneDayLong;
      var endDayTime =  now.getTime() - oneDayLong;
      var beginDay = new Date(beginDayTime);
      var endDay = new Date(endDayTime);
      // console.log('monday...', $filter('date')(monday, "yyyy-MM-dd"));
      // console.log('sunday...', $filter('date')(sunday, "yyyy-MM-dd"));

      params.beginTime = $filter('date')(beginDay, "yyyy-MM-dd");
      params.endTime = $filter('date')(endDay, "yyyy-MM-dd");
      datePicker();
      submit();
    }

    //提交, 查询数据
    function submit() {
      $http({
          method: 'get',
          url: RequestPath + '/data/statistic',
          params: params
      }).then(function successCallback(response) {
            console.log('response...', response);
            $scope.tableData = response.data.data;
        }, function errorCallback(response) {
            console.log('response...', response);
            if (response.status == 401) {
              window.location.href="/login";
            }
              // 请求失败执行代码
      });
    }

    //选择时间
    function datePicker() {
      laydate.render({
        elem: '#dateRange', //指定元素
        value: params.beginTime + ' - ' + params.endTime,
        range: true,
        theme: 'molv',
        btns: ['confirm'],
        done: function(value, date, endDate){
          var dateRangeArr = value.split(' ');
          params.beginTime = dateRangeArr[0];
          params.endTime = dateRangeArr[2];
          submit();
        }
      });
    }

    //=============clear=============
    function clear() {
      statistics = {
        date:[],
        registerCount: [],
        userSharecount: [],
        createProduceCount: [],
        intoMyAccountCount: [],
        intoOtherAccountCount: [],
        pickStarMaxCount: [],
        stealStarCount: []
      };
    }
    //=============clear=============

  }
]);
