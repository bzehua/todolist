<template>
  <ul class="todo-main" v-show="todos.length">
    <Item
      v-for="(todo, index) in todos"
      :key="todo.id"
      :todo="todo"
      :deleteTodo="deleteTodo"
      :updateTodo="updateTodo"
      :index="index"
      @edit="handleEdit"
    />
  </ul>
</template>
<script setup lang="ts">
import Item from "./Item.vue"
import { Todo } from "@/types/todo"
defineProps<{
  todos: Todo
  deleteTodo: Function
  updateTodo: Function
}>()
const emit = defineEmits<{
  (e: "edit", { index: Number, title: String }): void
}>()
const handleEdit = (val) => {
  emit("edit", val)
}
</script>
<style scoped lang="scss">
/*main*/
.todo-main {
  margin-left: 0px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding: 0px;
}

.todo-empty {
  height: 40px;
  line-height: 40px;
  border: 1px solid #ddd;
  border-radius: 2px;
  padding-left: 5px;
  margin-top: 10px;
}
</style>
