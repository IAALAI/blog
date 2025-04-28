---
title: "关于 ubuntu 的 ppa"
description: "ubuntu的时候不免需要用到ppa源,但是国内ppa源的速度实在是太烂了,该怎么办呢"
date: 2025-04-29
category: 
tags:
    - ubuntu
    - cloudflare
---
## Introduction

PPA的连接性实在是差劲,但是想来这种开放的软件仓库应该是不会对于请求有过于严格的验证的因此发现一个好办法

## Solutions

借助`cloudflare`的强大CDN来优化使用体验

方法也很简单,就是直接在 `cloudflare` 的控制面板里面加入CDN一样.只不过把上游换成 `ppa.launchpad.net` 即可

最后再是把本地的 /etc/apt/sources.list.d/ 中的 `ppa.launchpad.net` 统统替换成自己的域名即可.在这里提供我自己搭建好的镜像代理 `ppa.iaalai.cn`

## shell
``` shell
sudo sed -i 's#ppa\.launchpad\.net#ppa.iaalai.cn#g' /etc/apt/sources.list.d/*
```

还得是 `cloudflare` 啊
