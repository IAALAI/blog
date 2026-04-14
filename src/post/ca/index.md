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

虽然可以申请免费的ssl证书,但是有的时候还是用自己签发ca证书更加的方便.

生成自签发ca证书,里面的日期和subj信息都可以根据需要修改

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


最后是linux,这里只展示ubuntu的情况,其他发行版类似

``` bash
sudo cp ca.crt /usr/local/share/ca-certificates/
sudo update-ca-certificates
```
## 使用该ca证书签发一个ssl证书

先准备一个签发ssl的cnf,新建 `ssl.cnf` 文件,加入以下内容,注意替换信息为自己需要的内容

``` bash
[ req ]
default_bits       = 2048
prompt             = no
default_md         = sha256
req_extensions     = req_ext
distinguished_name = dn

[ dn ]
C  = UK # Country Name
ST = London # State or Province Name
L  = Westminster # Locality Name
O  = PAOxe # Organization Name
OU = policy all order external # Organizational Unit Name
CN = UK # Common Name

[ req_ext ]
subjectAltName = @alt_names

[ alt_names ]
DNS.1 = a.iaalai.cn # 你需要应用的域名 
DNS.2 = b.iaalai.cn # 可以添加多个域名
```

接下来就可以使用该cnf文件和之前生成的ca证书来签发ssl证书了,注意其中的路径替换为正确的路径

``` bash
# 然后生成证书私钥
openssl genrsa -out ssl.key 2048
# 使用该私钥和cnf文件生成证书签名请求
openssl req -new -key ./ssl.key -config ./ssl.cnf -out ssl.csr
# 生成证书签名请求
openssl x509 -req -in ssl.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out ssl.crt -days 277 -extfile ssl.cnf -extensions req_ext
```

## 效果展示

![忘了截图android](./android_effect.avif)