import { defineStore } from "pinia";

export const useTodosStore = defineStore("todos", {
  state: () => ({
    todos: [
      { id: 1, text: "Buy milk", done: false },
      { id: 2, text: "Buy eggs", done: false },
      { id: 3, text: "Buy bread", done: false },
    ],
  }),
  // getters
  getters: {
    getTodosfromLocalStorage: (state) => {
      const todos = JSON.parse(localStorage.getItem("todos"));
      if (todos) {
        state.todos = todos;
      }
      return state.todos;
    },
  },

  // actions
  actions: {
    addTodo(text) {
      if (!text) {
        return alert("Please enter a todo");
      }

      this.todos.push({
        id: Math.ceil(Math.random() * 100),
        text,
        done: false,
      });

      // save to local storage
      localStorage.setItem("todos", JSON.stringify(this.todos));
    },

    updatetodoStatus(id) {
      const todo = this.todos.find((todo) => todo.id === id);
      todo.done = !todo.done;

      // update todos in local storage
      //get todos from local storage
      const todos = JSON.parse(localStorage.getItem("todos"));
      // find the todo to update
      const todoToUpdate = todos.find((todo) => todo.id === id);
      // update the todo
      todoToUpdate.done = !todoToUpdate.done;
      // save the updated todos to local storage
      localStorage.setItem("todos", JSON.stringify(todos));
    },
  },
});
