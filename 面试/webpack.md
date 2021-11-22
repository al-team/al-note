## webpack 运行原理

1. **初始化参数**：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数
2. **开始编译**：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译
3. **确定入口**：根据配置中的 entry 找出所有的入口文件
4. **编译模块**：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理
5. **完成模块编译**：在经过第 4 步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系
6. **输出资源**：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会
7. **输出完成**：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统

## 有哪些常见的 Loader & Plugin？

- file-loader url-loader babel-loader sass-loader...
- html-webpack-plugin clean-webpack-plugin happypack mini-css-extract-plugin...

> 那你再说一说 Loader 和 Plugin 的区别？

Loader 本质就是一个函数，在该函数中对接收到的内容进行转换，返回转换后的结果。 因为 Webpack 只认识 JavaScript，所以 Loader 就成了翻译官，对其他类型的资源进行转译的预处理工作。

Plugin 就是插件，基于事件流框架 Tapable，插件可以扩展 Webpack 的功能，在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。

## webpack 中的 hash

1. Hash

hash 是跟整个项目的构建相关，只要项目里有文件更改，整个项目构建的 hash 值都会更改，并且全部文件都共用相同的 hash 值

2. chunkhash

chunkhash，它根据不同的入口文件(Entry)进行依赖文件解析、构建对应的 chunk，生成对应的哈希值。

3. contenthash

contenthash 主要是处理关联性，比如一个 js 文件中引入 css，但是会生成一个 js 文件，一个 css 文件，但是因为入口是一个，导致他们的 hash 值也相同，所以当只有 js 修改时，关联输出的 css、img 等文件的 hash 值也会改变，这种情况下就需要 contenthash 了。

## source map 是什么

source map 是将编译、打包、压缩后的代码映射回源代码的过程。打包压缩后的代码不具备良好的可读性，想要调试源码就需要 soucre map。

## CMD & ES Module 的区别

1. es module 编译时加载，值引用。适合做 tree-shaking
2. cmd 运行时加载，值拷贝，适合做远程加载

```js
CommonJS

+------------------------------------+
|   // lib.js                        |
|   var counter = 3                  |                         ES6 modules
|   function increase() {            |
|     counter++                      |         +--------------------------------------------+
|   }                                |         | // lib.js                                  |
|   module.exports = {               |         | export let counter = 3                     |
|     counter,                       |         | export function increase() {               |
|     increase                       |         |   counter++                                |
|   }                                |         | }                                          |
|                                    |    VS   |                                            |
|   // main.js                       |         | // main.js                                 |
|   var mod = require('./lib')       |         | import { counter, increase } from './lib'  |
|                                    |         |                                            |
|   console.log(mod.counter) // 3    |         | console.log(counter) // 3                  |
|   mod.increase()                   |         | increase()                                 |
|   console.log(mod.counter) // 3    |         | console.log(counter) // 4                  |
+------------------------------------+         +--------------------------------------------+
```

https://juejin.cn/post/6844904094281236487
