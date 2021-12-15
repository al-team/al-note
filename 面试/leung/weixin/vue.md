### 单页面和多页面的区别
  * 主要的核心区别是 一个html和多个html的区别
    > 为什么要有单页面应用呢？主要问题是多页面的资源共享问题，每次加载一个新的html，有一些共享的资源都要重新load，影响用户体验；多页面没有一种模块化的思想；因此单页更适合模块化的思想；
    > 单页面为什么能解决呢？主要的是 他用hash路由来模拟html跳转，让人感觉是跳转了一个新的html，实际上组件文件的切换而已，然后共享的资源不需要重新更新
    1.
      * 单个页面的话 就是一开始就加载完一些核心的js文件等资源，然后在后面的跳转的时候 就不需要请求资源
      * 多页面的话 就是每加载一个页面，都需要加载这个页面的页面
    2. 单页面的seo不友好，因为其他组件文件都是打包成一个Js文件，seo并不会爬虫js文件
    3. 结构实现的话，多页是依赖浏览器的history.pushState replaceState go等方法；单页面利用hash去模拟浏览器的history的pushState

  应用范围： 1. 对seo搜索引擎要求比较高的，就要用多页面应用
           2. 对速度要求比较高的，要用单页面应用

### [为什么用proxy代替definePropety](https://github.com/febobo/web-interview/issues/47)

### vue和react的区别
    * react 用于构建用户界面的javascript库
    * vue 一个渐进式的javascript框架


### vue3.0
  volar