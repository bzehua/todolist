import { createApp } from "vue"
import router from "./router"
import App from "./App.vue"
import ElementPlus from "element-plus"
import "element-plus/dist/index.css"
import "element-plus/theme-chalk/dark/css-vars.css"
import loadSvg from "@/icons"
import store from "@/store/index"
const app = createApp(App)
/** element-plus 组件完整引入 */
app.use(ElementPlus)
/** 加载全局 svg */
loadSvg(app)

app.use(router).use(store).mount("#app")
