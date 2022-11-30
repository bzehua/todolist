<template>
  <li
    @mouseenter="mouseHandler(true)"
    @mouseleave="mouseHandler(false)"
    :style="{ backgroundColor: bgColor, color: ftColor }"
  >
    <label>
      <input type="checkbox" v-model="isComptete" />
      <span class="task-name" :class="isComptete ? 'decoration' : ''">{{ todo.title }}</span>
    </label>
    <div v-show="!isShow" class="time">{{ todo.time }}</div>
    <el-button v-show="isShow" type="text" small @click="delTodo">删除</el-button>
    <el-button v-show="isShow && !isComptete" type="text" small @click="editTodo">编辑</el-button>
  </li>
</template>
<script setup lang="ts">
import { ref, computed } from "vue"
import { ElMessage, ElMessageBox } from "element-plus"
// 引入接口
import { Todo } from "@/types/todo"

const props = defineProps<{
  todo: Todo
  deleteTodo: Function
  index: Number
  updateTodo: Function
}>()

// 背景色
const bgColor = ref("#ffffff")
// 文字颜色
const ftColor = ref("#222222")
// 设置按钮默认不显示
const isShow = ref(false)

// 鼠标进入和离开事件的回调函数
const mouseHandler = (flag: boolean) => {
  if (flag) {
    // 鼠标进入
    bgColor.value = "#f5f5f5"
    ftColor.value = "#337ecc"
    isShow.value = true
  } else {
    // 鼠标离开
    bgColor.value = "#ffffff"
    ftColor.value = "#222222"
    isShow.value = false
  }
}

// 删除数据的方法
const delTodo = () => {
  // 提示
  ElMessageBox.confirm("确定要删除该任务吗?", "提示", {
    confirmButtonText: "确定",
    cancelButtonText: "取消",
    type: "warning",
    autofocus: false
  }).then(() => {
    ElMessage({
      type: "success",
      message: "删除成功"
    })
    props.deleteTodo(props.index)
  })
}

const emit = defineEmits<{
  (e: "edit", { index: Number, title: String }): void
}>()
const editTodo = () => {
  emit("edit", { index: props.index, title: props.todo.title })
}

// 计算属性的方式---来让当前的复选框选中/不选中
const isComptete = computed({
  get() {
    return props.todo.isCompleted
  },
  set(val) {
    props.updateTodo(props.todo, val)
  }
})
</script>
<style scoped lang="scss">
/*item*/
li {
  list-style: none;
  height: 36px;
  line-height: 36px;
  padding: 0 15px 0 5px;
  border-bottom: 1px solid #ddd;
  cursor: pointer;

  label {
    float: left;
    cursor: pointer;

    input {
      vertical-align: middle;
      margin-right: 6px;
      position: relative;
      top: -1px;
    }
  }

  & > li label.task-name {
    margin-left: 10px;
  }

  .task-name {
    &.decoration {
      text-decoration: line-through;
    }
  }

  .time {
    float: right;
    color: #999999;
    font-size: 14px;
  }

  button {
    float: right;
    /* display: none; */
    margin-top: 3px;
  }

  .el-button {
    margin-left: 10px;
  }

  &:last-child {
    border-bottom: none;
  }
}
</style>
