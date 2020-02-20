<template>
  <div class="signin-header">
    <h1>Community</h1>
    <div class="header-link">
      <router-link :to="{ name: 'Signup' }">Sign up</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "SigninHeader"
};
</script>

<style scoped>
.signin-header {
  /* margin: 0 auto; */
  display: flex;
  /* flex-direction: row; */
  justify-content: center;
  align-items: center;
}
</style>
