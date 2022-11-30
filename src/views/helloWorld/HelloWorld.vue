<!--
 * @Description: 
 * @Author: Bzehua
 * @Date: 2022-05-10 23:57:12
 * @LastEditors: Bzehua
 * @LastEditTime: 2022-05-11 00:41:02
-->
<template>
  <div class="hello-world">
    <img alt="Vue logo" src="@/assets/logo.png" />
    <h1>{{ msg }}</h1>
    <svg-icon name="dashboard" />
    <p>
      Recommended IDE setup:
      <a href="https://code.visualstudio.com/" target="_blank">VS Code</a>
      +
      <a href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</a>
    </p>

    <p>See <code>README.md</code> for more information.</p>

    <p>
      <a href="https://vitejs.dev/guide/features.html" target="_blank"> Vite Docs </a>
      |
      <a href="https://v3.vuejs.org/" target="_blank">Vue 3 Docs</a>
    </p>

    <button type="button" @click="count++">count is: {{ count }}</button>
    <p>
      Edit
      <code>components/HelloWorld.vue</code> to test hot module replacement.
    </p>
    {{ globalStore.token }}
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue"
import { useRoute } from "vue-router"
import { GlobalStore } from "@/store"

defineProps<{ msg: string }>()

const count = ref(0)

const route = useRoute()
console.log(route.query)
const globalStore = GlobalStore()
globalStore.setToken("token")
</script>

<style lang="scss" scoped>
.hello-world {
  text-align: center;
  margin-top: 20px;

  a {
    color: #42b983;
  }

  label {
    margin: 0 0.5em;
    font-weight: bold;
  }

  code {
    background-color: #eee;
    padding: 2px 4px;
    border-radius: 4px;
    color: #304455;
  }
}
</style>
