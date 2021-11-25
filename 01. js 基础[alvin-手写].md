## 手写 instanceof

```js
function myInstanceof(a, b) {
  let cur = a.__proto__,
    prototype = b.prototype;

  while (true) {
    if (cur === prototype) return true;
    if (cur === null) return false;
    cur = cur.__proto__;
  }
}
```

## 手写 new

```js
function myNew(Father) {
  let obj = Object.create();
  obj.__proto__ = Father.prototype;
  let callback = Father.call(obj);
  return typeof callback === 'object' ? callback : obj;
}
```

## 手写继承

```js
function Parent(name) {
  this.name = name;
}

function Child(name) {
  Parent.call(this, name);
}

function F() {} // 1. 新建立一个中转函数
F.prototype = Parent.prototype; // 函数原型指向 Parent
Child.prototype = new F(); // 将子类的原型指向 F 的实例
Child.prototype.constructor = Child;
```

## 手写 call

```js
// example function log() { console.log(this.name) }
// log.call({ name: 'alvin' });
Function.prototype.call2 = function (obj = window, ...args) {
  const fn = Symbol('fn'); // 声明一个独有的Symbol属性, 防止fn覆盖已有属性
  obj[fn] = this; // obj.fn === log
  let result = obj[fn](...args);
  delete obj[fn];
  return result;
};
```

## 手写防抖 节流

```js
function debounce(func, wait) {
  let timer = null;
  return function (...rest) {
    let ctx = this; // 解决 this 指向问题
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(ctx, rest);
    }, wait);
  };
}

function throttle(func, wait) {
  let timeout;

  return function (...rest) {
    let context = this;
    if (!timeout) {
      timeout = setTimeout(function () {
        timeout = null; // 执行之后 马上将启动函数的开关开启
        func.apply(context, rest);
      }, wait);
    }
  };
}
```

## 手写深拷贝

```js
const deepTypes = ['Object', 'Array', 'Map', 'Set'];

// 1. 基础类型 直接返回
// 2. object 类型
function clone(target, map = new WeakMap()) {
  const type = Object.prototype.toString.call(target).slice(8, -1);
  if (map.has(target)) return map.get(target); // 解决循环引用问题

  if (deepTypes.includes(type)) {
    let cloneTarget = new target.constructor(); // 拿到构造函数新建一个实例
    map.set(target, cloneTarget); // 添加引用标记
    // map 的特殊处理
    if (type === 'Map') {
      target.forEach((value, key) => {
        cloneTarget.set(key, clone(value));
      });
      return cloneTarget;
    }

    // Set 的特殊处理
    if (type === 'Set') {
      target.forEach((value) => {
        cloneTarget.add(clone(value));
      });
      return cloneTarget;
    }

    // function

    // ....

    for (const key in target) {
      cloneTarget[key] = clone(target[key]);
    }
    return cloneTarget;
  }

  return target;
}
```
