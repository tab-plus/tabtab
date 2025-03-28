<!--
 * @Author: panrunjun
 * @Date: 2024-08-27 18:52:41
 * @LastEditors: Do not edit
 * @LastEditTime: 2025-03-26 13:47:19
 * @Description: 
 * @FilePath: \ytab-master\README.md
-->

# Tatab - 个性化浏览器主页
![Project Screenshot](http://106.52.154.20:9000/tabs/1743055445341-1.png)

## 🌟 项目简介
Tatab 是一个支持高度个性化定制的浏览器主页，提供多种实用组件，帮助您打造专属的上网入口。
**在线体验**: [http://106.52.154.20/#/home](http://106.52.154.20/#/home)

## 🛠️ 技术栈

| 技术          | 用途               |
|---------------|--------------------|
| Vue 3         | 前端框架           |
| TypeScript    | 类型安全           |
| Pinia         | 状态管理           |
| SCSS          | 样式预处理         |
| Axios         | HTTP 客户端        |
| Vite          | 构建工具           |

## 🚀 快速开始

## 如何部署到本地
> 1.克隆仓库

> 2.npm i

> 3.最外层文件夹中新建开发环境的配置文件：.env.development
    
    ```
    #开发环境配置文件

    # url
    VITE_BASE_URL = 'http://127.0.0.1:3034'

    # 高德地图 key (官网免费获取)
    VITE_GAUD_KEY = ''

    # 高德地图 API
    VITE_GAUD_BASE_API = 'https://restapi.amap.com/v3'

    # 和风天气 key (官网免费获取)
    VITE_WEATHER_KEY = ''

    # 和风天气 API
    VITE_WEATHER_BASE_API = 'https://devapi.qweather.com/v7/weather'


> 4.运行npm run dev

## 📂 项目目录结构

| 目录        | 说明                  |
|-------------|----------------------|
| `api/`      | 接口请求封装          |
| `assets/`   | 静态资源（图片/字体等）|
| `components/` | 公共组件库          |
| `lib/`      | 第三方依赖库          |
| `store/`    | 状态管理（Pinia/Vuex）|
| `utils/`    | 工具函数集合          |
| `views/`    | 页面级组件            |
| `json/`     | 本地JSON数据文件      |
| `layout/`   | 全局布局组件          |
| `styles/`   | 全局样式文件          |
| `types/`    | TypeScript类型定义    |
| `router/`   | 路由配置              |
| `hooks/`    | 自定义Hooks           |

## 🧩 功能组件
| 组件       | 状态 |  版本 | 说明 |
|-----------------|--------|-----------------|--------|
| 日历组件        | ✅     | v1.0 | 支持日期查看与事件提醒|
| 备忘录组件      | ✅     |v1.0 | 支持富文本与分类管理|
| 热搜组件        | ✅     |v1.0 | 实时显示各平台热搜|
| 翻译组件        | 🚧   |v1.5 | 开发中|
| AI大模型组件    | ⏳   |v2.0 | 规划中|
| 天气组件        | 🚧   |v1.5 | 开发中|

## 📝 git提交
- feat：提交新功能
- fix：修复了bug
- docs：只修改了文档
- style：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）
- refactor：代码重构，既没修复bug也没有添加新功能
- perf：性能优化，提高性能的代码更改
- test：添加或修改代码测试
- chore：对构建流程或辅助工具和依赖库（如文档生成等）的更改

## 样式指南
- 全局样式定义于 src/styles/index.scss
- 类名使用 tab- 前缀 (如 .tab-container)
- 组件样式使用 CSS Modules 或 scoped style

## 最佳实践
- 使用 TypeScript 进行类型约束
- 组件按功能划分目录
- 复杂逻辑抽离为自定义Hook
- API 请求统一封装管理

## 🤝 参与贡献
欢迎通过以下方式参与项目：
- 提交 Issue 报告问题或建议
- Fork 项目并提交 Pull Request
- 完善项目文档

## 📄 许可证
MIT License © 2024-Present PanRunJun


