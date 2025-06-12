---
title: "net_task"
date: 2024-06-22
description: 网络管控的三驾马车
slug: "net_task_0"
category: network
tags:
    - todo
draft: true
---

- [dns 污染](#dns-污染)
- [SNI 阻断](#sni-阻断)
- [IP 路由黑洞](#ip-路由黑洞)

dns 污染不行，那就上 SNI 阻断，还不行就施加 ip 黑洞路由

## dns 污染

本地针对dns处理选择使用 adguardhome

adguardhome 本身作为一个强大的 dns 服务器便具备了 dns 污染的能力,同时搭配确实的 doh 也可以抵抗 dns 污染

## SNI 阻断

## IP 路由黑洞

