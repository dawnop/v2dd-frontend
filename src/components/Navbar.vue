<template>

  <el-menu
    :default-active="activeIndex"
    :ellipsis="false"
    mode="horizontal"
    router="router"
    @select="handleSelect"
  >
    <a class="logo-container" href="/">
      <img src="@/assets/logo.png" alt="FAILED" class="logo-small">
    </a>
    <el-menu-item index="/">HOME</el-menu-item>
    <el-menu-item index="/check">CHECK</el-menu-item>
    <div class="flex-grow" />
    <div class="avatar-container">
      <Avatar />
    </div>
  </el-menu>


</template>

<script lang="ts" setup>
import { ref } from "vue";
import Avatar from "@/components/Avatar.vue";

const activeIndex = ref("/");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

</script>

<style>

.flex-grow {
  flex-grow: 1;
}

.avatar-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.logo-container {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
  margin-left: 20px;
  /*margin-top: calc((var(--el-menu-item-height) - var(--logo-height)) / 2);*/
}

.logo-small {
  height: var(--logo-height);
}
</style>