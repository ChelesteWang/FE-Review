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

https://github.com/mqyqingfeng/frontend-interview-question-and-answer/issues

## vdom diff 算法

## reconcile 的不同

## React 渲染流程

## 事件系统

## 网络常见问题
TCP/UDP HTTP1.0/2.0/3.0 HTTP/HTTPS
