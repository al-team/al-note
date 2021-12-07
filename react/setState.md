## setState 是异步还是同步的问题？

- [由实际问题探究 setState 的执行机制](https://mp.weixin.qq.com/s?__biz=Mzg2NDAzMjE5NQ==&mid=2247483989&idx=1&sn=d78f889c6e1d7d57058c9c232b1a620e&scene=21#wechat_redirect)
- [React 架构的演变 - 从同步到异步](https://blog.shenfq.com/posts/2020/React%20%E6%9E%B6%E6%9E%84%E7%9A%84%E6%BC%94%E5%8F%98%20-%20%E4%BB%8E%E5%90%8C%E6%AD%A5%E5%88%B0%E5%BC%82%E6%AD%A5.html)
- [彻底搞懂 React 源码调度原理（Concurrent 模式](https://terry-su.github.io/cn/undestand-react-scheduling-mechanism-from-source-code-concurrent-mode/)

<!-- setState 是一次同步操作，只是每次操作之后并没有立即执行，而是将 setState 进行了缓存，mount 流程结束或事件操作结束，才会拿出所有的 state 进行一次计算。

如果 setState 脱离了 React 的生命周期或者 React 提供的事件流，setState 之后就能立即拿到结果。 -->

![image](https://user-images.githubusercontent.com/34113677/138412088-9cecbc2d-568e-4fd4-a3fd-491f2134d351.png)

- Legacy 模式

`ReactDOM.render`, setState 触发的更新是异步的造成这种原因是，react 源码中有个性能优化的特性，叫做 batchedUpdates，也就是批处理。

比如我们触发多次 setState， 只会触发最后一次 setState。这是因为 React 将多次 setState 合并为一次更新，这样就能提高 react 的性能了。

- blocking 模式
- concurrent 模式：创建的更新拥有不同的优先级，并且更新的过程是可以打断的

```js
state = 0;

this.setState({ num: 1 });
console.log('step1: ', this.state.num); // 0
setTimeout(() => {
  this.setState({ num: 2 });
  console.log('step2: ', this.state.num); // Legacy 模式 2， concurrent 模式：0
});
```
