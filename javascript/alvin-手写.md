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
Funtion.prototype.call2 = function (context = window, ...args) {
  context.fn = this;
  let result = context.fn(...args);
  delete context.fn;
  return result;
};
```

## Array.prototype.filter

https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/filter

```js

```
