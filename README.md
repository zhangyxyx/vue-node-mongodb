<h2>本项目是仿照掘金网站的实战项目</h2>
<h3>vue+vue-router+es6+webpack+node+mongodb的项目</h3>
<h3>项目整体结构</h3>
<p>本项目中后台用到的是nodejs express</p>
<p>前台用的是vuejs bootstrap vue-router vue-resource</p>

![maze](https://github.com/GainLoss/vue-node-mongodb/blob/master/static/introduct/1.png) 

<h3>安装</h3>
<p>前提是需要本地电脑安装npm和node<p>
<p>另外项目中有一些需要安装的插件，可以在pakeage.json里面看</p>
<h3>运行项目</h3>
<p>demo文件中打开cmd然后输入npm run dev</p>
<p>demo文件中的server文件打开cmd然后输入node index</p>
<h3>实现的功能</h3>
<p>项目分为前台页面和管理员页面</p>
<p>可以直接在router里面的index.js中放置了全部的路由</p>
<h3>代码的流程</h3>
<p>1.在我们用cmd打开npm run dev的之后，webpack调取dev.server.js文件，里面开始配置和引入需要的文件，其中一个webpack.base.conf.js中的文件是用来设置入口文件和配置插件的，在这里可以看到入口文件是main.js</p></br>
<p>2.然后到main.js位于src中。main.js是引入公共的插件，在new Vue（{}）中可以看到对应的组件是App.vue</p></br>
<p>3.在App.vue中有一个<router-view></router-view>是将公共的渲染，就是可以将需要展示的组件放到这里面</p></br>
<p>4.然后对应上浏览器地址栏上的地址，前面说了在mian.js中已经将需要的插件引入了，其中就包含router中的index.js文件，这样可以执行路由，将地址栏上的地址和对应的路由对象，就可以找到需要的组件的位置，然后进行渲染</p></br>
<hr/>






