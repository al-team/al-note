### javascript刷题回顾-[js进阶](https://github.com/lydiahallie/javascript-questions/blob/master/zh-CN/README-zh_CN.md#%E7%AD%94%E6%A1%88-c-23)

  #### 1.考察var let const 的变量提升问题
  ```js
  function sayHi() {
  console.log(name)
  console.log(age)
  var name = 'Lydia'
  let age = 21
  }
  sayHi()
  # 关键词  内存空间在创建阶段就设置好了，但是var在创建阶段的时候，他的值会为被初始化为undefined,直到程序运行到定义变量之前，他的值都是undefined;不同的是let const 是创建的时候，并不会对其值进行初始化，因为在创建阶段到定义变量前，不能访问它，这个行为也被称为暂时性死区；

  # 拓展 存在js哪个内存空间  let和const定义的变量存在与Script作用域中，var定义的变量存在与Global中（即window）
  ```
  ![](https://segmentfault.com/img/bVWZro?w=843&h=664/view)
  > 在函数内部，我们首先通过 var 关键字声明了 name 变量。这意味着变量被提升了（内存空间在创建阶段就被设置好了），直到程序运行到定义变量位置之前默认值都是 undefined。因为当我们打印 name 变量时还没有执行到定义变量的位置，因此变量的值保持为 undefined。
  > 通过 let 和 const 关键字声明的变量也会提升，但是和 var 不同，它们不会被初始化。在我们声明（初始化）之前是不能访问它们的。这个行为被称之为暂时性死区。当我们试图在声明之前访问它们时，JavaScript 将会抛出一个 ReferenceError 错误

  ### 2.参考题30题，eventloop的解析搭配掘金的文章解析事件机制。 --webApi

  ### 3.6种False的值
    * null、undefined、'',false,NaN、0 
    * ?? 如果值是null、undefined 才会执行后面的

  ### 4.考察数组赋值时的隐形操作
  ```js
    const numbers = [1, 2, 3]
    numbers[10] = 11
    console.log(numbers)
  ```
  >当你为数组设置超过数组长度的值的时候， JavaScript 会创建名为 "empty slots" 的东西。它们的值实际上是 undefined。你会看到以下场景：
  > [1, 2, 3, 7 x empty, 11]
  >这取决于你的运行环境（每个浏览器，以及 node 环境，都有可能不同）

  ### 5.考查parseInt用法
  ```js
    const num = parseInt("7*6", 10);
  ```
  只返回了字符串中第一个字母. 设定了 进制 后 (也就是第二个参数，指定需要解析的数字是什么进制: 十进制、十六机制、八进制、二进制等等……),`parseInt` 检查字符串中的字符是否合法. 一旦遇到一个`在指定进制中不合法的字符后`，`立即停止解析并`且`忽略`后面所有的字符。`*就是不合法的数字字符`。所以只解析到`"7"`，并将其解析为十进制的7. num的值即为7.

### error题
   * 22，26 复习
   * 44 复习异步的时候二刷 迭代器
   * 