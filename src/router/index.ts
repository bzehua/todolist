/*
 * @Description:
 * @Author: Bzehua
 * @Date: 2022-05-10 23:49:35
 * @LastEditors: Bzehua
 * @LastEditTime: 2022-05-11 22:40:19
 */
import { createRouter, createWebHashHistory, RouteRecordRaw } from "vue-router"

/** 常驻路由 */
export const constantRoutes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/todoList"
  },
  {
    path: "/helloWord",
    component: () => import("@/views/helloWorld/HelloWorld.vue"),
    meta: {
      hidden: true
    }
  },
  {
    path: "/todoList",
    component: () => import("@/views/TodoList/Index.vue"),
    meta: {
      hidden: true
    }
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes: constantRoutes
})

export default router
