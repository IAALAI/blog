---
title: build nginx on alpine
date: 2024-06-03
description: 是时候让我的VPS开始工作了,首当其中的就是http服务了
slug: build-nginx-alpine
image: nginx_start.png
series: alpine-vps
category: vps
tags:
    - alpine
    - nginx
    - build
    - c
---

# 手动编译nginx

[承接上文](),是时候让我的 `alpine` VPS 开始工作起来了,首当其中的就是 http 服务了

整体过程对比 `ubuntu` 坎坷不少

不建议再使用 `boringSSL` 了,这个谷歌的库不保证abi兼容性,现在已经是出问题了,现在更建议``

## 前置准备

开始前可以先考虑根据需求选择把软件源切换到国内:

``` shell
sed -i 's/dl-cdn.alpinelinux.org/mirrors.tuna.tsinghua.edu.cn/g' /etc/apk/repositories
```

### 必要软件

提前使用 apk 安装一些必要的软件:

* git

* C build tools

> 可以自行选择使用clang或者gcc

* linux-headers

``` shell
apk add git cmake clang++ cmake ninja linux-headers build-base libc-dev
```

如果是使用了clang++还需要将默认的编译器调整一下:

``` shell
export CC=/usr/bin/clang
export CXX=/usr/bin/clang++
```

### 依赖库

有两个库可以选择从apk添加,也可以选择自行获取: pcre-dev 和 zlib-dev

``` shell
apk add pcre-dev zlib-dev
```

### ssl 库

还有一个是准备ssl类库

这里建议使用 `libressl`, 因为 `boringssl` 是不保证abi兼容的,新版本已经是出现问题了

``` shell
git clone https://github.com/libressl/portable --depth=1
mv ./portable libressl && cd libressl
mkdir build && cd build
cmake -G "Ninja" .. && ninja
```

如果到达此时如果工作正常应该在当前的 `libress` / `build` 目录之后应该正确的生成了 `crypto` 和 `ssl`

## 正式工作

整体流程与之前的普通也差不多.可以完全按照官网走

> 以下的编译的时候,模块最好是按需添加,可能需要根据你的实际情况微调一下

``` shell
git clone https://github.com/nginx/nginx.git --depth=1
cd nginx
#/usr/bin/ash
ash  ./auto/configure \
    --prefix=/usr/lib/nginx \
    --with-stream \
    --with-stream_ssl_module \
    --with-http_v2_module \
    --with-http_v3_module \
    --with-http_ssl_module \
    --with-http_stub_status_module \
    --with-http_gzip_static_module \
    --with-http_sub_module \
    --with-http_flv_module \
    --with-http_addition_module \
    --with-http_realip_module \
    --with-http_mp4_module \
    --with-http_dav_module \
    --with-cc-opt="-I../libressl/build/include" \
    --with-ld-opt="-L../libressl/build/ssl -L../libressl/build/crypto" \
    --with-openssl="../libressl"
make
make install
```

然后此时 `nginx` 就安装完成了,接下来可以直接使用 `nginx` 命令启动了

``` shell
/usr/bin/nginx
```

接下来访问服务器的80端口就应该可以看到正确的 `nginx` 的欢迎页面了

![nginx start](nginx_start.png)

## 设为服务

alpine下并不是使用systemctl来管理服务,而是使用openrc来管理服务,需要在 `/etc/init.d/` 下手动创建`nginx`

``` shell
#!/sbin/openrc-run

name="nginx"
description="nginx - high performance web server"
command="/usr/lib/nginx/sbin/nginx"
command_args=""
pidfile="/usr/lib/nginx/logs/nginx.pid"
command_background="yes"

depend() {
    need net
}
# 回头调整为以引入额外的链接形式导入代码
```
