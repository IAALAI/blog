---
title: "代码展示效果优化"
description: "优化此博客的代码展示效果"
date: 2025-01-03
image:
categories:
    - blog
tags:
---

将博客的代码展示替换为 `Monaco Editor`

就像是这样:

``` javascript
// 我是注释
console.log("Hello Wolrd");
```

``` typescript
function DestinationCard() {
    alert('Hello DestinationCard!');
}
```

`Monaco Editor` 本身作为一个前端库使用还是比较简单的,这里借助了强大的 jsdelivr 的ESM直接一个import就搞定了

使用也是非常的比较简单,只需要简单的传入各个属性就可以完成工作

除了初始化的时候需要稍微注意一下尺寸其他的也没有什么额外的问题了

特别的是,我在使用的时候把尝试把我自己的vscode里面的配色方案导入进来了,如果有机会的话以后考虑把我的配送方案也发个npm吧,这个把vscode配色转换成monaco配色的过程还是值得说道说道的

目前还有问题,不知道是不是没有正确的导入LSP的原因,现在看大部分代码都是缺少对应的颜色之类的.回头有机会在想办法把它补齐吧
