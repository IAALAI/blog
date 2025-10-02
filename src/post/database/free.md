---
title: 免费的数据库服务
description: 
date: 2025-04-03
tags:
    - free
    - todo
draft: true
---

## 免费的数据库服务

### SQLdb

| 数据库类型 | 名称 |  限制策略 | 说明 |
| --- | --- | ---  | --- |
| MySQL | [TiDB Cloud](https://tidbcloud.com/) | 5GB and 5M RU to 5 node(网络流量占用RU单位) | 国产之光,非常的慷慨大方 |
| Postgre | [Neon](https://neon.tech/) | 0.5GB abd 190 CU | 延迟比supabase偏高,但是有ipv4 |
| Postgre | [Xata](https://xata.io/) | 15GB |  |
| Postgre | [supabase](https://supabase.com/) | 0.5GB and 5G net to 2 node | 整体表现不错,唯一的缺点是只有ipv6可以直连,ipv4需要连接池 |
| MySQL,Postgre,* | [aiven](https://aiven.io/) | 1GB,1GB,* | 超时关闭,但是整体还是比较给力的,提供多种服务 |
| Postgre | [koyeb](https://www.koyeb.com/) | 1GB | 限制计算时长 |

### mongodb

至于 MongoDB 的话我只建议 [Mongodb atlas](https://mongodb.com),限制512MB
