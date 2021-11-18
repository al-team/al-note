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

promise.all

```js
async function all(promises = []) {
  return new Promise((resolve, reject) => {
    let result = [];
    let count = promises.length;
    if (count === 0) resolve([]); // Promise.all([]) 的情况

    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]) // 使用 Promise.resolve 包装。Promise.all([1,2,3]) 的情况
        .then((res) => {
          result[i] = res;
          count--;
          if (count === 0) {
            resolve(result);
          }
        })
        .catch(reject);
    }
  });
}
```

Promise.allSettled

```js
async function allSettled(promises = []) {
  return new Promise((resolve, reject) => {
    let result = [];
    let count = promises.length;
    if (count === 0) resolve([]); // Promise.allSettled([]) 的情况
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i])
        .then(
          (value) => {
            result[i] = { status: 'fullfilled', value };
          },
          (error) => {
            result[i] = { status: 'rejected', reason: error };
          },
        )
        .finally(() => {
          count--;
          if (count === 0) {
            resolve(result);
          }
        });
    }
  });
}
```

Promise.race

```js
function race(promises) {
  return new Promise((resolve, reject) => {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(resolve).catch(reject);
    }
  });
}
```

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

## 闭包题目

```js
var nAdd;
var t = function () {
  var n = 99;
  nAdd = function () {
    n++;
  };
  var t2 = function () {
    console.log(n);
  };
  return t2;
};

var a1 = t();
var a2 = t();

nAdd();

a1(); //99
a2(); //100
```
