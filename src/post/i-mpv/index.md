---
title: "i-mpv,应用于linux的mpv ush"
date: 2025-12-03
description: 把External Player带到Linux系统上
category: 
tags:
    - ubuntu
    - linux
---

## 前言

一直以来,浏览器内置的播放器,就说不上好使.虽然大部分时间至少正确播放视频的,但是个人感觉对比本地播放器的自由定制开发仍然存在有差距.

所以,为了摆脱流媒体在浏览器播放,我找到了强大的 [`External Player`](https://github.com/LuckyPuppy514/external-player) ,这个插件可以把B站或者YouTube等视频网站的视频直接在本地的播放器上面播放,支持主流的 `mpv`,`vlc` 等播放器

## `External Player`

一直以来本人都是 mpv 用户,大部分时候看视频都是选择使用 mpv.此前在windows时期`External Player`的使用体验很不错,但是在Linux系统上,但是该插件并不支持Linux系统.

`External Player`这个插件的工作方式如下

1. 用户在浏览器点击按钮
1. 开始解析当前网页,或者对应播放链接
1. 调起本地ush,通过ush使用获取的信息调起本地播放器
1. 由本地播放器开始愉快的观看视频了

其中 1,2,4 等,都是于平台无关的,关键的就是第3步了,`External Player`的官方支持只包括windows系统.并没有Linux版本的 `URL Scheme Handler`,所以Linux用户就无法使用这个插件了

简单看了一样原作者配套的 ush,里面的逻辑和windows深度绑定,无法通过简单的修改就迁移到Linux上.所以干脆重新写一个ush吧

## [关于此项目](https://github.com/iaalai/i-mpv)

基于以上问题,这个项目就诞生了!

`i-mpv`,一个针对于 `External Player` 的Linux系统的ush,可以让Linux用户也能愉快的使用 `External Player` 了

[`i-mpv`](https://github.com/iaalai/i-mpv),最初只是只用的.发现社区里面似乎也有其他Linux用户也有类似的需求,就把这个项目开源了,希望能帮助到更多的Linux用户

Linux追赶Windows,还是任重道远呀
