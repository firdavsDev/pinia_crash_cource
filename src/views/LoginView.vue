<template>
  <a-layout style="min-height: 100vh background: #fff">
    <a-layout-content
      class="flex flex-row min-h-screen justify-center items-center h-screen p-6 backdrop:bg-gray-100 backdrop-blur-sm bg-opacity-50"
    >
      <div class="shadow-lg rounded-lg p-6 bg-white w-full max-w-sm">
        <a-form
          :model="formState"
          name="normal_login"
          class="login-form"
          @finish="onFinish"
          @finishFailed="onFinishFailed"
        >
          <a-form-item
            label="Username"
            name="username"
            :rules="[
              { required: true, message: 'Please input your username!' },
            ]"
          >
            <a-input
              v-model:value="formState.username"
              :auto-focus="true"
              aria-placeholder="Username"
              placeholder="Username"
            >
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
            label="Password"
            name="password"
            aria-placeholder="Password"
            placeholder="Password"
            :rules="[
              { required: true, message: 'Please input your password!' },
            ]"
          >
            <a-input-password v-model:value="formState.password">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-button
              :disabled="disabled"
              html-type="submit"
              type="primary"
              :loading="iconLoading"
              @click="enterIconLoading"
              class="login-form-button"
            >
              <template #icon><PoweroffOutlined /></template>
              Log in
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </a-layout-content>
  </a-layout>
</template>

<script>
import { defineComponent, reactive, computed, ref, h } from "vue";
import { notification } from "ant-design-vue";
import router from "@/router/index.js";
import { useAuthStore } from "@/store/auth.js";

import {
  UserOutlined,
  LockOutlined,
  SmileOutlined,
  CloseCircleFilled,
  PoweroffOutlined,
} from "@ant-design/icons-vue";

export default defineComponent({
  components: {
    UserOutlined,
    LockOutlined,
    PoweroffOutlined,
    CloseCircleFilled,
  },
  setup() {
    const iconLoading = ref(false);
    const enterIconLoading = () => {
      iconLoading.value = true;

      const data = {
        login: formState.username,
        password: formState.password,
      };
      useAuthStore()
        .login(data)
        .then((res) => {
          console.log(res);
          iconLoading.value = false;
          notification.open({
            message: "Welcome to the system",
            description: "Your role is " + useAuthStore().getUser + ".",
            icon: h(SmileOutlined),
          });
          // redirect to / if login success
          router.push("/");
        })
        .catch((err) => {
          console.log(err);
          notification.open({
            message: "Error",
            description: "Wrong username or password.",
            icon: h(CloseCircleFilled),
          });
          iconLoading.value = false;
        });
    };
    const formState = reactive({
      username: "",
      password: "",
      remember: true,
    });
    const onFinish = (values) => {
      console.log("Success:", values);
    };
    const onFinishFailed = (errorInfo) => {
      console.log("Failed:", errorInfo);
    };
    const disabled = computed(() => {
      return !(formState.username && formState.password);
    });

    return {
      formState,
      onFinish,
      onFinishFailed,
      disabled,
      iconLoading,
      enterIconLoading,
    };
  },
});
</script>
<style>
.login-form-button {
  width: 100%;
}
</style>
@/services/auth
