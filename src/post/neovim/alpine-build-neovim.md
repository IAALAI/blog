---
title: "neovim for alpine"
description: 在alpine中编译neovim
slug: neovim-for-alpine
date: 2024-05-15T11:28:30+08:00
image:
categories:
    - neovim
tags:
    - alpine
    - C
    - build
    - neovim
    - todo
---

# 在 alpine 中使用 neovim

> 本文主要介绍如何在 alpine 中编译 neovim

## 起因

在 alpine 中使用 apk 的时候发现,里面的neovim似乎是强依赖 glibc 的,而 alpine 中额外的下载 glibc 让我感觉好浪费.而且 apk 里面的 neovim 的版本也是很低的 0.7 版本,所以尝试自己编译一个.

参考链接 [musl和glibc，性能区别到底有多大？ - 韩朴宇的回答 - 知乎](https://www.zhihu.com/question/550951106/answer/2655086754)

## 准备编译环境

首先安装一些必要的工具

clang
cmake

## 效果优化

musl 具有2个显著的性能瓶颈,分别是 malloc 和 memcpy,如果手动将内存分配换成 mimalloc 的话,性能会有显著的提升

todo
