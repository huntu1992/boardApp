<template>
  <form @submit.prevent="submit" novalidate>
    <fieldset>
      <input type="text" v-model="name" placeholder="Name" />
      <input type="email" v-model="email" placeholder="Email" />
      <input type="password" v-model="password" placeholder="Password" />
      <input type="password" v-model="passwordConfirm" placeholder="Password Confirm" />
      <button type="submit">Sign Up</button>
    </fieldset>
  </form>
</template>

<script>
export default {
  name: "SingupForm",
  data() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirm: ""
    };
  },
  methods: {
    submit() {
      const { name, email, password, passwordConfirm } = this;
      if (!name || !email || !password || !passwordConfirm) {
        alert("Write all input box");
      } else if (password !== passwordConfirm) {
        alert("seriously? check out the password");
      }
      this.$emit("submit", { name, email, password });
    }
  }
};
</script>

<style>
</style>