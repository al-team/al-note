## 原型 & 原型链

都懂，但是很难回答的好的问题

![](https://gitee.com/alvin0216/cdn/raw/master/images/prototype5.png)

1. 面试官：什么是原型？

在 js 中我们是使用构造函数来新建一个对象的，每一个构造函数的内部都有一个 `prototype` 属性值，这个属性值是一个对象，这个对象包含了可以由该构造函数的所有实例共享的属性和方法。

当我们使用构造函数新建一个对象后，在这个对象的内部 将包含一个指针，这个指针指向构造函数的 `prototype` 属性对应的值，在 ES5 中这个指针被称为对象的原型。

2. 面试官：什么是原型链？

当我们访问一个对象的属性时，如果这个对象内部不存在这个属性，那么它就会去它的原型对象里找这个属性，这这个原型对象又会有自己的原型，于是就这样一直找下去，也就是原型链的概念。原型链的尽头一般来说都是 `Object.prototype` 所以这就 是我们新建的对象为什么能够使用 toString() 等方法的原因。

## typeof & instanceof

typeof 用于检查普通对象类型，instanceof 用来检测 `constructor.prototype` 是否存在于参数 object 的原型链上。

手写 `instanceof` ...

```js
function mockInstanceof(a, b) {
  let chain = a;
  let prototype = b.prototype;
  while (ture) {
    if (chain === null) return false;
    if (chain === prototype) return true;
    chain = chain.__proto__;
  }
}
```

## 继承

1. 原型链继承，属性共享，引用是个问题。

```js
function Father() {
  this.sex = 1;
}
function Child() {}

Child.prototype = new Father();
Child.prototype.constructor = Child;
```

`instance.__proto__ => Child.prototype => FatherInstance.__proto__ => Father.prototype`

2. 借用构造函数继承，无属性共享，属性独立

```js
function Father() {
  this.sex = 1;
}
function Child() {
  Father.call(this);
}
```

通过 call 改变 this 指向

3. 组合继承

```js
function Father() {}
function Child() {
  Father.call(this);
}

Child.prototype = new Father();
Child.prototype.constructor = Child;
```

可以把共享属性放在 prototype，也可以有独立属性。缺点就是执行了两次构造函数。

4. 改进。间接的让 Apple.prototype 访问到 Fruit.prototype

```js
function object(o) {
  function F() {}
  F.prototype = o;
  return new F();
}

function prototype(child, parent) {
  var prototype = object(parent.prototype);
  prototype.constructor = child;
  child.prototype = prototype;
}

// 当我们使用的时候：
prototype(Child, Parent);
```

## 模拟实现 new

1. **创建一个新对象, 并继承其构造函数的 prototype**
2. **执行构造函数，方法内的 this 被指定为该新实例**
3. **返回新实例, 返回值是 object 类型 则直接返回这个结果 如果没有返回值或者其他 则默认返回创建的对象**

```js
var obj = new Object(); // 1. 创建一个空对象
obj.__proto__ = Father.prototype; // 2 设置原型链
var result = Person.call(obj); // 3 让 Person 中的 this 指向 obj，并执行 Person 的函数体
// 4 返回值是 object 类型 则直接返回这个结果 如果没有返回值或者其他 则默认返回创建的对象
if (typeof result === 'object') {
  return result;
} else {
  return obj;
}
```

## 作用域 & 闭包

- javascript 执行一段代码，分为编译阶段和执行代码阶段，当 JavaScript 代码执行一段可执行代码会创建对应的执行上下文(execution context)。

  - 全局的执行上下文
    - VO（变量对象）供 JS 访问，用户是访问不到的
    - 作用域链
    - this
  - 局部的执行上下文
    - AO
    - 作用域链
    - this

作用域链：

查找变量的时候，会先从当前上下文的变量对象中查找，如果没有找到，就会从父级(词法层面上的父级)执行上下文的变量对象中查找，一直找到全局上下文的变量对象，也就是全局对象。这样由多个执行上下文的变量对象构成的链表就叫做作用域链。

闭包（闭包是指那些能够访问自由变量的函数） demo：

```js
function outer() {
  let age = 18;
  function inner() {
    console.log(age);
  }
  return inner;
}
const f = outer();
f();
```

1. 进入全局代码，创建全局执行上下文，全局执行上下文压入执行上下文栈
2. 执行 outer 函数，创建 outer 函数执行上下文，outer 执行上下文被压入执行上下文栈
3. outer 执行上下文初始化，创建变量对象、作用域链、this 等
4. outer 函数执行完毕，outer 执行上下文从执行上下文栈中弹出
5. 执行 inner 函数，创建 inner 函数执行上下文，inner 执行上下文被压入执行上下文栈
6. inner 执行上下文初始化，创建变量对象、作用域链、this 等
7. inner 函数执行完毕，inner 函数上下文从执行上下文栈中弹出

如果执行完 outer 释放栈那么 f 函数执行的时候，就无法找到引用的 age 变量。这时候 outer 就成为了闭包函数放在内存中，等 f 执行完毕后会进行内存回收 也即垃圾回收

## 垃圾回收

当一个函数执行结束之后，JavaScript 引擎会通过向下移动 ESP 来销毁该函数保存在栈中的执行上下文。

- 基本类型存储在栈中，直接释放。
- 引用类型存储在堆中。在 V8 中会把堆分为新生代和老生代两个区域，新生代中存放的是生存时间短的对象，老生代中存放的生存时间久的对象。

新生代中用 Scavenge 算法来处，所谓 Scavenge 算法，是把新生代空间对半划分为两个区域，一半是对象区域，一半是空闲区域。

新加入的对象都会存放到对象区域，当对象区域快被写满时，就需要执行一次垃圾清理操作。

在垃圾回收过程中，首先要对对象区域中的垃圾做标记；标记完成之后，就进入垃圾清理阶段，副垃圾回收器会把这些存活的对象复制到空闲区域中，同时它还会把这些对象有序地排列起来，所以这个复制过程，也就相当于完成了内存整理操作，复制后空闲区域就没有内存碎片了。

完成复制后，对象区域与空闲区域进行角色翻转，也就是原来的对象区域变成空闲区域，原来的空闲区域变成了对象区域。这样就完成了垃圾对象的回收操作，同时这种角色翻转的操作还能让新生代中的这两块区域无限重复使用下去。

由于新生代中采用的 Scavenge 算法，所以每次执行清理操作时，都需要将存活的对象从对象区域复制到空闲区域。但复制操作需要时间成本，如果新生区空间设置得太大了，那么每次清理的时间就会过久，所以为了执行效率，一般新生区的空间会被设置得比较小。也正是因为新生区的空间不大，所以很容易被存活的对象装满整个区域。为了解决这个问题，JavaScript 引擎采用了对象晋升策略，也就是经过两次垃圾回收依然还存活的对象，会被移动到老生区中。

主垃圾回收器主要负责老生区中的垃圾回收。除了新生区中晋升的对象，一些大的对象会直接被分配到老生区。因此老生区中的对象有两个特点，一个是对象占用空间大，另一个是对象存活时间长。由于老生区的对象比较大，若要在老生区中使用 Scavenge 算法进行垃圾回收，复制这些大的对象将会花费比较多的时间，从而导致回收执行效率不高，同时还会浪费一半的空间。因而，主垃圾回收器是采用标记 - 清除（Mark-Sweep）的算法进行垃圾回收的。下面我们来看看该算法是如何工作的。首先是标记过程阶段。标记阶段就是从一组根元素开始，递归遍历这组根元素，在这个遍历过程中，能到达的元素称为活动对象，没有到达的元素就可以判断为垃圾数据。
