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
  memoizedState: any; // 上一次渲染的时候的state
  lanes: Lanes; // 优先级
  memoizedState: any; // 上一次渲染的时候的state
  // ...
}
```

## useEffect 和 useLayoutEffect 的区别

useEffect **在渲染时是异步执行**，并且要等到浏览器将所有变化渲染到屏幕后才会被执行。

useLayoutEffect **在渲染时是同步执行**，其执行时机与 componentDidMount，componentDidUpdate 一致。
