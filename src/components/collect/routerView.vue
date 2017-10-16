<template>
    <div>
        <div class="collectConEvery" v-for="(item,index) in homelists" :key="index">
            <div style="position:absolute;bottom:10px;left:20px">
                <h4>{{item.title}}</h4>
                <div style="width:270px;">
                    <div style="width:auto;float:left;height:25px;line-height:25px;">
                        <span>{{item.user}}&nbsp;•&nbsp;</span>
                        <span>{{item.like}}篇文章&nbsp;•&nbsp;</span>
                        <span>{{item.collect}}人关注</span>
                    </div>
                    <div class="follow">关注</div>
                </div>
            </div>
        </div>
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
            mark:this.message
        }
    },
    props: ['message'],
    mounted() {
        //滚动分页
        this.scroll();
        this.sums(this.message);
    },
    watch: {
        message: function(val) {
            this.page = 0;
            this.homelists = [];
            this.sums(val);
            this.flag = true;
        }
    },
    methods: {
        //渲染列表
        sums(message) {
            var _this = this;
            this.flag = false;
            var params = {
                page: this.page,
                limit: 5,
                recommend: message.split(':')[0]==='recommend'?1:0,
                sort: message.split(':')[1],
                type: message.split(':')[2],
            };
            this.showlist(params)
        },
        //渲染数据
        showlist(params) {
            var _this = this;
            _this.sumpage = [];
            console.log(params)
            this.$http.post('/api/collect/list', params).then((response) => {
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

<style>
/*收藏集中每一个*/

.collectConEvery {
    width: 310px;
    height: 160px;
    position: relative;
    float: left;
    background: rgba(0, 0, 0, .2);
    margin: 0px 10px 20px 10px;
}

.collectConEvery .follow {
    width: 58px;
    cursor: pointer;
    height: 25px;
    text-align: center;
    line-height: 25px;
    float: right;
    border: 1px solid #fff
}

.collectConEvery .follow:hover {
    background: rgba(255, 255, 255, .3)
}

.every {
    border-bottom: 1px solid #efefef;
    background: #fff;
    padding: 10px;
}

.col-sm-9 {
    padding: 0px;
}
</style>
