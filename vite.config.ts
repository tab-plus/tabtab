/*
 * @Author: panrunjun
 * @Date: 2024-07-22 21:46:02
 * @LastEditors: Do not edit
 * @LastEditTime: 2024-08-21 20:31:52
 * @Description: 
 * @FilePath: \ytab-master\vite.config.ts
 */
import path, {resolve} from "path"
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'

import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'  //svg雪碧图插件
import AutoImport from 'unplugin-auto-import/vite'  //第三方库声明文件自动插入


export default defineConfig({
  base: './',   //等同于vue-cli中publicPath基础路由，静态资源引用前正确路径
  plugins: [
    vue(),
    vueSetupExtend(),   //vue script setup syntax support the name attribute 再script标签中可以设置当前setup的name
    vueJsx(),
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), 'src/icons/common')],  // 指定需要缓存的图标文件夹
      symbolId: 'icon-[dir]-[name]'  // 指定symbolId格式
    }),
    //按需加载插件
    Components({
      resolvers: [
        AntDesignVueResolver(),
      ],
    }),
    AutoImport({
      imports: [
        'vue',
        'pinia',
        'vue-router'
      ],
      //auto generation auto-imports.d.ts file  //自动生成auto-imports.d.ts文件
      //auto-imports.d.ts 文件的解释：
      //在 d.ts 声明文件中，任何的 declare 默认就是 global 的了，所以你在 d.ts 文件中是不能出现 declare global 的。只有在模块文件中的定义，如果想要全局就使用 declare global
      //当使用第三方库时，我们需要引用它的声明文件，才能获得对应的代码补全、接口提示等功能
      //注意即使此声明文件不需要导出任何东西，仍然需要导出一个空对象，用来告诉编译器这是一个模块的声明文件，而不是一个全局变量的声明文件。
      dts: true
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      path: "path-browserify",  //解决在浏览器中使用类似node原生path模块的问题
    }
  },
  css: {
    preprocessorOptions: {
      //define global scss variable 全局css变量可使用
      scss: {
        additionalData: `@import "@/styles/variables.scss";`
      }
    }
  },
    server: {
      hmr: { overlay: false }, // 禁用或配置 HMR 连接 设置 server.hmr.overlay 为 false 可以禁用服务器错误遮罩层
      port: 5008, // 指定服务器端口;
      open: true, // 服务器启动时自动在浏览器中打开应用程序；
      cors: true, // 类型： boolean | CorsOptions 为开发服务器配置 CORS。默认启用并允许任何源
      proxy: {
        '/api': {
          // target: 'http://127.0.0.1:3034',
          target: 'http://8.138.112.139:3034',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, '')
        }
      },
    },
  //打包相关配置
  build: {
    //target: 'es2015',
    minify: 'terser',
    brotliSize: false,   //禁用构建的 brotli 压缩大小报告。可以稍微改善构建速度
    chunkSizeWarningLimit: 1000,      //chunk 大小警告的限制（以 kbs 为单位）
    //remote console.log in prod
    terserOptions: {
      //detail to look https://terser.org/docs/api-reference#compress-options
      compress: {
        drop_console: false,
        pure_funcs: ['console.log', 'console.info'],
        drop_debugger: true
      }
    },
    //打包静态资源分离
    assetsDir: 'static/assets',
    rollupOptions: {
      output: {
        chunkFileNames: 'static/js/[name]-[hash].js',
        entryFileNames: 'static/js/[name]-[hash].js',
        assetFileNames: 'static/[ext]/[name]-[hash].[ext]'
      }
    }
  },
  // 默认情况下，不在 node_modules 中的，链接的包不会被预构建。使用此选项可强制预构建链接的包。比如强制构建'moment-mini'的包
  // optimizeDeps: {
  //   include: ['moment-mini']
  // }
})
