# tatab

## 各文件夹说明
- api：接口文件夹
- assets：资源文件夹
- components：组件文件夹
- lib：第三方库文件夹
- store：vuex文件夹
- utils：工具文件夹
- views：页面文件夹
- json：json文件
- layout：布局文件夹
- styles：样式文件夹
- types：类型文件夹
- router：路由文件夹
- hooks：hooks文件夹

## 更新方向
- video标签中的poster属性，解决了视频正在下载时显示的图像，直到用户点击播放按钮。这边的优化我后期再做吧。举例：poster="https://files.codelife.cc/itab/defaultWallpaper/videos/00.jpg"
- 样式调整
- 组件增加

## 如何部署到本地
> 1.npm i

> 2.最外层文件夹中新建开发环境的配置文件：.env.development
    
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


> 3.运行npm run dev


## git提交规范
- feat：提交新功能
- fix：修复了bug
- docs：只修改了文档
- style：调整代码格式，未修改代码逻辑（比如修改空格、格式化、缺少分号等）
- refactor：代码重构，既没修复bug也没有添加新功能
- perf：性能优化，提高性能的代码更改
- test：添加或修改代码测试
- chore：对构建流程或辅助工具和依赖库（如文档生成等）的更改

## 开发规范
- 全局样式放在src/styles/index.scss 统一用 tab-XXX 类名  如：tab-red
- 


