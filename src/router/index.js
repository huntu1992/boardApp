import Vue from "vue";
import Router from "vue-router";

import AppHeader from "@/components/AppHeader";
import PostListPage from "@/pages/PostListPage";
import PostViewPage from "@/pages/PostViewPage";
import PostEditPage from "@/pages/PostEditPage";
import PostCreatePage from "@/pages/PostCreatePage";

import Signup from "@/pages/signup";
import Signin from "@/pages/signin";
import store from "@/store";
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
      },
      beforeEnter(to, from, next) {
        const { isAuthorized } = store.getters;
        if (!isAuthorized) {
          alert("로그인이 필요합니다.");
          next({ name: "Signin" });
        }
        next();
      }
    },
    {
      path: "/post/:postId",
      name: "PostViewPage",
      components: { default: PostViewPage, header: AppHeader },
      props: { default: true }
    },
    {
      path: "/post/:postId/edit",
      name: "PostEditPage",
      components: {
        default: PostEditPage,
        header: AppHeader
      },
      props: {
        default: true
      },
      beforeEnter(to, from, next) {
        const { isAuthorized } = store.getters;
        if (!isAuthorized) {
          alert("로그인이 필요합니다");
          next({ name: "Signin" });
          return false;
        }
        store
          .dispatch("fetchPost", to.params.postId)
          .then(res => {
            const post = store.state.post;
            const isAuthor = post.user.id === store.state.me.id;
            if (isAuthor) {
              next();
            } else {
              alert("수정 권한이 없습니다.");
              next(from);
            }
          })
          .catch(err => {
            alert(err.response.data.msg);
            next(from);
          });
      }
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
