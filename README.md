<h1>本项目是仿照掘金网站的实战项目</h1>
<p>这是前台的页面现在能涉及到的有路由基本和动态路由；父组件和子组件之间的数据传递；express定义接口；mongodb的数据增删改查；文件的上传；界面有bootstrap的组织</p>
<p>管理员的界面的话：从数据库中获取的数据，主要界面利用bootstrap table组织的数据</p>
<p>一个简单的项目实现的步骤：http://www.cnblogs.com/GainLoss/p/6927626.html</p>
<p>功能说明：http://www.cnblogs.com/GainLoss/p/7605164.html</p>
<h2>项目整体结构</h2>
<p>本项目中后台用到的是nodejs express</p>
<p>vue+vue-router+es6+webpack+node+mongodb的项目</p>
<p>数据库的设置在server/db.js中有链接的数据库的名字和设置的数据库中集合的名字</p>
<p>前台用的是sass vuejs bootstrap vue-router vue-resource</p>

![maze](https://github.com/GainLoss/vue-node-mongodb/blob/master/static/introduct/1.png) 

<h2>安装</h2>
<p>前提是需要本地电脑安装npm和node<p>
<p>另外项目中有一些需要安装的插件，可以在pakeage.json里面看</p>
<h2>运行项目</h2>
<p>demo文件中打开cmd然后输入npm run dev</p>
<p>demo文件中的server文件打开cmd然后输入node index</p>
<h2>实现的功能</h2>
<p>项目分为前台页面和管理员页面</p>
<p>可以直接在router里面的index.js中放置了全部的路由</p>
<h2>前台代码的介绍</h2>
<p>1.在我们用cmd打开npm run dev的之后，webpack调取dev.server.js文件，里面开始配置和引入需要的文件，其中一个webpack.base.conf.js中的文件是用来设置入口文件和配置插件的，在这里可以看到入口文件是main.js</p>
<p>2.然后到main.js位于src中。main.js是引入公共的插件，在new Vue（{}）中可以看到对应的组件是App.vue</p>
<p>3.在App.vue中有一个<router-view></router-view>是将公共的渲染，就是可以将需要展示的组件放到这里面</p>
<p>4.然后对应上浏览器地址栏上的地址，前面说了在mian.js中已经将需要的插件引入了，其中就包含router中的index.js文件，这样可以执行路由，将地址栏上的地址和对应的路由对象，就可以找到需要的组件的位置，然后进行渲染</p>
<h2>前台界面介绍：</h2>
<p>前台的界面是很清楚的，根据导航点击就可以了，目前功能不是很多，展示信息和点击导航的+进入添加信息页面</p>
<h2>后台代码的介绍</h2>
<p>1.db.js文件是存放Schema Model这两个都可对数据库操作造成影响，其中Schema生成Model;在这个文件中引入mongoose并且连上本地的数据库；定义模式Schema这个是定义对应的集合中的文档的数据结构的定义；定义模型mode</p>
<p>2.api.js文件是定义接口和操作数据的增删改查的，这里面引入了express db.js等之类，使用express的路由中间件，定义接口和操作数据</p>
<p>3.index.js文件这个是一开始后台的入口，因为我们是在cmd中执行node index所以一开始是从这个文件。在这个文件中需要引入api(就是定义的接口文件) express 之类的资源</p>
<h2>后台界面介绍：</h2>
<p>后台界面当前是很简单的，从前台顶部导航的个人那儿点击进入到登陆页面，直接输入登录页面上写的用户名和密码就可以进入管理员的首页（如果和设置的用户名和密码不同，是不能进入管理员页面的）；到管理员界面之后当前只是home有界面，将首页的数据以表格的形式展示出来，并且里面有分页多选，还有添加和删除</p>

### vue-router分析
我们项目的入口文件main.js，在这个文件中我们引入了一个router（这就是路由文件），在路由文件中我们引入了模板和对应的routes，我们vue的内部是在main.js中引入的时候回给每一个routes添加一个beforeCreate函数，这个函数里面是用hashChange监听地址栏变化的，也就是路由的变化，当路由变化之后，这个函数触发，然后匹配对应的routes找到对应的模板，采用数据劫持的方式知道，路由变化了需要更新视图了，然后将对应的组件render到router-view中。

### vue组件渲染
new Vue({ 
	router, 
	store,  
	render:h=>{APP},  
}).$mount('#app') 
渲染的话：
创建render方法的时候，通过调用render方法来渲染实例DOM树，Vue在调用render方法的时候会传入一个createElement函数作为参数，也就是createElement会以App作为参数进行调用 
在router中检测到路由变化之后，进行v_render变化，然后将vnode通过虚拟树将之前的vnode和现在的vnode进行对比，然后将vnode放到router-view中，在通过render将app渲染到html中

### 注意
1.自己npm install执行这个，因为如果你直接git clone代码的话是没有node_modules</br>
2.http://localhost:12342/#/home/all?sort=like

### 资料：
1.http://hcysun.me/vue-design/art/








