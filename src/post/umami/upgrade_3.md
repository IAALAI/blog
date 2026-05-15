---
title: "umami 复活,升级"
description: "umami服务意外挂掉了,尝试重新启动失败,最后完成一路升级"
date: 2026-05-06
image:
category: blog
tags:
---

书接上文 [博客访问量统计](../blog/visitor-statis),还有上上文 [umami](./index),之前 umami 的服务意外挂掉了,尝试重新启动失败,最后完成一路升级. `umami` 是什么就不再多做介绍了

之前老长一段时间之间.底部的 `访问量统计` 看起来就不再工作了.前面也一直懒得来管它.最近有时间,就来仔细排查排查.翻找一圈,看到跑的`umami`服务直接挂了,查找一圈发现整个项目的目录都不见了...

``` shell
sudo systemctl status analyze
```


``` txt
× analyze.service - umami data analytics
     Loaded: loaded (/etc/systemd/system/analyze.service; enabled; preset: enabled)
     Active: failed (Result: exit-code) since Thu 2026-05-07 16:05:51 CST; 19s ago
   Duration: 64ms
    Process: 6698 ExecStart=pnpm start (code=exited, status=200/CHDIR)
   Main PID: 6698 (code=exited, status=200/CHDIR)

May 07 16:05:51 himvf systemd[1]: Started analyze.service - umami data analytics.
May 07 16:05:51 himvf (pnpm)[6698]: analyze.service: Changing to the requested working directory failed: No such file or directory
May 07 16:05:51 himvf systemd[1]: analyze.service: Main process exited, code=exited, status=200/CHDIR
May 07 16:05:51 himvf systemd[1]: analyze.service: Failed with result 'exit-code'.
```

> 最后,才排查出来,跑 umami 的服务器,换了磁盘挂载的信息,所以项目文件全没了,服务也就直接挂掉了

以为最开始以为是误删了这个项目的目录...所以直接重新拉下来重新编译跑了,重新走之前的流程从github重新把项目拉下来,重新编译

下载完成之后,直接`check-db`的时候就报错了,大致看了一眼,报错该数据库已经存在表,看起来似乎是因为我直接调整数据库为之前的生产数据库.那就直接跳过`check-db`,选择进行`build-app`,没过多久就遇到了OOM,把整个编译进程干掉了

回想起来,我跑这个 `umami` 的小型设备内存只有2G,编译 `.next` 项目,对它来说好像压力还是太大了.之前可以编译成功,这次怎么不行了?一看好像是没开 swap.尝试开swap重新编译,开swap的时候发现,怎么外置的磁盘没有挂载,挂载之后才发现,之前的 `umamai` 还安安静静的躺在里面呢...

但是前面已经误以为把内容的清理了,把 systemctl 和 pnpm 的缓存都干掉了,干脆继续跑刚刚拉下来的吧.然后在开启 swap 之后,也是顺利编译成功.然后运行pnpm start运行.乍一看一切正常,但是仔细一看,所有数据都无法工作,控制台也出现报错,仔细报错信息: 数据库表异常.自己观察发现,当前运行版本似乎是为3,之前的版本是2,所以数据库不兼容了


![虽然能打开,但是暗藏玄机](https://r.iaalai.cn/blog/umamai_upgrade_3_error.avif)

``` txt
⨯ Error [PrismaClientKnownRequestError]: 
Invalid `prisma.website.findMany()` invocation:

The column `website.replay_enabled` does not exist in the current database.
    at async g (.next/server/chunks/[root-of-the-server]__0e3xplq._.js:3:566)
    at async u (.next/server/chunks/[root-of-the-server]__0e3xplq._.js:24:19808)
    at async u (.next/server/chunks/[root-of-the-server]__0f5juca._.js:1:544) {
  code: 'P2022',
  meta: {
    modelName: 'Website',
    driverAdapterError: Error [DriverAdapterError]: ColumnNotFound
        at M.onError (.next/server/chunks/[root-of-the-server]__0e3xplq._.js:1:367398)
        at M.performIO (.next/server/chunks/[root-of-the-server]__0e3xplq._.js:1:367339)
        at async M.queryRaw (.next/server/chunks/[root-of-the-server]__0e3xplq._.js:1:363925) {
      [cause]: [Object]
    }
  },
  clientVersion: '7.6.0'
}
```

备份数据库,迁移数据库,重新启动.成功完活!

``` shell
pnpm update-db
```

``` txt
> umami@3.1.0 update-db /mnt/project/umami_log
> prisma migrate deploy

Loaded Prisma config from prisma.config.ts.

Prisma schema loaded from prisma/schema.prisma.
Datasource "db": PostgreSQL database "umami", schema "public" at "umami"

19 migrations found in prisma/migrations

Applying migration `14_add_link_and_pixel`
Applying migration `15_add_share`
Applying migration `16_boards`
Applying migration `17_remove_duplicate_key`
Applying migration `18_add_performance`
Applying migration `19_add_session_replay`

The following migration(s) have been applied:

migrations/
  └─ 14_add_link_and_pixel/
    └─ migration.sql
  └─ 15_add_share/
    └─ migration.sql
  └─ 16_boards/
    └─ migration.sql
  └─ 17_remove_duplicate_key/
    └─ migration.sql
  └─ 18_add_performance/
    └─ migration.sql
  └─ 19_add_session_replay/
    └─ migration.sql

All migrations have been successfully applied.
```

![成功完活](https://r.iaalai.cn/blog/umamai_upgrade_3_error.avif)
