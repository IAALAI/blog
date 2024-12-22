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
