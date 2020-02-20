<template>
  <div id="app">
    <router-view />
    <router-view name="header" />
  </div>
</template>

<script>
import AppHeader from "@/components/AppHeader";
import SigninHeader from "@/components/SigninHeader";
export default {
  name: "App",
  components: {
    AppHeader,
    SigninHeader
  }
};
</script>

<style>
@import "http://localhost:8000/assets/index.css";
</style>
