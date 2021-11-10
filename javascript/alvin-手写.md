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
child.prototype => Father.prototype

function myExtends(Child, Father) {
  function Temp() {}
  Temp.prototype = Father.prototype;
  const instance = new Temp();

  instance.constructor = Child;
  child.prototype = instance;
}
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
