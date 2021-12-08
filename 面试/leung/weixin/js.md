### this指向
```js
//this面试题 二刷
var name = 'Nicolas';
function Person(){
    this.name = 'Smiley';
    this.sayName=function(){
        console.log(this);
        console.log(this.name);
    };
    setTimeout(this.sayName, 0);     // 第二次输出
}
var sayName = function (){
    console.log(6666)
}

var person = new Person(); // {name:'smiley',sayName:func}    1.window Nicolas 
person.sayName();     //Peosn{} simle


var name = "Nicolas";
function Person() {
  this.name = "Smiley";
  this.sayName = () => {
    console.log(this);
    console.log(this.name);
  };
}

let person = new Person(); // window Nicolas
person.sayName.call({ name: "Nicolas2" }); 

// 
var a = {
  b: function () {
    console.log(this);
  },
  C: () => {
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
    console.log(this)  // a
    var a = () => {
      console.log(this);
    };
    a();
  },
};
a.b() // a{}
a.C() // window
a.d.e() // window
a.d.g.i()  //window
a.f()  //  a



// 闭包
function fun(n, o) {
  console.log(o);
  return {
    fun: function (m) {
      return fun(m, n);   // 0
    },
  };
}

var a = fun(0); // undefined    { fun:(){}}
a.fun(1); // 0
a.fun(2); // 0
a.fun(3); // 0
var b = fun(0).fun(1).fun(2).fun(3); // undefined 0 1  2 
var c = fun(0).fun(1); //  undefined 0 
c.fun(2); // 1
c.fun(3); // 1


// 异步

const b = () => {
  try {
    async function async1() {
      console.log(1);
      await async2();
      // p1 - 
      console.log(2);
    }
    //
    async function async2() {
      console.log(3);
    }
    async1();
    new Promise(function (resolve, reject) {
      //p2 -
      reject(8);
      console.log(4);
    })
      .catch((e) => {
        console.log(5);
        console.log('e',e)
      })
      .then(() => {
        console.log(6);
      });
    console.log(7);
  } catch (error) {
    console.log(error)
  }
};

b()
// 1 3 4 7 2 5 ('e',8) 6
const b = () => {
  try {
    async function async1() {
      console.log(1);
      const b = await 99
      // p1 - 
      console.log(b)
      const c = await async2() 
      // p3
      console.log(2);
      console.log(c) //98
    }
    const lbl = Promise.resolve('101') 
    setTimeout(()=>{  // h1
      console.log('lbl')
    })
    const gsw = Promise.reject('102') // t1
    async function async2() {
      console.log(3);
      return new Promise((resolve,reject)=>{
        console.log(lbl)
        setTimeout(()=>{
        console.log('9898')
        resolve(98)
        },100)
      })
    }
    async1();
    new Promise(function (resolve, reject) {
      resolve(8); //p2
      console.log(4);
    })
      .catch((e) => {
        console.log(5);
        console.log('e',e)
      })
      .then(() => {
        Promise.reject(100) //t2
        console.log(6);
      });
      
    console.log(7);
  } catch (error) {
    // try catch 微任务执行完后去执行
    console.log(error)
  }
};
b(); 
// 1 4 7 99 3 [fulfilled 101] 6  102 100 lbl 2 98
```


### 1.闭包
> 闭包的概念；优缺点；实际使用场景；
> 内存泄漏，及如何主动的去发现是否存在内存泄漏

```js

```
### 2.渐进式网络应用(pwa)--->优缺点 

### 3.事件循环机制(eventloop 搭配rsf的执行时机一起说) 【rsf好文(https://mp.weixin.qq.com/s/4nSLIH9MkzqZFQktGXDDSw)


### 4.js沙箱


### 5.函数柯里化



### 6.原型链概念--->new 继承


### 手写apply、call、bind、深拷贝，常用的浅拷贝,JSON.parse(JSON.stringify())的缺点
### react和vue
 * ssr的作用，及它的优缺点
    > 有个缺点，只能在beforeCreated 生命周期拿到ua?得确认


### 项目
> 你们平时项目的js异常有做上报处理吗？是什么实现的？


### [进程和线程的区别: 进程是火车、线程是车厢](https://www.zhihu.com/question/25532384)

### [setTimeout的实现原理和注意](https://mp.weixin.qq.com/s/7qTRSMqaqG8XZ9rpEBhYNQ)
  * 1.属于事件机制里的宏任务，
  * 2.第一个参数为执行的函数，第二个是时间，第三个是参数，结果会返回一个id
  * 3.定时器不一定是准时的，
  * 4.根v8里的一个processDelayTask,延迟队列有关
  * 5.延迟执行有最大值
  
