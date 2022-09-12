<template>
  <div style="margin-right: 20px">
    {{ userStore.username }}
  </div>
  <el-dropdown @command="handleCommand">
    <div class="avatar" @click="avatarClick">
          <span>
            <span v-show="!userStore.avatarUrl">
              <el-avatar :icon="UserFilled" />
            </span>
            <span v-show="userStore.avatarUrl">
              <el-avatar :src="userStore.avatarUrl" />
            </span>
          </span>
      <el-icon class="el-icon--right">
        <arrow-down />
      </el-icon>
    </div>

    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="profile" disabled>Profile</el-dropdown-item>
        <el-dropdown-item command="checks" disabled>Checks</el-dropdown-item>
        <div v-show="userStore.username !== ''">
          <el-dropdown-item
            command="logout"
            divided
          >Logout
          </el-dropdown-item>
        </div>
      </el-dropdown-menu>
    </template>
  </el-dropdown>

  <el-dialog
    v-model="loginVisible"
    title="Login"
    width="20%"
  >
    <template #header>
      <div class="logo-container">
        <img src="@/assets/logo.png" alt="FAILED" class="logo-small">
        <span style="margin-left: 10px">Login</span>
      </div>
    </template>
    <el-form
      :model="loginParam"
      size="large"
      ref="loginRef"
      :rules="rules"
      status-icon
    >
      <el-form-item>
        <el-input v-model="loginParam.username" type="text" placeholder="Username" />
      </el-form-item>
      <el-form-item>
        <el-input v-model="loginParam.password" type="password" placeholder="Password" />
      </el-form-item>
      <el-form-item>
        <el-button
          type="primary"
          @click="loginSubmit(loginRef)"
          style="width: 100%"
        >Sign in
        </el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ArrowDown, UserFilled } from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import type { FormInstance, FormRules } from "element-plus";
import { reqUserLogin, reqUserLogout } from "@/api/user";
import { useUserStore } from "@/stores/user";
import { reactive, ref } from "vue";


const userStore = useUserStore();

const handleCommand = async (command: string) => {
  switch (command) {
    case "logout":
      const resp = await reqUserLogout();
      const { code, message, data } = resp.data;
      if (code != 200) {
        ElMessage.error(message);
        return;
      }
      ElMessage.success(message);
      userStore.logout();
      break;
  }
};

const avatarClick = () => {
  if (userStore.username == "") {
    loginVisible.value = true;
  }
};

const loginVisible = ref(false);

const loginParam = reactive({
  username: "",
  password: ""
});

const loginSubmit = async (form: FormInstance | undefined) => {
  console.log(form?.validate);
  if (!form) return;
  await form.validate((isValid, invalidFields) => {
    if (!isValid) {
      ElMessage.error(invalidFields);
      return;
    }
  });
  const loginResp = await reqUserLogin(loginParam.username, loginParam.password);
  const { code, message, data } = loginResp.data;
  if (code != 200) {
    ElMessage.error(message);
    return;
  }
  userStore.setUsername(loginParam.username);
  userStore.setToken(data.token);
  ElMessage.success(message);
  loginVisible.value = false;
};

const loginRef = ref<FormInstance>();

const rules = reactive<FormRules>({
  username: [
    {
      required: true,
      message: "Input username please",
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      message: "Input password please",
      trigger: "blur"
    }
  ]
});


</script>

<style scoped>

.avatar {
  cursor: pointer;
}
</style>