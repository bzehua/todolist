<template>
  <div class="todo-container">
    <h2>任务列表</h2>
    <div class="todo-wrap">
      <Header :addTodo="addTodo" />
      <List :todos="state.todos" :deleteTodo="deleteTodo" :updateTodo="updateTodo" @edit="handleEdit" />
      <Footer :todos="state.todos" :checkAll="checkAll" :clearAllCompletedTodos="clearAllCompletedTodos" />
    </div>
    <p class="empty" v-show="!state.todos.length">还没有任务！</p>
  </div>
  <el-dialog v-model="dialogVisible" title="编辑" width="30%">
    <el-input v-model="taskName" />
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleConfirm">确定</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ElMessage } from "element-plus"
import { ref, onMounted, reactive, watch } from "vue"
import Header from "@/components/TodoList/Header.vue"
import List from "@/components/TodoList/List.vue"
import Footer from "@/components/TodoList/Footer.vue"
import { Todo } from "@/types/todo"
import { saveTodos, readTodos } from "@/utils/localStorageUtils"

const state = reactive<{ todos: Todo[] }>({
  todos: []
})

const dialogVisible = ref(false)
const taskName = ref("")
const taskIndex = ref("")

// 界面加载完毕后过了一会再读取数据
onMounted(() => {
  setTimeout(() => {
    state.todos = readTodos()
  }, 10)
})

// 添加数据的方法
const addTodo = (todo: Todo) => {
  state.todos.unshift(todo)
}

// 删除数据的方法
const deleteTodo = (index: number) => {
  state.todos.splice(index, 1)
}

// 修改todo的isCompleted属性的状态
const updateTodo = (todo: Todo, isCompleted: boolean) => {
  todo.isCompleted = isCompleted
}

// 全选或者是全不选的方法
const checkAll = (isCompleted: boolean) => {
  state.todos.forEach((todo) => {
    todo.isCompleted = isCompleted
  })
}

// 清理所有选中的数据
const clearAllCompletedTodos = () => {
  state.todos = state.todos.filter((todo) => !todo.isCompleted)
}

// 编辑
const handleEdit = (todos) => {
  dialogVisible.value = true
  taskName.value = todos.title
  taskIndex.value = todos.index
}

const handleConfirm = () => {
  state.todos.map((item, index) => {
    if (index === taskIndex.value) {
      item.title = taskName
    }
    return item
  })
  dialogVisible.value = false
  ElMessage({ type: "success", message: "编辑成功" })
}

watch(() => state.todos, saveTodos, { deep: true })
</script>
<style scoped lang="scss">
/*todoList*/
.todo-container {
  width: 600px;
  margin: 0 auto;
  .todo-wrap {
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
  }
  .empty {
    text-align: center;
    color: #999999;
  }
}
</style>
