<template>
  <div class="sign-in-page">
    <h2>Login</h2>
    <!-- Login Form -->
    <signin-form @submit="onSubmit" />
    <p>
      did you registed in?
      <router-link :to="{name:'Signup'}">Sign up</router-link>
    </p>
  </div>
</template>

<script>
// import api from "@/api";
import { mapActions } from "vuex";
import SigninForm from "@/components/SigninForm";
export default {
  name: "Signin",
  components: {
    SigninForm
  },
  methods: {
    onSubmit(payload) {
      this.signin(payload)
        .then(res => {
          alert("환영합니다");
          this.$router.push({ name: "PostListPage" });
        })
        .catch(err => {
          // console.log();
          alert(err.response.data.msg);
        });
    },
    ...mapActions(["signin"])
  }
};
</script>

<style>
</style>