## 模拟面试系列

next:

```js
// html css js 题目
// 闭包 1
// promise 1
// this 指向
// 手写 promise.all promise.race promise.allSettled
// ok 4 道题

// 二分法 + 异步题
// css
```

### 微前端如果做全局变量的隔离，样式隔离，做好沙箱机制

### 手写 promise 系列

### 异步面试题

```js
const b = () => {
  try {
    async function async1() {
      console.log(1);
      await async2();
      console.log(2);
    }
    //
    async function async2() {
      console.log(3);
    }
    async1(); // 1 3 [2]
    // 1 3 4 7 [2 5]
    new Promise(function (resolve, reject) {
      reject(8);
      console.log(4);
    }).then(() => {
      console.log(6);
    });
    // .catch((e) => {
    //   console.log(5);
    //   console.log('e', e);
    // });
    console.log(7);
  } catch (error) {
    console.log(error);
  }
};
```

<!-- ... -->

```js
new Promise((resolve, reject) => {
  console.log(1);
  reject(1);
})
  .catch((err) => {
    console.log('catch');
  })
  .then(() => {
    console.log('then');
  });
// 1 catch then

new Promise((resolve, reject) => {
  console.log(1);
  reject(1);
})
  .then(() => {
    console.log('then');
  })
  .catch((err) => {
    console.log('catch');
  });
// 1 catch
```
