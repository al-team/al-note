### 你的升职原因是什么？
    * 说下你升职的项目贡献

### 如何捕获跨域的异常
  * window.onerror 可以捕获页面的所有的报错
  * window.console.error 即使是跨站脚本，若调用console.error。 也是调用本地的window.console,因此可以拦截
    * window.console.error = function(..args){}
  
### 跨域有几种
  * jsonp 只支持get请求
  * cors 用的比较广， 有预检查 options请求。
  
### cors 如何实现，如果有多个域名要加跨域，如何加？

### 基础类型和引用类型的区别？

### 说说你对原型链的理解
    * 原型链继承有什么缺点
    * 说下继承的方式
  
### 你对自己有哪些不足 感觉不满意


### [原型链的理解](https://blog.csdn.net/z591102/article/details/106078907)

### 说下浏览器的缓存机制
    * 怎么分辨强缓存和协商缓存


> 真的没问什么问题，不会的就异常和cors