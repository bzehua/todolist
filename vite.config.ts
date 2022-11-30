import { defineConfig } from "vite"
import vue from "@vitejs/plugin-vue"
import * as path from "path"
import { createSvgIconsPlugin } from "vite-plugin-svg-icons"
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    //设置别名
    alias: {
      "@": path.resolve(__dirname, "src")
    }
  },
  /** vite 插件 */
  plugins: [
    vue(),
    /** svg */
    createSvgIconsPlugin({
      iconDirs: [path.resolve(process.cwd(), "src/icons/svg")],
      symbolId: "icon-[dir]-[name]"
    })
  ],
  server: {
    /** 是否开启 https */
    https: false,
    /** host 设置为 true 才可以使用 network 的形式，以 ip 访问项目 */
    host: true, // host: "0.0.0.0"
     /** 端口号 */
    port: 8080, //启动端口
    /** 是否自动打开浏览器 */
    open: true,
    /** 跨域设置允许 */
    cors: true,
    // 设置 https 代理
    /** 端口被占用时，是否直接退出 */
    strictPort: false,
    proxy: {
      "/api": {
        target: "your https address",
        changeOrigin: true,
        rewrite: (path: string) => path.replace(/^\/api/, "")
      }
    }
  },
  build: {
    brotliSize: false,
    /** 消除打包大小超过 500kb 警告 */
    chunkSizeWarningLimit: 1000,
    /** vite 2.6.x 以上需要配置 minify: terser，terserOptions 才能生效 */
    minify: "terser",
    /** 在 build 代码时移除 console.log、debugger 和 注释 */
    terserOptions: {
      compress: {
        drop_console: false,
        drop_debugger: true,
        pure_funcs: ["console.log"]
      },
      output: {
        /** 删除注释 */
        comments: false
      }
    },
    /** 打包后静态资源目录 */
    assetsDir: "static"
  }
})
