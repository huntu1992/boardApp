<template>
  <div class="post-view-page">
    <post-view v-if="post" :post="post" />
    <router-link :to="{ name: 'PostEditPage' }">수정</router-link>
    <button @click="onDelete">삭제</button>
    <router-link :to="{ name: 'PostListPage' }">목록</router-link>
    <comment-list v-if="post" :comments="post.comments" />
    <comment-form @submit="onCommentSubmit" />
  </div>
</template>

<script>
import { mapActions, mapState, mapGetters } from "vuex";
import api from "@/api";
import PostView from "@/components/PostView";
import CommentList from "@/components/CommentList";
import CommentForm from "@/components/CommentForm";
export default {
  name: "PostViewPage",
  components: { PostView, CommentList, CommentForm },
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  created() {
    this.fetchPost(this.postId).catch(err => {
      alert("페이지가 존재하지 않습니다.");
      this.$router.back();
    });
  },
  computed: {
    ...mapState(["post"]),
    ...mapGetters(["isAuthorized"])
  },
  methods: {
    onCommentSubmit(comment) {
      if (!this.isAuthorized) {
        alert("로그인하세요");
        this.$router.push({ name: "Signin" });
      } else {
        this.createComment(comment)
          .then(() => {
            alert("댓글이 성공적으로 작성되었습니다");
          })
          .catch(err => {
            alert(err.response.data.msg);
          });
      }
    },
    onDelete() {
      const { id } = this.post;
      // console.log(id);
      api
        .delete(`/posts/${id}`)
        .then(res => {
          alert("게시물이 성공적으로 삭제되었습니다.");
          this.$router.push({ name: "PostListPage" });
        })
        .catch(err => {
          if (err.response.status === 401) {
            alert("로그인이 필요합니다.");
            this.$router.push({ name: "Signin" });
          } else {
            alert(err.response.data.msg);
          }
          // console.log(err);
        });
    },
    ...mapActions(["fetchPost", "createComment"])
  }
};
</script>

<style></style>
