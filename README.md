## 本项目基于[gitstars](https://github.com/Monine/gitstars)项目，并在此基础上扩展而来，新增了自由仓库的管理功能

---
# Vue 源码版本 Gitrepos

访问地址：[http://tools4git.tk/gitrepos](http://tools4git.tk/gitrepos)

> 正式环境应用源码

## 自行gitpage部署方式

1. fork本项目

2. 自行申请 github oauth Apps，路径：头像->Settings->Developer settings->OAuth Apps

3. 修改src/config.js中的clientId和clientSecret为第二步刚申请的信息

4. 在settings中开启Github Page 服务，即可使用 http://用户名.github.io/gitrepos 进行访问（前提已创建【用户名.github.io】项目且开启Github Page服务）

5. 如果你要开启站点统计，请自行注册百度统计和Google统计账号，获取并替换index.html中的站点统计代码

## 技术栈

- vue
- vuex
- element-ui
- axios
- vuedraggable (sortablejs)
- vue-i18n

## 数据结构

### Tag

目前有三种类别的标签：默认、自定义和语言

- 默认标签成员有三个：自有项目（all）、Start项目(star)以及未标签（untagged）
- 自定义标签为用户添加
- 语言标签是 repository language

``` js
{ id: Number, name: String, repos: Array }

// repos 成员是 repository id
```

### repository

repository 的数据都来自 Github API 返回结果，包含一系列自身属性，Gitrepos 会添加两个个新属性：
- _customTags 保存 repository 所拥有的自定义标签集合。
- isStarRepo 标记 repository 是否为star项目
``` js
{ id: Number, _customTags: Array, isStarRepo: true/false,... }

// _customTags 成员是 自定义标签（引用集合）
// isStarRepo  成员是 star项目标记（布尔类型）
```
