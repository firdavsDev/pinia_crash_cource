<template>
  <main>
    <h1>Todo List</h1>
    <div style="margin-bottom: 16px">
      <a-dropdown>
        <template #overlay>
          <a-menu @click="handleMenuClick">
            <a-menu-item key="1"> All </a-menu-item>
            <a-menu-item key="2"><CheckCircleOutlined /> Finished </a-menu-item>
            <a-menu-item key="3"
              ><close-circle-outlined /> Unfinished
            </a-menu-item>
          </a-menu>
        </template>
        <a-button>
          Filter (soon!)
          <DownOutlined />
        </a-button>
      </a-dropdown>
    </div>

    <!-- add input  -->
    <div style="margin-bottom: 16px">
      <a-input-search
        v-model:value="text"
        placeholder="Enter New Todo text"
        enter-button="Add Todo"
        size="meduim"
        class="ant-btn-primary"
        @search="addTodo"
      />
    </div>

    <!-- todo list -->
    <TodoList />
  </main>
</template>

<script>
import { useTodosStore } from "@/store/todos";
import {
  CheckCircleOutlined,
  DownOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons-vue";
import TodoList from "@/components/TodoList.vue";
export default {
  name: "HomeView",

  data() {
    return {
      text: "",
    };
  },

  components: {
    CheckCircleOutlined,
    DownOutlined,
    TodoList,
    CloseCircleOutlined,
  },

  methods: {
    handleMenuClick(e) {
      console.log("click", e);
    },
    addTodo() {
      useTodosStore().addTodo(this.text);
      this.text = "";
    },
  },
};
</script>
