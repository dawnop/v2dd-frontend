<script setup lang="ts">
// import { RouterLink, RouterView } from "vue-router";
import Navbar from "./components/Navbar.vue";
</script>

<template>
  <el-container>
    <el-header>
      <Navbar />
    </el-header>

    <el-container>
      <el-aside width="15%"></el-aside>

      <el-main>
        <router-view />
      </el-main>
      <el-aside width="15%"></el-aside>

    </el-container>

    <el-footer>

    </el-footer>
  </el-container>
</template>

<style scoped>


</style>
