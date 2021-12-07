[卡颂 简实现](https://react.iamkasong.com/hooks/create.html)

## 记忆点

```js
fiber {
  // 存放 hooks
  memoizedState: {
    // 更新对象
    update: {
      pending: null
      next: update // 下一个 update 对象
    }
    memoizedState: state // hook 对应的数据
    next: hook // 下一个 hooks
  }
}
```

## 简述

- fiber.memoizedState：FunctionComponent 对应 fiber 保存的 Hooks 链表。
- hook.memoizedState：Hooks 链表中保存的单一 hook 对应的数据。

```js
interface Fiber {
  memoizedState: any;
  stateNode: any; // 跟当前Fiber相关本地状态（比如浏览器环境就是DOM节点）
}
```

useState 之后，会在 fiber.memoizedState 挂上一个 hooks，更新产生的 update 对象会保存在 queue 中。

```js
hook = {
  queue: {
    pending: null,
  },
  memoizedState: initialState,
  next: null,
};
```

其中 next 指向下一个 hooks。执行同个 setState 多次，即 queue 环状链表操作：

```js
const update = {
  action,
  next: null,
};
```

## hooks

```js
let workInProgressHook;
let isMount = true;

const fiber = {
  memoizedState: null,
  stateNode: App,
};

function schedule() {
  workInProgressHook = fiber.memoizedState;
  const app = fiber.stateNode();
  isMount = false;
  return app;
}

function dispatchAction(queue, action) {
  const update = {
    action,
    next: null,
  };
  if (queue.pending === null) {
    update.next = update;
  } else {
    update.next = queue.pending.next;
    queue.pending.next = update;
  }
  queue.pending = update;

  schedule();
}

function useState(initialState) {
  let hook;

  if (isMount) {
    hook = {
      queue: {
        pending: null,
      },
      memoizedState: initialState,
      next: null,
    };
    if (!fiber.memoizedState) {
      fiber.memoizedState = hook;
    } else {
      workInProgressHook.next = hook;
    }
    workInProgressHook = hook;
  } else {
    hook = workInProgressHook;
    workInProgressHook = workInProgressHook.next;
  }

  let baseState = hook.memoizedState;
  if (hook.queue.pending) {
    let firstUpdate = hook.queue.pending.next;

    do {
      const action = firstUpdate.action;
      baseState = action(baseState);
      firstUpdate = firstUpdate.next;
    } while (firstUpdate !== hook.queue.pending);

    hook.queue.pending = null;
  }
  hook.memoizedState = baseState;

  return [baseState, dispatchAction.bind(null, hook.queue)];
}

function App() {
  const [num, updateNum] = useState(0);
  const [num2, updateNum2] = useState(12);

  console.log(`${isMount ? 'mount' : 'update'} num: `, num, num2);

  return {
    click() {
      updateNum((num) => num + 1);
    },
    click2() {
      updateNum2((num) => num + 1);
    },
  };
}

const app = schedule();

app.click();
app.click2();
```
