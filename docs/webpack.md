说明：根据[B站学习视频 ：【2020新课程】Webpack从原理到实战完整版-深入浅出，简单易学，前端工程师必学经典内容！][B_ _2020_Webpack_-]学习整理，如有错误，欢迎随时指正，互相学习。  
本次学习到的内容：

1.  webpack产生的背景
2.  理解前端的模块化、模块化演变的过程
3.  理解webpack打包的核心思路
4.  webpack核心：loader
5.  webpack核心：plugin

### 1 webpack是什么 

一个现代JavaScript应用程序的静态模块打包器

1.  默认：只对js进行处理，其他类型文件需要配置loader或者插件进行处理。
2.  打包：将各个依赖文件进行梳理打包，形成一个JS依赖文件。

### 2 webpack产生的背景 

首先，为什么打包？因为：

1.  各个依赖文件的关系难以梳理，耦合程度较高，代码难以维护。
2.  把所有依赖包都打包成为一个js文件（bundle.js）文件，会有效降低文件请求次数，一定程度提升性能。
3.  逻辑多、文件多，项目复杂度提高
4.  其他

然后，为什么要用webpack？因为：

1.  webpack除提供上述功能外，还充当了“翻译官”的角色，例如将ES6翻译为低版本的语法，将less、sass翻译为css等功能。
2.  强大而灵活，plugin可插拔。
3.  其他

### 3 先理解下前端模块化 

类似于一个公司由各个部门组成，一个工程也由各个模块组成，高内聚低耦合，各司其职。先理解一下概念：

#### 3-1 作用域 

定义：运行时变量、函数、对象可访问性  
作用域决定了代码中变量和其他资源的可见性

1.  全局作用域：

```java
var a = 1;
    window.a; // 1
    global.a; // 1
```

1.  局部作用域：

```java
function a(){
        var v = 1;
    }
    window.v; // undefined
```

如果在传统js写法中，引入多个script，就很容易造成全局作用域冲突而导致不可预测的问题：

```java
<body>
    	<script scr="./moduleA.js"></sciprt>
        <script scr="./moduleB.js"></sciprt>
        <script scr="./moduleC.js"></sciprt>
    </body>
```

改进步骤一，使用变量作用域形成局部作用域：

```java
// 定义模块内的局部作用域，以moduleA为例
    var Susan = {
    	name: "susan",
        sex: "female",
        tell: function(){
        	console.log("im susan")
        }
    }
```

但是步骤一无法保证模块属性内部安全性，比如可能不小心改掉属性值，可以通过立即执行函数进行改写，形成闭包。  
那么可以进行改进步骤二：  
ps:  
什么是立即执行函数？可以点击[这里][Link 1]进行参考。  
什么是自由变量？简单来说是跨作用域的变量，可以点击[这里][Link 2]进行参考。（里面有一个句很好的知识点：创建这个函数的时候，这个函数的作用域就已经决定了，而是不是在调用的时候）

```java
// 定义模块内的闭包作用域（模块作用域），以moduleA为例
    var SusanModule = (function(){
        var Susan = {
        // 自由变量
    	name: "susan",
        // 自由变量
        sex: "female",
        // 只允许访问tell方法，不能访问和修改其他属性
        return {
        	tell: function(){
        		console.log("im susan")
        	}
        }
    })()
```

对于步骤二还有一种写法，推荐使用这种写法，也是早期模块实现的方法：

```java
// 定义模块内的闭包作用域（模块作用域），以moduleA为例
    (function(window){
    	var name = "susan"
        var sex = "female"
        functioon tell(){
        	console.log("im ", this.name)
        }
        window.susanModule = {tell}
    })(window)// window作为参数传给
```

调用验证：

```java
window.susanModule.tell(); //im susan
```

#### 3-2 模块化的优点 

 *  模块化的封装
 *  重用性
 *  解除耦合

#### 3-3 模块化方案进化史 

随着模块化优势体现，开发者更倾向于使用模块化协同开发项目，于是在发展过程中形成了很多规范：AMD、COMMONJS、ES6 MODULE

###### 3-3-1 AMD 

Asynchronous Module Definition（异步模块定义）  
目前很少使用

```java
// 求和模块
    define("getSum", ["math"], funtion(math){
    	return function (a,b){
        	log("sum:"+ math.sum(a, b))
        }
    })
```

###### 3-3-1 COMMONJS 

2009年出的规范，原本是为服务端的规范，后来nodejs采用commonjs模块化规范

```java
// 通过require函数来引用
    const math = require("./math");

    // 通过exports将其导出
    exports.getSum = function(a,b){
    	return a + b;
    }
```

###### 3-3-1 ES6 MODULE 

目前使用最多的便是这个

```java
// 通过import函数来引用
    import math from "./math";

    // 通过export将其导出
    export function sum(a, b){
    	return a + b;
    }
```

### 4 webpack的打包机制 

根据import引入等关键字，将依赖文件打包成一个文件。

#### 4-1 输出文件 

输出文件的大体结构：

```java
(function(module) {
    	var installedModules = {};
        function __webpack_require__(moduleId){
        	// SOME CODE
        }
        // 。。。
        return __webpack_require__(0); // entry file
    })([ /* modules array */])
```

上述结构中的核心方法：

```java
function __webpack_require__(moduleId){
    	// check if module is in cache
        if(installedModules[moduleId]){
        	return installedModules[moduleId].exports;
        }
        // create a new module (and put into cache)
        var module = installedModules[moduleId] = {
        	i: moduleId,
            l: false,
            exports: {}
        };
        // exe the module func
        modules[moduleId].call{
        	module.exports,
            module,
            module.exports,
            __webpack_require__
        };
        // flag the module as loaded
        module.l = true;
        // return the exxports of the module
        return module.exports;
    }
```

#### 4-2 webpack打包过程 

1.  从入口文件开始，分析整个应用的依赖树
2.  将每个依赖模块包装起来，放到一个数组中等待调用
3.  实现模块加载的方法，并把它放到模块执行的环境中，确保模块间可以互相调用
4.  把执行入口文件的逻辑放在一个函数表达式中，并立即执行这个函数

### 5 npm 

这个就省略了，npm不是重点，不做笔记了（语义化版本了解一下）

###### npm install过程 

 *  寻找报版本信息文件(package.json)，依照它来进行安装
 *  查找package.json中的依赖，并检查项目中其他的版本信息文件
 *  如果发现了新包，就更新版本信息文件

### 6 webpack实战 

这个就不放什么说明了，视频里思路很清晰，大概在89分钟之后就是实战演练了。

### 7 常用插件plugins 

#### babel 

作用: 将高版本语法ES6转换为低版本语法  
使用方法（直接编译）：babel -index.js --presets=@babel preset-env

preset-react：解析jsx语法

使用方法一：package.json中，加入babel配置参数

```java
"babel": {
    	"presets" : ["@babel/preset-env"]
    }
```

使用方法二：在package.json文件同目录下，设置.babelrc文件里面配置同方法一

##### html-webpack-plugin 

具体可参考[这里][Link 3]，主要功能是：

 *  为html文件中引入的外部资源如script、link动态添加每次compile后的hash，防止引用缓存的外部文件问题
 *  可以生成创建html入口文件，比如单页面可以生成一个html文件入口，配置N个html-webpack-plugin可以生成N个页面入口

### 8 webpack.config.js配置项解释 

这部分知识点太碎了，简单的配置没进行记录，只记录了下边两个配置，其他具体的可以参考[这里][Link 4]

 *  是否缓存，可以提升webpack打包执行的速度，配置如下：
    
    ```java
    cacheDictionary: true/false;
    ```
 *  .js .jsx .json文件引用时候，不需要加入后缀，只需要文件名即可，但是重名的还是需要全名，配置如下：
    
    ```java
    resolve: extensions：['.js','.jsx','.json']
    ```

### 9 webpack-dev-server 

 *  webpack-dev-server --open直接打开浏览器运行项目
 *  提供文件变化监听，如果项目文件有更新，会自动打包，并刷新页面

### 10 webpack HRM 模块热更新（不需要刷新浏览器的情况下更新dom） 

plugin中加入：webpack.HotModuleReplacementPlugin()

### 11 打包优化 

体积优化（打包出来结果大小优化）：TerserPlugin

```java
optimization: {
	minimizer: [new TerserPlugin({
    	// 加快构建速度
        cache:true,
        parrlel: true,// 多线程处理
        terserOptions : {
            compress: {
            	//删除掉一些没有用的代码
                unused: true,
                drop_debugger: true,
                drop_console: true,
                dead_code:true
            }
        }
    })]
}
```

### 12 webpackBundleAnalyzer 可视化webpack分析器 

打包过程中会出现分析后的页面

### 13 happyPack 

 *  多线程打包
 *  可以根据cpu数量构建线程池
 *  使用thread-loader

### 14 tree-shaking 

 *  DCE的另一种实现方式，摇晃树，可以去掉无用的树叶
 *  作用：例如定义了一个util，里面很多公用的方法，但是很多方法没有用到，那么在dev环境打包时候，输出文件中就可以看到很多没用到的方法声明，但是在pro环境打包时候，输出文件中就没有这些方法，消除掉这部分没用的代码。

花一上午时间、写完后心情舒畅，如有问题请随时指正，互相学习。


[B_ _2020_Webpack_-]: https://www.bilibili.com/video/BV1a741197Hn
[Link 1]: https://blog.csdn.net/qq_33457248/article/details/80773496
[Link 2]: https://www.cnblogs.com/pssp/p/5206240.html
[Link 3]: https://www.cnblogs.com/wonyun/p/6030090.html
[Link 4]: https://yq.aliyun.com/articles/595117