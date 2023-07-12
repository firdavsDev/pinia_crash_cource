## VueX vs Pinia

In VueX we use a single store to store all the data of our application, this is a good practice, but it can be a problem when our application grows, since we can have a lot of data that we do not need to use in some components, but we have to load it anyway.

In Pinia we can create multiple stores, each one with its own state, getters, actions, etc. This allows us to have a more organized code and only load the data that we need in each component.

In addition, Pinia is based on the composition API, which allows us to use the same syntax to create stores and components.
Pinia have not `mutations`, only actions.

## Pinia

Pinia is a state management system for Vue 3. It is based on the composition API and the new `reactive` function.

## Installation

```bash
npm install pinia
```

## Modify main.js

```js
import { createApp } from "vue";
import App from "./App.vue";
import { createPinia } from "pinia";

const app = createApp(App);

app.use(createPinia());
app.mount("#app");
```

## Create a store

```js
import { defineStore } from "pinia";

export const useCounterStore = defineStore({
  id: "counter",
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count++;
    },
  },
});
```

## Use a store

```js
import { useCounterStore } from "./store";

export default {
  setup() {
    const counterStore = useCounterStore();

    return {
      counterStore,
    };
  },
};
```

## Use a store in a component

```html
<template>
  <div>
    <p>Count: {{ counterStore.count }}</p>
    <p>Double Count: {{ counterStore.doubleCount }}</p>
    <button @click="counterStore.increment()">Increment</button>
  </div>
</template>

<script>
  import { useCounterStore } from "./store";

  export default {
    setup() {
      const counterStore = useCounterStore();

      return {
        counterStore,
      };
    },
  };
</script>
```

## Use a store in a composition function

```js
import { useCounterStore } from "./store";

export default {
  setup() {
    const counterStore = useCounterStore();

    return {
      counterStore,
    };
  },
};
```

# Install additional dependencies:

    npm install axios
    npm install vue-router
    npm install vuex
    npm install -D tailwindcss@latest postcss@latest autoprefixer@latest
    npx tailwindcss init -p // create tailwind.config.js and postcss.config.js
    npm install -D @tailwindcss/forms
