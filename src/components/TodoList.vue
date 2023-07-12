<template lang="">
  <!-- todo list -->
  <a-table :columns="columns" :data-source="todos" bordered>
    <template #bodyCell="{ column, text, record }">
      <template v-if="['id', 'text', 'done'].includes(column.dataIndex)">
        <div style="position: relative">
          <a-input
            v-if="editableData[record.id]"
            v-model:value="editableData[record.id][column.dataIndex]"
            style="margin: -5px 0"
          />
          <template v-else-if="column.dataIndex === 'done'">
            <a-checkbox v-model:checked="record.done" disabled />
          </template>
          <template v-else-if="column.dataIndex === 'text'">
            <span
              @click="toggleDone(record)"
              class="span_click_tag"
              :class="[record.done ? 'done' : '']"
              >{{ record.text }}</span
            >
          </template>
          <template v-else>
            {{ text }}
          </template>
        </div>
      </template>

      <template v-else-if="column.dataIndex === 'operation'">
        <div class="editable-row-operations">
          <span v-if="editableData[record.id]">
            <a-typography-link @click="save(record.id)">Save</a-typography-link>
            <a-popconfirm title="Sure to cancel?" @confirm="cancel(record.id)">
              <a>Cancel</a>
            </a-popconfirm>
          </span>

          <span v-else>
            <a @click="edit(record.id)">Edit</a>
          </span>
        </div>
      </template>
    </template>
  </a-table>
</template>

<script>
import { useTodosStore } from "@/store/todos";
import { cloneDeep } from "lodash"; // npm i lodash

export default {
  name: "TodoList",
  data() {
    return {
      // get from store getters
      todos: useTodosStore().getTodosfromLocalStorage,
      columns: [
        {
          title: "ID",
          dataIndex: "id",
          width: "10%",
        },
        {
          title: "Text",
          dataIndex: "text",
          width: "30%",
        },
        {
          title: "is Done?",
          dataIndex: "done",
          width: "20%",
          type: "boolean",
        },
        {
          title: "operation",
          dataIndex: "operation",
        },
      ],
      editableData: {},
    };
  },
  methods: {
    toggleDone(todo) {
      useTodosStore().updatetodoStatus(todo.id);
    },

    edit(id) {
      this.editableData[id] = cloneDeep(
        this.todos.filter((item) => id === item.id)[0]
      );
    },
    save(id) {
      Object.assign(
        this.todos.filter((item) => id === item.id)[0],
        this.editableData[id]
      );
      delete this.editableData[id];
    },
    cancel(id) {
      delete this.editableData[id];
    },
  },
};
</script>
<style>
.done {
  text-decoration: line-through;
}
.span_click_tag {
  cursor: pointer;
  -webkit-user-select: none;
  user-select: none;
}
.editable-row-operations a {
  margin-right: 8px;
}
</style>
