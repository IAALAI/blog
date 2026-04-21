---
title: "Immich 启动!"
description: "强大的开源照片管理工具,使用人工智能来帮助你管理照片"
date: 2026-04-21
image:
tags:
    - immich
    - media
draft: true
---

## immich

immich,是知名的开源图片管理组件,其内置强大的深度学习搜索等功能,看起来很厉害,准备入手尝试尝试

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

# To set a timezone, uncomment the next line and change Etc/UTC to a TZ identifier from this list: https://en.wikipedia.org/wiki/List_of_tz_database_time_zones#List
# TZ=Etc/UTC

# The Immich version to use. You can pin this to a specific version like "v2.1.0"
IMMICH_VERSION=v2

# Connection secret for postgres. You should change it to a random password
# Please use only the characters `A-Za-z0-9`, without special characters or spaces
DB_PASSWORD=postgres

# The values below this line do not need to be changed
###################################################################################
DB_USERNAME=postgres
DB_DATABASE_NAME=immich
```

    Populate UPLOAD_LOCATION with your preferred location for storing backup assets. It should be a new directory on the server with enough free space.
    Consider changing DB_PASSWORD to a custom value. Postgres is not publicly exposed, so this password is only used for local authentication. To avoid issues with Docker parsing this value, it is best to use only the characters A-Za-z0-9. pwgen is a handy utility for this.
    Set your timezone by uncommenting the TZ= line.
    Populate custom database information if necessary.

Step 3 - Start the containers

From the directory you created in Step 1 (which should now contain your customized docker-compose.yml and .env files), run the following command to start Immich as a background service:
Start the containers

docker compose up -d

## run

整个项目跑起来,还是比较容易的,不过我的数据库是单独选择了配置在网络的数据库

## option

默认的 immich,它的深度学习智能功能是针对英文开发,如果是中文的话,还需要额外的单独配置AI模型

