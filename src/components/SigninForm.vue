<template>
  <form @submit.prevent="submit">
    <fieldset>
      <input type="text" v-model="email" placeholder="E-mail" />
      <input type="password" v-model="password" placeholder="password" />
      <button type="submit">Login</button>
    </fieldset>
  </form>
</template>

<script>
export default {
  name: "SigninForm",
  data() {
    return {
      email: "",
      password: ""
    };
  },
  methods: {
    submit() {
      const { email, password } = this;
      this.$emit("submit", { email, password });
    }
  }
};
</script>

<style>
</style>