<!--
说明一下：
1.后台接口：获取数据/api/list/showlist 删除数据/api/list/removelist

-->
<template>
    <div>
        <div class="article">
            <!--内容-->
            <div class="home-con-right" v-for="(item,index) in homelists" :key="index">
                    <div class="left">
                        <!-- 上面的事件 分类  -->
                        <div class="home-con-left-top">
                            <span class="articleuser" style="color:#3b76c5">{{item.user||'user'}}&nbsp;▶</span>
                            <span class="articlesort" style="color:#b71ed7">{{item.sort}}&nbsp;▶</span>
                            <span class="articletime">{{year}}</span>
                        </div>
                        <!--中间的标题和内容-->
                        <div class="home-con-left-center" style="width:570px;">
                            <router-link :to="{name:'details',params:{id:item._id}}">
                                <h4>{{item.title}}</h4>
                            </router-link>
                            <div style="max-height:40px;margin:10px 0px;">{{item.con}}</div>
                            <!--<span class="articleremove" v-on:click="clickremove(homelists[index])">x</span>-->
                        </div>
                        <!--下面的收藏和喜欢-->
                        <div class="home-con-left-bottom">
                            <p><img src="static/home/like.png">{{item.like}}</p>
                            <p><img src="static/home/message.png">{{item.collect}}</p>
                        </div>
                    </div>
                    <!--图片-->
                    <div class="right" style="position:absolute;right:20px;top:20px;width:75px;height:75px">
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
            homelists: [],
            sumpage: [],
            ind: '',
            page: 0,
            flag: true,
            year:'',
        }
    },
    props: ['message'],
    watch: {
        "message": function(val) {
            this.page = 0;
            this.homelists = [];
            this.sums(val);
            this.flag = true;
        }
    },
    mounted() {
        //滚动分页
        this.scroll();
    },
    methods: {
        //渲染列表
        sums(message) {
            var _this = this;
            this.flag = false;
            var params = {
                collections:'home',
                page: this.page,
                limit: 5,
                one: message.one,
                two: message.two
            };
            this.showlist(params);
        },
        //渲染数据
        showlist(params) {
            var _this = this;
            _this.sumpage = [];
            console.log(params)
            this.$http.post('/api/list/showlist', params).then((response) => {
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
            });
        },
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
                    console.log(_this.flag)
                    if (_this.flag == false) {
                        return;
                    }
                    page++;
                    console.log(page)
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

<style lang="scss" scoped>@import '../../style/mixin';
/*每条数据*/
.home-con-right {
    @include wh(100%,150px);
    border-bottom: 1px solid rgba(204,204,204,.3);
    cursor: pointer;
    padding:10px 0px;
    position:relative;
    .left{
        @include left;
        .home-con-left-top{
            @include wh(100%,40px);
            .articleuser,.articletime,.articlesort {
                color: #999;
                font-size: 15px;
                margin: 10px 10px 10px 0px;
                display: block;
                float: left;
            }
        }
        .home-con-left-bottom{
            p{
                @include wh(auto,20px);
                @include left;
                margin-right:10px;
                img{
                    @include wh(10px,10px);
                    margin-right:5px;
                }
            }
        }
    }
    .right{
        @include right;
    }
}
/*重新加载的提示语*/
.tip{
    @include wh(200px,50px);
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
</style>