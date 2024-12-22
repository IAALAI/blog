---
title: "umami"
description: "独立部署umami"
slug: umami-start
date: 2024-09-23
image:
categories:
    - none
tags:
    - web-analytics
---

## 起因

最近想要统计一下我的各个站点访问数量之类的,所以就此开始尝试

## 比较

最开始也考虑选择其他的现成的方案,比如 cloudflare-analytics 和 google-analytics

但是 cloudflare 的那个经常捕获不到数据,统计的数值有明显出入

google 的方案的话,实在是行不过它

## 安装

这个过程倒是非常非常的简单的,先从官方的 github 仓库中直接拉去仓库

然后直接 pnpm 一条龙安排

``` bash
git clone git@github.com:umami-software/umami.git -depth=1
pnpm install && pnpm build
```

启动之前,在此目录中创建一个 `.env` ,然后修改对应的数据连接

``` bash
echo "" > .env
pnpm start
```

然后就可以愉快的启动它了

# 备注

此时应该可以在浏览器的 localhost:3000 中看到它了.

随后建议修改掉默认的密码
