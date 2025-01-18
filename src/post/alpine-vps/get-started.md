---
title: "将VPS的系统切换为alpine"
description: 将性能较差的VPS切换为alpine,提高使用体验
date: 2024-05-15T11:28:00+08:00
image:
categories:
    - vps
tags:
    - alpine
    - grub
---
# 将 VPS 的系统切换为 alpine

最近搞来了一家低价的VPS,综合配置似乎还算可以

> 1和1G,25GB SSD,1TB流量,1Gbps带宽

但是商家预装的系统似乎有后台,带一个监控程序而且占用还不低

因此考虑将其重装为alpine,优化使用体验

## 启动前检查

只需要VPS支持VNC即可实现

正常的VPS的VNC都是相当于物理机IPMI了,因此也可以实现重装系统

## 手动操作

最开始我是想到手动下载alpine的iso,然后手写grub引导,然后重启之后到VNC里重装系统

``` shell
cd /boot
wget http://dl-cdn.alpinelinux.org/alpine/v3.19/releases/x86_64/alpine-virt-3.19.0-x86_64.iso -O alpine.iso
echo "menuentry \"Alpine\" {
    loopback loop (hd0,1)/boot/alpine.iso
    set root(loop)
    set gfxpayload=keep
    linux /linux -- quiet
    initrd /initrd.img
}" >> /etc/grub.d/40_custom
grub-mkconfig -o /boot/grub/grub.cfg
```

## 自动脚本

在和群友交流的时候,群友推荐了一个[一键脚本](https://github.com/bin456789/reinstall)

效果极佳,非常推荐,使用方式极为简单

``` shell
curl https://raw.githubusercontent.com/bin456789/reinstall/main/reinstall.sh | bash
```

然后选择你需要的系统即可.

也可以自己准备好ISO镜像,由此脚本自动修改grub

## VPS折腾计划

重装完系统是时候先为其准备一些工具了

> [在alpine中编译 `neovim`](/p/neovim-for-alpine)
