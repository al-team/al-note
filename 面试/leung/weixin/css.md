### webp、png图片的格式
  > 判断是否支持webp图片 （https://blog.csdn.net/weixin_30877181/article/details/95831081）
  > webp图片 啊里云支持转换
  > 头像压缩 使用webp
  > create-webp-webpack-plugin vue插件 将图片转化成webp
  > 会生成 xx.png   xx.png.webp  


### rem、em、vw区别  

### 渲染层的原理 css3 display opactiy
> 浏览器渲染再复习

### [png如何转base64](https://www.cnblogs.com/chillaxyw/p/5783341.html)
```
var basegg = 'data:image/png;base64,xxxx'
```
> 1. 通过canvas getContext("2d").toDataUrl()
> 2. H5 新方法FileReader(需要考虑兼容性)
  ```js
  if(window.FileReader){
    //处理文件
    var reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function(){
    alert(this.result);
    }
  }else{
    return "浏览器不支持FileRedaer"
  }
  ```
### [什么是base64](https://zhidao.baidu.com/question/1180903251037071899.html)
> Base64是网络上最常见的用于传输8Bit字节代码的编码方式之一，在发送电子邮件时，服务器认证的用户名和密码需要用Base64编码，附件也需要用Base64编码。

### [css复习目录](https://juejin.cn/post/6844904116339261447#heading-12)

 * [position](https://developer.mozilla.org/zh-CN/docs/Web/CSS/position) (done) static relative absolute fixed stricky
 * [flex布局属性](https://www.zhangxinxu.com/wordpress/2018/10/display-flex-css3-css/) (done)
    > flex:1; 
    > flex 是flex-grow（扩展宽度）,
    > flex-shrink(缩放 默认是1 flex-shrink主要处理当flex容器空间不足时候，单个元素的收缩比例),
    > flex-basis: 默认 auto 定义了在分配剩余空间之前元素的默认大小。相当于对浏览器提前告知：浏览器兄，我要占据这么大的空间，提前帮我预留好。(可以看下文章的解释 有flex-basis 就会无视width)
    > 三种的缩写  flex: none | auto
    ```
    flex默认值等同于flex:0 1 auto；
    flex:none等同于flex:0 0 auto；
    flex:auto等同于flex:1 1 auto;
    flex:1 === flex: 1 1 0 ;(https://zhuanlan.zhihu.com/p/136223806)
    ```
  * [1px问题](https://mp.weixin.qq.com/s/IrV0-v3v5Cl969yFCI58Rg)(done)
  * [rem和vw原理](https://mp.weixin.qq.com/s/8m6WqwhjKJebZVB2wpbbbg)
    * rem存在的问题 [css精度缺失]（https://x-fox.github.io/blog/2021/05/11/about-css-px-issue/）；
    > 相对window.innerWidth innerHeight 而vw vh是clientWidth 
    > 新闻，社区等可阅读内容较多的场景：px+flex+百分比
    > 对视觉组件种类较多，视觉设计对元素位置的相对关系依赖较强的移动端页面：vw + rem
  * css 层叠上下文是什么？(z-index由来) [文章](https://juejin.cn/post/6844903667175260174)
  * [css标签权值](https://blog.csdn.net/qq_36130706/article/details/81415469) 不是10进制 是256进制
    > css3规范中要求使用双冒号（::）表示伪元素，以此来区分伪类和伪元素，比如::before和::after等伪元素使用双冒号（::），:hover和:active伪类使用单冒号（:）。
    > 1. !important > style 行间样式 > id > class|属性｜伪类 > 标签｜伪元素（::hover） > 通配符（*）

  * [BFC](https://juejin.cn/post/6950082193632788493)

  > BFC就是一个块级元素，块级元素会在垂直方向一个接一个的排列
  > BFC就是页面中的一个隔离的独立容器，容器里的标签不会影响到外部标签
  > 垂直方向的距离由margin决定， 属于同一个BFC的两个相邻的标签外边距会发生重叠
  > 计算BFC的高度时，浮动元素也参与计算 (使用float 导致高度坍塌)

### 布局和绘制（重流和重绘）在浏览器再复习