---
title: "使用 Intersection Observer 进行懒加载"
date: 2024-06-22
description: 
slug: "learn_Intersection_Observer"
category: Frontend
tags:
    - javascript
---

## 起因

接到公司任务,修复一个错误的页面

公司内部一个历史悠久的后台页面,历经多年迭代,需要填写的表单字段数接近 500 个,且大量选项依赖数据库实时查询,渲染逻辑复杂

在内网环境下，打开加载到可操作时间约 4.5s;生产环境网络条件更差,页面直接白屏卡死,已无法进行使用

## 判断瓶颈

该页面使用频率较低,涉及逻辑复杂,大量动态数据,在多年更迭中达到了巨大规模

该信息具有大量字段,接近500个,与此同时许多选项依赖现存数据库数据,各个字段都存在不同的加载和渲染逻辑

该页面存在巨大的渲染压力

## 解决方案

优化页面加载逻辑,使用 Intersection Observer 进行懒加载,以加速页面加载速度

```javascript
// 获取需要观察的元素
const target = document.querySelector('#app');

// 创建 Intersection Observer 实例
const observer = new IntersectionObserver((entries) => {
  
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      console.log('the target in viewport');
        // 完成初始化之后 终止观察
      observer.disconnect();
    } else {
      console.log('the target out of viewport');
    }
  });
}, {
    threshold: 0.5   // 当元素 50% 可见时触发回调
});

// Intersection Observer 开始观察目标元素
observer.observe(target);
```

## 结后语

通过如上方案,显著加快了页面加载速度,提升了用户体验,如此大规模的表单,交互也是一部分一部分的进行, IntersectionObserver 也不会对体验有负面影响

在元素完成初始化之前,先使用骨架屏展示,然后在元素进入视口时,再加载数据,还可以额外调配回调函数,对其进行限流,避免频繁触发

使用该方案之后,内网的加速速度从 4.5s 降到了 67ms,后续配合其他优化手段,使得生产环境也从直接白屏卡死优化到了200ms即可进行操作
