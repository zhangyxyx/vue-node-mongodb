<template>
    <div>
        <div style="width:700px;float:left;">
            <div style="height:53px;border-bottom:1px solid rgba(204,204,204,.3);background:#fff;padding-left:30px;">
                <div style="float:left;margin:18px 0px;font-size:16px;">原创文章</div>
                <!--热门 最新 评论-->
                <div class="zltopmenuone">
                    <div class="zltopmenuone-menu-every" v-for='(options,index) in twomenu' v-bind:data-menu="options.change" :class="options.active" v-on:click="twomenuclick(twomenu[index])" :key="index">
                        {{options.text}}
                    </div>
                </div>
            </div>
            <div v-for="(item,index) in homelists" class="every" :key="index">
                <h2>{{item.title}}</h2>
                <p>{{item.con}}</p>
            </div>
        </div>
        <div style="width:240px;margin-left:20px;float:left;">
            <img src="/static/home/home_right_1.png" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            homelists: [],
            twomenu: [
				{ change: 'like', text: '热门', active: 'active' },
				{ change: 'time', text: '最新' },
				{ change: 'collect', text: '评论' },
			],
            sumpage: [],
        }
    },
    props: ['message'],
    mounted() {
        this.showdata();
    },
    watch: {
        'message': function() {
            this.showdata();
        }
    },
    methods: {
        showdata() {
            var _this = this;
            this.$http.get('/api/zhuanlan/list').then((response) => {
                console.log(response)
                //列表数据
                var result = JSON.parse(response.bodyText);
                //将结果赋值给需要循环
                _this.homelists = result;
                return _this.homelists;
            })
        }
    }

}
</script>

<style>
.every {
    border-bottom: 1px solid #efefef;
    background: #fff;
    padding: 10px;
}
.zltopmenuone {
    width:160px;
	height: 50px;
	padding:15px 0px;
	font-size:12px;
	padding-left:20px;
    float:right;
    overflow:hidden
}
.zltopmenuone .active {
	color: #007fff
}
.zltopmenuone-menu-every {
	cursor: pointer;
	font-size: 15px;
	text-align: center;
	padding: 0px 8px;
	float: left;
	border-right:1px solid rgba(204,204,204,.3)
}
</style>
