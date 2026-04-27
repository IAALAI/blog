---
title: "Immich 启动!"
description: "强大的开源照片管理工具,使用人工智能来帮助你管理照片"
date: 2026-04-21
image:
tags:
    - immich
    - media
---

## immich

immich,是知名的开源图片管理组件,其内置强大的深度学习搜索等功能,看起来很厉害,准备入手尝试尝试

扩展我的媒体库计划的一部分

## start

[参考教程 immich官方文档](https://docs.immich.app/install/docker-compose/)

immich本身架构较为复杂,具有多个依赖组件,因此官方推荐使用 docker-compose 进行部署,虽然我最初尝试手动部署,但是中间失败了

警告,以下内容基本上是官方文档:

1. 下载各种依赖的文件

先从创建一个单独的目录开始,在这里目录里面放置项目需要的各个文件,比如`docker-compose.yml`和`.env`文件等,然后先下载官方模板的`docker-compose.yml`与`.env`文件

``` sh
mkdir ./immich-app
cd ./immich-app
wget -O docker-compose.yml https://github.com/immich-app/immich/releases/latest/download/docker-compose.yml
wget -O .env https://github.com/immich-app/immich/releases/latest/download/example.env
```

你也可以选择从浏览器下载这两个文件,然后将它们移动到你创建的目录中,在这种情况下,确保将 `example.env` 重命名为 `.env` (! 不建议 !)

2. 调整你的`.env`,自定义其中的参数

> 如果你想要看到完整详细的文档的话,它会在 [这里: https://docs.immich.app/install/environment-variables](https://docs.immich.app/install/environment-variables)

以下是它默认的内容:

``` sh
# 这里就是你上传照片会保存在的目录 
UPLOAD_LOCATION=./library

# 这里就是你的数据库文件会保存的目录.当然,使用外部网络的数据库,这个参数就不需要了
DB_DATA_LOCATION=./postgres

# 设置时区：取消下一行的注释，并将 Etc/UTC 替换为你需要的时区标识，时区列表见：https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List
# TZ=Etc/UTC

# Immich 版本号，可以指定为具体版本，比如 "v2.1.0"
IMMICH_VERSION=v2

# 连接上数据库的用户名和数据库名
DB_USERNAME=postgres
DB_DATABASE_NAME=immich
# 连接上 Postgres 数据库的密码
DB_PASSWORD=postgres
```

3. 启动容器

在第 1 步创建的目录下（此时应包含你刚刚下载与配置的 `docker-compose.yml` 和 `.env` 文件），运行以下命令以后台方式启动 Immich 服务：

``` sh
docker compose up -d
```

## run

如果是按照官方教程用docker把这个项目跑起来,还是比较容易的.不过我最开始希望手动部署4个组建,然后直接在服务器运行的.只不过最后卡在了它的深度学习服务,一直都跑不起来.最后只好选择了官方的docker方案...不过数据库最后还是单独手动配置在了docker之外

跑起来之后的效果还是不错的

![immich](https://r.iaalai.cn/blog/immich/full_ui.avif)

## option

默认的 immich,它的深度学习智能功能是针对英文开发,如果是中文的话,还需要额外的单独配置AI模型

从右上角的 `Administration` 进入,找到 `Machine Learning Settings` 选项,然后是里面的 `Smart Search`,配置其中的 `CLIP model`,建议选择为 `XLM-Roberta-Large-Vit-B-16Plus`,这个模型应该是在中文环境下表现很出色的模型了

![set_model](https://r.iaalai.cn/blog/immich/set_model.avif)

对了,下载模型,需要可观的网络环境.这个记得自行提前准备.

## forgot passwd

写这篇文章的时候,距离最开始部署 `immich` 已经过去了一周了...没想到才一周就给忘了最开始随便乱写的用户名和密码...

关于找回用户名,可以直接进数据库里面看,然后密码可以参考以下代码进行重置:

``` sh
docker exec -it immich_server immich-admin reset-admin-password
```
