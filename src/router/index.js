import Vue from "vue";
import Router from "vue-router";

import AppHeader from "@/components/AppHeader";
import PostListPage from "@/pages/PostListPage";
import PostViewPage from "@/pages/PostViewPage";
import Signup from "@/pages/signup";
import Signin from "@/pages/signin";
import PostCreatePage from "@/pages/PostCreatePage";
// import HelloWorld from '@/components/HelloWorld'

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "PostListPage",
      components: { default: PostListPage, header: AppHeader }
    },
    {
      path: "/post/create",
      name: "PostCreatePage",
      components: {
        header: AppHeader,
        default: PostCreatePage
      }
    },
    {
      path: "/post/:postId",
      name: "PostViewPage",
      components: { default: PostViewPage, header: AppHeader },
      props: { default: true }
    },
    {
      path: "/signup",
      name: "Signup",
      components: { header: AppHeader, default: Signup }
    },
    {
      path: "/signin",
      name: "Signin",
      component: Signin
    }
  ]
});
