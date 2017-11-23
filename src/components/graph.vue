<template>
<div>
    <myCommon v-bind:message="commonmsg"></myCommon>{{menu}}
    <div class="graph" style="width:960px;margin:20px auto;">
        <div class="menu">
            <span v-for="(item,index) in typeEacharts" v-bind:class="{active:typeEachartsactive===item.name}" :key="index" v-on:click="clickEacharts(item.name)">{{item.con}}</span>
        </div>
        <div id="c1" style="min-width:400px;height:400px"></div>
        <div id="c2" style="min-width:400px;height:400px"></div>
    </div>
</div>
</template>
<script>
import common from "./common.vue";
import Highcharts from "highcharts/highstock";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsDrilldown from "highcharts/modules/drilldown";
import Highcharts3D from "highcharts/highcharts-3d";

HighchartsMore(Highcharts);
HighchartsDrilldown(Highcharts);
Highcharts3D(Highcharts);

export default {
  data() {
    return {
      homelists: [],
      typeEachartsactive:'bar',
      typeEacharts:[
        {name:'line',con:'折线'},
        {name:'area',con:'面积图'},
        {name:'bar',con:'柱形图'}
      ],
      commonmsg: 0,
      dataSum: 0,
      topMenu: [
        {
          con: "首页",
          icon: "home",
          paramCon: ["我的关注", "前端"],
          paramMark: ["all", "web"]
        },
        {
          con: "专栏",
          icon: "zhuanlan",
          paramCon: [
            "全部",
            "Android",
            "前端",
            "IOS",
            "产品",
            "设计",
            "工具资料",
            "阅读",
            "后端",
            "人工智能"
          ],
          paramMark: [
            "all",
            "android",
            "web",
            "ios",
            "product",
            "took",
            "read",
            "java",
            "rgzn"
          ]
        },
        {
          con: "收藏集",
          icon: "collect",
          paramCon: ["我的关注", "前端"],
          paramMark: ["all", "web"]
        },
        {
          con: "发现",
          icon: "find",
          paramCon: ["我的关注", "前端"],
          paramMark: ["all", "web"]
        },
        {
          con: "开源库",
          icon: "open",
          paramCon: ["我的关注", "前端"],
          paramMark: ["all", "web"]
        }
      ],
      topMenuResult: []
    };
  },
  components: {
    myCommon: common
  },
  //页面开始地时候渲染
  mounted: function() {
    this.MenuGraph();
  },
  //绑定属性
  computed:{
    menu:function(){
      this.menudata();
    },
  },
  //方法
  methods: {
    //点击切换图表
    clickEacharts:function(type){
      this.menudata(type);
      this.typeEachartsactive=type;
    },
    //循环模块，调取获取数据函数
    MenuGraph: function() {
      var _this = this;
      var a = this.topMenu;
      var menuArr = [];
      var aa;
      for (var i = 0; i < a.length; i++) {
        var aa=_this.showlist(a[i].icon);
      }
    },
    //获取后台数据
    showlist: function(icon) {
      var _this = this;
      var params = {
        collections: icon
      };
      this.$http.post("/api/list/showlist", params).then(response => {
        //列表数据
        var result = response.body;
        var json = {};
        json["name"] = icon;
        json["data"] = result.length;
        _this.homelists.push(result.length);
      });
    },
    menudata:function(type){
      var arr=[];
      var _this=this;
      var num=this.homelists.length;
      var type=type||'bar';
      for(var i=0;i<this.homelists.length;i++){
          var json={};
          json['name']=this.topMenu[i].con;
          json['data']=[this.homelists[i]];
          arr.push(json)
      }
      var p=new Promise(function(resolve,reject){
        if(num===5){
          resolve(arr)
        }else{
          reject('123')
        }
      })
      p.then(function(data){
        _this.myecharts(data,type);
      }).catch(function(data){
        console.log(data)
      })
    },
    //渲染出图表
    myecharts: function(series,type) {
      Highcharts.chart("c1", {
        chart: {
          type: type
        },
        title: {
          text: "图表"
        },
        xAxis: {
          categories: ['数据的数量']
        },
        yAxis: {
          min: 0,
          title: {
            text: "每个模块地总量"
          }
        },
        legend: {
          reversed: true
        },
        plotOptions: {
          series: {
            stacking: "normal"
          }
        },
        series: series
      });
    },
    
  }
};
</script>
<style lang="scss" scoped>
@import "../style/mixin";
.graph {
  background: #fff;
  .menu {
    margin: 20px 0px;
    border-bottom: 1px solid #efefef;
    span {
      display: inline-block;
      padding: 10px;
      &:hover {
        background: #efefef;
        cursor: pointer;
      }
    }
    .active{
      background: #efefef;
    }
  }
}
</style>
