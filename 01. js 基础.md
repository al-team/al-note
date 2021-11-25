## 什么是 this

this 指的是**函数**运行时所在的环境。

- 默认指向：this 指向全局，但是严格模式下不指向全局。
- 隐式指向：被某个对象调用，那么就指向哪个对象。
- 显式指向：通过 call，apply，bind 改变函数里的 this 指向。
- new 一个对象：构造函数的 this 指向该实例化对象
- 箭头函数没有 this，所以也不能 new

真题解析：

```js
var a = {
  b: function () {
    console.log(this);
  },
  c: () => {
    console.log(this);
  },
  d: {
    e: () => {
      console.log(this);
    },
    g: {
      i: () => {
        console.log(this);
      },
    },
  },
  f: function () {
    var a = () => {
      console.log(this);
    };
    a();
  },
};

a.b(); // a
a.c(); // window
a.d.e(); // window
a.d.g.i(); // window
a.f(); // a
```

1. 箭头函数里面的 this 就是定义时上层作用域中的 this！
2. 注意 this 指的是**函数**运行时所在的环境，a 对象并没有被函数包裹，所以输出 window 是默认只想上一级环境，也就是 window

真题 2：

```js
var name = 'global';

var obj = {
  name: 'obj',
  a() {
    return function () {
      console.log(this.name);
    };
  },
};

obj.a()(); // global 【obj.a()() 执行环境是 obj.a() 也就是全局。】
```

new 返回值举例：

```js
function B() {
  // return null;
  // return {};
  return function () {};
}

const b = new B();
console.log(b);
// function F(){}
// null => F
// func => func
```

模拟 new

```js
function New(func, ...rest) {
  let obj = new Object();
  if (func.prototype === undefined) {
    // 箭头函数
    throw TypeError(`${func} is not a constructor`);
  }
  obj.__proto__ = func.prototype;
  const result = func.call(obj, ...rest);

  if (typeof result === 'function') return result; // 如果是函数 返回函数
  if (result === null) return obj; // 如果是 null 返回新对象
  return typeof result === 'object' ? result : obj;
}
```

## 闭包

[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Closures): 一个**函数**和对其周围状态（lexical environment，**词法环境**）的引用捆绑在一起（或者说函数被引用包围），这样的组合就是闭包。也就是说，闭包让你可以在一个内层函数中访问到其外层函数的作用域。

闭包的作用：

1. 缓存变量，比如任务队列，累计叠加
2. 用闭包模拟私有方法

真题：

```js
function fun(n, o) {
  console.log(o);
  return {
    fun: function (m) {
      return fun(m, n);
    },
  };
}

var a = fun(0); // undefined
a.fun(1); // 0  [,0]
a.fun(2); // 0  [,0]
a.fun(3); // 0  [,0]
var b = fun(0).fun(1).fun(2).fun(3); // undefined012
var c = fun(0).fun(1); //undefined0
c.fun(2); // 1
c.fun(3); // 1

/**
 * a {
 *  闭包 n=0
 *  fun(m) {
 *    console.log(闭包 n)
 *  }
 * }
 * */
```

## 原型 & 原型链

每个函数都有一个特殊的属性叫作原型, `prototype`, 用于存放共享的属性和方法。怎么共享呢？

通过 new 一个构造函数生成实例，该实例通过 `__proto__` 指向该构造函数的原型，那么访问实例属性的时候先在实例上找，如果找不到会往构造函数的原型上找，这也就是原型链。

手写继承！

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

## 事件循环机制

[eventloop](https://alvin.run/docs/javascript/v8/eventloop.html)

EventLoop 简单来说是一个用于**统筹调度任务**的一种机制。

1. js 的主线程是单线程的，大部分的任务都是在主线程上执行。比如网络请求、文件读写完成事件等等。
2. 容易造成任务阻塞，事件循环机制就是用来调度这些任务的。任务又分成宏任务和微任务。常见的宏任务有 `setTimeout` 、`setInterval` 等，常见的微任务有 `Promise.then`, `process.nextTick` 等。
3. 流程：执行同步代码，检查微任务，将微任务推到队列中，等当前的宏任务执行完毕之后，执行队列中的微任务，等执行完毕后再进行下一个宏任务。
