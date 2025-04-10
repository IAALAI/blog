---
title: "博客访问量统计"
description: "对博客的PV和UV进行统计,并且将其展示到前端之中"
slug: visitor-statis
date: 2024-09-24
image:
category: blog
tags:
---

书接 [`上文`](../umami/)

这次选择的是接入此前创建的 umami,搭建好了 umami 之后下一步就是接入到此博客了,如果是记录的话,倒还是比较容易的只需要简单的在 html 里面加入一个小小的 js 就好了

关键问题便是查看了,默认自带的方案得要携带token查询,但是这样做有不少缺点,看上去不是很让人满意,而且频繁的查询对于后端的性能影响估计也不小,所以这里选择了一套方案

## 反向代理

我的想法便是由 nginx 直接反向代理 umami,然后单独再定义一个路径来反代到 umami 上,请求回到 umami 的时候再携带 token 以获取数据即可

``` shell
location /api/websites {
    add_header Cache-Control "public, max-age=3600";

    proxy_set_header Authorization "*** 你的token ***";
    proxy_set_header Host $host;
    proxy_pass http://localhost:3000;
}
```

自次更新开始加入,表现效果也目前也尚不明确,整个过程还是比较轻松容易的.目前查看网站最下方即可看到统计的数据了
