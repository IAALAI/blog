---
title: 从firefox取回Sync的Tabs数据
description: 没想到这个 firefox 也在我的 Ubuntu 崩溃了!提取里面的Tabs数据!
date: 2026-07-25
image: 
category: 
tags:
    - daily
draft: true
---

## 果

在一次意外重启之后,firefox竟然也崩溃,但是最后成功取回了我的Tab数据!

## 序

我本人有一个坏习惯,打开海量的标签页,然后重来不关它.虽然有时候会给它分组,但是向来不关

以前在 Edge 的时候啊,那个微软开发的windows默认浏览器,这个行为好像在windows是还完全正常的

后来在 linux 的时候,这个 Edge 累计遇到了2次的崩溃问题,而且一崩溃,就是本机浏览器数据全部清空...这个杀伤力太大了,最终决定放弃掉 edge 转投 firefox 的旗下

最开始用这个 firefox ,然后发现,自己写的插件啥的,竟然没有不能直接加载,还需要去 moz 的网站打包,这样太麻烦了

换成 firefox-devedition ,嗯,这下完美了,不管是多端同步,还是插件全部都工作的非常漂亮啊,不错不错!!!

## 故

安稳的使用 firefox-devedition 也有蛮长一段时间了,得有一年多了吧,没想到,这个 firefox 现在也崩溃了...

在我崩溃的时候, firefox-devedition 已经是打开了 750 多个 Tabs 了.这么多 Tabs 已经是在大部分已经是产生显著的性能问题了

我倒是也有预感,也该清理清理,把一部分删掉,一部分塞进到收藏夹里面去了,但是实在是太懒了...一直没有出手

没想到啊,今天这个 firefox-devedition 浏览器竟然也崩溃了,只不过情况比 Edge 来说,还是稍微好上不少,只是丢失了 Tabs 信息,浏览器其他的数据倒是都还是在的...

不过也是让我感觉感觉非常可惜了,一定得要像个什么办法挽救挽救它!!!

## 解

我在发现 Tabs 都没了的第一时间马上关闭了浏览器,没有让它进行进一步的破坏

思考有什么办法取回前面的 Tabs

最开始 是 J4son 备份数据和 seession 数据,但是因为打开过浏览器,所以这个全部都被覆写了!!!什么都没有留下

然后就是目光放到了浏览器的 Sync 的功能上面

找到了内部同步 api ,从里面抓到了同步对象,然后 console.log 保存了,下来,得救了!!!

打开 Browser Console,不是一般的网页 Console

需要先在 about:config 里面设置 devtools.chrome.enabled = true,然后按下 Ctrl + Shift + J,在然后使用

``` js
const { SyncedTabs } =
  ChromeUtils.importESModule(
    "resource://services-sync/SyncedTabs.sys.mjs"
  );

SyncedTabs.getTabClients()
.then(clients => {
    console.log(clients);
});
```

就可以得到所有的设备的同步信息,从里面提取需要的 Tabs 就好了

真的是不容易啊,万幸数据都保存了下来!

# 末

这个崩溃,但是最大的问题,还是使用习惯太糟糕了...

总感觉以后还会有再一次崩溃的情况发生

留下这个文章以后应该是会有所帮助吧
