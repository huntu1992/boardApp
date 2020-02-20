<template>
  <div class="sign-up-page">
    <h2>Regist</h2>
    <signup-form @submit="onSubmit" />
    <p>
      have you ever regist our service?
      <router-link :to="{ name: 'Signin' }">Sign In</router-link>
    </p>
  </div>
</template>

<script>
import api from "@/api";
import SignupForm from "@/components/SignupForm";

export default {
  name: "Signup",
  components: {
    SignupForm
  },
  methods: {
    onSubmit(payload) {
      const { name, email, password } = payload;
      api
        .post("/auth/signup", { name, email, password })
        .then(res => {
          alert("Welcome To The D(ㅌ[ㅇ)3 Enjoy our service");
          console.log(res);
          this.$router.push("/signin");
        })
        .catch(err => {
          alert(err.response);
        });
      // console.log(payload);
      api;
    }
  }
};
</script>

<style></style>
