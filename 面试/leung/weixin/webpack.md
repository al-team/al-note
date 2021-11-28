### [webpack打包性能瓶颈](https://blog.csdn.net/lunahaijiao/article/details/104191464?utm_medium=distribute.pc_aggpage_search_result.none-task-blog-2~aggregatepage~first_rank_ecpm_v1~rank_v31_ecpm-2-104191464.pc_agg_new_rank&utm_term=webpack+%E6%9E%84%E5%BB%BA%E6%97%B6%E9%97%B4%E5%88%86%E6%9E%90&spm=1000.2123.3001.4430)
  * 一.speed-measure-webpack-plugin 测量构建时间
    * 优化 webpack 构建速度的第一步是知道将精力集中在哪里。我们可以通过 speed-measure-webpack-plugin 测量你的 webpack 构建期间各个阶段花费的时间：
      * 分析整个打包耗时
      * 每个插件和loader的消耗情况
  * 二。分析包的内容 webpack-bundle-analyzer
    * webpack-bundle-analyzer 扫描 bundle 并构建其内部内容的可视化。使用此可视化来查找大的或不必要的依赖项
    > 注意：webpack4 在 production 环境下默认启动了 ModuleConcatenationPlugin （预编译所有模块到一个闭包中，提升代码在浏览器中的执行速度），它可能会合并webpack-bundle-analyzer 输出中的模块的一部分，从而使报告不太详细。如果你使用此插件，请在分析过程中将其禁用。设置如下：
    >Concatenation module 链接module
  * 三.在线测量工具
    * 1.生成stats.json 文件。会记录构建过程中的耗时，相关包的依赖关系图
      * 上传到Webpack Visualizer plugin。 这个也支持在线


  * webpack bundle optimize helper 分析建议 我觉得这个用的比较少 个人