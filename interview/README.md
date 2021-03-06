# 前端面试五十题

## 1. 虚拟 Dom 是什么
virtual DOM 是一种编程理念（数据驱动视图），将 ui 虚拟的保持到内存中，并且通过渲染成真实的 dom，这个过程又叫做 reconcile 调和。
Virtual Dom 的核心价值是一种视图层的表达力，可以用纯 javascript 对象去描述界面应该渲染成什么样子。
VDOM 有更少的属性，集中处理

Virtual DOM Diff的层次（diff算法）

Virtual Dom有patch算法，根据新旧vnode比较经过优化查找到不同的节点修补、更新。不会暴力的直接覆盖DOM。
Virtual Dom优势在于直接频繁的操作DOM效率远低于操作JavaScript的效率，使用JavaScript的成本取代DOM成本。

## Vue 与 React 对比

React 相比与 Vue 使用 JSX 即 JavaScript 的扩展语法进行页面描述，React API 也相对少一些，相对 React 也更加灵活，从性能上二者不分伯仲。主要看团队积累和个人熟练度吧。Vue 的开发可能不可避免于查文档。

## 前端工程化
前端工程化是用软件工程手段去提高前端的工作效率，为了开发更易维护更健壮的程序，并且提高程序的性能、稳定性、可用性。
从代码规范到研发工具链，到 CI/CD 平台让开发人员减少更多手动进行重复性的工作。并实现团队内的统一。
我认为前端工程化是业务发展的必然产物，随着业务规模的增加，需要从工程管理以及人员协同进行约束，从指定开发团队规范到脚手架以及 CI / CD 流程，再到 serverless 以及低代码都是希望，可以提升开发的效率，让开发人员更多的关注于业务产品本身。能不让人做的就不必让人参与。

https://github.com/mqyqingfeng/frontend-interview-question-and-answer/issues

## vdom diff 算法

## reconcile 的不同

## React 渲染流程

## 事件系统

DOM 级别

DOM2级处理事件是在DOM0级处理事件的基础上再添加了一些处理程序。

可以同时绑定多个事件处理函数。
定义了 addEventListener 和 removeEventListener 两个方法。

DOM3级处理事件是在DOM2级处理事件的基础上再添加了很多事件类型。

UI事件，当用户与页面上的元素交互时触发，如：load、scroll
焦点事件，当元素获得或失去焦点时触发，如：blur、focus
鼠标事件，当用户通过鼠标在页面执行操作时触发如：dbclick、mouseup
滚轮事件，当使用鼠标滚轮或类似设备时触发，如：mousewheel
文本事件，当在文档中输入文本时触发，如：textInput
键盘事件，当用户通过键盘在页面上执行操作时触发，如：keydown、keypress
合成事件，当为IME（输入法编辑器）输入字符时触发，如：compositionstart
变动事件，当底层DOM结构发生变化时触发，如：DOMsubtreeModified

同时DOM3级事件也允许使用者自定义一些事件。

事件冒泡：从内到外 1 2 3 
事件捕获：从外到内 3 2 1

- DOM0 DOM1:事件冒泡到 window 为止

- DOM2:新增绑定机制 addEventListener 第三个参数为 false 是为冒泡阶段，true 为捕获阶段

```
btn.onclick = function(){}
btn.addEventListener('click',function(){},false)
```

事件冒泡与事件委托

- target ：e.target 当前选中元素

- currentTarget e.currentTarget 当前事件绑定元素

通过给父级对象绑定事件，根据 target 来进行选中触发逻辑

事件冒泡与取消冒泡机制

除 focus | onBlur | scroll 三个事件其他事件均可以进行冒泡

- e.bubbles 获取事件是否可以冒泡
- e.stopPropagation() 阻止事件的冒泡和捕获
- e.stopImmdiatePropagation() 阻止事件的冒泡和捕获以及其他的绑定事件
- e.cancleBubble = true 可以兼容的取消冒泡

## 网络常见问题
TCP/UDP HTTP1.0/2.0/3.0 HTTP/HTTPS
