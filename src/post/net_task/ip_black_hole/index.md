---
title: "ip black hole"
date: 2024-07-13
description: 网络管控之 IP 路由黑洞
slug: "net_task_ip_black_hole"
category: network
tags:
    - todo
---
# 网络管控之 IP 路由黑洞

有的时候会需要封禁掉一片不安全IP因此记录实现方案

## ip 路由表

```shell
sudo ip route add blackhole 192.168.25.0/24
```

## iptables 防火墙

```shell
sudo iptables -A INPUT -d 192.168.25.0/24 -j DROP
```