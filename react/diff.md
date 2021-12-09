[Diff 算法](https://react.iamkasong.com/diff/one.html)

```ts
function reconcileChildFibers(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  newChild: any,
) {
  // 当newChild类型为object、number、string，代表同级只有一个节点
  // 当newChild类型为Array，同级有多个节点
}
```

## React diff 的目的

通过比较 currentFiberTree 和 oldFiberTree 的方式，判断节点是否可以复用等按需更新组件，这就是 react diff。

react diff 采用同层比较的方式，也即父节点变更了，下面的子节点就不在复用。虽然牺牲了部分渲染性能，但是提高了 diff 算法的效能。

react diff 分为单节点 diff 和多节点 diff

## 单节点 diff

1. key 是否相同
2. tag 节点类型是否相同

```js
function reconcileSingleElement(
  returnFiber: Fiber,
  currentFirstChild: Fiber | null,
  element: ReactElement,
): Fiber {
  const key = element.key;
  let child = currentFirstChild;

  // 首先判断是否存在对应DOM节点
  while (child !== null) {
    // 上一次更新存在DOM节点，接下来判断是否可复用

    // 首先比较key是否相同
    if (child.key === key) {
      // key相同，接下来比较type是否相同

      switch (child.tag) {
        // ...省略case

        default: {
          if (child.elementType === element.type) {
            // type相同则表示可以复用
            // 返回复用的fiber
            return existing;
          }

          // type不同则跳出switch
          break;
        }
      }
      // 代码执行到这里代表：key相同但是type不同
      // 将该fiber及其兄弟fiber标记为删除
      deleteRemainingChildren(returnFiber, child);
      break;
    } else {
      // key不同，将该fiber标记为删除
      deleteChild(returnFiber, child);
    }
    child = child.sibling;
  }

  // 创建新Fiber，并返回 ...省略
}
```

## 多节点 diff

1. 更新节点
2. 新增删除节点
3. 移动节点

相较于新增和删除，更新组件发生的频率更高。所以 Diff 会优先判断当前节点是否属于更新。

- 第一轮遍历：处理更新的节点
- 第二轮遍历：处理剩下的不属于更新的节点。
