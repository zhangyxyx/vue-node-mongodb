<!--说明
这个页面表示的是调取后台的信息，然后展示出来：
1.调取后台数据
2.滑动加载更多
3.点击顶部选择其他内容
4.点击最新之类的进行排序
5.点击每一个进入到详情页面
-->
<template>
    <div>
        <div class="article">
            <!--内容-->
            <div class="home-con-right" v-for="(item,index) in homelists" :key="index" style="background:#fff;overflow:hidden;padding:0px 20px;">
                    <div class="articleconone">
                        <span class="articleuser" style="color:#3b76c5">{{item.user||'user'}}&nbsp;▶</span>
                        <span class="articlesort" style="color:#b71ed7">{{item.sort}}&nbsp;▶</span>
                        <span class="articletime">{{item.type}}</span>
                    </div>
                    <div style="width:570px;">
                        <router-link :to="{name:'details',params:{id:item._id}}">
                            <h2>{{item.title}}</h2>
                        </router-link>
                        <div style="max-height:40px;margin:10px 0px;">{{item.con}}</div>
                        <!--<span class="articleremove" v-on:click="clickremove(homelists[index])">x</span>-->
                    </div>
                    <div class="article-bottom">
                        <p><img src="static/home/like.png">{{item.like}}</p>
                        <p><img src="static/home/message.png">{{item.collect}}</p>
                    </div>
                    <div style="position:absolute;right:20px;top:20px;width:75px;height:75px">
                        <img v-bind:src="item.file" style="width:100%;height:100%">
                    </div>
            </div>
        </div>
        <div class="tip">正在加载中...</div>
    </div>
</template>
<script>
import Vue from 'vue'
import { Loading } from 'element-ui';

export default {
    data() {
        return {
            homelists: [],//调出的数据
            sumpage: [],
            ind: '',
            page: 0,
            flag: true,
            year:'',
            mark:this.findChildMsg
        }
    },
    props: ['findChildMsg'],
    watch: {
        findChildMsg: function(val) {
            this.page = 0;
            this.homelists = [];
            this.sums(val);
            this.flag = true;
        }
    },
    mounted() {
        //滚动分页
        this.scroll();
        this.sums(this.findChildMsg);
    },
    methods: {
        //渲染列表
        sums(val) {
            var _this = this;
            this.flag = false;
            var params = {
                page: this.page,
                limit: 5,
                type: this.$route.params.id,
                sort: this.$route.query.sort===undefined?"hot":this.$route.query.sort
            };
            this.showlist(params)
        },
        //渲染数据
        showlist(params) {
            var _this = this;
            _this.sumpage = [];
            this.$http.post('/api/find/list', params).then((response) => {
                Vue.http.interceptors.push((response, next) => {
                    $(".tip").css("display","block")
                    next((response) => { 
                        $(".tip").css("display","none")  
                        return response;
                    })
                })
                //列表数据
                var result = response.body
                //列表数据
                //var result=JSON.parse(response.bodyText).data;
                if (response) {
                    //数据的总数量
                    var sum = JSON.parse(response.bodyText).sum;
                    //渲染出页码
                    $(".fenye .page").empty();
                    for (var i = 0; i < Math.ceil(sum / params.limit); i++) {
                        _this.sumpage.push(i);
                    }
                    //将结果赋值给需要循环
                    for (var i = 0; i < result.length; i++) {
                        _this.homelists.push(result[i])
                    }
                    return _this.homelists;
                } else {
                    alert('数据已经加载完成！')
                }
            }).then(function() {
                this.flag = true
            }).catch((response) => {
                console.log(response)
            });
        },
        // //查找内容
        // search(){
        //     var value=$(".serchtext").val();
        //     //点击的是第几页
        //     var params={
        //         page:this.page,
        //         limit:5,
        //         title:value
        //     };
        //     this.showlist(params);
        // },
        //点击分页
        clickpage(index) {
            var _this = this;
            var value = $("input").val();
            this.ind = index;
            //点击的是第几页
            var params = {
                page: index,
                limit: 5,
                title: value
            };
            this.showlist(params);
        },
        //删除数据
        clickremove(i) {
            alert("删除成功！");
            var obj = i._id;
            var params = {
                "_id": obj
            };
            this.$http.post('/api/list/removelist', params);
            this.sums();
        },
        scroll() {
            var _this = this;
            var page = this.page;
            $(window).scroll(function() {
                var height = $(document).height();
                var client = $(window).height();
                var scroll = $(document).scrollTop();//滚动
                var n = height - client;
                if (n - 100 <= scroll) {
                    if (_this.flag == false) {
                        return;
                    }
                    page++;
                    _this.page = page;
                    _this.sums(_this.message)
                    _this.Setflag()
                }
            })
        },
        Setflag() {
            this.flag = false;
        }
    }
}
</script>


<style>
.tip{
    width:200px;
    height:50px;
    text-align:center;
    line-height:50px;
    background:#fff;
    border:1px solid #ccc;
    position: fixed;
    top:100px;
    left:50%;
    margin-left:-50px;
    display:none;
}
/*搜索*/

.pageactive {
    background: #000;
    color: #fff;
}

.top {
    height: 60px;
}

.top .serchtext {
    height: 40px;
    margin-top: 10px;
    padding: 0px 10px;
    border: 1px solid #ccc;
    font-size: 12px;
    width: 300px;
    float: left;
}

.top .search {
    width: 60px;
    height: 40px;
    margin-top: 10px;
    background: #efefef;
    border: 1px solid #ccc;
    line-height: 40px;
    text-align: center;
    font-size: 16px;
    display: block;
    cursor: pointer;
    float: left;
}

.top .search:hover {
    color: #fff;
    background: #afb5b5
}




/*每個數據*/

.home-con-right {
    height: 117px;
    border-bottom: 1px solid rgba(204,204,204,.3);
    cursor: pointer;
    height:auto;
    position:relative;
}

.home-con-right a {
    text-decoration: none;
}

.home-con-right h2 {
    font-size: 20px;
    margin: 0px;
    color: #000;
    font-weight: bold;
}


.home-con-right .articleremove {
    display: block;
    width: 15px;
    height: 15px;
    text-align: center;
    line-height: 12px;
    border: 1px solid rgba(204,204,204,.5);
    background: #fff;
    color: #999;
    position: absolute;
    top: 20px;
    right: 20px;
    cursor: pointer;
}
.article-bottom p {
    width: auto;
    height: 24px;
    line-height: 20px;
    float: left;
    margin-top: 10px;
    margin-right: 5px;
    padding: 0px 5px;
}

.article-bottom img {
    width: 15px;
    height: 15px;
    margin-right: 5px;
}
/*每个数据里面包含用户名时间*/
.articleconone{
    overflow: hidden;
    padding:10px 0px;
}
.articleconone span{
    color: #999;
    font-size: 15px;
    margin: 0px 10px 0px 0px;
    display: block;
    float: left;
}


/*分頁*/

.page span {
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
    border: 1px solid #000;
    displaY: block;
    floaT: left;
    cursor: pointer;
    margin: 5px
}

.page span:hover {
    background: #000;
    color: #fff
}
</style>