<!-- 1. 为什么不能条件语句中，声明 hooks?
2. function 函数组件中的 useState，和 class 类组件 setState 有什么区别？
3. react 是怎么捕获到 hooks 的执行上下文，是在函数组件内部的？
4. useEffect,useMemo 中，为什么 useRef 不需要依赖注入，就能访问到最新的改变值？
5. useMemo 是怎么对值做缓存的？如何应用它优化性能？
6. react 如何 diff、细节
7. useMemo、useCallback 使用场景
8. useEffect、useLayoutEffect 区别
9. redux 的三个原则、如何写一个中间件
10. 如何理解 fiber，fiber 节点对象的一些属性都有哪些
11. react class 和 hooks 区别
12. react-redux 原理
13. react 路由原理 -->

## 什么是 Fiber

Fiber 可以理解为是一个执行单元，也可以理解为是一种数据结构。

```ts
interface Fiber {
  tag: WorkTag; // 标记不同的组件类型
  key: null | string; // ReactElement里面的key
  stateNode: any; // 跟当前Fiber相关本地状态（比如浏览器环境就是DOM节点）
  return: Fiber | null; // 指向他在Fiber节点树中的`parent`，用来在处理完这个节点之后向上返回
  // 单链表树结构
  child: Fiber | null;
  sibling: Fiber | null;
  index: number;
  updateQueue: UpdateQueue<any> | null; // 该Fiber对应的组件产生的Update会存放在这个队列里面
  lanes: Lanes; // 优先级
  memoizedState: any; //对于 hooks 来说，是挂载着 hooks 链表
  // ...
}
```

## useEffect 和 useLayoutEffect 的区别

![](../images/useEffect-useLayoutEffect.png)

在一定程度上可以替换（相似性）。

1. 共同点：`useEffect` 和 `useLayoutEffect` 两者都是处理副作用，这些副作用包括改变 DOM、设置订阅、操作定时器等。
2. 差异
   1. useEffect **在渲染时是异步执行**，并且要等到浏览器将所有变化渲染到屏幕后才会被执行。
   2. useLayoutEffect **在渲染时是同步执行**，其执行时机与 componentDidMount，componentDidUpdate 一致。
3. 使用场景. 大多数场景使用 useEffect , 但代码引起页面闪烁就推荐使用 useLayoutEffect。

源码～：

**React 主要流程**

1. `render`：：主要生成 Fiber 节点 并构建出完整的 Fiber 树
2. `commit` 阶段：在上一个 render 阶段中会在 rootFiber 上生成一条副作用链表，应用的 DOM 操作就会在本阶段执行。

`commit` 阶段的工作主要分为三部分，对应到源码中的函数名是：

- `commitBeforeMutationEffects` 阶段：主要处理执行 DOM 操作前的一些相关操作
- `commitMutationEffects` 阶段：执行 DOM 操作
- `commitLayoutEffects` 阶段：主要处理执行 DOM 操作后的一些相关操作

`useEffect` 和 `useLayoutEffect` 的区别主要就在体现在这三个阶段的处理上。结论是：`useEffect` 会异步地去执行它的响应函数和上一次的销毁函数，而 `useLayoutEffect` 会同步地执行它的响应函数和上一次的销毁函数，即会阻塞住 DOM 渲染。 -->

## 类组件和函数组件有什么区别

**相同点：**

使用方式和最终呈现效果上是完全一致的。也就是说两者是可以相互替换使用的。

**不同点：**

**本质上代表两种不同的设计思想和心智模型**

1. 类组件的根基是 OOP，面对对象编程，所以它有继承、属性、内部状态的管理。=> 可以实现继承
2. 函数组件的根基是 FP，也就是函数式编程。 => 不可以实现继承、但是有 hooks 代替

相比类组件，函数组件更存粹、简单、易测试

**性能优化：**

类组件主要是通过 shouldComponentUpdate 函数去阻断渲染、函数组件则是通过 React.memo 来优化。

**使用上**

函数组件更简洁、hooks 主流，个人更推崇。

## setState 是同步还是异步的？

答题思路，先讲什么是合成事件，合成事件和 setState 有着密切的关系。。

React 给 document 挂.上事件监听 DOM 事件触发后冒泡到 documentReact 找到对应的组件造出一个合成事件出来并按组件树模拟一遍事件冒泡。

在进行多次 setState 时，假设当前处理 react 合成事件中，那么源码中有 `isBatchUpdate` 变量为 true，根据队列达到批量更新的目的，假设是处于非合成事件中，比如 setTimeout、addEventListener 等则是同步的。

[React 18 不再依赖 Concurrent Mode 开启并发了](https://juejin.cn/post/7031375070882693150)
