---
title: "在alpine中编译neovim"
description: 原始的vi功能实在是太少了,一个趁手的编辑器是绝对的必需品.而在alpine自带neovim版本太低了,所以考虑编译一个neovim出来自己用
slug: neovim-for-alpine
date: 2024-05-15
image:
category: neovim
tags:
    - alpine
    - C
    - build
    - neovim
---

> 本文主要介绍如何在 alpine 中编译 neovim

## 起因

老话说的好,工欲善其事,必先利其器.一个趁手的编辑器是绝对的必需品.

在 alpine 中使用 apk 的时候发现,里面的neovim版本似乎是较低的 0.7 版本,所以尝试自己编译一个.

neovim的文档非常完全,直接按照文档的流程就可以轻松完成了

## 环境准备

```sh
apk add build-base cmake coreutils curl gettext-tiny-dev git
git clone https://github.com/neovim/neovim.git --depth 1
cd neovim
```

依赖于C/C++开发环境

## 编译与安装

```sh
make CMAKE_BUILD_TYPE=Release
sudo make install
mv /usr/bin/vi /usr/bin/vi.bak
ln -s /usr/local/bin/nvim /usr/bin/vi
```

## [参考资料](https://github.com/neovim/neovim/blob/master/BUILD.md#build-prerequisites)

整个过程还是非常简单的
