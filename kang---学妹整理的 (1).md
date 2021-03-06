# 一、vue      2.6.11

##### 版本：2.6.11

## vue页面的生命周期？

  总共分为8个阶段创建前/后，载入前/后，更新前/后，销毁前/后。

创建前/后： 在**beforeCreate**阶段，vue实例的挂载元素$el和数据对象data都为undefined，还未初始化。在**created**阶段，vue实例的数据对象data有了，$el还没有。

载入前/后：在**beforeMount**阶段，vue实例的$el和data都初始化了，但还是挂载之前为虚拟的dom节点，data.message还未替换。在**mounted**阶段，vue实例挂载完成，data.message成功渲染。

更新前/后：当data变化时，会触发**beforeUpdate**和**updated**方法。

销毁前/后：**beforeDestroy**在执行**destroyed**方法后，对data的改变不会再触发周期函数，说明此时vue实例已经解除了事件监听以及和dom的绑定，但是dom结构依然存在

一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一一

![img](https://pics3.baidu.com/feed/d0c8a786c9177f3e668177cd4bfcf9c19e3d5676.png?token=e1704b12a0e009ba1c294d959ebcaa3e)

##  vue组件之间如何传值通信

   父到子：

​     子组件在props中创建一个属性，用来接收父组件传过来的值；

​     在父组件中注册子组件；    

​     在子组件标签中添加子组件props中创建的属性；  

​     把需要传给子组件的值赋给该属性 

​     子到父：

​     子组件中需要以某种方式（如点击事件）的方法来触发一个自定义的事件；

​     将需要传的值作为$emit的第二个参数，该值将作为实参传给响应事件的方法；

​     在父组件中注册子组件并在子组件标签上绑定自定义事件的监听。 

​     平行组件：

​     $emit推送，$on接收

## Vue2.x组件通信有哪些方式

- 父子组件通信: props 、$on、$emit、 Ref 获取实例的方式调用组件的属性或者方法、（Provide、inject 官方不推荐使用，但是写组件库时很常用）
- 兄弟组件通信: EventBus 、Vuex
- 跨级组件通信：Vuex、$attrs、$listeners、Provide、（Provide、inject 官方不推荐使用，但是写组件库时很常用）

## created和mounted的区别？

created：在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。

mounted：在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。



##  DOM 渲染在哪个周期中就已经完成？

  DOM 渲染在 mounted 中就已经完成了。



## mvvm，vue双向数据绑定的原理

MVVM分为Model、View、ViewModel三者。

·    Model 代表数据模型，数据和业务逻辑都在Model层中定义；

·    View 代表UI视图，负责数据的展示；

·    ViewModel 负责监听 Model 中数据的改变并且控制视图的更新，处理用户交互操作；

实现数据的双向绑定，首先要对数据进行劫持监听，所以我们需要设置一个监听器Observer，用来监听所有属性。如果属性发上变化了，就需要告诉订阅者Watcher看是否需要更新。因为订阅者是有很多个，所以我们需要有一个消息订阅器Dep来专门收集这些订阅者，主要是在监听器Observer和订阅者Watcher之间进行统一管理

MVC模式将软件分为下面三个部分
1.视图(View) :用户界面
2.控制器(Controller) :业务逻辑
3.模型(Model) :数据保存

![image-20200615184919231](C:\Users\hp\AppData\Roaming\Typora\typora-user-images\image-20200615184919231.png)

## vuex的state、getter、mutation、action、module特性分别是什么？

**State:** 保存着所有的全局变量

**Getter**: store中的计算属性，就像计算属性一样，getter 的返回值会根据它的依赖被缓存起来，且只有当它的依赖值发生了改变才会被重新计算。  getters接收state作为其第一个参数，接受其他 getters 作为第二个参数，如不需要，第二个参数可以省略。

**Mutation:** 更改 Vuex 的 store 中的状态的唯一方法是提交 mutation, mutation 必须是同步函数

**Action:** Action 可以包含任意异步操作, 在组件中使用 this.$store.dispatch(‘xxx’) 分发 action

**Module:** 可以写很多模块，Vuex 允许我们将 store 分割到模块（module）。每个模块拥有自己的 state、mutation、action、getters，最后都引入到一个文件。分散管理。

## 为什么mutation里面只能同步，不能异步？

就会方便追踪到state的变化，因为state里面的数据会改变 异步的话组件有可能会收不到 ，不能实时追踪

严格模式会报错

## 页面刷新后vuex的state数据丢失怎么解决？

将Vuex里的数据同步更新到localStorage里。

即：一改变vuex里的数据,便触发`localStorage.setItem` 方法

在 `App.vue` 的 `created` 钩子函数里写

```
//在页面加载时读取localStorage里的状态信息
localStorage.getItem("userMsg")&& this.$store.replaceState(JSON.parse(localStorage.getItem("userMsg"))); 
```

```
//在页面刷新时将vuex里的信息保存到localStorage里
  window.addEventListener("beforeunload",()=>{
    localStorage.setItem("userMsg",JSON.stringify(this.$store.state))

})
```

## store提供了哪些函数

提供getState( )方法获取state；

提供dispatch(action)方法更新state；

通过subscribe(listener)注册监听器；

通过subscribe(listener)返回的函数注销监听器

使用 mapState工具函数会将store中的state映射到局部计算属性中

map**Getter**，mapMutation，mapAction会将store中各自的方法映射过来

## vuex是什么呢？哪些场景会用到？

vuex是一个专为vue.js应用程序开发的状态管理模式

我们大概可以理解为vuex是一个公共 状态库 , 你可以在所有的组件里面去使用,修改

场景有：单页应用中，组件之间的状态、音乐播放、登录状态、加入购物车



vuex为状态管理，它集中存储管理应用的所有组件的状态，可以理解成一个全局仓库

VueRouter是路由（spa）单页面应用的方式

## 使用vuex的优势是什么？有用过vuex吗？它主要解决的是什么问题？

Vuex的优势：

1.解决了非父子组件的消息传递（将数据存放在state中）

2.减少了AJAX请求次数，有些情景可以直接从内存中的state获取

**主要解决的问题是：**

用来管理全局的组件状态，比如有很多个组件都会修改同一个数据，同时这个数据又要在多个组件上同时显示，这个时候用 vuex 来统一管理这些组件的状态，会让逻辑更清晰，更可维护

## vue和react渲染有什么区别

vue---会跟踪每一个组件的依赖关系, 去重新渲染有依赖关系的组件,不是说重新渲染整个组件树。

react--如果某个组件状态发生变化，react会把这个组件还有这个组件的所有后代组件全部重新渲染，不过重新渲染并不是代表全部丢掉上一次的渲染结果，react通过diff去比较两次虚拟dom，比较之后再反映倒真实dom上,如果说组件树比较大，diff算法也是一比开销，react提供出来解决方案shouldComponentUpdate-----根据这个生命周期的返回结果来判断是不是需要执行后面的diff，update这些东西;


vue---Object.defineProperty  get去收集依赖， 因此不会像react- 样去比较整颗组件树，去更加细粒度的去更新状态有变化的组件;

## vue中路由的模式如何选择，不同模式有什么区别？

**Hash** **模式**

www.test.com/#/ 就是 Hash URL，当 # 后面的哈希值发生变化时，可以通过 hashchange 事件来监听到 URL 的变化，从而进行跳转页面，并且无论哈希值如何变化，服务端接收到的 URL 请求永远是 www.test.com。

```
window.addEventListener('hashchange', () => {
 // ... 具体逻辑
})
```

Hash 模式相对来说更简单，并且兼容性也更好。

**History** **模式**

History 模式是 HTML5 新推出的功能，主要使用 history.pushState 和 history.replaceState改变 URL。

通过 History 模式改变 URL 同样不会引起页面的刷新，只会更新浏览器的历史记录。

```
// 新增历史记录
history.pushState(stateObject, title, URL)
// 替换当前历史记录
history.replaceState(stateObject, title, URL)
当用户做出浏览器动作时，比如点击后退按钮时会触发 popState 事件
window.addEventListener('popstate', e => {
 // e.state 就是 pushState(stateObject) 中的 stateObject
 console.log(e.state)
})
```

**两种模式对比**

·    Hash 模式只可以更改 # 后面的内容，History 模式可以通过 API 设置任意的同源 URL

·    History 模式可以通过 API 添加任意类型的数据到历史记录中，Hash 模式只能更改哈希值，也就是字符串

·    Hash 模式无需后端配置，并且兼容性好。History 模式在用户手动输入地址或者刷新页面的时候会发起 URL 请求，后端需要配置 index.html 页面用于匹配不到静态资源的时候

## $route和$router有什么区别，有什么关联关系

1. $router 为 VueRouter 实例，想要导航到不同 URL，则使用 $router.push 方法。
   $route 为当前 router 跳转对象里面可以获取 name 、 path 、 query 、 params 等。

## 插槽slot

插槽（Slot）插槽用于决定将所携带的内容，插入到指定的某个位置，从而使模板分块，具有模块化的特质和更大的重用性，插槽就是Vue实现的一套内容分发的API

1.匿名插槽 ：叫做默认插槽 就是没有名字

2.具名插槽：需要多个插槽时，可以利用元素的一个特殊的特性：name来定义具名插槽

3.作用域插槽：是父组件引用子组件中的数据，使用slot-scope 进行数据的传递，子组件中 将数据传递给父组件

## v-for和v-if的优先级

v-for的优先级高于v-if

## watch

watch的原理
通过watch的方法，监听被改变的变量,然后再watch的那个变量命名的函数中去对我们要修改的值进行重新的赋值，或者是触发一次更新。 watch的执行类似于emit与on这种触发方式，通过vue的watch实例监听值来自动触发一个函数的执行。

·     watch函数的参数中，第一个是改变之前的值，第二个是改变之后的值，这两个参数非常有用。

·    这里分别使用了 三种定义函数（或option）的方法。

·    如果要观察data下一个对象的属性，我们可以使用对象.属性的方式， 注意： 一定要要引号。

·    如果改变了一个对象的属性，就必须使用deep: true，否则检测不到变化。

## watch和computed差异

​     watch是进行数据监听，然后进行相应的操作，执行方法等conputed和methods的合体使用，比较耗性能，与vue性能优化相背而驰，尽量减少使用！computed是数据改变进行相应的数据变化，由老数据迸发新的数据（return返回），会利用缓存机制对 数据进行缓存 ，只有当 依赖数据变化的时候才会进行相应的变化

## 跨域

![img](file:///C:\Users\hp\Documents\Tencent Files\2466256941\Image\C2C\L9YOGF5U9@]9C[JTSIBT02R.JPG)

![img](file:///C:\Users\hp\Documents\Tencent Files\2466256941\Image\C2C\2(1TQ6Q@KH)9$_K3US%}6CN.JPG)

![img](file:///C:\Users\hp\Documents\Tencent Files\2466256941\Image\C2C\C62G]U]6YFGTTRRD}H$OH{U.JPG)

## **组件 data 为什么必须是函数**


​     因为 JS 本身的特性带来的，如果 data 是一个对象，那么由于对象本身属于引用类型，当我们修改其中的一个属性时，会影响到所有 Vue 实例的数据。如果将 data 作为一个函数返回一个对象，那么每一个实例的 data 属性都是独立的，不会相互影响了。

## $nextTick

$nextTick 是在下次 DOM 更新循环结束之后执行延迟回调，在修改数据之后使用 $nextTick，则可以在回调中获取更新后的 DOM。

## key

key的作用是为了在diff算法执行时更快的找到对应的节点，提高diff速度

key具有唯一性，使用 key，它会基于 key 的变化重新排列元素顺序，并且会移除 key 不存在的元素。
有相同父元素的子元素必须有独特的 key。重复的 key 会造成渲染错误。

带key就不会使用就地复用了，在sameNode函数 `a.key===b.key`对比中可以避免就地复用的情况。

-----------------------------------------------------------------------------------------------------------------------------------

vue中列表循环需加:key="唯一标识" 唯一标识可以是item里面id index等，因为vue组件高度复用增加Key可以标识组件的唯一性，为了更好地区别各个组件 key的作用主要是为了高效的更新虚拟DOM

可以这样简单地理解，无：key属性时，状态默认绑定的是位置；有：key属性时，状态根据key的属性值绑定到了相应的数组元素。

若用数组索引index为key，当向数组中指定位置插入一个新元素后，对应着后面的虚拟DOM的key值全部更新了，这个时候还是会做不必要的更新，就像没有加KEY一样

为什么官网说的是就地更新的效率更高呢

key的作用就是更新组件时判断两个节点是否相同。相同就复用，不相同就删除旧的创建新的。在渲染简单的无状态组件时，如果不添加key组件默认都是就地复用，不会删除添加节点，只是改变列表项中的文本值，要知道节点操作是十分耗费性能的。而添加了key之后，当对比内容不一致时，就会认为是两个节点，会先删除掉旧节点，然后添加新节点。

## vue图片懒加载

vue-lazyload

## vue路由懒加载

##### 方法一 resolve

这一种方法较常见。它主要是使用了`resolve`的异步机制，用`require`代替了`import`,实现按需加载，下面是代码示例：



```jsx
import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)
export default new Router({
  routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
        {
          path: '/',
          name: 'HelloWorld',
          component: resolve => require(['@/components/HelloWorld'], resolve)
        }
  ]
}) 
```

##### 方法二 [官网方法](https://router.vuejs.org/zh/guide/advanced/lazy-loading.html)

`vue-router`在官网提供了一种方法，可以理解也是为通过`Promise`的`resolve`机制。因为`Promise`函数返回的`Promise`为`resolve`组件本身，而我们又可以使用`import`来导入组件。整合起来代码示例如下：



```jsx
import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
Vue.use(Router)
export default new Router({
  routes: [
//     {
//       path: '/',
//       name: 'HelloWorld',
//       component: HelloWorld
//     }
        {
          path: '/',
          name: 'HelloWorld',
          component: () => import('@/components/HelloWorld.vue')
        }
  ]
}) 
```

## VUE自定义指令



注册自定义指令分为全局注册与局部注册两种：

1.创建局部指令

```
var app = new Vue({
    el: '#app',
    data: {    
    },
    // 创建指令(可以多个)
    directives: {
        // 指令名称
        dir1: {
            inserted(el) {
                // 指令中第一个参数是当前使用指令的DOM
                console.log(el);
                console.log(arguments);
                // 对DOM进行操作
                el.style.width = '200px';
                el.style.height = '200px';
                el.style.background = '#000';
            }
        }
    }
})

2.全局指令
Vue.directive('dir2', {
    inserted(el) {
        console.log(el);
    }
})
```

3.指令的使用

```
<div id="app"> 
    <div v-dir1></div>   
    <div v-dir2></div>
</div>
```

## vue自定义插件

​    在Toast组件中里面写方法，比如显示隐藏之类的

​    在同级目录下创建一个插件入口文件index.js

​    在index.js里面

   const obj = {}; 
   obj.install = function(Vue){

​    1.创建组件构造器

​    2.使用new的方式，根据组件构造器，可以创建出一个组件对象

​    3.将组件对象,手动挂载到某一个元素上

​       toast. $el对应的就是div

​    4.通过Vue的原型注册一 个方法

​      Vue.prototype. $toast=toast

​      其他组件可以引用

​      this $toast.show(这是一 个toast',3)

}

## vue-cli3开发环境与生产环境的区分

在vue-cli3的项目中，

npm run serve时会把process.env.NODE_ENV设置为‘development’；

npm run build 时会把process.env.NODE_ENV设置为‘production’；



那么，就可以直接根据不同环境配置vue.config.js：

![img](https://upload-images.jianshu.io/upload_images/7566087-52cc120b43caff06.png?imageMogr2/auto-orient/strip|imageView2/2/format/webp)

## keep-alive

路由跳转 vue-router



keep-alive 是 Vue 内置的一个组件，可以使被包含的组件保留状态，或避免重新渲染。

[include](http://www.php.cn/wiki/137.html) - [字符串](http://www.php.cn/wiki/57.html)或正则表达，只有匹配的组件会被缓存
 exclude - 字符串或[正则表达式](http://www.php.cn/wiki/588.html)，任何匹配的组件都不会被缓存

两个生命周期activated/deactivated，用来得知当前组件是否处于活跃状态。 keep-alive的中还运用了LRU(Least Recently Used)算法。

## 在vue里面你如何做数据的监听

1. watch里面监听

   - 第一种写法

     ​		watch:{
     ​				obj(newval,oldval){
     ​					console.log(newval,oldval)
     ​				},
     ​			}

   - 第二种写法可设置deep为true对数据进行深层遍历监听

     ​		watch:{
     ​				obj:{
     ​					handler(newval,oldval){
     ​						console.log(222)
     ​						console.log(newval,oldval)
     ​					},
     ​					deep:true
     ​				}
     ​			}

2. computed 里面监听

   - computed里面的依赖改变时，所计算的属性或作出事实的改变

## 关于单页应用首屏加载速度慢，出现白屏时间过长问题你怎么处理

- 将公用的JS库通过script标签在index.html进行外部引入，减少我们打包出来的js文件的大小，让浏览器并行下载资源文件，提高下载速度

- 在配置路由的时候进行路由的懒加载，在调用到该路由时再加载此路由相对应的js文件

- 加一个首屏loading图或骨架屏，提高用户的体验

- 尽可能使用CSS Sprites和字体图标库

- 图片的懒加载等

  

  

## Vue2.x响应式数据原理(数据劫持)

Vue在初始化数据时，会对data进行遍历，并使用Object.defineProperty把这些属性转为getter/setter。 每个组件实例都对应一个watcher 实例，当页面使用对应属性时，首先会用getter进行依赖收集(收集当前组件的watcher)如果属性发生变化setter 触发时会通知相关依赖进行更新操作(发布订阅)。

> 注意：
>
> 1. Object.defineProperty 是 ES5 中一个无法 shim 的特性，这也就是 Vue 不支持 IE8 以及更低版本浏览器的原因。
> 2. 由于 JavaScript 的限制，Vue 不能检测数组和对象的变化。

## Vue3.x响应式数据原理

Vue3.x改用Proxy替代Object.defineProperty。因为Proxy可以直接监听对象和数组的变化，并且有多达13种拦截方法。并且作为新标准将受到浏览器厂商重点持续的性能优化。

## vue-router 中的导航钩子

**vue-router 的导航钩子，主要用来作用是拦截导航，让他完成跳转或取消。**

有三种方式可以植入路由导航过程中：         

1. 全局的
2. 单个路由独享的
3. 组件级的

***1.全局导航钩子***：

全局导航钩子主要有两种钩子：前置守卫、后置钩子，

注册一个全局前置守卫：beforeEach

```
const router = new VueRouter({ ... });
router.beforeEach((to, from, next) => {
    // do someting
});
```


这三个参数 to 、from 、next 分别的作用：

这三个参数 to 、from 、next 分别的作用：

1.to: Route，代表要进入的目标，它是一个路由对象

2.from: Route，代表当前正要离开的路由，同样也是一个路由对象

3.next: Function，这是一个必须需要调用的方法，而具体的执行效果则依赖 next 方法调用的参数

​       1、next()：进入管道中的下一个钩子，如果全部的钩子执行完了，则导航的状态就是 confirmed（确认的）
​       2、next(false)：这代表中断掉当前的导航，即 to 代表的路由对象不会进入，被中断，此时该表 URL 地址会    被重置到 from 路由对应的地址
​       3、next(‘/’) 和 next({path: ‘/’})：在中断掉当前导航的同时，跳转到一个不同的地址
​       4、next(error)：如果传入参数是一个 Error 实例，那么导航被终止的同时会将错误传递给 router.onError() 注册过的回调

```
注意：next 方法必须要调用，否则钩子函数无法 resolved
```

对于全局后置钩子：afterEach

```
router.afterEach((to, from) => {
    // do someting
});
```


不同于前置守卫，后置钩子并没有 next 函数，也不会改变导航本身

不同于前置守卫，后置钩子并没有 next 函数，也不会改变导航本身

***2.路由独享的钩子***

beforeEnter

顾名思义，即单个路由独享的导航钩子，它是在路由配置上直接进行定义的：

```
cont router = new VueRouter({
    routes: [
        {
            path: '/file',
            component: File,
            beforeEnter: (to, from ,next) => {
                // do someting
            }
        }
    ]
});
```


至于他的参数的使用，和全局前置守卫是一样的

至于他的参数的使用，和全局前置守卫是一样的

***3.组建内的导航钩子***

组件内的导航钩子主要有这三种：beforeRouteEnter、beforeRouteUpdate、beforeRouteLeave。他们是直接在路由组件内部直接进行定义的

我们看一下他的具体用法：

```
const File = {
    template: `<div>This is file</div>`,
    beforeRouteEnter(to, from, next) {
        // do someting
        // 在渲染该组件的对应路由被 confirm 前调用
    },
    beforeRouteUpdate(to, from, next) {
        // do someting
        // 在当前路由改变，但是依然渲染该组件是调用
    },
    beforeRouteLeave(to, from ,next) {
        // do someting
        // 导航离开该组件的对应路由时被调用
    }
}
```


需要注意是：

需要注意是：

beforeRouteEnter 不能获取组件实例 this，因为当守卫执行前，组件实例被没有被创建出来，剩下两个钩子则可以正常获取组件实例 this

但是并不意味着在 beforeRouteEnter 中无法访问组件实例，我们可以通过给 next 传入一个回调来访问组件实例。在导航被确认是，会执行这个回调，这时就可以访问组件实例了，如：

```
beforeRouteEnter(to, from, next) {
    next (vm => {
        // 这里通过 vm 来访问组件实例解决了没有 this 的问题
    })
}
```


注意，仅仅是 beforRouteEnter 支持给 next 传递回调，其他两个并不支持。因为归根结底，支持回调是为了解决 this 问题，而其他两个钩子的 this 可以正确访问到组件实例，所有没有必要使用回调

注意，仅仅是 beforRouteEnter 支持给 next 传递回调，其他两个并不支持。因为归根结底，支持回调是为了解决 this 问题，而其他两个钩子的 this 可以正确访问到组件实例，所有没有必要使用回调

```
最后是完整的导航解析流程：

导航被触发
在失活的组件里调用离开守卫
调用全局的 beforeEach 守卫
在重用的组件里调用 beforeRouteUpdate 守卫
在路由配置里调用 beforEnter
解析异步路由组件
在被激活的组件里调用 beforeRouteEnter
调用全局的 beforeResolve 守卫
导航被确认
调用全局的 afterEach 钩子
触发 DOM 更新
在创建好的实例调用 beforeRouteEnter 守卫中传给 next 的回调函数
```



## 单页面应用（SPA）

单页面应用（SPA），通俗一点说就是指只有一个主页面的应用，浏览器一开始要加载所有必须的 html, js, css。所有的页面内容都包含在这个所谓的主页面中。但在写的时候，还是会分开写（页面片段），然后在交互的时候由路由程序动态载入，单页面的页面跳转，仅刷新局部资源。

#### 单页面的优点：

- 用户体验好，快，内容的改变不需要重新加载整个页面，基于这一点spa对服务器压力较小
- 前后端分离
- 页面效果会比较炫酷（比如切换页面内容时的专场动画）

#### 单页面缺点：

- 不利于seo
- 导航不可用，如果一定要导航需要自行实现前进、后退。（由于是单页面不能用浏览器的前进后退功能，所以需要自己建立堆栈管理）
- 初次加载时耗时多
- 页面复杂度提高很多

## 多页面应用（MPA）

多页面（MPA），就是指一个应用中有多个页面，页面跳转时是整页刷新

## vue.js的两个核心是什么？

答：数据驱动、组件系统

## vue常用的修饰符？

 .prevent: 提交事件不再重载页面；

 .stop: 阻止单击事件冒泡；

 .self: 当事件发生在该元素本身而不是子元素的时候会触发；

 .capture: 事件侦听，事件发生的时候会调用

## element-ui中遇到的问题

![img](file:///C:\Users\hp\Documents\Tencent Files\2466256941\Image\C2C\FHY5KPLE9THF0C$DK@4@][P.png)

## vue 项目整体框架解析

#### 各个文件夹

1. **node_modules：**用来放很多很多的环境依赖。
2. **public：**用来存放公共资源，其中的 index.html 文件，就是初始的挂载点。被 App.vue 给取代了。
3. **src：**放各种资源的
4. **assets：**用来存放静态资源，比如图片之类的。
5. **components：**放置各种小组件，相当于是子组件的子组件。
6. **router：**路由，用来设置哪个 url 访问哪个页面组件。
7. **store：**仓库。
8. **views：**都是子组件，用来替换 App.vue 里面的 <router-view>,然后展示这个子组件，所以也叫页面组件，里面可以视图组件。

#### 文件

1. **App.vue：**子组件，用来取代 index.html 的挂载点的。

2. **main.js：**入口文件

   

## vue和react的diff算法

vue和react的diff算法，都是忽略跨级比较，只做同级比较。vue diff时调动patch函数，参数是vnode和oldVnode，分别代表新旧节点。

\1. vue比对节点，当节点元素类型相同，但是className不同，任务是不同类型元素，删除重建，而react会认为是同类型节点，只是修改节点属性

\2. vue的列表比对，采用从两端到中间的比对方式，而react则采用从左到右依次比对的方式。当一个集合，只是把最后一个节点移动到了第一个，react会把前面的节点依次移动，而vue只会把最后一个节点移动到第一个。总体上，vue的对比方式更高效。

## diff 算法原理

Diff算法的作用是用来计算出 Virtual DOM 中被改变的部分，然后针对该部分进行原生DOM操作，
而不用重新渲染整个页面。

在采取diff算法比较新旧节点的时候，比较只会在同层级进行, 不会跨层级比较。

## diff流程图

当数据发生改变时，set方法会让调用`Dep.notify`通知所有订阅者Watcher，订阅者就会调用`patch`给真实的DOM打补丁，更新相应的视图。

1、旧数组为空，将新数组的剩余元素`插入`；
2、新数组为空，将旧数组的剩余元素`删除`；
3、新、旧数组都不为空，执行第二步。

\#### 二、找到需要被删除、插入、移动的元素

数组p：与新数组的长度相同，与新数组是相互映射关系，
元素在旧数组中的索引 存储在 元素在新数组中的位置

\##### 三、找到最少的移动次数

1、找到 P 数组的`最长递增子序列`来做动态规划，新集合中不属于这个序列的将会被移动。

2、同时尾部遍历新数组和 LIS 序列，查看元素的位置是否能与 LIS 序列的任何一个值匹配：

a：可以匹配，保留位置；
b：不能匹配，移动到到前面；
c：找不到，插入元素；

## vue和react的相同和不同

Vue是用于构建用户界面的渐进式框架，React是构建用户界面的组件化开发

相同点：

1. .都支持服务器端渲染

2. 都使用虚拟DOM来实现 

3. 都有Virtual DOM,组件化开发,通过props参数进行父子组件数据的传递,都实现webComponent规范

4. 只有框架的骨架，其他的功能如路由、状态管理等是框架分离的组件。

5. 都是JavaScript的UI框架，数据驱动视图，专注于创造前端的富应用

6. 都有支持native的方案,React的React native,Vue的weex

7. 都有管理状态，React有redux,Vue有自己的Vuex（自适应vue，量身定做）

不同点：

​    Vue是用于构建用户界面的渐进式框架，React是构建用户界面的组件化开发

1. React严格上只针对MVC的view层,Vue则是MVVM模式

2. virtual DOM不一样,vue会跟踪每一个组件的依赖关系,不需要重新渲染整个组件树.

3. 而对于React而言,每当应用的状态被改变时,全部组件都会重新渲染,所以react中会需要shouldComponentUpdate这个生命周期函数方法来进行控制

4. 组件写法不一样, React推荐的做法是 JSX + inline style, 也就是把HTML和CSS全都写进JavaScript了,即'all in js';

5. Vue推荐的做法是webpack+vue-loader的单文件组件格式,即html,css,jd写在同一个文件;

6. 数据绑定: vue实现了数据的双向绑定,react数据流动是单向的

7. state对象在react应用中不可变的,需要使用setState方法更新状态;

8. 在vue中,state对象不是必须的,数据由data属性在vue对象中管理

9. vue是进行template渲染的，react是jsx

10. 路由不一样,一个现有，一个封装路由表

11. 生命周期不一样

12. vue是class，react是classname

13. 传值

14. 在以下场景中，Vue比反应更好：

    最新文档和更简单的语法。更小，更快，更灵活。丰富的HTML模板，易于开发。

    React比Vue.js好：

    需要构建移动应用程序。专业和出色的社区支持，以解决任何问题。需要构建大型应用程序。轻量级，易于版本迁移

15. 跳转路由不一样,vue是this.$router.push，react是this.props.history.push({})

    ```
    react跳转路由
    
    this.props.history.push({
      pathname:" /detail",
      query:{
           id:id
      }
    })
    this.props.location.query.id
    
    
    ```

    ```
    vue跳转路由
    
    quxiang(id) {
      this.$router.push({
        path: "/detail" ,
        query: {
             id: id
          }
      });
    }
    ```

    

# 二、react  16.13.1

## react 的生命周期？

 可以说他有 11 个，也可说他有 10 个
 有 3 个阶段
 实例化，存在期，销毁期

 ***实例化***：

 props的实例化，state的实例化， componentWillMount 渲染前
 （修改 state 的最后一次机会）， *render*（渲染）， componentDidMount（渲染后，
 首次可以访问到 dom）
 在实例化阶段除了 *render* 生命周期外，其它的生命周期只会执行一次

 ***存在期***
 componentWillReceiveProps 当 ***props\*** 值发生变化就会执行
 shouldComponentUpdate 可以用来确认组件的更新，通过返回布尔值来确定组件是
 否重新渲染
 componentWillUpdate 更新前
 *render* 更新
 compoentDidUpdate 更新后

 ***销毁期***
 componentWillUnmount 销毁



#### 二. 由于未来采用异步渲染机制，所以即将在17版本中去掉的生命周期钩子函数

- componentWillMount
- componentWillRecieveProps
- componentWIllUpdate

#### 三. 新增两个

- static getDerivedStateFromProps
  会在初始化和update时触发，用于替换componentWillReceiveProps，可以用来控制 props 更新 state 的过程；它返回一个对象表示新的 state；如果不需要更新，返回 null 即可
- getSnapshotBeforeUpdate
  用于替换 componentWillUpdate，该函数会在update后 DOM 更新前被调用，用于读取最新的 DOM 数据，返回值将作为 componentDidUpdate 的第三个参数





 可以获取 **dom** 的生命周期
 componentDidMount
 componentWillReceiveProps （不能操作）
 shouldComponentUpdate （不能操作）
 componentWillUpdate （不能操作）
 *render* （不能操作）
 compoentDidUpdate
 componentWillUnmount （不能操作）

 只执行一次的生命周期
 初始化阶段除了 *render* 之外所有的，销毁期的那个

 可以修改 ***state\*** 的生命周期
 componentWillMount， componentDidMount, componentWillReceiveProps,
 shouldComponentUpdate, compoentDidUpdate

 调用 setState 之后执行哪些生命周期
 shouldComponentUpdate 如果返回 **true** 就会执行 WillUpdate *render
\* DidUpdate

## react 生命周期函数

- 初始化阶段：
  - getDefaultProps:获取实例的默认属性
  - getInitialState:获取每个实例的初始化状态
  - componentWillMount：组件即将被装载、渲染到页面上
  - render:组件在这里生成虚拟的 DOM 节点
  - componentDidMount:组件真正在被装载之后
- 运行中状态：
  - componentWillReceiveProps:组件将要接收到属性的时候调用
  - shouldComponentUpdate:组件接受到新属性或者新状态的时候（可以返回 false，接收数据后不更新，阻止 render 调用，后面的函数不会被继续执行了）
  - componentWillUpdate:组件即将更新不能修改属性和状态
  - render:组件重新描绘
  - componentDidUpdate:组件已经更新
- 销毁阶段：
  - componentWillUnmount:组件即将销毁

## react中组件传值

父传子（组件嵌套浅）：父组件定义一个属性，子组件通过this.props接收。
子传父：父组件定义一个属性，并将一个回调函数赋值给定义的属性，然后子组件进行调用传过来的函数， 并将参数传进去，在父组件的回调函数中即可获得子组件传过来的值。

####  vue组件之间如何传值通信

   父到子：

​     子组件在props中创建一个属性，用来接收父组件传过来的值；

​     在父组件中注册子组件；    

​     在子组件标签中添加子组件props中创建的属性；  

​     把需要传给子组件的值赋给该属性 

​     子到父：

​     子组件中需要以某种方式（如点击事件）的方法来触发一个自定义的事件；

​     将需要传的值作为$emit的第二个参数，该值将作为实参传给响应事件的方法；

​     在父组件中注册子组件并在子组件标签上绑定自定义事件的监听。 

​     平行组件：

​     $emit推送，$on接收

## React 中 keys 的作用是什么？

Keys 是 React 用于追踪哪些列表中元素被修改、被添加或者被移除的辅助标识。

```
render () {
  return (
    <ul>
      {this.state.todoItems.map(({item, key}) => {
        return <li key={key}>{item}</li>
      })}
    </ul>
  )
}
```

在开发过程中，我们需要保证某个元素的 key 在其同级元素中具有唯一性。在 React Diff 算法中 React 会借助元素的 Key 值来判断该元素是新近创建的还是被移动而来的元素，从而减少不必要的元素重渲染。此外，React 还需要借助 Key 值来判断元素与本地状态的关联关系，因此我们绝不可忽视转换函数中 Key 的重要性。

### 调用 setState 之后发生了什么？

在代码中调用 setState 函数之后，React 会将传入的参数对象与组件当前的状态合并，然后触发所谓的调和过程（Reconciliation）。经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个 UI 界面。在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。

## React Hooks

所有组件都将是Function组件，这个函数却有自己的状态（count），同时它还可以更新自己的状态（setCount），除了useState这个hook外，还有很多别的hook，比如useEffect提供了类似于componentDidMount等生命周期钩子的功能，useContext提供了上下文（context）的功能等等。

useRef获取DOM元素和保存变量

useMemo优化React Hooks程序性能

```jsx
import { useState } from 'react';

function Example() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}
```

## 简单介绍下什么是hooks，hooks产生的背景？hooks的优点？

hooks是针对在使用react时存在以下问题而**产生**的：
1、组件之间复用状态逻辑很难，在hooks之前，实现组件复用，一般采用高阶组件和 Render Props，它们本质是将复用逻辑提升到父组件中，很容易产生很多包装组件，带来嵌套地域。
2、组件逻辑变得越来越复杂，尤其是生命周期函数中常常包含一些不相关的逻辑，完全不相关的代码却在同一个方法中组合在一起。如此很容易产生 bug，并且导致逻辑不一致。
3、复杂的class组件，使用class组件，需要理解 JavaScript 中 this 的工作方式，不能忘记绑定事件处理器等操作，代码复杂且冗余。除此之外，class组件也会让一些react优化措施失效。



针对上面提到的问题，react团队研发了hooks，它主要有两方面**作用**：
1、用于在函数组件中引入状态管理和生命周期方法
2、取代高阶组件和render props来实现抽象和可重用性



**优点**：
1、避免在被广泛使用的函数组件在后期迭代过程中，需要承担一些副作用，而必须重构成类组件，它帮助函数组件引入状态管理和生命周期方法。
2、Hooks 出现之后，我们将复用逻辑提取到组件顶层，而不是强行提升到父组件中。这样就能够避免 HOC 和 Render Props 带来的「嵌套地域」
3、避免上面陈述的class组件带来的那些问题

## Hook有哪些优势

- 减少状态逻辑复用的风险

> Hook和 Mixin在用法上有一定的相似之处，但是 Mixin引入的逻辑和状态是可以相互覆盖的，而多个 Hook之间互不影响，这让我们不需要在把一部分精力放在防止避免逻辑复用的冲突上。在不遵守约定的情况下使用 HOC也有可能带来一定冲突，比如 props覆盖等> 等，使用 Hook则可以避免这些问题。

- 避免地狱式嵌套

> 大量使用 HOC的情况下让我们的代码变得嵌套层级非常深，使用 Hook，我们可以实现扁平式的状态逻辑复用，而避免了大量的组件嵌套。

- 让组件更容易理解

> 在使用 class组件构建我们的程序时，他们各自拥有自己的状态，业务逻辑的复杂使这些组件变得越来越庞大，各个生命周期中会调用越来越多的逻辑，越来越难以维护。使用 Hook，可以让你更大限度的将公用逻辑抽离，将一个组件分割成更小的函数，而不是强制> 基于生命周期方法进行分割。

- 使用函数代替class

> 相比函数，编写一个 class可能需要掌握更多的知识，需要注意的点也越多，比如 this指向、绑定事件等等。另外，计算机理解一个 class比理解一个函数更快。Hooks让你可以在 classes之外使用更多 React的新特性。

## 虚拟Dom

虚拟DOM是在DOM的基础上建立了一个抽象层，对数据和状态所做的任何改动，都会被自动且高效的同步到虚拟DOM，最后再批量同步到DOM中。减少对真实Dom的操作，减少性能的消耗，保证非常高效的渲染。

因为改变真实dom，会导致整个dom树的重绘和回流

### 为什么虚拟 dom 会提高性能?(必考)

虚拟 dom 相当于在 js 和真实 dom 中间加了一个缓存，利用 dom diff 算法避免了没有必要的 dom 操作，从而提高性能。

用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异把 2 所记录的差异应用到步骤 1 所构建的真正的 DOM 树上，视图就更新了。

## react diff 原理（常考，大厂必考）

- 把树形结构按照层级分解，只比较同级元素。

- 给列表结构的每个单元添加唯一的 key 属性，方便比较。

- React 只会匹配相同 class 的 component（这里面的 class 指的是组件的名字）

- 合并操作，调用 component 的 setState 方法的时候, React 将其标记为 dirty.到每一个事件循环结束, React 检查所有标记 dirty 的 component 重新绘制.

- 选择性子树渲染。开发人员可以重写 shouldComponentUpdate 提高 diff 的性能。

  

## React 中 refs 的作用是什么？

Refs 是 React 提供给我们的安全访问 DOM 元素或者某个组件实例的句柄。我们可以为元素添加 ref 属性然后在回调函数中接受该元素在 DOM 树中的句柄，该值会作为回调函数的第一个参数返回：

## React解决长列表方案

react-virtualized

## react路由懒加载

react-loadable

## 简述react、redux、react-redux、redux-saga之间的关系

#### 【react】

1. 定位：React 是一个用于构建用户界面的JavaScript库。

1. 特点：它采用声明范式来描述应用，建立虚拟dom，支持JSX语法，通过react构建组件，能够很好的去复用代码；

1. 缺点：react抽离了dom，使我们构建页面变得简单，但是对于一个大型复杂应用来说，只有dom层的便捷是不够的，如何组织、管理应用的代码，如何在组件件进行有效通信，这些它都没有解决；因此，它还需要一个前端架构才能应对大型应用；

#### 【redux】

1. 定位：它是将flux和函数式编程思想结合在一起形成的架构；

1. 思想：视图与状态是一一对应的；所有的状态，都保存在一个对象里面；a

1. API：
   1. store：就是一个数据池，一个应用只有一个；　　
   2. state：一个 State 对应一个 View。只要 State 相同，View 就相同。
   3. action：State 的变化，会导致 View 的变化。但是，用户接触不到 State，只能接触到 View。所以，State 的变化必须是 View 导致的。Action 就是 View 发出的通知，表示 State 应该要发生变化了。Action 是一个对象。其中的type``属性是必须的，表示 Action 的名称。其他属性可以自由设置。
   4. dispatch：它是view发出action的唯一方法；
   5. reducer：view发出action后，state要发生变化，reducer就是改变state的处理层，它接收action和state，通过处理action来返回新的state；
   6. subscribe：监听。监听state，state变化view随之改变；

#### 【react-redux】

1. 定位：react-redux是为了让redux更好的适用于react而生的一个库，使用这个库，要遵循一些规范；

1. 主要内容
   1. UI组件：就像一个纯函数，没有state，不做数据处理，只关注view，长什么样子完全取决于接收了什么参数（props）
   2. 容器组件：关注行为派发和数据梳理，把处理好的数据交给UI组件呈现；React-Redux规定，所有的UI组件都由用户提供，容器组件则是由React-Redux自动生成。也就是说，用户负责视觉层，状态管理则是全部交给它。
   3. connect：这个方法可以从UI组件生成容器组件；但容器组件的定位是处理数据、响应行为，因此，需要对UI组件添加额外的东西，即mapStateToProps和mapDispatchToProps，也就是在组件外加了一层state；
   4. mapStateToProps：一个函数， 建立一个从（外部的）state对象到（UI组件的）props对象的映射关系。 它返回了一个拥有键值对的对象；
   5. mapDispatchToProps：用来建立UI组件的参数到store.dispatch方法的映射。 它定义了哪些用户的操作应该当作动作，它可以是一个函数，也可以是一个对象。

​    以上，redux的出现已经可以使react建立起一个大型应用，而且能够很好的管理状态、组织代码，但是有个棘手的问题没有很好地解决，那就是异步；   

#### 【redux-saga】：

1. 定位：react中间件；旨在于更好、更易地解决异步操作（action）；redux-saga相当于在Redux原有数据流中多了一层，对Action进行监听，捕获到监听的Action后可以派生一个新的任务对state进行维护；

1. 特点：通过 Generator 函数来创建，可以用同步的方式写异步的代码；

1. API：

   1. Effect： 一个简单的对象，这个对象包含了一些给 middleware 解释执行的信息。所有的Effect 都必须被 yield 才会执行。
   2. put：触发某个action，作用和dispatch相同；

   

## react中setState为什么是异步的

也可以同步，

如果不是经过react处理的是同步，

定时器，不是合成事件都是同步的

## shouldComponentUpdate 是做什么的，（react 性能优化是哪个周期函数？）

shouldComponentUpdate 这个方法用来判断是否需要调用 render 方法重新描绘 dom。因为 dom 的描绘非常消耗性能，如果我们能在 shouldComponentUpdate 方法中能够写出更优化的 dom diff 算法，可以极大的提高性能。

## 为什么虚拟 dom 会提高性能?(必考)

虚拟 dom 相当于在 js 和真实 dom 中间加了一个缓存，利用 dom diff 算法避免了没有必要的 dom 操作，从而提高性能。

用 JavaScript 对象结构表示 DOM 树的结构；然后用这个树构建一个真正的 DOM 树，插到文档当中当状态变更的时候，重新构造一棵新的对象树。然后用新的树和旧的树进行比较，记录两棵树差异把 2 所记录的差异应用到步骤 1 所构建的真正的 DOM 树上，视图就更新了。

# 三、js

## 数据类型

基本数据类型（按值访问）：Undefined 、 Null 、 Boolean 、 Number 和 String

引用数据类型（按引用访问）：object、Array、function

两种类型的区别是：存储位置不同； 

## 改变原数组的方法

·    pop()：删除数组最后一个元素，并返回该元素

·    push()：在数组尾部添加元素，并返回更新后的数组长度

·    shift()：删除数组的第一个元素，并返回该元素

·    unshift()：在数组第一位添加元素，并返回更新后的数组长度

·    sort()：对数组排序（按字符ASCII进行排序），也可添加回调函数按照想要的规则排序

·    reverse()：数组反转

·    splice(index, howmany, 新数据)：返回被删除元素所组成的数组。

## 不改变原数组的方法

1、concat()：用于连接两个或多个数组，仅会返回被连接数组的一个副本，arrayObject.concat(arrayX,arrayX,……,arrayX)

2、join()：返回一个字符串。该字符串是通过把 arrayObject 的每个元素转换为字符串，然后把这些字符串连接起来,arrayObject.join(separator)

3、slice():：如果数组是空的arrayObject.slice(start,end)

## 数组扁平化

1.flat

2.递归处理

3.reduce

4.扩展运算符

## es6新特性

1.变量声明const和let
2.模板对象与模板字符串
3.箭头函数
4.class类的支持

5.Symbol :表示独一无 二的值，Symbol最大的用途是用来定义对象的唯一属性名。

6.map和set

7.promise

8.async/await

## 删除数组里undefined元素

方法一：

循环数组找到undefined的值利用slice删除。 

```
function removeEmptyArrayEle(arr){    
  for(var i = 0; i < arr.length; i++) {
   if(arr[i] == "undefined") {
      arr.splice(i,1);
      i = i - 1; // i - 1 ,因为空元素在数组下标 2 位置，删除空之后，后面的元素要向前补位，
                       // 这样才能真正去掉空元素,觉得这句可以删掉的连续为空试试，然后思考其中逻辑
    }
   }
   return arr;
};
```


方法二：

 使用Boolean过滤数组中的所有假值。包括undefined，NaN,0，false

```
const compact = arr => arr.filter(Boolean)
compact([0, 1, false, 2, '', 3, 'a', 'e' * 23, NaN, 's', 34])
```

结果是[1, 2, 3, "a", "s", 34] 把0也删除了。这样有点删的多了啊。

结果是[1, 2, 3, "a", "s", 34] 把0也删除了。这样有点删的多了啊。

我们来改版一样,让他只删除undefined的值。

```
const compact = arr => arr.filter(res=>res!="undefined")
compact([0, 1, false, 2, '', 3, 'a', 'undefined', 's', 34])
```

结果是[0, 1, false, 2, "", 3, "a","s", 34]

简化一下上面的写法

arr=arr.filter(res=>{return res!="undefined}")


## dom0级和dom2级的区别

DOM 0级事件处理：

​     优点：通过javascript制定事件处理程序的传统方式。就是将一个函数赋值给一个事件处理属性。第四代web浏览   器出现，至今为所有浏览器所支持。优点，简单且具有跨浏览器的优势。

​     缺点：一个事件处理程序只能对应一个处理函数。

DOM 2级事件处理：

​     优点：同时绑定几个事件，不会覆盖。

​     缺点：不具有跨浏览器优势

## let,var,const的区别

1、var定义的变量，没有块的概念，可以跨块访问, 不能跨函数访问。

2、let定义的变量，只能在块作用域里访问，不能跨块访问，也不能跨函数访问。

3、const用来定义常量，使用时必须初始化(即必须赋值)，只能在块作用域里访问，而且不能修改。

4、let 的用法类似于 var ，但是 let 只在所在的代码块内有效，所以我们一般使用 let 替代 var 。而 const 用来声明常量。

5、让我们先看一看这张表：

| **声明方式** | **变量提升** | **暂时性死区** | **重复声明** | **初始值** | **作用域** |
| ------------ | ------------ | -------------- | ------------ | ---------- | ---------- |
| var          | 允许         | 不存在         | 允许         | 不需要     | 除块级     |
| let          | 不允许       | 存在           | 不允许       | 不需要     | 块级       |
| const        | 不允许       | 存在           | 不允许       | 需要       | 块级       |

## Split和Join方法区别

Split方法是将字符串转成数组形式,Join方法是将数组转化成字符串形式

**统计字符串中次数最多字母**

```
function findMaxDuplicateChar(str) { 
 if(str.length == 1) { 
  return str; 
 } 
 var charObj = {}; 
 for(var i = 0; i < str.length; i++) { 
  if(!charObj[str.charAt(i)]) { 
   charObj[str.charAt(i)] = 1; 
  } else { 
   charObj[str.charAt(i)] += 1; 
  } 
 } 
 var maxChar = '', 
 maxValue = 1; 
 for(var k in charObj) { 
  if(charObj[k] >= maxValue) { 
   maxChar = k; 
   maxValue = charObj[k]; 
  } 
 } 
 return maxChar + '：' + maxValue; 
} 
```

**数组去重**

1.indexof

```
function unique(array){ 
 var result = []; 
 for(var i = 0;i < array.length; i++){ 
  if(result.indexOf(array[i]) == -1) { 
   result.push(array[i]);
  } 
 } 
 return result; 
} 
```

2.es6中的set

Array.from(new Set(array)) 

## map和foreach

总结：大体是

forEach()会修改原来的数组。而map()方法会得到一个新的数组并返回。

1、map速度比foreach快

2、map会返回一个新数组，不对原数组产生影响,foreach不会产生新数组，foreach返回undefined

3、map因为返回数组所以可以链式操作，foreach不能

4, map里可以用return ,而foreach里用return不起作用，foreach不能用break，会直接报错

 

那么接下来，我继续做分析，为什么更推荐用`.map()`，而不是`.forEach()`？

首先，`.map()`要比`.forEach()`执行速度更快。虽然我也说过执行速度不是我们需要考虑的主要因素，但是他们都比`for()`要更好用，那肯定要选更优化的一个。

第二，`.forEach()`的返回值并不是array。如果你想用函数式编程写个链式表达式来装个逼，`.map()`将会是你不二的选择。

## typeof和instanceof的区别：

instanceof ：instanceof 是用来判断变量是否为某个对象的实 例，表达式为：A instanceof B，如果A是B的实例， 则返回true,否则返回false。instanceof 运算符用来 测试一个对象在其原型链中是否存在一个构造函数的 prototype 属性，但它不能检测Null和          undeﬁned

typeof 对数组 [] 和对象 {} 的返回值都是Object，无法区分数组和对象，但是instanceof可以区分。

Object.prototype.toString.call() ：是准确常用 的方式



## 箭头函数和普通函数

- 箭头函数的 this 永远指向其上下文的  this ，任何方法都改变不了其指向，如 call() ,  bind() , apply() 

- 普通函数的this指向调用它的那个对象

  ### 箭头函数：

- 不需要用关键字function来定义函数；

- 一般情况下可以省略return；

- 在箭头函数内部，this并不会跟其他函数一样指向调用它的对象，而是继承上下文的this指向的对象。

## call,apply和bind的区别

相同点是三者都可以把一个函数应用到其他对象上；都是用来改变函数的this对象的指向的；第一个参数都是this要指向的对象；都可以利用后续参数传参。不同点是call，apply是修改函数的作用域，即修改this指向，并且立即执行，而bind是返回了一个新的函数，不是立即执行；而call和apply的区别是call接受逗号分隔的无限多个参数列表，apply则是接受数组作为参数。

## typescript

它是[JavaScript](https://baike.baidu.com/item/JavaScript)的超集，最终会被编译为JavaScript代码，对js的一种扩展，对数据进行一个类型限制



## promise原理

#### promise是什么？

1、主要用于异步计算
2、可以将异步操作队列化，按照期望的顺序执行，返回符合预期的结果
3、可以在对象之间传递和操作promise，帮助我们处理队列

#### 原理:

1、解决回调地狱
      比如我们经常可能需要异步请求一个数据之后作为下一个异步操作的入参

2、promise 可以实现在多个请求发送完成后 再得到或者处理某个结果

#### 最简单的实现

 基于上面的应用场景发现`promise`可以有三种状态，分别是`pending` 、`Fulfilled`、 `Rejected`。

>  `Pending Promise`对象实例创建时候的初始状态
>  `Fulfilled` 可以理解为成功的状态
>  `Rejected`可以理解为失败的状态

- 构造一个`Promise`实例需要给`Promise`构造函数传入一个函数。传入的函数需要有两个形参，两个形参都是`function`类型的参数。分别是`resolve`和`reject`。
- `Promise`上还有`then`方法，`then` 方法就是用来指定`Promise` 对象的状态改变时确定执行的操作，`resolve` 时执行第一个函数（onFulfilled），`reject`时执行第二个函数（onRejected）
- 当状态变为`resolve`时便不能再变为`reject`，反之同理。

## promise

Promise 是异步编程的一种解决方案，其实是一个构造函数，自己身上有all、reject、resolve这几个方法，原型上有then、catch等方法。

Promise的构造函数接收一个参数，是函数，并且传入两个参数：resolve，reject，分别表示异步操作执行成功后的回调函数和异步操作执行失败后的回调函数。

#### Promise 的常用 API 如下：

- Promise.resolve(value) : 类方法，该方法返回一个以 value 值解析后的 Promise 对象
- Promise.reject : 类方法，且与 resolve 唯一的不同是，返回的 promise 对象的状态为 rejected。
- Promise.prototype.then : 实例方法，为 Promise 注册回调函数，函数形式：fn(vlaue){}，value 是上一个任务的返回结果，then 中的函数一定要 return 一个结果或者一个新的 Promise 对象，才可以让之后的then 回调接收。
- Promise.prototype.catch : 实例方法，捕获异常，函数形式：fn(err){}, err 是 catch 注册 之前的回调抛出的异常信息。
- Promise.race ：类方法，多个 Promise 任务同时执行，返回最先执行结束的 Promise 任务的结果，不管这个 Promise 结果是成功还是失败。
- Promise.all : 类方法，多个 Promise 任务同时执行，如果全部成功执行，则以数组的方式返回所有 Promise 任务的执行结果。 如果有一个 Promise 任务 rejected，则只返回 rejected 任务的结果。

## async/await

async用于申明一个function是异步的，而await可以认为是async wait的简写，等待一个异步方法执行完成。

async/await使得异步代码看起来像同步代码，明显节约了不少代码，大大地提高可读性

async 会将其后的函数（函数表达式或 Lambda）的返回值封装成一个 Promise 对象，而 await 会等待这个 Promise 完成，并将其 resolve 的结果返回出来。 

## es6中map和set的区别

Map 中存储的是 key-value 形式的键值对, 其中的 key 和 value 可以是任何类型的, 
即对象也可以作为 key . 这比用对象来模拟的方式就灵活了很多
Map 可用的 方法
set(key, value): 向其中加入一个键值对
get(key): 若不存在 key 则返回 undefined
has(key):返回布尔值
delete(key): 删除成功则返回 true, 若key不存在或者删除失败会返回 false
clear(): 将全部元素清除
set
Set 和 Map 最大的区别是只有键 key 而没有 value, 
所以一般用来判断某个元素(key)是否存在于其中.

## JS的垃圾回收机制?

 Js具有自动垃圾回收机制。垃圾收集器会按照固定的时间间隔周期性的执行。

 JS中最常见的垃圾回收方式是***标记清除***。

工作原理：是当变量进入环境时，将这个变量标记为“进入环境”。当变量离开环境时，则将其标记为“离开环境”。标记“离开环境”的就回收内存。

工作流程：

1.    垃圾回收器，在运行的时候会给存储在内存中的所有变量都加上标记。

2.    去掉环境中的变量以及被环境中的变量引用的变量的标记。

3.    再被加上标记的会被视为准备删除的变量。

4.    垃圾回收器完成内存清除工作，销毁那些带标记的值并回收他们所占用的内存空间。

***引用计数*** 方式

工作原理：跟踪记录每个值被引用的次数。

工作流程：

1.    声明了一个变量并将一个引用类型的值赋值给这个变量，这个引用类型值的引用次数就是1。

2.    同一个值又被赋值给另一个变量，这个引用类型值的引用次数加1.

3.    当包含这个引用类型值的变量又被赋值成另一个值了，那么这个引用类型值的引用次数减1.

4.    当引用次数变成0时，说明没办法访问这个值了。

5.    当垃圾收集器下一次运行时，它就会释放引用次数是0的值所占的内存。

但是循环引用的时候就会释放不掉内存。循环引用就是对象A中包含另一个指向对象B的指针，B中也包含一个指向A的引用。

因为IE中的BOM、DOM的实现使用了COM，而COM对象使用的垃圾收集机制是引用计数策略。所以会存在循环引用的问题。

解决：手工断开js对象和DOM之间的链接。赋值为null。IE9把DOM和BOM转换成真正的JS对象了，所以避免了这个问题。


## 什么情况会引起内存泄漏？

虽然有垃圾回收机制但是我们编写代码操作不当还是会造成内存泄漏。

1.    意外的全局变量引起的内存泄漏。

​       原因：全局变量，不会被回收。

​       解决：使用严格模式避免。

2.    闭包引起的内存泄漏

​       原因：闭包可以维持函数内局部变量，使其得不到释放。

​       解决：将事件处理函数定义在外部，解除闭包,或者在定义事件处理函数的外部函数中，删除对dom的引用。

3.    没有清理的DOM元素引用

​       原因：虽然别的地方删除了，但是对象中还存在对dom的引用

​       解决：手动删除。

4.    被遗忘的定时器或者回调

​       原因：定时器中有dom的引用，即使dom删除了，但是定时器还在，所以内存中还是有这个dom。

​       解决：手动删除定时器和dom。

5.    子元素存在引用引起的内存泄漏

​       原因：div中的ul li  得到这个div，会间接引用某个得到的li，那么此时因为div间接引用li，即使li被清      空，也还是在内存中，并且只要li不被删除，他的父元素都不会被删除。

​       解决：手动删除清空。

## 为什么要用事件委托

在JavaScript中，添加到页面上的事件处理程序数量将直接关系到页面的整体运行性能，因为需要不断的与dom节点进行交互，访问dom的次数越多，引起浏览器重绘与重排的次数也就越多，就会延长整个页面的交互就绪时间，这就是为什么性能优化的主要思想之一就是减少DOM操作的原因；每个函数都是一个对象，是对象就会占用内存，对象越多，内存占用率越大，100个li就要占用100个内存空间。如果要用事件委托，就会将所有的操作放到js程序里面，只对它的父级(如果只有一个父级)这一个对象进行操作，与dom的操作就只需要交互一次，这样就能大大的减少与dom的交互次数，提高性能；

## 事件委托使用场景:

大量标签绑定同一事件

动态渲染的标签

## 事件委托的原理

事件委托是利用事件的冒泡原理来实现的，何为事件冒泡呢？就是事件从最深的节点开始，然后逐步向上传播事件，举个例子：页面上有这么一个节点树，div>ul>li>a;比如给最里面的a加一个click点击事件，那么这个事件就会一层一层的往外执行，执行顺序a>li>ul>div，有这样一个机制，那么我们给最外面的div加点击事件，那么里面的ul，li，a做点击事件的时候，都会冒泡到最外层的div上，所以都会触发，这就是事件委托，委托它们父级代为执行事件。

## JS中的异步运行机制如下:  

```
（1）所有同步任务都在主线程上执行，形成一个执行栈（execution context stack）。
（2）主线程之外，还存在一个"任务队列"（task queue）。只要异步任务有了运行结果，就在"任务队列"之中放置一个事件。
（3）一旦"执行栈"中的所有同步任务执行完毕，系统就会读取"任务队列"，看看里面有哪些事件。那些对应的异步任务，于是结束等待状态，进入执行栈，开始执行。
（4）主线程不断重复上面的第三步。
```

## JS的执行机制：

1.首先判断JS是同步还是异步,同步就进入主进程,异步就进入event table

2.异步任务在event table中注册函数,当满足触发条件后,被推入event queue

3.同步任务进入主线程后一直执行,直到主线程空闲时,才会去event queue中查看是否有可执行的异步任务,如果有就推入主进程中

##### 注：JavaScript是一门单线程语言

##### Event Loop是JavaScript的执行机制

## http和https

HTTP 的URL 以http:// 开头，而HTTPS 的URL 以https:// 开头
HTTP 是不安全的，而 HTTPS 是安全的
HTTP 标准端口是80 ，而 HTTPS 的标准端口是443
在OSI 网络模型中，HTTP工作于应用层，而HTTPS 的安全传输机制工作在传输层
HTTP 无法加密，而HTTPS 对传输的数据进行加密
HTTP无需证书，而HTTPS 需要CA机构wosign的颁发的SSL证书

## AMD和CMD的区别

AMD 是 RequireJS 在推广过程中对模块定义的规范化产出。 

CMD 是 SeaJS 在推广过程中对模块定义的规范化产出。 

 

对于依赖的模块，AMD 是提前执行，CMD 是延迟执行。不过 RequireJS 从 2.0 开始，也改成可以延迟执行（根据写法不同，处理方式不同）。CMD 推崇 as lazy as possible. 

CMD 推崇依赖就近，AMD 推崇依赖前置。 

AMD 的 API 默认是一个当多个用，CMD 的 API 严格区分，推崇职责单一。比如 AMD 里，require 分全局 require 和局部 require，都叫 require。CMD 里，没有全局 require，而是根据模块系统的完备性，提供 seajs.use 来实现模块系统的加载启动。CMD 里，每个 API 都简单纯粹。 

## 移动端适配方案：

1）viewport（scale=1/dpr）
2）rem
3）flex
4）vm/vh ：1.vw：1vw等于视口宽度的1%。2.vh：1vh等于视口高度的1%。



借助两个插件，将px进行转化为rem。

- lib-flexible 用于设置 rem 基准值。由淘宝手机前端开发团队编写的。
- postcss-pxtorem 是一款 postcss 插件，用于将单位转化为 rem。

**一、lib-flexible**

Install

```
npm install lib-flexible --save
```

二、在项目的入口main.js文件中引入lib-flexible

```
import 'lib-flexible'
```

第二部分：使用postcss-px2rem-exclude自动将css中的px转换成rem

一、安装postcss-px2rem-exclude

```
npm install postcss-px2rem-exclude --save
```

二、配置 postcss-px2rem-exclude

1.在项目的根目录下vue.config.js，在里面添加代码

```
module.exports = {
    css: {
        loaderOptions: {
            postcss: {
                plugins: [
                    require('postcss-px2rem-exclude')({ // 把px单位换算成rem单位
                        remUnit: 75,
                        exclude: /node_modules|folder_name/i, // 忽略node_modules目录下的文件
                        propList: ['*']
                    })
                ]
            }
        }
    }
}
```

或者在postcss.config.js

```
module.exports = {
    plugins: {
      autoprefixer: {},
      "postcss-px2rem-exclude": {
        remUnit: 75,
        exclude: /node_modules|folder_name/i
      }
    }
  };
```

注意：

  1.此方法只能将.vue文件style标签中的px转成rem，不能将script标签和元素style里面定义的px转成rem

  2.如果在.vue文件style中的某一行代码不希望被转成rem，只要在后面写上注释 /* no*/就可以了

## i++和++i

 i++是先赋值,然后再自增;++i是先自增,后赋值。

# 四、css

## 水平垂直居中的方法

　1、绝对定位方法：不确定当前div的宽度和高度，采用 transform: translate(-50%,-50%); 当前div的父级添加相对定位（position: relative;）

```
div{
    background:red;
    position: absolute;
    left:50%;
    top:50%;
    transform: translate(-50%, -50%);
}
```

**方法二:**

　　绝对定位方法：确定了当前div的宽度，margin值为当前div宽度一半的负值

　　图片展示： 如方法一的图片展示

　　代码如下：

```
div{
    width:600px;
    height: 600px;
    background:red;
    position: absolute;
    left:50%;
    top:50%;
    margin-left:-300px;
    margin-top:-300px;
}
```

　　

**方法三：**

　　绝对定位方法：绝对定位下top left right bottom 都设置0

　　图片展示： 如方法一的图片展示

　　代码如下：

```
<div class="child">我是子级</div>
/**css**/
div.child{
    width: 600px;
    height: 600px;
    background: red;
    position:absolute;
    left:0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
}
```

　　

**方法四:**

　　flex布局方法：当前div的父级添加flex css样式

```
<!--html-->
<div class="box">
    <div class="child">child</div>
</div>
/**css**/
.box{
    height:800px;
    -webkit-display:flex;
    display:flex;
    -webkit-align-items:center;
    align-items:center;
    -webkit-justify-content:center;
    justify-content:center;
    border:1px solid #ccc;
}
div.child{
    width:600px;
    height:600px;
    background-color:red;
}
```

## 盒模型：

w3c:

![img](file:///C:\Users\hp\Documents\Tencent Files\2466256941\Image\C2C\VL92}7C2L3O`Q{2BOZ[T%1W.png)

IE：

![img](file:///C:\Users\hp\Documents\Tencent Files\2466256941\Image\C2C\K~~36QNGLUX813QI5@}W9VD.png)

## box-sizing属性？

用来控制元素的盒子模型的解析模式，默认为content-box
**context-box：W3C的标准盒子模型**，设置元素的 height/width 属性指的是 content 部分的高/宽
**border-box：IE 传统盒子模型。**设置元素的 height/width 属性指的是 content + border + padding 部分的高/宽

## css选择器

1.标签选择器   以标签名开头,选择所有div元素

2.类选择器   给标签取class名,以点(.)加class名开头,选择所有该class名的...

3.id选择器   给标签取id名,以#加id名开p]头,具有唯一性,选择”id = ‘wrap’”...

4.子选择器   以>隔开父子级元素,(模块名>模块名,修饰>前模块内的子模块)

5.包含选择器   以空格隔开包含关系的元素,(模块名模块名,修饰空格前模块内所有该模块)

6、兄弟选择器  以~隔开兄弟关系的元素(模块名~模块名 修饰~前模块往下的所有兄弟模块)

7、相邻选择器  以+隔开相邻关系的元素(模块名+模块名 修饰加号前模块往下的相邻的模块 只一个)

8、全局选择器  以*开头(星号标在大括号前，修饰了包含body所有的标签)

9、群选择器  以，分隔(逗号分隔开需要修饰的模块名)

10、属性选择器  [] ([type=text]修饰属性为type=text的模块)

11、伪类选择器

：link 未被访问之前的状态

：visited 访问过后的状态

：hover 鼠标经过/滑过/悬停时的状态

：active 鼠标点击/按下的状态



 (1) li:first-child{} (修饰第一个li)

![img](https:////upload-images.jianshu.io/upload_images/18104852-fcd88cc8ea72acab.png?imageMogr2/auto-orient/strip|imageView2/2/w/360/format/webp)

修饰第一个li元素

  (2) li:last-child{} (修饰最后一个li)

![img](https:////upload-images.jianshu.io/upload_images/18104852-7579e7eece1c425e.png?imageMogr2/auto-orient/strip|imageView2/2/w/360/format/webp)

修饰最后一个li元素

  (3) li:nth-child{} (修饰第()个li)



![img](https:////upload-images.jianshu.io/upload_images/18104852-691f981f6a2ce322.png?imageMogr2/auto-orient/strip|imageView2/2/w/360/format/webp)

修饰第二个li元素

  (4) li:not(){} (不修饰第()个li,括号里面可以填以上的选择器)

![img](https://upload-images.jianshu.io/upload_images/18104852-0c5e9d130d7b057b.png?imageMogr2/auto-orient/strip|imageView2/2/w/360/format/webp)

不修饰第一个li元素





## 权重 以及优先级

！important     >1000

行内                     1000

id                          100

class类                  10

标签                       1

全局                       0

## 常见的浏览器兼容性问题：

1、不同浏览器的标签默认的外补丁( margin )和内补丁(padding)不同
解决方案： css 里增加通配符 * { margin: 0; padding: 0; }

2、IE6双边距问题；在 IE6中设置了float , 同时又设置margin , 就会出现边距问题
解决方案：设置display:inline;

3、当标签的高度设置小于10px，在IE6、IE7中会超出自己设置的高度
解决方案：超出高度的标签设置overflow:hidden,或者设置line-height的值小于你的设置高度

4、图片默认有间距
解决方案：使用float 为img 布局

5、IE9一下浏览器不能使用opacity
解决方案：
opacity: 0.5;filter: alpha(opacity = 50);filter: progid:DXImageTransform.Microsoft.Alpha(style = 0, opacity = 50);

6、边距重叠问题；当相邻两个元素都设置了margin 边距时，margin 将取最大值，舍弃最小值；
解决方案：为了不让边重叠，可以给子元素增加一个父级元素，并设置父级元素为overflow:hidden；

7、cursor:hand 显示手型在safari 上不支持
解决方案：统一使用 cursor:pointer

8、两个块级元素，父元素设置了overflow:auto；子元素设置了position:relative ;且高度大于父元素，在IE6、IE7会被隐藏而不是溢出；
解决方案：父级元素设置position:relative

## 数组遍历方法

**1.for循环**

使用临时变量，将长度缓存起来，避免重复获取数组长度，当数组较大时优化效果才会比较明显。

**2.foreach循环**

遍历数组中的每一项，没有返回值，对原数组没有影响，不支持IE

**3.map循环**

有返回值，可以return出来

map的回调函数中支持return返回值；return的是啥，相当于把数组中的这一项变为啥（并不影响原来的数组，只是相当于把原数组克隆一份，把克隆的这一份的数组中的对应项改变了）；

**5.filter遍历**

不会改变原始数组,返回新数组

**6.every遍历**

every()是对数组中的每一项运行给定函数，如果该函数对每一项返回true,则返回true。

**7.some遍历**

some()是对数组中每一项运行指定函数，如果该函数对任一项返回true，则返回true。

**8.reduce**

`reduce() `方法接收一个函数作为累加器（accumulator），数组中的每个值（从左到右）开始缩减，最终为一个值。

```
var` `total = [0,1,2,3,4].reduce((a, b)=>a + b); ``//10
```

`reduce`接受一个函数，函数有四个参数，分别是：上一次的值，当前值，当前值的索引，数组

**10.find**

find()方法返回数组中符合测试函数条件的第一个元素。否则返回undefined 

**11.findIndex**

对于数组中的每个元素，**findIndex** 方法都会调用一次回调函数（采用升序索引顺序），直到有元素返回 **true**。只要有一个元素返回 true，**findIndex** 立即返回该返回 true 的元素的索引值。如果数组中没有任何元素返回 true，则 **findIndex** 返回 -1。

**findIndex** 不会改变数组对象。

## position 

| 值       | 描述                                                         |
| :------- | :----------------------------------------------------------- |
| absolute | 生成绝对定位的元素，相对于 static 定位以外的第一个父元素进行定位。元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。 |
| fixed    | 生成固定定位的元素，相对于浏览器窗口进行定位。（老IE不支持）元素的位置通过 "left", "top", "right" 以及 "bottom" 属性进行规定。 |
| relative | 生成相对定位的元素，相对于其正常位置进行定位，不脱离文档流。因此，"left:20" 会向元素的 LEFT 位置添加 20 像素。 |
| static   | 默认值。没有定位，元素出现在正常的文档流中（忽略 top, bottom, left, right 或者 z-index 声明）。 |
| inherit  | 规定应该从父元素继承 position 属性的值。                     |

css 定位还有一个新增属性，**粘性定位 sticky**，它主要用在对 scroll 事件的监听上；

粘性定位可以被认为是相对定位和固定定位的混合。元素在跨越特定阈值前为相对定位，之后为固定定位。例如：

```
#one { position: sticky; top: 10px; }复制代码
```

在 viewport 视口滚动到元素 top 距离小于 10px 之前，元素为相对定位。之后，元素将固定在与顶部距离 10px 的位置，直到 viewport 视口回滚到阈值以下。

## css3新特性

**2.过渡**  transition： CSS属性，花费时间，效果曲线(默认ease)，延迟时间(默认0)复制代码

**3.动画**  animation：动画名称，一个周期花费时间，运动曲线（默认ease），动画延迟（默认0），播放次数（默认1），是否反向播放动画（默认normal），是否暂停动画（默认running）复制代码

在css里写：

```
<style> 
    div{
        width:100px;
        height:100px;
        background:red;
        position:relative;
        animation:mymove 5s infinite;
        -webkit-animation:mymove 5s infinite; /*Safari and Chrome*/
       }

    @keyframes mymove{
          from {left:0px;}
          to {left:200px;}
       }

    @-webkit-keyframes mymove /*Safari and Chrome*/{
          from {left:0px;}
          to {left:200px;}
        }
</style>
```

| 值                                                           | 说明                                                         |
| :----------------------------------------------------------- | :----------------------------------------------------------- |
| *[animation-name](https://www.runoob.com/cssref/css3-pr-animation-name.html)* | 指定要绑定到选择器的关键帧的名称                             |
| *[animation-duration](https://www.runoob.com/cssref/css3-pr-animation-duration.html)* | 动画指定需要多少秒或毫秒完成                                 |
| *[animation-timing-function](https://www.runoob.com/cssref/css3-pr-animation-timing-function.html)* | 设置动画将如何完成一个周期                                   |
| *[animation-delay](https://www.runoob.com/cssref/css3-pr-animation-delay.html)* | 设置动画在启动前的延迟间隔。                                 |
| *[animation-iteration-count](https://www.runoob.com/cssref/css3-pr-animation-iteration-count.html)* | 定义动画的播放次数。                                         |
| *[animation-direction](https://www.runoob.com/cssref/css3-pr-animation-direction.html)* | 指定是否应该轮流反向播放动画。                               |
| [animation-fill-mode](https://www.runoob.com/cssref/css3-pr-animation-fill-mode.html) | 规定当动画不播放时（当动画完成时，或当动画有一个延迟未开始播放时），要应用到元素的样式。 |
| *[animation-play-state](https://www.runoob.com/cssref/css3-pr-animation-play-state.html)* | 指定动画是否正在运行或已暂停。                               |
| initial                                                      | 设置属性为其默认值。 [阅读关于 *initial*的介绍。](https://www.runoob.com/cssref/css-initial.html) |
| inherit                                                      | 从父元素继承属性。 [阅读关于 *initinherital*的介绍。](https://www.runoob.com/cssref/css-inherit.html) |

4.形状转换**  transform:适用于2D或3D转换的元素

rotate(30deg);  translate(30px,30px);  scale(.8);    skew(10deg,10deg);    rotateX(180deg);   rotateY(180deg);    rotate3d(10,10,10,90deg);

**5.选择器**

**6.阴影**  box-shadow: 水平阴影的位置 垂直阴影的位置 模糊距离 阴影的大小 阴影的颜色 阴影开始方向（默认是从里往外，设置inset就是从外往里）;复制代码

**7.边框**  border-image: 图片url 图像边界向内偏移 图像边界的宽度(默认为边框的宽度) 用于指定在边框外部绘制偏移的量（默认0） 铺满方式--重复（repeat）、拉伸（stretch）或铺满（round）（默认：拉伸（stretch））;

**8.背景** background-clip 制定背景绘制（显示）区域 background-origin  background-size

1.（background-clip: border-box;）默认情况（从边框开始绘制）                               2.（background-clip: padding-box;）从padding开始绘制（显示），不算border,，相当于把border那里的背景给裁剪掉！                                                                       3.（background-clip: content-box;）只在内容区绘制（显示），不算padding和border，相当于把padding和border那里的背景给裁剪掉！

**9.反射**   -webkit-box-reflect:方向[ above-上 | below-下 | right-右 | left-左 ]，偏移量，遮罩图片

**10.文字**  换行  语法：word-break: normal|break-all|keep-all;、语法：word-wrap: normal|break-word; 超出省略号  text-overflow:clip|ellipsis|string                                                 文字阴影  语法：text-shadow:水平阴影，垂直阴影，模糊的距离，以及阴影的颜色。

**11.颜色** rgba（rgb为颜色值，a为透明度） color: rgba(255,00,00,1);background: rgba(00,00,00,.5); hsla h:色相”，“s：饱和度”，“l：亮度”，“a：透明度” color: hsla( 112, 72%, 33%, 0.68);background-color: hsla( 49, 65%, 60%, 0.68);复制代码

**12.渐变**

**13.Filter**（滤镜）：黑白色filter: grayscale(100%)、褐色filter:sepia(1)、饱和度saturate(2)、色相旋转hue-rotate(90deg)、反色filter:invert(1)、透明度opacity(.5)、亮度brightness(.5)、对比度contrast(2)、模糊blur(3px)

**14.弹性布局** [F](https://links.jianshu.com/go?to=https%3A%2F%2Flink.juejin.im%2F%3Ftarget%3Dhttp%3A%2F%2Fwww.ruanyifeng.com%2Fblog%2F2015%2F07%2Fflex-grammar.html)lex

**15.栅格布局** grid

**16.多列布局**

**17.盒模型定义**  box-sizing:border-box的时候，边框和padding包含在元素的宽高之内！              box-sizing:content-box的时候，边框和padding不包含在元素的宽高之内！如下图

**18.媒体查询** 就在监听屏幕尺寸的变化，在不同尺寸的时候显示不同的样式！在做响应式的网站里面，是必不可少的一环！

## 用纯CSS创建一个三角形的原理是什么？

首先，需要把元素的宽度、高度设为0。然后设置边框样式。

```
width: 0;
height: 0;
border-top: 40px solid transparent;
border-left: 40px solid transparent;
border-right: 40px solid transparent;
border-bottom: 40px solid #ff0000;复制代码
```

## 为什么要初始化 CSS 样式

因为浏览器的兼容问题，不同浏览器对有些标签的默认值是不同的，如果没对CSS初始化往往会出现浏览器之间的页面显示差异。当然，初始化样式会对SEO有一定的影响，但鱼和熊掌不可兼得，但力求影响最小的情况下初始化。

## display:none 与 visibility:hidden 的区别是什么？

**display : none** 隐藏对应的元素，在文档布局中不再分配空间（回流+重绘）

**visibility:hideen** 隐藏对应的元素，在文档布局中仍保留原来的空间（重绘）

使用 CSS display:none 属性后，HTML 元素（对象）的宽度、高度等各种属性值都将“丢失”;而使用 visibility:hidden 属性后，HTML元素（对象）仅仅是在视觉上看不见（完全透明），而它所占据的空间位置仍然存在。

## **清除浮动的方式**：

1. 父级div定义height
2. 最后一个浮动元素后加空 div 标签 并添加样式 clear:both。（理论上能清除任何标签，增加无意义的标签）
3. 包含浮动元素的父标签添加样式 overflow 为 hidden 或 auto。
4. 父级 div 定义 zoom（空标签元素清除浮动而不得不增加无意义代码的弊端，使用zoom:1用于兼容IE）
5. 用after伪元素清除浮动（用于非IE浏览器）

## 双飞翼布局的实现

#### 双飞翼布局要求

header和footer各自占领屏幕所有宽度，高度固定。

中间的container是一个三栏布局。

三栏布局两侧宽度固定不变，中间部分自动填充整个区域。

中间部分的高度是三栏中最高的区域的高度。

#### 实现：

left、center、right三种都设置左浮动
设置center宽度为100%
设置负边距，left设置负边距为100%，right设置负边距为自身宽度
设置content的margin值为左右两个侧栏留出空间，margin值大小为left和right宽度

![img](https://img-blog.csdnimg.cn/20190118092113972.png)

## :before 和 :after中双冒号和单冒号有什么区别？解释一下这2个伪元素的作用

1. 单冒号(:)用于CSS3伪类，双冒号(::)用于CSS3伪元素。
2. ::before就是以一个子元素的存在，定义在元素主体内容之前的一个伪元素。并不存在于dom之中，只存在在页面之中。

:before 和 :after 这两个伪元素，是在CSS2.1里新出现的。起初，伪元素的前缀使用的是单冒号语法，但随着Web的进化，在CSS3的规范里，伪元素的语法被修改成使用双冒号，成为::before ::after



注意:对于IE6/7/8仅支持单冒号表示法，而现代浏览器同时支持这两种表示法。另外，在CSS3中单冒号和双冒号的区域主要是用来区分伪类和伪元素的。

## 如果需要手动写动画，你认为最小时间间隔是多久，为什么？

多数显示器默认频率是60Hz，即1秒刷新60次，所以理论上最小间隔为1/60＊1000ms ＝ 16.7ms。

## png、jpg、gif 这些图片格式解释一下，分别什么时候用。有没有了解过webp？

1. png是便携式网络图片（Portable Network Graphics）是一种无损数据压缩位图文件格式.优点是：压缩比高，色彩好。 大多数地方都可以用。
2. jpg是一种针对相片使用的一种失真压缩方法，是一种破坏性的压缩，在色调及颜色平滑变化做的不错。在www上，被用来储存和传输照片的格式。
3. gif是一种位图文件格式，以8位色重现真色彩的图像。可以实现动画效果.
4. webp格式是谷歌在2010年推出的图片格式，压缩率只有jpg的2/3，大小比png小了45%。缺点是压缩的时间更久了，兼容性不好，目前谷歌和opera支持。

## CSS属性overflow属性定义溢出元素内容区的内容会如何处理?

参数是 scroll 时候，必会出现滚动条。
参数是 auto 时候，子元素内容大于父元素时出现滚动条。
参数是 visible 时候，溢出的内容出现在父元素之外。
参数是 hidden 时候，溢出隐藏。

## 为什么父元素会坍塌？

这是因为内部的元素因为float:left之后，就丢失了clear:both和display:block的样式，所以外部的父容器不会被撑开

#### 怎么解决？

方法1：

在使用float元素的父元素最后加一个div：

```
<div style="clear:both"></div>
```

方法2：

在使用float元素的父元素添加overflow:hidden;（只要给外面大容器加上overflow:auto的属性，可以解决IE7和火狐浏览器下的清除浮动问题，但是IE6下不生效，所以我们还需要使用zoom这个IE的私有属性来达到彻底清楚浮动的兼容效果。）

方法3：

使用after伪对象清除浮动

## 列举10个html块元素标签和5个html行内标签，并简述块元素与行内元素的区别

块：div dl form h1 h2 h3 h4 h5 h6 hr ol li p pre table td tr

行内：a b s i u span br img input textarea sub sup

两者区别：

以图例来表述行内元素和块级元素的区别会更加直观：

注：行内元素会再一条直线上，是在同一行的。我是行内元素SPAN标签  **我是行内元素****strong****标签**

注：块级元素各占一行。是垂直方向的！

我是块级元素div标签

我是块级元素P标签

如果你要将行内元素变成块级元素，那么就只需要在该标签上加上样式 display:block; 这里已经牵涉到了CSS内容。块级元素可以用样式控制其高、宽的值。

行内元素不可以控制宽和高，除非你想将它转变成为块级元素。它的宽和高，是随标签里的内容而变化。

# 五、git

Git是一个分布式的版本控制工具，SVN 是集中版本控制工具

## git commit 和 git push的区别

git作为支持分布式版本管理的工具，它管理的库（repository）分为本地库、远程库。

git commit操作的是本地库，git push操作的是远程库。

git commit是将本地修改过的文件提交到本地库中。
git push是将本地库中的最新信息发送给远程库。

## git指令

**4.3.1** **状态查看** 

git status 

查看工作区、暂存区状态

**4.3.2** **添加** 

git add [file name] 

将工作区的“新建/修改”添加到暂存区 

**4.3.3** **提交** 

git commit -m "提交信息" [file name] 

将暂存区的内容提交到本地库 

**4.3.4** **查看历史记录** 

git log

**4.4.2** **分支的好处？** 

Ø 同时并行推进多个功能开发，提高开发效率 

Ø 各个分支在开发过程中，如果某一个分支开发失败，不会对其他分支有任 

何影响。失败的分支删除重新开始即可。

**4.4.3** **分支操作** 

Ø 创建分支 

git branch [分支名] 

Ø 查看分支 

git branch -v 

Ø 切换分支 

git checkout [分支名] 

Ø 合并分支 

n 第一步：切换到接受修改的分支（被合并，增加新内容）上 

git checkout [被合并分支名]

n 第二步：执行 merge 命令 

git merge [有新内容分支名]

Git branch -D 分`支名 可以删除本地分支

>git命令

| 命令                            | 说明                                                         |
| ------------------------------- | ------------------------------------------------------------ |
| git init                        | 初始化git仓库                                                |
| git add .                       | 把工作区所有的修改都提交到暂存区                             |
| git add 指定文件名              | 把工作区指定的文件添加到暂存区                               |
| git status                      | 查看工作区和暂存区的状态     红色工作区发生变化   绿色暂存区发生变化 |
| git commit -m "描述"            | 把修改从暂存区提交到本地版本库的当前分支                     |
| git commit -a -m "提交信息"     | 跳过暂存区 已经跟踪过的文件暂存起来一并提交                  |
| git log                         | 查看历史记录                                                 |
| git reflog                      | 查看所有的历史记录                                           |
| git log --graph                 | 打印图谱                                                     |
| git diff                        | 查看工作区的具体修改                                         |
| git diff --cached               | 查看暂存区具体的修改                                         |
| git checkout -- 文件名          | 撤销工作区的修改                                             |
| git clone 仓库地址              | 克隆仓库                                                     |
| ssh-keygen                      | 生成公钥和秘钥                                               |
| git push origin master          | 向远程master分支推送代码                                     |
| git pull origin master          | 从远程master分支拉取代码                                     |
| git fetch origin master         | 从远程master分支拉取代码，但是不和本地的合并                 |
| git branch dev（分支名）        | 新建分支                                                     |
| git branch                      | 查看本地所有的分支                                           |
| git branch -a                   | 查看本地和远程所有的分支                                     |
| git branch -r                   | 查看远程的分支                                               |
| git checkout dev(分支名)        | 切换分支                                                     |
| git checkout -b 分支名          | 创建并切换分支                                               |
| git merge origin/master         | 合并代码                                                     |
| git branch -d 分支名            | 删除本地分支                                                 |
| git push origin --delete 分支名 | 删除远程分支                                                 |
| git tag v1.0                    | 打标签                                                       |
| git tag -d v1.0                 | 删除标签                                                     |

-------------------------------------------------------------------------------------------------------------------------------------

1.使用git branch命令可以查看到，当前目录下只有一个master分支
2.使用git branch 分支名称创建分支，创建完成后通过git branch可以看到本地已经多出了
  一个新建的分支git branch test  git branch 有两个分支
3.使用git push origin 分支名  命令将本地的修改推送到远程服务器上
  git push origin test 

 放弃单个文件修改,注意不要忘记中间的"--",不写就成了检出分支了!
git checkout -- filepathname
 放弃所有的文件修改
git checkout . 

git checkout命令用于切换分支

## 提交时发生冲突，你能解释冲突是如何产生的吗？你是如何解决的？

开发过程中，我们都有自己的特性分支，所以冲突发生的并不多，但也碰到过。诸如公共类的公共方法，我和别人同时修改同一个文件，他提交后我再提交就会报冲突的错误。
发生冲突，在IDE里面一般都是对比本地文件和远程分支的文件，然后把远程分支上文件的内容手工修改到本地文件，然后再提交冲突的文件使其保证与远程分支的文件一致，这样才会消除冲突，然后再提交自己修改的部分。特别要注意下，修改本地冲突文件使其与远程仓库的文件保持一致后，需要提交后才能消除冲突，否则无法继续提交。必要时可与同事交流，消除冲突。
发生冲突，也可以使用命令。

通过git stash命令，把工作区的修改提交到栈区，目的是保存工作区的修改；
通过git pull命令，拉取远程分支上的代码并合并到本地分支，目的是消除冲突；
通过git stash pop命令，把保存在栈区的修改部分合并到最新的工作空间中；

## git pull 和git fetch

![img](http://kmknkk.oss-cn-beijing.aliyuncs.com/image/git.jpg)



可以简单的概括为：

`git fetch`是将远程主机的最新内容拉到本地，用户在检查了以后决定是否合并到工作本机分支中。

而`git pull` 则是将远程主机的最新内容拉下来后直接合并，即：`git pull = git fetch + git merge`，这样可能会产生冲突，需要手动解决。

# 六、其它

## 网站性能优化

   1、http请求方面，减少请求数量，请求体积，对应的做法是，对项目资源进行压缩，控制项目资源的dns解析在2到4个域名，提取公告的样式，公共的组件，雪碧图，缓存资源，

   2、压缩资源，提取公共资源压缩，提取css ,js公共方法

   3、不要缩放图片，使用雪碧图，使用字体图表(阿里矢量图库)

   4、使用CDN，抛开无用的cookie

   5、减少重绘重排，CSS属性读写分离，最好不要用js修改样式，dom 离线更新，渲染前指定,图片的大小

   6、js代码层面的优化，减少对字符串的计算,合理使用闭包，首屏的js资源加载放在最底部  

## 项目优化

##### 1、v-for 遍历必须为 item 添加 key，且避免同时使用 v-if

##### 2、v-if 和 v-show 区分使用场景

v-if是 真正 的条件渲染，因为它会确保在切换过程中条件块内的事件监听器和子组件适当地被销毁和重建；也是惰性的：如果在初始渲染时条件为假，则什么也不做——直到条件第一次变为真时，才会开始渲染条件块。

**v-show**就简单得多， 不管初始条件是什么，元素总是会被渲染，并且只是简单地基于 CSS 的 display 属性进行切换。

所以，*v-if* 适用于在运行时很少改变条件，不需要频繁切换条件的场景；*v-show*则适用于需要非常频繁切换条件的场景。

##### 3、computed 和 watch 区分使用场景

**computed：** 是计算属性，依赖其它属性值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed  的值；

**watch：** 更多的是「观察」的作用，类似于某些数据的监听回调 ，每当监听的数据变化时都会执行回调进行后续操作

##### 4、长列表性能优化

Vue 会通过 Object.defineProperty 对数据进行劫持，来实现视图响应数据的变化，然而有些时候我们的组件就是纯粹的数据展示，不会有任何改变，我们就不需要 Vue 来劫持我们的数据，在大量数据展示的情况下，这能够很明显的减少组件初始化的时间，那如何禁止 Vue 劫持我们的数据呢？可以通过 Object.freeze 方法来冻结一个对象，一旦被冻结的对象就再也不能被修改了。

##### 5、图片资源懒加载：Vue 的 vue-lazyload 插件

##### 6、路由懒加载

##### 7、第三方插件的按需引入



；

react路由懒加载是loadable插件

## web项目性能优化

1、压缩源码和图片
JavaScript文件源代码可以采用混淆压缩的方式，CSS文件源代码进行普通压缩，JPG图片可以根据具体质量来压缩为50%到70%，PNG可以使用一些开源压缩软件来压缩，比如24色变成8色、去掉一些PNG格式信息等。

2、选择合适的图片格式
如果图片颜色数较多就使用JPG格式，如果图片颜色数较少就使用PNG格式，如果能够通过服务器端判断浏览器支持WebP，那么就使用WebP格式和SVG格式。

3、合并静态资源
包括CSS、JavaScript和小图片，减少HTTP请求。有很大一部分用户访问会因为这一条而取得最大受益

4、开启服务器端的Gzip压缩
这对文本资源非常有效，对图片资源则没那么大的压缩比率。

5、使用CDN
或者一些公开库使用第三方提供的静态资源地址（比如jQuery、normalize.css）。一方面增加并发下载量，另一方面能够和其他网站共享缓存。

6、延长静态资源缓存时间
这样，频繁访问网站的访客就能够更快地访问。不过，这里要通过修改文件名的方式，确保在资源更新的时候，用户会拉取到最新的内容。

7、把CSS放在页面头部，把JavaScript放在页面底部
这样就不会阻塞页面渲染，让页面出现长时间的空白。

## 性能优化

- 编码阶段

> 1. 尽量减少data中的数据，data中的数据都会增加getter和setter，会收集对应的watcher
> 2. v-if和v-for不能连用
> 3. 如果需要使用v-for给每项元素绑定事件时使用事件代理
> 4. SPA 页面采用keep-alive缓存组件
> 5. 在更多的情况下，使用v-if替代v-show
> 6. key保证唯一
> 7. 使用路由懒加载、异步组件
> 8. 防抖、节流
> 9. 第三方模块按需导入
> 10. 长列表滚动到可视区域动态加载
> 11. 图片懒加载

- SEO优化

> 1. 预渲染
> 2. 服务端渲染SSR

- 打包优化

> 1. 压缩代码
> 2. Tree Shaking/Scope Hoisting
> 3. 使用cdn加载第三方模块
> 4. 多线程打包happypack----不常用
> 5. splitChunks抽离公共文件
> 6. sourceMap优化

- 用户体验

> 1. 骨架屏
> 2. PWA---不常用
> 3. 客户端缓存、服务端缓存

## get与post 通讯的区别

   1、Get 请求能缓存，Post 不能

   2、Post 相对 Get 安全一点点，因为Get 请求都包含在 URL 里，且会被浏览器保存历史纪录，Post 不会，但是在抓包的情况下都是一样的。

   3、Post 可以通过 request body来传输比 Get 更多的数据，Get 没有这个技术

   4、URL有长度限制，会影响 Get 请求，但是这个长度限制是浏览器规定的，不是 RFC 规定的

   5、Post 支持更多的编码类型且不对数据类型限制  

## webpack的原理和机制，怎么实现的

1. 解析webpack配置参数，合并从shell传入和webpack.config.js文件里配置的参数，生产最后的配置结果。

2. 注册所有配置的插件，好让插件监听webpack构建生命周期的事件节点，以做出对应的反应。

3. 从配置的entry入口文件开始解析文件构建AST语法树，找出每个文件所依赖的文件，递归下去。

4. 在解析文件递归的过程中根据文件类型和loader配置找出合适的loader用来对文件进行转换。

5. 递归完后得到每个文件的最终结果，根据entry配置生成代码块chunk。

6. 输出所有chunk到文件系统。

   

## webpack

把项目当做一个整体，通过一个给定的主文件（如index.js），webpack将从这个文件开始找到项目的所有依赖文件，使用loader处理他们，最后打包为一个浏览器可识别的javascript文件

Webpack是一个模块打包工具，在webpack里面一切皆模块通过loader转换文件，通过plugin注入钩子，最后输出有多个模块组合成的文件。

##### Loaders

loader是webpack中最强大的一个特性。使用不同的loader，就可以实现不同的功能。

css-loader  实现css的模块化开发

less-loader         less的编译

vue-loader          vue的单文件组件

babel-loader      es6转es5的功能

### 什么是loader, 什么是plugin, 两者的不同

概念：

- loader：模块转换器。用于把模块原内容按照需求转换成新内容。通过使用不同的Loader，Webpack可以要把不同的文件都转成JS文件,比如CSS、ES6/7、JSX等
- plugin：扩展插件。在 Webpack 构建流程中的特定时机注入扩展逻辑来改变构建结果或做你想要的事情，一个插件是含有apply方法的一个对象，通过这个方法可以参与到整个webpack打包的各个流程

不同：

- loader是使webpack拥有加载和解析非js文件的能力
- plugin 可以扩展webpack的功能，使得webpack更加灵活。可以在构建的过程中通过Webpack的api改变输出的结果

> loader是用来对模块的源代码进行转换,而plugin目的在于解决 loader 无法实现的其他事，因为plugin可以在任何阶段调用,能够跨Loader进一步加工Loader的输出

----------------------------------------------------------------------------------------------------------------------------------------------

webpack 本质上是一个打包工具，它会根据代码的内容解析模块依赖，帮助我们把多个模块的代码打包：

![img](file:///C:\Users\hp\AppData\Local\Temp\msohtmlclip1\01\clip_image002.gif)

 

如上图，webpack 会把我们项目中使用到的多个代码模块（可以是不同文件类型），打包构建成项目运行仅需要的几个静态文件。webpack 有着十分丰富的配置项，提供了十分强大的扩展能力，可以在打包构建的过程中做很多事情。

## 浅拷贝和深拷贝的问题

1. 深拷贝和浅拷贝是只针对Object和Array这样的复杂类型的

2. 也就是说a和b指向了同一块内存，所以修改其中任意的值，另一个值都会随之变化，这就是浅拷贝

3. 浅拷贝， ”Object.assign() 方法用于将所有可枚举的属性的值从一个或多个源对象复制到目标对象。它将返回目标对象

4. 深拷贝，JSON.parse()和JSON.stringify()给了我们一个基本的解决办法。但是函数不能被正确处理 

5. 浅拷贝：

   a. 概念：浅拷贝只复制指向某个对象的指针，而不复制对象本身，新旧对象还是共享同一块内存。修改时原对象也会受到影响。

   b. 方法：

   - 利用 = 赋值操作符实现浅拷贝。
   - 数组的浅拷贝一般使用 slice、concat。
   - 数组浅拷贝 - 遍历 。
   - 对象浅拷贝 - Object.assign()。
   - 对象浅拷贝 - 扩展运算符

   深拷贝：

   a. 概念：深拷贝就是在拷贝数据的时候，将数据的所有引用结构都拷贝一份。简单的说就是，在内存中存在两个数据结构完全相同又相互独立的数据，将引用型类型进行复制，而不是只复制其引用关系。修改时原对象不再受到任何影响。

   b. 方法：

   - 利用 JSON 对象中的 parse 和 stringify。

- 利用递归来实现每一层都重新创建对象并赋值。

  #### 数组实现深拷贝：

  - （1）for循环实现数组的深拷贝

  - （2）concat 方法实现数组的深拷贝

  - （3）slice() 方法可从已有的数组中返回选定的元素。

  - （4）ES6扩展运算符实现数组的深拷贝

  


## cookies，sessionStorage和localstorage区别

  相同点：都存储在客户端

  不同点：

​     1.存储大小

​          · cookie数据大小不能超过4k。

​          · sessionStorage和localStorage 虽然也有存储大小的限制，但比cookie大得多，可以达到5M或更大。

​     2.有效时间

​          · localStorage 存储持久数据，浏览器关闭后数据不丢失除非主动删除数据；

​          · sessionStorage 数据在当前浏览器窗口关闭后自动删除。

​          · cookie 设置的cookie过期时间之前一直有效，即使窗口或浏览器关闭

​     3.数据与服务器之间的交互方式

​          · cookie的数据会自动的传递到服务器，服务器端也可以写cookie到客户端

​          · sessionStorage和localStorage不会自动把数据发给服务器，仅在本地保存。





## watch

监听

watch函数的参数中，第一个是改变之前的值，第二个是改变之后的值， 这两个参数非常有用。

这里分别使用了 三种定义函数（或option）的方法。

如果要观察data下一个对象的属性，我们可以使用 '对象.属性' 的方式， 注意： 一定要要引号。

如果改变了一个对象的属性，就必须使用 deep: true， 否则检测不到变化。

## 说说原型（prototype）、原型链和原型继承

### 一、原型 `prototype` 和 `__proto__`

##### 原型(prototype): 一个简单的对象，用于实现对象的 属性继承

- 每个对象都有一个`__proto__`属性，并且指向它的`prototype`原型对象

- 每个构造函数都有一个`prototype`原型对象

- - `prototype`原型对象里的`constructor`指向构造函数本身

![img](https://pic2.zhimg.com/80/v2-e722d5325f7d4215169f1d04296e0f89_720w.jpg)

**有的同学可能会问`prototype` 和 `__proto__`有什么用呢？**

###### 实例对象的`__proto__`指向构造函数的`prototype`，从而实现继承。

`prototype`对象相当于特定类型所有实例对象都可以访问的公共容器

**原型链如下：**

```
arr ---> Array.prototype ---> Object.prototype ---> null
```

**这就是传说中的原型链，层层向上查找，最后还没有就返回undefined**

## 原型链

当我们在访问一个对象的属性时，如果这个对象内部不存在这个属性，那么他就会去prototype里找这个属性，这个prototype又会有自己的prototype，于是就这样一直找下去，找到Object.__proto__为止，找不到就返回undefined也就是我们平时所说的原型链的概念。

## 作用域与作用域链

- 作用域: 执行上下文中还包含作用域链。作用域其实可理解为该上下文中声明的变量和声明的作用范围。可分为 块级作用域 和 函数作用域( 也可理解为：作用域就是一个独立的地盘，让变量不会外泄、暴露出去。也就是说作用域最大的用处就是隔离变量，不同作   用域下同名变量不会有冲突。)
- 作用域链：作用域链可以理解为一组对象列表，包含 父级和自身的变量对象，因此我们便能通过作用域链访问到父级里声明的变量或者函数。我们知道，我们可以在执行上下文中访问到父级甚至全局的变量，这便是作用域链的功劳。




## 闭包

概念：定义在函数内部的函数。里面的函数可以访问 外面函数的变量，外面的变量的是这个内部函数的一 部分

常见的闭包写法就是简单的函数套函数，通过另一个函数访问这个函数的局部变量,利用闭包可以突破作用域链，将函数内部的变量和方法传递到外部，延续变量的生命。使用闭包可以减少全局环境的污染，也可用延续变量的生命。

作用：1.使用闭包可以访问函数中的变量。2.可以使 变量长期保存在内存中，生命周期比较长。

 缺点：闭包不能滥用，否则会导致内存泄露，影响网 页的性能。

 应用场景：1.函数作为参数传递。2.函数作为返回值

**闭包的适用场景**

闭包的适用场景非常广泛，首先从闭包的优点出发就是： 

防抖节流

**减少全局环境的污染生成独立的运行环境**

模块化就是利用这个特点对不同的模块都有自己独立的运行环境，不会和全局冲突，模块和模块之间通过抛出的接口进行依赖使用

以及像我们常用的jquery类库（避免和全局冲突使用闭包实现自己独立的环境）

**可以通过返回其他函数的方式突破作用域链**

可以利用这个功能做一些值的缓存工作，例如常见的设计模式（单例模式），以及现在比较火的框架vue中的计算属性 

其实当遇到以下场景的时候都可以使用闭包 

1.维护函数内的变量安全,避免全局变量的污染。 

2.维持一个变量不被回收。 

3.封装模块 

**闭包的缺点**

由于闭包会使得函数中的变量都被保存在内存中，内存消耗很大。所以在闭包不用之后，将不使用的局部变量删除，使其被回收。在IE中可能导致内存泄露，即无法回收驻留在内存中的元素，这时候需要手动释放。 

## 跨域

1、 通过jsonp跨域
2、 document.domain + iframe跨域

```
module.exports={
    devServer:{
        open:true,
        proxy:{
            "/api":{
                target:"http://localhost:7001/",
                ws:true,
                changeOrigin:true,
                pathRewrite:{
                    "^/api":""
                }
            }
        }
    }
}
```

## 防抖和节流

#### 防抖(debounce)

所谓防抖，就是指触发事件后在n秒内函数只能执行一次,如果在n秒内又触发了事件,则重新计算函数执行时间。
防抖函数分为非立即执行版和立即执行版.

防抖 (debounce): 将多次高频操作优化为只在最后一次执行，通常使用的场景是：用户输入，只需再输入完成后做一次输入校验即可。

**原理**：将若干函数调用合成为一次，并在给定时间过去之后，或者连续事件完全触发完成之后，调用一次(仅仅只会调用一次！！！！！！！！！！)。

举个栗子：滚动scroll事件，不停滑动滚轮会连续触发多次滚动事件，从而调用绑定的回调函数，我们希望当我们停止滚动的时，才触发一次回调，这时可以使用函数防抖。


#### 节流(throttle)

所谓节流，就是指连续触发事件但是在n秒中只执行-次函数。节流会稀释函数的执行频率。
对于节流，一般有两种方式可以实现，分别是时间戳版和定时器版。

节流(throttle): 每隔一段时间后执行一次，也就是降低频率，将高频操作优化成低频操作，通常使用场景: 滚动条事件 或者 resize 事件，通常每隔 100~500 ms执行一次即可。

**原理**：当达到了一定的时间间隔就会执行一次；可以理解为是**缩减执行频率**

## 回流和重绘

#### 什么是回流（重排）

当render tree中的一部分(或全部)因为元素的规模尺寸，布局，隐藏等改变而需要重新构建。这就称为回流(reflow)。每个页面至少需要一次回流，就是在页面第一次加载的时候，这时候是一定会发生回流的，因为要构建render tree。在回流的时候，浏览器会使渲染树中受到影响的部分失效，并重新构造这部分渲染树，完成回流后，浏览器会重新绘制受影响的部分到屏幕中，该过程成为重绘。

#### 什么是重绘

当render tree中的一些元素需要更新属性，而这些属性只是影响元素的外观，风格，而不会影响布局的，比如background-color。则就叫称为重绘。

#### 区别：

他们的区别很大：
 回流必将引起重绘，而重绘不一定会引起回流。比如：只有颜色改变的时候就只会发生重绘而不会引起回流
 当页面布局和几何属性改变时就需要回流
 比如：添加或者删除可见的DOM元素，元素位置改变，元素尺寸改变——边距、填充、边框、宽度和高度，内容改变



## 宏任务和微任务

![img](https://img-blog.csdn.net/20180411202638415?watermark/2/text/aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L2xjMjM3NDIzNTUx/font/5a6L5L2T/fontsize/400/fill/I0JBQkFCMA==/dissolve/70)

宏任务：

- setTimeout

- setInterval

  

微任务：Promise.then()

## http缓存

https://www.jianshu.com/p/227cee9c8d15

https://blog.csdn.net/jutal_ljt/article/details/80021545

#### 一、什么是HTTP缓存 ？

http缓存指的是: 当客户端向服务器请求资源时，会先抵达浏览器缓存，如果浏览器有“要请求资源”的副本，就可以直接从浏览器缓存中提取而不是从原始服务器中提取这个资源。

强制缓存，协商缓存

**1.1、强制缓存**
 强制缓存在缓存数据未失效的情况下（即Cache-Control的max-age没有过期或者Expires的缓存时间没有过期），那么就会直接使用浏览器的缓存数据，不会再向服务器发送任何请求。强制缓存生效时，http状态码为200。这种方式页面的加载速度是最快的，性能也是很好的，但是在这期间，如果服务器端的资源修改了，页面上是拿不到的，因为它不会再向服务器发请求了。这种情况就是我们在开发种经常遇到的，比如你修改了页面上的某个样式，在页面上刷新了但没有生效，因为走的是强缓存，所以Ctrl + F5一顿操作之后就好了。 跟强制缓存相关的header头属性有（Pragma/Cache-Control/Expires）

**1.2、协商缓存**
 当第一次请求时服务器返回的响应头中没有Cache-Control和Expires或者Cache-Control和Expires过期还或者它的属性设置为no-cache时(即不走强缓存)，那么浏览器第二次请求时就会与服务器进行协商，与服务器端对比判断资源是否进行了修改更新。如果服务器端的资源没有修改，那么就会返回304状态码，告诉浏览器可以使用缓存中的数据，这样就减少了服务器的数据传输压力。如果数据有更新就会返回200状态码，服务器就会返回更新后的资源并且将缓存信息一起返回。跟协商缓存相关的header头属性有（ETag/If-Not-Match 、Last-Modified/If-Modified-Since）请求头和响应头需要成对出现





## http状态码



### 2开头的http状态码

表示请求成功

**200   成功处理了请求，一般情况下都是返回此状态码； **
201   请求成功并且服务器创建了新的资源。 
202   接受请求但没创建资源； 
203   返回另一资源的请求； 
204   服务器成功处理了请求，但没有返回任何内容；
205   服务器成功处理了请求，但没有返回任何内容；
206   处理部分请求；

### 3xx （重定向） 

重定向代码，也是常见的代码

300  （多种选择） 针对请求，服务器可执行多种操作。 服务器可根据请求者 (user agent) 选择一项操作，或提供操作列表供请求者选择。 
301  （永久移动） 请求的网页已永久移动到新位置。 服务器返回此响应（对 GET 或 HEAD 请求的响应）时，会自动将请求者转到新位置。 
**302  表示重定向**（临时移动） 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。
303  （查看其他位置） 请求者应当对不同的位置使用单独的 GET 请求来检索响应时，服务器返回此代码。 
**304     浏览器缓存的资源，使用缓存**（未修改） 自从上次请求后，请求的网页未修改过。 服务器返回此响应时，不会返回网页内容。 
305  （使用代理） 请求者只能使用代理访问请求的网页。 如果服务器返回此响应，还表示请求者应使用代理。 
307  （临时重定向） 服务器目前从不同位置的网页响应请求，但请求者应继续使用原有位置来进行以后的请求。

### 4开头的http状态码表示请求出错

400   服务器不理解请求的语法。 
**401  请求要求身份验证。 对于需要登录的网页，服务器可能返回此响应。 **
**403  服务器拒绝请求。没有权限** 
**404  服务器找不到请求的网页。 表示访问内容不存在**
405  禁用请求中指定的方法。 
406  无法使用请求的内容特性响应请求的网页。 
407  此状态代码与 401类似，但指定请求者应当授权使用代理。 
408  服务器等候请求时发生超时。 
409  服务器在完成请求时发生冲突。 服务器必须在响应中包含有关冲突的信息。 
410  如果请求的资源已永久删除，服务器就会返回此响应。 
411  服务器不接受不含有效内容长度标头字段的请求。 
412  服务器未满足请求者在请求中设置的其中一个前提条件。 
413  服务器无法处理请求，因为请求实体过大，超出服务器的处理能力。 
414  请求的 URI（通常为网址）过长，服务器无法处理。 
415  请求的格式不受请求页面的支持。 
416  如果页面无法提供请求的范围，则服务器会返回此状态代码。 
417  服务器未满足”期望”请求标头字段的要求。

###   5开头状态码并不常见，但是我们应该知道

**500  （服务器内部错误） 服务器遇到错误，无法完成请求。 **
501  （尚未实施） 服务器不具备完成请求的功能。 例如，服务器无法识别请求方法时可能会返回此代码。 
502  （错误网关） 服务器作为网关或代理，从上游服务器收到无效响应。 
503  （服务不可用） 服务器目前无法使用（由于超载或停机维护）。 通常，这只是暂时状态。 
504  （网关超时） 服务器作为网关或代理，但是没有及时从上游服务器收到请求。 
505  （HTTP 版本不受支持） 服务器不支持请求中所用的 HTTP 协议版本。

## mixins

混入 (mixins)： 是一种分发 Vue 组件中可复用功能的非常灵活的方式。混入对象可以包含任意组件选项。当组件使用混入对象时，所有混入对象的选项将被混入该组件本身的选项。

#### 怎么用？

- 定义一个混入对象

![img](https://img2018.cnblogs.com/blog/1141519/201811/1141519-20181109204130183-699489525.png)

把混入对象混入到当前的组件中

![img](https://img2018.cnblogs.com/blog/1141519/201811/1141519-20181109204137632-1316363889.png)

## mixins与vuex的区别

经过上面的例子之后，他们之间的区别应该很明显了哈~

- vuex：用来做状态管理的，里面定义的变量在每个组件中均可以使用和修改，在任一组件中修改此变量的值之后，其他组件中此变量的值也会随之修改。
- Mixins：可以定义共用的变量，在每个组件中使用，引入组件中之后，各个变量是相互独立的，值的修改在组件中不会相互影响。

## RBAC：

基于策略的权限控制

角色访问权限

RBAC是Role Based Access Control的英文缩写，意思是基于角色访问控制。

**RBAC0**
RBAC0是RBAC96模型家族中的基础，也称作核心部分，RBAC1、RBAC2和RBAC3是在此基础之上发展演变而来。

可以理解它是由四个部分组成：用户、角色、会话、权限
这就导致了这种分配关系是多对多：用户对应多个角色、角色对应多个权限。
用户与会话一对一，会话与角色一对多

**RBAC1**
RBAC1是在RBAC0模型基础之上增加了角色分层概念和角色之间的继承关系。

角色分层指的是同一个角色可以用不同等级，不同等级又对应着不同的权限；
角色继承关系指的是子角色可以对父角色的权限进行继承，但是子角色的权限一定小于父角色。

**RBAC2**
RBAC2是在RBAC0模型基础之上增加了角色约束，主要约束哪些操作是可进行，哪些是不可进行。

主要约束有以下三个方面：

角色互斥约束：是指在系统运行中,只可以同时激活运行时互斥角色集合中的一个角色;
角色基数约束：是限制某一个用户最多被分配或者激活的角色数目,或者限制某一个角色最多被赋予的权限数目;
先决条件角色约束：是指某些用户只有在己经拥有特定角色的前提下,才能被分配到某种角色,或者某种角色只有在已经被分配到特定权限的前提下,才能被赋予某些权限
**RBAC3**
RBAC3则是集聚了RBAC1和RBAC2的全部特点,同时将角色继承关系和约束条件关系两者都融入到模型中。

## axios是什么？

请求后台资源的模块

## 服务端渲染 SSR or 预渲染

服务端渲染是指 Vue 在客户端将标签渲染成的整个 html 片段的工作在服务端完成，服务端形成的 html 片段直接返回给客户端这个过程就叫做服务端渲染。
 **1.服务端渲染的优点：**
 更好的 SEO： 因为 SPA 页面的内容是通过 Ajax 获取，而搜索引擎爬取工具并不会等待 Ajax 异步完成后再抓取页面内容，所以在 SPA 中是抓取不到页面通过 Ajax 获取到的内容；而 SSR 是直接由服务端返回已经渲染好的页面（数据已经包含在页面中），所以搜索引擎爬取工具可以抓取渲染好的页面；
 更快的内容到达时间（首屏加载更快）： SPA 会等待所有 Vue 编译后的 js 文件都下载完成后，才开始进行页面的渲染，文件下载等需要一定的时间等，所以首屏渲染需要一定的时间；SSR 直接由服务端渲染好页面直接返回显示，无需等待下载 js 文件及再去渲染等，所以 SSR 有更快的内容到达时间；
 **2.服务端渲染的缺点：**
 更多的开发条件限制： 例如服务端渲染只支持 beforCreate 和 created 两个钩子函数，这会导致一些外部扩展库需要特殊处理，才能在服务端渲染应用程序中运行；并且与可以部署在任何静态文件服务器上的完全静态单页面应用程序 SPA 不同，服务端渲染应用程序，需要处于 Node.js server 运行环境；
 更多的服务器负载：在 Node.js 中渲染完整的应用程序，显然会比仅仅提供静态文件的 server 更加大量占用CPU 资源，因此如果你预料在高流量环境下使用，请准备相应的服务器负载，并明智地采用缓存策略。
 如果你的项目的 SEO 和 首屏渲染是评价项目的关键指标，那么你的项目就需要服务端渲染来帮助你实现最佳的初始加载性能和 SEO。如果你的 Vue 项目只需改善少数营销页面（例如  /products， /about， /contact 等）的 SEO，那么你可能需要预渲染，在构建时 (build time) 简单地生成针对特定路由的静态 HTML 文件。优点是设置预渲染更简单，并可以将你的前端作为一个完全静态的站点，具体你可以使用 prerender-spa-plugin 就可以轻松地添加预渲染 。

优点：

- SSR有着更好的SEO
- 首屏加载速度更快

缺点：

- 开发条件会受到限制
- 服务器端渲染只支持beforeCreate和created两个钩子，当我们需要一些外部扩展库时需要特殊处理，服务端渲染应用程序也需要处于Node.js的运行环境。
- 服务器会有更大的负载需求。

## 什么叫优雅降级和渐进增强？

**优雅降级**：Web站点在所有新式浏览器中都能正常工作，如果用户使用的是老式浏览器，则代码会针对旧版本的IE进行降级处理了,使之在旧式浏览器上以某种形式降级体验却不至于完全不能用。
如：border-shadow 

**渐进增强**：从被所有浏览器支持的基本功能开始，逐步地添加那些只有新版本浏览器才支持的功能,向页面增加不影响基础浏览器的额外样式和功能的。当浏览器支持时，它们会自动地呈现出来并发挥作用。 
如：默认使用flash上传，但如果浏览器支持 HTML5 的文件上传功能，则使用HTML5实现更好的体验；

## 常见的浏览器兼容性问题：

1、不同浏览器的标签默认的外补丁( margin )和内补丁(padding)不同
解决方案： css 里增加通配符 * { margin: 0; padding: 0; }

2、IE6双边距问题；在 IE6中设置了float , 同时又设置margin , 就会出现边距问题
解决方案：设置display:inline;

3、当标签的高度设置小于10px，在IE6、IE7中会超出自己设置的高度
解决方案：超出高度的标签设置overflow:hidden,或者设置line-height的值小于你的设置高度

4、图片默认有间距
解决方案：使用float 为img 布局

5、IE9一下浏览器不能使用opacity
解决方案：
opacity: 0.5;filter: alpha(opacity = 50);filter: progid:DXImageTransform.Microsoft.Alpha(style = 0, opacity = 50);

6、边距重叠问题；当相邻两个元素都设置了margin 边距时，margin 将取最大值，舍弃最小值；
解决方案：为了不让边重叠，可以给子元素增加一个父级元素，并设置父级元素为overflow:hidden；

7、cursor:hand 显示手型在safari 上不支持
解决方案：统一使用 cursor:pointer

8、两个块级元素，父元素设置了overflow:auto；子元素设置了position:relative ;且高度大于父元素，在IE6、IE7会被隐藏而不是溢出；
解决方案：父级元素设置position:relative

## 懒加载的原理及实现

#### 1.懒加载概念

对于页面有很多静态资源的情况下（比如网商购物页面），为了节省用户流量和提高页面性能，可以在用户浏览到当前资源的时候，再对资源进行请求和加载。

#### 2.懒加载实现原理

##### 2.1监听onscroll事件判断资源位置

首先为所有懒加载的静态资源添加自定义属性字段，比如如果是图片，可以指定data-src为真实的图片地址，src指向loading的图片。
然后当资源进入视口的时候，将src属性值替换成data-src的值。
可以使用元素的getBoundingRect().top判断是否在视口内，也可以使用元素距离文档顶部的距离offsetTop和scrollTop是否小于视口高度来判断：

## 移动端的 click 有300 ms的延时原因：

在移动端触发时间会按照 touchstart，touchmove，touchend，click 顺序触发；触发touchend，click之间会有200-400不等的时间延时（因为移动端需要判断用户是不是想要进行双击）；
fastclick 和 zepto 的tap 事件 都可以解决 300 ms延时；
fastclick 原理：是在检测到touchend事件的时候，会通过DOM自定义事件立即出发模拟一个click事件，并把浏览器在300ms之后的click事件阻止掉。
tap 原理：在touchstart 时会记录一个值x1，y1，在touchend时会记录x2，y2，通过对比着几个值，判断用户是否是点击事件，而不是滑动事件，然后直接触发事件；
注意：fastclick 在ios 上会影响元素自动触发，比如 直接click()；会拦截第一次，需要执行两次click()；才会触发；安卓上不需要；

## chrome--浏览器调试工具详解

![面板](https://img-blog.csdnimg.cn/20190112223223295.png)

1.定位小箭头按钮(左边第一个)：
选中Elements面板，并启动该按钮，可以在页面中定位相应元素的源代码位置，或者选择源代码位置可定位到页面相应的元素。
2.手机-PC视图切换按钮(左边第二个)：
启动该按钮，网页可以在pc网址网页和手机网址网页之间进行转换。由于在爬虫过程中，爬取手机网址网页相对来说更容易，所以可以通过该按钮将网页切换至移动网页实现更快速爬取操作。(例如新浪微博)
3.Elements面板
该面板显示了渲染完毕后的全部HTML源代码，在使用selenium爬取网页时可通过这些源代码找到各标签的位置，属性等特征。更重要的是，双击html源码或者右侧的css，可以更改网页外观，即可以对静态网页进行调试。
4.Console面板
该面板用来显示网页加载过程中的日志信息，包括打印，警告，错误及其他可显示的信息等。同时它也是一个js交互控制台。
.Sources面板
该面板以站点为分组，存放着请求下来的所有资源(html,css,jpg,gif,js等)。正是因为该面板存放了所有的资源，因此在调试js时，目标代码都是在此处寻找的。
该面板也提供了调试按钮工具。
6.Network面板
Network面板记录了网络请求的详细信息，包括请求头，响应头，表单数据，参数信息等等，只要是做爬虫的这个面板必须要了解。

![network](https://img-blog.csdnimg.cn/20190112231304182.png)

红色圆圈内代表的是请求的不同类型的数据，其中XHR表示ajax请求，即异步请求，在爬虫中最重要的是分析该项。Doc表示的是html文档类型。其他几个不是很重要不详细讲解。
若要保留请求记录，勾选上preserve log选项。

## XSS攻击

1.XSS攻击：指的是跨脚本攻击，指的是攻击者在网页中嵌套，恶意脚本程序，当用户打开网页时，程序开始在浏览器上启动，盗取用户的cooks，从而盗取密码等信息，下载执行木马程序。

解决方法：XSS之所以会发生,是因为用户输入的数据变成了代码。因此,我们需要对用户输入的数据进行HTML转义处理,将其中的“尖括号”、“单引号”、“引号” 之类的特殊字符进行转义编码。



## 前端面试：区分XSS和CSRF

xss：跨站点攻击。xss攻击的主要目的是想办法获取目标攻击网站的cookie，因为有了cookie相当于有了session，有了这些信息就可以在任意能接进互联网的PC登陆该网站，并以其他人的身份登陆做破坏。预防措施防止下发界面显示html标签，把</>等符号转义。

csrf：跨站点伪装请求。csrf攻击的主要目的是让用户在不知情的情况下攻击自己已登录的一个系统，类似于钓鱼。如用户当前已经登陆了邮箱或bbs，同时用户又在使用另外一个，已经被你控制的网站，我们姑且叫它钓鱼网站。这个网站上面可能因为某个图片吸引你，你去点击一下，此时可能就会触发一个js的点击事件，构造一个bbs发帖的请求，去往你的bbs发帖，由于当前你的浏览器状态已经是登陆状态，所以session登陆cookie信息都会跟正常的请求一样，纯天然的利用当前的登陆状态，让用户在不知情的情况下，帮你发帖或干其他事情。预防措施，请求加入随机数，让钓鱼网站无法正常伪造请求。

## new 具体干了什么事创建出来了对象

  new 一个构造函数,生成一个对象--总体发生了四件事
 1:在内存中生成一个空对象;
 2:空对象的__proto__被构造函数prototype赋值;
 3:运行构造函数,同时通过call,apply改变构造函数内部this指向;
 4:检查构造函数运行的返回值,如果返回的是对象---会把第一步生成的空对象扔掉,
   如果返回的是基本数据类型,会无视掉,并把第一步生成的对象给返回;

## 输入完网址按下回车,到看到网页这个过程中发生了什么?

1.域名解析

2.发起TCP3次握手

3.建立TCP连接后发起http请求

4.服务器端响应http请求,浏览器得到HTML代码

5.浏览器解析HTML代码，并请求HTML代码中的资源

6.浏览器对页面进行渲染呈现给用户



####  delete接口 axios的时候传参有问题

写项目过程中，测试delete的一个接口，有的接口能正常传参，有的接口却不行，后来看了下delete的源码 ，发现 delete 和 post 、put 的参数不一样。post、put都有三个参数，url、data和config，而delete只有两个参数，第一个是url，第二个是config，post 和 put 第二个参数是data，所以可以直接在第二个参数的位置写上数据，后台可以访问到，而delete第二个参数是 config ，所以要通过 config 里面的 data 来传参，如果不写，后台没解析的话，就接收不到。