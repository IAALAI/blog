---
title: "代码展示效果优化(旧世遗物)"
description: "优化此博客的代码展示效果(旧世遗物)"
date: 2024-05-28
image:
categories:
    - blog
tags:
---

这个 hugo 不支持类似于 vitepress 的引入外部代码,
因此决定手动为其开发出一个功能类似的来

``` bash
<<< ./test.sh
```

## 实现方案

`hugo` 支持一种叫 `shortcode` 的功能,所以这里基于 `shortcode` 来实现这个功能

## 将博客的代码展示替换为 `Monaco Editor`

感觉hugo内置的代码展示功能效果一般,而且不能引入外部的代码文件,因此在次进行一点点提升

这里的内容参考了 `vitepress` 中的功能,以及 `vitepress` 中的 `Monaco Editor` 的使用,还有 `Monaco Editor`

## a

大赞 Monaco Editor

<!-- https://vitepress.dev/zh/guide/markdown#advanced-configuration -->
<!-- https://hugo-in-action.foofun.cn/zh/docs/part1/chapter4/5/ -->
<!-- https://hugo.opendocs.io/templates/shortcode-templates/ -->
<!-- https://gohugo.io/templates/output-formats/ -->

todo

现在我的博客已经从 hugo 迁移到了 11ty了,所以此篇文章不再具备参考价值,也不再考虑完善

针对于 11ty的 [实现参考在这里](./code-trim)
