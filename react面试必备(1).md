## react 生命周期函数

- 初始化阶段：
  - constructor:获取实例的默认属性和初始化状态
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

### react 的生命周期理解

 可以说他有 11 个，也可说他有 10 个
 有 3 个阶段
 实例化，存在期，销毁期

 ***实例化***：

 props的实例化，state的实例化， componentWillMount 渲染前
 （修改 state 的最后一次机会）， *render*（渲染）， componentDidMount（渲染后，
 首次可以访问到 dom）
 在实例化阶段除了 *render* 生命周期外，其它的生命周期只会执行一次

 ***存在期***
 componentWillReceiveProps 当 **props** 值发生变化就会执行
 shouldComponentUpdate 可以用来确认组件的更新，通过返回布尔值来确定组件是否重新渲染
 componentWillUpdate 更新前
 *render* 更新
 compoentDidUpdate 更新后

 ***销毁期***
 componentWillUnmount 销毁

**二. 由于未来采用异步渲染机制，所以即将在17版本中去掉的生命周期钩子函数**

- componentWillMount
- componentWillRecieveProps
- componentWIllUpdate

**三. 新增两个**

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

 可以修改 **state** 的生命周期
 componentWillMount， componentDidMount, componentWillReceiveProps,
 shouldComponentUpdate, compoentDidUpdate

## react中组件传值

父传子（组件嵌套浅）：父组件定义一个属性，子组件通过this.props接收。

可以使用prop-types  来验证props的类型，设置默认值;

子传父：父组件定义一个属性，并将一个回调函数赋值给定义的属性，然后子组件进行调用传过来的函数， 并将参数传进去，在父组件的回调函数中即可获得子组件传过来的值。

兄弟组件传值:

1.通过状态提升原则，把状态定义到共同的父级组件里面，再通过子传父，父传子的形式来进行

2.通过发布订阅模式 封装类似于vue里面bus方式，$on,$emit方法来进行传递

```
const event ={}
//就是一个字符串，对应一组回调函数
//callback就是事件对象的回调函数
//传值的一方用$emit,接收值得一方用$on
export const $on=(eventName,callback)=>{  //eventName就是事件名
    if(!event[eventName]){  //用自定义事件建立一个数组
        event[eventName] =[]
    }
    event[eventName].push(callback)
}

export const $emit =(eventName,data)=>{
    if(!event[eventName]) return;
    event[eventName].forEach((cb)=>{  
        //用这个字符串，找到存储回到函数的数组，并依次执行数组里的回调函数
        cb(data);
    })
}

export const $off=(eventName,callback)=>{
    if(!callback){  //不传回调，把所有的这个事件对应的回调都清掉
        event[eventName]=null;
    }
    else{  //只清除这个事件，这个回调函数
        event[eventName]=event[eventName].filter((cb)=>{
            return cb!==callback
        })
    }
}
```

跨级组件传值利用context

![1600098254846](C:\Users\。\AppData\Roaming\Typora\typora-user-images\1600098254846.png)

```
context基本使用
import React,{Component,createContext} from 'react';
创建一个context
let BetteryContext=createContext();
class Middle extends Component{
  render(){
     return (
       <Leaf></Leaf>
     )
  }
}
class App extends Component{
  state={
    battery:60
  }
  render(){
    let {battery} = this.state;
    return (
      通过provider来提供一个可传递的value值
      <BetteryContext.Provider value={battery}>
       <button onClick={()=>{this.setState({battery:battery-1})}}>点击变化</button>
        <Middle></Middle>
      </BetteryContext.Provider>
   );
  }
}
class Leaf extends Component{
  render(){
    return (
      // 在这里面不能直接渲染其他组件而是要声明一个函数,
      // 函数的参数就是传递过来的context的值;
      <BetteryContext.Consumer>
        {
          battery =><h1>battery:{battery}</h1>
        }
      </BetteryContext.Consumer>
    )
  }
}
export default App;
```

```
嵌套使用
import React,{Component,createContext} from 'react';
// 通常是在用单元测试的
let BetteryContext=createContext(100);
let OnlineContext=createContext();
class Middle extends Component{
  render(){
     return (
       <Leaf></Leaf>
     )
  }
}
class App extends Component{
  state={
    battery:60,
    online:false
  }
  render(){
    let {battery,online} = this.state;
    return (
      // <BetteryContext.Provider value={battery}>
      <OnlineContext.Provider value={online}>
       <button onClick={()=>{this.setState({battery:battery-1})}}>点击变化</button>
       <button onClick={()=>{this.setState({online:!online})}}>点击变化2</button>
        <Middle></Middle>
        </OnlineContext.Provider>
      // </BetteryContext.Provider>
   );
  }
}

class Leaf extends Component{
  render(){
    return (
      // 在这里面不能直接渲染其他组件而是要声明一个函数,
      // 函数的参数就是传递过来的context的值;
      <BetteryContext.Consumer>
        {
          battery =>(
            <OnlineContext.Consumer>
              {
                online=><h1>Battery:{battery},Online:{String(online)}</h1>
              }
            </OnlineContext.Consumer>
          )
        }
      </BetteryContext.Consumer>
    )
  }
}
export default App;
```

contextType的应用

```
import React,{Component,createContext} from 'react';
// 一般在一个组件中最多使用一个context就可以了
//在只有一个context组件中，使用contextype比使用context.Consumer简单的多
let BetteryContext=createContext();
class Middle extends Component{
  render(){
     return (
       <Leaf></Leaf>
     )
  }
}
class App extends Component{
  state={
    battery:60
  }
  render(){
    let {battery,online} = this.state;
    return (
      <BetteryContext.Provider value={battery}>
       <button onClick={()=>{this.setState({battery:battery-1})}}>点击变化</button>
        <Middle></Middle>
      </BetteryContext.Provider>
   );
  }
}
class Leaf extends Component{
  static contextType=BetteryContext;
  render(){
    return (
      <div>
          <h2>{this.context}</h2>
      </div>
    )
  }
}
export default App;
```

##  vue组件之间如何传值通信

   父到子：

​     子组件在props中创建一个属性，用来接收父组件传过来的值；

​     在父组件中注册子组件；    

​     在子组件标签中添加子组件props中创建的属性；  

​     把需要传给子组件的值赋给该属性 

   子到父：

​     子组件中需要以某种方式（如点击事件）的方法来触发一个自定义的事件；

​     将需要传的值作为$emit的第二个参数，该值将作为实参传给响应事件的方法；

​     在父组件中注册子组件并在子组件标签上绑定自定义事件的监听。 

  兄弟组件：

​     利用bus    $emit推送，$on接收

## React 中 keys 的作用是什么？

参考解析:[https://blog.csdn.net/handsomexiaominge/article/details/86560003]

 react为了提升渲染性能，在内部维持了一个虚拟dom，当渲染结构有所变化的时候，会在虚拟dom中先用diff算法先进行一次对比，将所有的差异化解决之后，再一次性根据虚拟dom的变化，渲染到真实的dom结构中。 

key属性的使用，则涉及到diff算法中同级节点的对比策略，当我们指定key值时，key值会作为当前组件的id，diff算法会根据这个id来进行匹配。如果遍历新的dom结构时，发现组件的id在旧的dom结构中存在，那么react会认为当前组件只是位置发生了变化，因此不会将旧的组件销毁重新创建，只会改变当前组件的位置，然后再检查组件的属性有没有发生变化，然后选择保留或修改当前组件的属性，因此我们可以发现如果我们指定了唯一的key值，如果只是打乱了数据源，数据源渲染出来的每一个子组件都是整体数据发生变化，而如果不显式指定key值 , react会把当前组件数据源的index作为默认的key值,动态改变列表的时候，会影响效果展示

- 必须用 key，且不能是 index 和 random
- diff 算法中通过 tag 和 key 判断，是否是同一个节点
- 减少渲染次数，提升渲染性能

## 调用 setState 之后发生了什么？

在代码中调用 setState 函数之后，React 会将**传入的参数对象**与组件**当前的状态**合并，然后触发所谓的调和过程。经过调和过程，React 会以相对高效的方式根据新的状态构建 React 元素树并且着手重新渲染整个 UI 界面。在 React 得到元素树之后，React 会自动计算出新的树与老树的节点差异，然后根据差异对界面进行最小化重渲染。在差异计算算法中，React 能够相对精确地知道哪些位置发生了改变以及应该如何改变，这就保证了按需更新，而不是全部重新渲染。

调用 setState 之后执行**哪些生命周期**
shouldComponentUpdate 如果返回 **true** 就会执行 WillUpdate  render
DidUpdate

## React解决长列表方案

如果一次性获取渲染大量数据，在不能采用分页的业务场景之下，可以采用虚拟列表的方式，只是在可视区域的范围内进行展示，可视区域之外的列表只是显示高度，而不显示内容，可以自己封装，也可以使用**react-virtualized**这个插件 

## react路由懒加载 ----异步组件

可以使用 lazy,和suspense，或者直接使用react-loadable

**lazy和Suspense**使用

```
import React,{Component,lazy,Suspense} from 'react';
// 异步导入About组件
//lazy 传入一个没有参数的函数，函数内部直接使用import指令;
const About = lazy(()=>import (/*webpackChunkName:"about"*/"./About.js"))
//动态导入了，并没有静态导入，lazy的返回就是一个js组件
//直接渲染About会报错，报错表示用lazy加载过程中，会出现一个渲染空挡，
//在这个空挡里面react不知道干什么事，得需要指定
// 怎么指定  用Suspense  专门用来和react配合的;
//用的方式很简单，只需要把异步导入的组件给包起来;
// 直接包起来之后还没完，因为还没有react指定加载的信息;
//需要用到一个属性，叫做fallback---里面传入一段jsx--传入的不是一个组件，而是一个组件类
// 比如有一个Loading组件 直接写不行，要写上<Loading />
class App extends Component{
    state={
        hasError:false
    }
    // 一旦发生错误就会走的一个声明周期用来捕捉错误
    componentDidCatch(){
        this.setState({
            hasError:true
        })
    }
    //一旦发生错误，我就渲染一个不一样的组件
    render(){
        if(this.state.hasError){
            return(
                <div>发生了错误</div>
            )
        }
        return (
          <div>
              <Suspense fallback={<div>loading...</div>}>
              <About></About>
              </Suspense>
          </div>    
        )
    }
}
// 这样成功之后，可以在network里面进行查看,也可以指定名字 /*webpackChunkName:"about"*/;
// 点击block request url  页面上什么都没有  Suspense不能捕捉到错误
// react有一个说法ErrorBoundary 来进行捕获错误;
//运用了一个生命周期 componentDidCatch 来

export default App;
```

## memo ，PureComponent解决react运行时候的效率问题

react就是把数据转化成视图的桥梁，数据和视图应该保持同步,

如果数据是1，视图应该是1，如果数据是2，视图还是1，那么就是bug，逻辑错误，得需要去解决，怎么解决呢? 通过重新渲染，但是，如果说视图没有变，就重新渲染得话，就浪费了性能,

PureComponent 组件已经帮助我们实现了一个**shouleComponentUpdate**;
但是有局限性，只能保证**属性本身**的对比，如果属性**内部发生了什么变化**的话,就不行了;一定要注意使用场景，只有说是pureComponent的**第一级发生变化**才会重新渲染;

**memo和PureComponent功能一样**，只是适用于函数式组件，把函数式组件用一个memo包起来，然后返回一个新的组件

```
const Foo = memo(function Foo(props){
        console.log('我是渲染了foo组件')
        return (
            <div>
                {props.person.age}
            </div>
        )
})
```

## react中setState为什么是异步的

 由React控制的事件处理程序，以及生命周期函数调用setState不会同步更新state 。 React控制之外的事件中调用setState是同步更新的。比如原生js绑定的事件，setTimeout/setInterval等 

## 怎么去理解虚拟dom

虚拟dom其实就是用js对象来去描述dom节点

```
{
  tag: 'div',
  attrs: { className: 'box', id: 'content'},
  children: [
    {
      tag: 'div',
      arrts: { className: 'title' },
      children: ['Hello']
    },
    {
      tag: 'button',
      attrs: null,
      children: ['Click']
    }
  ]
}
```

 **React** 的基本思维模式是**每次有变动就整个重新渲染整个应用**。 

 如果没有 虚拟dom，简单来想就是直接重置 innerHTML。在一个大型列表所有数据都变了的情况下，重置 innerHTML 其实是一个还算合理的操作，真正的问题是在 “全部重新渲染” 的思维模式下，即使只有一行数据变了，它也需要重置整个 innerHTML，这时候显然就有大量的浪费。 

于是就用js对象来描述dom节点信息，然后通过diff算法，来比较新旧两个虚拟dom的变化，把变化了的节点给找出来，渲染到真实的dom中，在数据量比较大的情况下 js 计算相比直接操作dom是极其便宜的。 

 **Vue** 的 采用的都是数据绑定, 来收集依赖，通过观察数据变化，当有数据变化时进行对应依赖的变更  

## 为什么 Vuex 的 mutation 和 Redux 的 reducer 中不能做异步操作？

 vuex和redux都是一种状态管理机制。 都会有自己的state、和修改state的方法， 修改state的方法涉及到同步和异步，vuex的处理方式是同步在mutation里面，异步在actions里面，然后redux的同步就是reducer ，异步更多的是用户自己去通过中间件的方式去实现 ，因为异步操作是成功还是失败不可预测，什么时候进行异步操作也不可预测；当异步操作成功或失败时，如果不 commit(mutation) 或者 dispatch(action)，Vuex 和 Redux 就不能捕获到异步的结果从而进行相应的操作 

也**不方便 devtools 追踪状态变化**。 

## 子组件为何不可以修改父组件传递的 Prop

为了保证**数据的单向流动**，便于对数据进行追踪，避免数据混乱 

一个父组件下不只有你一个子组件。 同样，使用这份 prop 数据的也不只有你一个子组件。 如果每个子组件都能修改 prop 的话，将会导致修改数据的源头不止一处。

**所以我们需要将修改数据的源头统一为父组件，子组件像要改 prop 只能委托父组件帮它。从而保证数据修改源唯一**

官网上的说法:

所有的 prop 都使得其父子 prop 之间形成了一个**单向下行绑定**：父级 prop 的更新会向下流动到子组件中，但是反过来则不行。这样会防止从子组件意外改变父级组件的状态，从而导致你的应用的数据流向难以理解。 

**注意：**如果传入的props是**基本数据类型**，子组件修改父组件传的props会警告，并且修改不成功，如果传入的是**引用数据类型**，那么修改改引用数据类型的某个属性值时，对应的props也会修改，并且vue不会抱警告。 

## react中父组件如何直接获取子组件数据

类组件通过 ref 

```
 <Child  ref="demo" />   给子组件添加ref属性
 在父组件使用 `this.refs.demo.state.xxx` 来获取子组件state里面的xxx的值
 使用 `this.refs.demo.dosomthing()` 来调用子组件的dosomthing（）方法
```

或者

```
父组件：
　　<Child onRef={(ref) => { this.child = ref; }} />
　　用的时候直接从this.child里面取
子组件：
　　componentDidMount() {
    　　this.props.onRef(this);
  　  }
```

使用Hooks

父组件直接获取子组件的值，比如说数量实时展示

```
//父组件
import Son from "./Son"
function App(){
    let [father,setFather]  =useState(0);
    return (
        <div className="App">
            父亲:|{father}
            <Son it={e=>setFather(e)}></Son>
        </div>
    )
}
export default App;
```

```
//子组件
function Son(props){
    let [num,setNum] = useState(100);
    useEffect(()=>{
        props.it(num)
    })
    return (
        <div className="Son">
             <h1>儿子:{num}</h1>
        </div>
    )
}
export default Son;
```

## redux、react-redux及处理异步

**原理:**

![img](https://img-blog.csdnimg.cn/2019081512545054.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3h1dG9uZ2Jhbw==,size_16,color_FFFFFF,t_70)

***动画：***

*![img](https://img-blog.csdnimg.cn/20190815125530540.gif)*

**【redux】**

 1. 调用 store.dispatch(action)。
     - Action 就是一个描述“发生了什么”的普通对象。
  2. Redux store 调用传入的 reducer 函数。
     - Store 会把两个参数传入 reducer： 当前的 state 树和 action。
  3. 根 reducer 应该把多个子 reducer 输出合并成一个单一的 state 树。
     - 根 reducer 的结构完全由你决定。Redux 原生提供combineReducers()辅助函数，来把根 reducer 拆分成多个函数，用于分别处理 state 树的一个分支。
  4. Redux store 保存了根 reducer 返回的完整 state 树。
     - 这个新的树就是应用的下一个 state！所有订阅 store.subscribe(listener) 的监听器都将被调用；监听器里可以调用 store.getState() 获得当前 state。

**【react-redux】**

1. 定位：react-redux让redux连接react的一个库；

1. 主要内容
   1. provider 运用context的方式来传入store
   2. connect：这个方法可以从UI组件生成容器组件；但容器组件的定位是处理数据、响应行为，因此，需要对UI组件添加额外的东西，即mapStateToProps和mapDispatchToProps，也就是在组件外加了一层state；
   3. mapStateToProps：一个函数， 建立一个从（外部的）state对象到（UI组件的）props对象的映射关系。 它返回了一个拥有键值对的对象；
   4. mapDispatchToProps：用来建立UI组件的参数到store.dispatch方法的映射。 它定义了哪些用户的操作应该当作动作，它可以是一个函数，也可以是一个对象。

​    有个棘手的问题没有很好地解决，那就是异步； 

####  **【redux-thunk】**  

 我们的action都是通过返回一个对象，接着执行对应的操作，但是我们添加了redux-thunk中间件后，action也可以返回一个函数，我们的异步操作就在这里面来执行 ,好比

```
export const init_list_action =() => {
    return (dispatch) => {
        axios.get('xxx').then(res => {
            dispatch(init_list(res.data))
            dispatch(census_check_num())
        })
    }
}
```

 返回一个函数，在函数中发起请求异步操作，之后的store调用发起这个action时就会执行里面的函数，发起请求得到对应数据，得到数据后我们就还需要再次发起action来将数据添加到state中，这样我们的这个异步操作就完成了！ 

```
//一个创建thunk的中间件工厂函数
function createThunkMiddleware(extraArgument) {
  return ({ dispatch, getState }) => next => action => {
    if (typeof action === 'function') {
      return action(dispatch, getState, extraArgument);
    }
    return next(action);
  };
}
//创建出thunk中间件
const thunk = createThunkMiddleware();
//把工厂函数附属到thunk对象上，方便高级用户自定义传入更多的参数到action中去
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;
```

#### 【redux-saga】：

1. 定位：react中间件；更好、更易地解决异步操作（action）；redux-saga相当于在Redux原有数据流中多了一层，对Action进行监听，捕获到监听的Action后可以派生一个新的任务对state进行维护；

1. 特点：通过 Generator 函数来创建，可以用同步的方式写异步的代码；

1. API：

   1. Effect： 一个简单的对象，这个对象包含了一些给 middleware 解释执行的信息。所有的Effect 都必须被 yield 才会执行。
   2. put：触发某个action，作用和dispatch相同；

## React-Router

1. 路由(routers) 

   -  BrowserRouter 
   -  HashRouter 

2. 路径匹配(route mathes) 

   -  Route 
   -  Switch 

3. 导航(navigation) 

   - ```
     <Link>  <Link to='/home'>Home</Link>
     ```

   - ```
     <NavLink> <NavLink to='/react' activeClassName='active'>React</NavLink>
     ```

   - ```
     <Redirect> <Redirect to="/login" />
     ```

4. link和a的区别

- Link 避免了一些不必要的重渲染
- react-router 只更新变化的部分，从而减少 DOM 性能损耗

## 路由原理

**hash路由**

  hashchange的一个事情----来监听url变化的，从而进行跳转页面;

  无论hash值怎么变化，服务端接收到的请求永远是不带hash值得哪个url;

  兼容性非常好,就是有点丑;

  每一次hash变化，浏览器得访问历史记录里面，增加一个记录，按后退按钮---返   回前一个页面 

**history路由**

pushstate

replacestate ---- 如果不想在历史记录中添加一个新记录，而是替换当前的url记录通过模式来进行改变url ----同样不会引起页面的刷新，但是会更新浏览器的历史记录.

点击前进后退按钮  ---popstate的事件;---可以通过监听这个事件，在客户进行点击前进后退的时候写逻辑; 

  pushstate

  replacestate 

  这两个方法接收的参数都是一样的;

  ({},null,地址);

  1:状态对象。。。。是当前历史记录条目的状态对象的拷贝，可以给其传递一个空对象

  2:标签 。。。。。 null ----火狐浏览器就会忽略这个参数,兼容性不好，不用管他 ---null

  3:url ---新的条目的地址 

## react中diff算法比较规则---记吧

首先比较两颗树的根节点

1. 比较不同类型的元素 - 卸载原有树并且创建新的树
2. 比对同一类型的元素 - 保留 DOM 节点，仅比对及更新有变化的属性

处理完当前节点，React 继续对子节点递归

1. 比对同类型的组件元素 
   - 组件实例保持不变（state 在跨越不同的渲染时保持一致），React 将更新该组件实例的 props 以跟最新的元素保持一致并且调用该实例的 componentWillReceiveProps 和 componentWillUpdate 方法。
   - 下一步，调用 render 方法，diff 算法将在之前的结果和新的结果中进行递归。
2. 对子节点进行递归 React 使用 key 来匹配原有树上的子元素以及最新树上的子元素。

说明：----理解不了-记这三条;

1. tree diff 对树进行分层比较，两棵树只会对同一层次的节点进行比较。
2. component diff 
   - 如果是同一类型的组件，按照原有策略继续比较 Virtual DOM，
   - 如果不是，则该组件为 dirty component，从而替换整个组件的所有子节点。
3. element diff 
   - 同一层级的子节点，diff 提供三种操作：插入，移动，删除
   - 添加唯一 key 进行区分

## **受控组件和非受控组件**

| **受控组件**                                   | **非受控组件**           |
| ---------------------------------------------- | ------------------------ |
| 1. 没有维持自己的状态                          | 1. 保持着自己的状态      |
| 2.数据由组件控制                               | 2.数据由 DOM 控制        |
| 3. 通过 props 获取当前值，然后通过回调通知更改 | 3. Refs 用于获取其当前值 |

受控组件有两个特点：1. 设置value值，value由state控制，2. value值一般在onChange事件中通过setState进行修改 

 需要对组件的value值进行修改时，使用受控组件。 

非受控组件有两个特点：1. 不设置value值，2. 通过ref获取dom节点然后再取value值 

任何时候都不需要改变组件的value值或者不经常变化value值，这时候可以使用非受控组件。 

## `super()`和`super(props)`有什么区别？

 super() 可以让我们使用this来调用各种东西，
而super(props)可以让我们在this的基础上使用构造函数里面的东西， 或者从父元素那边传过来的一些属性 

## 事件合成机制

- 所有事件挂载到 document 上
- event 不是原生的，是`SyntheticEvent`合成事件对象
- 与 Vue 事件不同，和 DOM 事件也不同

![img](https://user-gold-cdn.xitu.io/2020/3/16/170e282c2ee8d5b3?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)

- **更好的兼容性和跨平台，摆脱传统DOM事件**
- **挂载到document，减少内存消耗，避免频繁解绑**

## 如何使用异步组件

- 加载大组件
- React.lazy
- React.Suspense

## React性能优化----记住

- 渲染列表时加Key
- 自定义事件、DOM事件及时销毁
- 合理使用异步组件
- 减少函数 bind this 的次数
- 合理使用 shouldComponentUpdate、PureComponent 和 memo
- 合理使用 ImmutableJS
- webpack层面优化
- 前端通用是能优化，如图片懒加载

## react打包优化策略---记住---记住方式就可以

打包优化的问题解决思路：

- 代码压缩：`UglifyjsWebpackPlugin`
- 代码分组 `commonsChunkPlugin`, `SplitChunksPlugin`
- 网络传输压缩gzip: `CompressionWebpackPlugin`
- 抽取css代码：`mini-css-extract-plugin`
- 组件动态加载：`react-loadable`

## **React Hooks有用过吗**

**Hooks的优势**

1.hooks所有的逻辑都在函数的内部，也就没有了this的烦恼，

2.可以自定义hooks函数，在自定义的hooks函数里面还是可以调用hooks本身提供的内部函数，这样来说的话就可以很简单轻松的把可复用的状态逻辑给提取出来；

3.useEffect在每次渲染完毕之后调用，也是编写副作用代码的最佳时机，每个useEffect只处理一种副作用；逻辑就比较清晰

**Usestate**

- **传递给 useState 的参数是什么？**
  useState 只接收一个参数，这个参数可以是数字、字符串、对象等任意值，用于初始化声明的状态变量。也可以是一个返回初始值的函数，最好是函数，可在渲染时减少不必要的计算。
- **useState返回的是什么？**
  它返回一个长度为2的读写数组，数组的第一项是定义的状态变量本身，第二项是一个用来更新该状态变量的函数，约定是 **set** 前缀加上状态的变量名。如 setState，setState() 函数接收一个参数，该参数可以是更新后的具体值，也可以是一个返回更新后具体值的函数。若 setState 接收的是一个函数，则会将旧的状态值作为参数传递给接收的函数然后得到一个更新后的具体状态值。

```
function App(){
  const [n, setN] = useState(0)
  const [m, setM] = useState(() => 0)
  return (
    <div>
      n: {n}
      <button onClick={() => setN(n+1)}>+1</button>
      <br/>
      m: {m}
      <button onClick={() => setM(oldM => oldM+1)}>+1</button>
    </div>
  )
}
```

注意点:

- setState 并不会帮我们自动合并对象状态的属性
- setState 中接收的对象参数如果地址没变的话会被 React 认为没有改变，因此不会引起视图的更新
- **usestate一般定义在顶部，不能少调用，也不能多调用，不能写在if语句里面**

**useEffect**

 useEffect 就是在每次 render 后执行的操作 

第一次渲染后的调用就相当于是componentDidmount

后面的调用都相当于是componentDidupdate

 接收的第一个参数是回调函数，第二个参数是回调时机。可用在函数组件中模拟生命周期 

**模拟 componentDidMount**

```javascript
useEffect(()=>{
  console.log('只在第一次 render 后执行')
},[])
```

**模拟 componentDidMount + componentDidUpdate**

```javascript
useEffect(()=>{
   console.log('每次 render 后都执行，包括第一次 render')
})
```

**可添加依赖**---在子组件里面定义的时候，就相当于在模拟shouldcomponentupdate

```javascript
useEffect(()=>{
    console.log('只在 x 改变后执行，包括第一次 x 从 undefined 变成 initialValue')
},[x])
//如果有两个依赖，则是当两个依赖中的任何一个变化了都会执行
```

**模拟 componentWillUnmount**

```javascript
useEffect(()=>{
  console.log('每次 render 后都执行，包括第一次 render')
  return ()=>{
    console.log('该组件要被销毁了')
  }
})
//直接 return 一个函数即可，该函数会在组件销毁前执行
```

**useLayoutEffect**----非常少

useLayoutEffect 就是在视图显示出来前执行的副作用。

useEffect 和 useLayoutEffect 就是执行的时间点不同，useLayoutEffect 是在浏览器渲染前执行，useEffect 是在浏览器渲染后执行。但二者都是在 render 函数执行过程中运行，useEffect 是在 render 完毕后执行，useLayoutEffect 是在 render 完毕前（视图还没渲染到浏览器页面上）执行。

 一般情况下，如果 Effect 中的**回调函数中涉及到 DOM 视图的改变**，就应该用 useLayoutEffect，如果没有，则用 useEffect。 

**useContext**

**使用方法**

useContext 的使用方法分三步走：

- 使用 `const x = createContext(null)` 创建上下文，在创建时一般不设置初始值，因此为 null，一般是在指定上下文作用域时初始化。
- 使用  x.Provider value={}  圈定上下文的作用域
- 在作用域中使用 `const value = useContext(x)` 使用上下文的数据

```
import React, { useState, createContext, useContext } from 'react';
import ReactDOM from 'react-dom';

const Context = createContext(null)

function App(){
  const [n, setN] = useState(0)
  return (
    <Context.Provider value={{n, setN}}>
      <div>
        <Baba />
        <Uncle />
      </div>
    </Context.Provider>
  )
}
function Baba(){
  return (
    <div>
      我是爸爸
      <Child />
    </div>
  )
}
function Unclewang(){
  const {n, setN} = useContext(Context)
  return (
    <div>
      我是你王叔叔
      我拿到的 context 数据为 {n}
    </div>
  )
}
function Child(){
  const {n, setN} = useContext(Context)
  return (
    <div>
      我是儿子
      我拿到的 context 数据为 {n}
      <button onClick={() => setN(n+5)}>
        点击改变 context 数据
      </button>
    </div>
  )
}
ReactDOM.render(<App/>,document.getElementById('root'));
```

**useRef**

 可以用来获取组件实例对象或者是DOM对象。 

```
import React, { useState, useEffect, useMemo, useRef } from 'react';

export default function App(props){
  const [count, setCount] = useState(0);

  const doubleCount = useMemo(() => {
    return 2 * count;
  }, [count]);

  const couterRef = useRef();

  useEffect(() => {
    document.title = `The value is ${count}`;
    console.log(couterRef.current);
  }, [count]);
  
  return (
    <>
      <button ref={couterRef} onClick={() => {setCount(count + 1)}}>Count: {count}, double: {doubleCount}</button>
    </>
  );
}
```

**useMemo && useCallback**

React 框架是通过不断地 render 来得到不同的虚拟 DOM ，然后进行 DOM Diff 来进行页面 DOM 的选择性更新的，因此，在每次的 render 之后都会短时间内存在新旧两个虚拟 DOM 。

对于组件内包含子组件的情况，当父组件内触发 render 时，就算子组件依赖的 props 没有变化，子组件也会因为父组件的重新 render 再次 render 一遍。这样就产生了不必要的 render 。

为了解决不必要的 render ，React 提供了 `memo()`和purecomponent

usememo是表示函数的一段逻辑是否重复执行，本质都是采用同样的算法，来判断依赖是否发生改变，进而决定是否触发特定逻辑，总体来说就是在避免不必要的重复计算，减少资源浪费

useMemo的语法和useEffect的语法是一致的，同样都是第一个参数是要执行的逻辑函数，第二个参数是这个逻辑依赖的输入变量组成的数组，如果不传第二个参数，那么usememo的逻辑每次都运行，实际上usememo的意义就不存在了，所以没有这么写的，如果传入空数组就只会运行一次；

策略和useeffect是一摸一样的；

但是调用时机不一样，useeffect执行的是副作用，所以一定是在渲染之后再运行，

usememo是需要有返回值的，而返回值是可以直接参与渲染的,

因此usememo是再渲染期间完成的

如果usememo返回的是一个函数，那么可以直接使用usecallback来简化代码

useMemo(()=>fn)===useCallback(fn)

usecallback是useMemo的一种变种

**useReducer**

```
const [state, dispatch] = useReducer(reducer, initialstate, init);
```

useState 的替代方案。它接收一个形如 `(state, action) => newState` 的 reducer，并返回当前的 state 以及与其配套的 `dispatch` 方法。

```
import React, { useReducer } from 'react';
import ReactDOM from 'react-dom';
const initialState = {
  n: 0
}
const reducer = (state, action) => {
  switch(action.type){
    case 'addOne':
      return { n: state.n + 1 }
    case 'addTwo':
      return { n: state.n + 2 }
    case 'addX':
      return { n: state.n + action.x }
    default: {
      throw new Error('unknown type')
    }
  }
}
function App(){
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <div>
      我是 App
      {state.n}
      <button onClick={()=>dispatch({type: 'addOne'})}>+1</button>
      <button onClick={()=>dispatch({type: 'addTwo'})}>+2</button>
      <button onClick={()=>dispatch({type: 'addX', x: 5})}>+5</button>
    </div>
  )
}
ReactDOM.render(<App/>,document.getElementById('root'));
```

**react-redux这个包提供出来**

**useSelector和useDispatch**

**createStore**

通过createStore将state存入store，

```javascript
const store = createStore(reducer, initialState);
1
```

再通过Provider向子组件暴露store，通过store在父子组件之间共享状态

```javascript
 <Provider store={store}>
     <ChildComponentUseReactRedux />
 </Provider>
123
```

**useSelector**

子组件可以通过`useSelector`访问name

```javascript
  const num = useSelector(state => state.num);
1
```

当然，也可以提出selector函数，方便替换和复用，如下

```javascript
const selector = state => {
  return state.num;
}

const num = useSelector(selector);
12345
```

**useDispatch**

通过`useDispatch` 可以获取dispatch

```javascript
  const dispatch = useDispatch()
```

```
import React from "react";
import { createStore } from "redux";
import { Provider, useSelector, useDispatch } from "react-redux";

const initialState = { num: 0 };

const reducer = (state, action) => {
  switch (action.type) {
    case "decrement":
      return { ...state, num: state.num - 1 };
    case "increment":
      return { ...state, num: state.num + 1 };
    default:
    
      return state;
  }
};

const store = createStore(reducer, initialState);

const ComponentUseReactRedux = () => {
  return (
    <div>
      <h2>ComponentUseReactRedux</h2>
      <Provider store={store}>
        <ChildComponentUseReactRedux />
      </Provider>
    </div>
  )
}

const ChildComponentUseReactRedux = () => {
  const num = useSelector(state => state.num);
  const dispatch = useDispatch();
  return (
    <div>
      <h3>Using useSelector, useDispatch</h3>
      Number: {num}
      <button onClick={() => dispatch({ type: "increment" })}>+</button>
      <button onClick={() => dispatch({ type: "decrement" })}>-</button>
    </div>
  );
};

export default ComponentUseReactRedux;
```

**自定义Hooks**

自定义Hooks  将复用的逻辑提取成自定义Hook--主要来取代hoc-高阶组件，用来逻辑复用

其实就是一个名字以use开头的自定义函数，里面可以调用其他Hook

```
import React, { useEffect, useState } from 'react';

const useList = () => {
  const [list, setList] = useState(null);
  useEffect(() => {
    req('/list').then(res => {
      setList(res.data)
    }).catch(e => {
      console.error(e)
    })
  }, []);
  return {
    list,
    setList,
  }
};


function req() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve({
      code: 200,
      data: [
        { id: 1, age: 20, name: '张三' },
        { id: 2, age: 21, name: '李四' },
        { id: 3, age: 22, name: '王五' },
        { id: 4, age: 23, name: '赵六' },
        { id: 5, age: 24, name: '周七' },
      ]
    }), 2000)
  })
}

export default useList;
```

```
import React from 'react';
import useList from './useList';

const useCustomHookDemo = () => {
  const { list } = useList();
  
  return (
    <div>
      <h3>自定义list hooks demo</h3>
      { 
        list ? 
        (
          <ol>
            {
              list.map(item => (
                <li key={item.id}>姓名：{item.name}, 年龄：{item.age}</li>
              ))
            }
          </ol>
        ) : 
        ('loading...')
      }
    </div> 
  )
};
export default useCustomHookDemo;
```

