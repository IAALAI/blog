---
title: 自签发ca证书
description: 自签发ca证书,以及其位于各个平台的分发与使用.windows,android,linux等,还得是用自己的ca证书方便
slug: ca_start
date: 2025-08-30
image: cert.png
category: 
tags:
    - 
---

虽然可以申请免费的ssl证书,但是很多时候还是用自己签发ca证书更加的方便.

``` bash
openssl genrsa -des3 -out ca.key 2048
openssl req -x509 -new -key ca.key -sha256 -days 3650 -out ca.crt -subj "/C=US/ST=California/L=Los Angeles/O=CA/OU=CA/CN=CA"
```

开始尝试分发该证书,windows导入,效果很完美

![忘了截图windows了](./win_install.avif)

![忘了截图windows了](./win_effect.avif)

下一个进行android分发,和windows一样的流程,在设置里面找到安装ca证书.然后选择即可效果一样不错

![忘了截图android](./android_install.1.avif)

![忘了截图android](./android_install.2.avif)

![忘了截图android](./android_effect.avif)

最后是linux,这里只展示ubuntu的情况,其他发行版类似

``` bash
sudo cp ca.crt /usr/local/share/ca-certificates/
sudo update-ca-certificates
```
