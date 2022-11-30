<template>
  <div class="todo-footer" v-show="todos.length > 0">
    <label>
      <input type="checkbox" v-model="isCheckAll" />
    </label>
    <span>
      <span>已完成{{ count }}</span> / 全部{{ todos.length }}
    </span>
    <el-button type="danger" v-show="count > 0" @click="clearAllCompletedTodos">清除已完成任务</el-button>
  </div>
</template>
<script setup lang="ts">
import { computed } from "vue"
import { Todo } from "@/types/todo"

const props = defineProps<{
  todos: Todo[]
  checkAll: Function
  clearAllCompletedTodos: Function
}>()
console.log(props.todos)

// 已完成的计算属性操作
const count = computed(() => {
  return props.todos.reduce((pre: number, todo: { isCompleted: any }) => pre + (todo.isCompleted ? 1 : 0), 0)
})

// 全选/全不选的计算属性操作
const isCheckAll = computed({
  get() {
    return count.value > 0 && props.todos.length === count.value
  },
  set(val) {
    props.checkAll(val)
  }
})
</script>
<style scoped lang="scss">
/*footer*/
.todo-footer {
  height: 40px;
  line-height: 40px;
  padding-left: 6px;
  margin-top: 5px;

  label {
    display: inline-block;
    margin-right: 20px;
    cursor: pointer;

    input {
      position: relative;
      top: -1px;
      vertical-align: middle;
      margin-right: 5px;
    }
  }

  button {
    float: right;
    margin-top: 5px;
  }
}
</style>
