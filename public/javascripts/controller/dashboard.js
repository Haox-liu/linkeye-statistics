angular.module('AppRoute').controller("DashboardCtrl", ["$scope", "$http", "$filter",
  function($scope, $http, $filter) {

    //请求参数
    var params = {
      beginTime: '',
      endTime: ''
    };

    //图表参数
    var statistics = {
      date:[],
      registerCount: [],
      userSharecount: [],
      createProduceCount: [],
      intoMyAccountCount: [],
      intoOtherAccountCount: [],
      pickStarMaxCount: [],
      stealStarCount: []
    };

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
    $scope.submit = submit;
    function submit() {
      clear();
      $http({
        method: 'GET',
        url: 'http://localhost:7000/data/statistic',
        params: params
    }).then(function successCallback(response) {
              var item = response.data.data;
              for(i = 0; i < item.length; i++) {
                statistics.date.push(item[i].date);
                statistics.registerCount.push(item[i].registerCount);
                statistics.userSharecount.push(item[i].userSharecount);
                statistics.createProduceCount.push(item[i].createProduceCount);
                statistics.intoMyAccountCount.push(item[i].intoMyAccountCount);
                statistics.intoOtherAccountCount.push(item[i].intoOtherAccountCount);
                statistics.pickStarMaxCount.push(item[i].pickStarMaxCount);
                statistics.stealStarCount.push(item[i].stealStarCount);
              }
              // console.log("statistics......", statistics);
              dataStatistic(statistics);
          }, function errorCallback(response) {
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

    //====================dataStatistic===================
    function dataStatistic(statistics) {
      //====================echarts=======================
      // 路径配置
      require.config({
          paths: {
              echarts: 'http://echarts.baidu.com/build/dist'
          }
      });
      // 使用
      require(
          [
              'echarts',
              'echarts/chart/line', // 使用折线图就加载line模块，按需加载
              'echarts/chart/bar'   // 使用柱状图就加载bar模块，按需加载
          ],
          function (ec) {
              // 基于准备好的dom，初始化echarts图表
              var myChart = ec.init(document.getElementById('charts'));

              option = {
                  title : {
                      //text: '星界数据统计',
                      //subtext: 'data'
                  },
                  tooltip : {
                      trigger: 'axis'
                  },
                  legend: {
                      data:['注册量', '邀请关系', '当日创建产出', '流入自己账户', '流出他人账户', '摘星最高奖个数', '偷星游戏人次']
                  },
                  toolbox: {
                      show : true,
                      feature : {
                          mark : {show: true},
                          dataView : {show: true, readOnly: false},
                          magicType : {show: true, type: ['line', 'bar']},
                          restore : {show: true},
                          saveAsImage : {show: true}
                      }
                  },
                  calculable : true,
                  xAxis : [
                      {
                          type : 'category',
                          boundaryGap : false,
                          //data : ['20180501','20180502','20180503','20180504','20180505','20180506','20180507']
                          data : statistics.date
                      }
                  ],
                  yAxis : [
                      {
                          type : 'value',
                          axisLabel : {
                              formatter: '{value}'
                          }
                      }
                  ],
                  series : [
                      {
                          name:'注册量',
                          type:'line',
                          //data:[8, 5, 15, 3, 0, 22, 10],
                          data: statistics.registerCount,
                          markPoint : {
                              data : [
                                  {type : 'max', name: '最大值'},
                                  {type : 'min', name: '最小值'}
                              ]
                          }
                      }
                      ,
                      {
                          name:'邀请关系',
                          type:'line',
                          data: statistics.userSharecount,
                          markPoint : {
                              data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                              ]
                          }
                      }
                      ,
                      {
                          name:'当日创建产出',
                          type:'line',
                          data: statistics.createProduceCount,
                          markPoint : {
                              data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                              ]
                          }
                      }
                      ,
                      {
                          name:'流入自己账户',
                          type:'line',
                          data: statistics.intoMyAccountCount,
                          markPoint : {
                              data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                              ]
                          }
                      }
                      ,
                      {
                          name:'流出他人账户',
                          type:'line',
                          data: statistics.intoOtherAccountCount,
                          markPoint : {
                              data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                              ]
                          }
                      }
                      ,
                      {
                          name:'摘星最高奖个数',
                          type:'line',
                          data: statistics.pickStarMaxCount,
                          markPoint : {
                              data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                              ]
                          }
                      }
                      ,
                      {
                          name:'偷星游戏人次',
                          type:'line',
                          data: statistics.stealStarCount,
                          markPoint : {
                              data : [
                                {type : 'max', name: '最大值'},
                                {type : 'min', name: '最小值'}
                              ]
                          }
                      }

                  ]
              };

              // 为echarts对象加载数据
              myChart.setOption(option);
          }
      );
    }
    //====================dataStatistic===================

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
