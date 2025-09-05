---
title: use ca.cert for ubuntu browser
description: ubuntu中使用自签发CA证书 
slug: ca_ubuntu_browser
date: 2025-09-05
image: cert.png
category:
tags:
    - 
---

[书接上文](./) 在linux(ubuntu)中使用自签发的CA出现意料之外问题

首先第一步检查是否正确的安装了CA证书

```bash
openssl verify -CAfile /etc/ssl/certs/ca-certificates.crt ./ca.crt
```

> ./ca.crt: OK


使用curl的时候,可以正确工作的.但是在浏览器里面无法工作.

```bash
curl https://localhost/
```
> Hello World

![firefox中的错误]()

![edge的错误]()


排查发现这在浏览器不喜欢使用系统CA.解决问题的如下:

```bash
apt install -y p11-kit p11-kit-modules
ln -s -f /usr/lib/x86_64-linux-gnu/pkcs11/p11-kit-trust.so /usr/lib/x86_64-linux-gnu/nss/libnssckbi.so
ln -s -f /usr/lib/x86_64-linux-gnu/pkcs11/p11-kit-trust.so /usr/lib/firefox/libnssckbi.so
```

将对应的浏览器的证书组件组件替换为系统中的ssl证书验证组件

ps:不同浏览器版本,可能对应的nss组件路径不同,但是名字应该是一样的可以用find找到正确的路径
