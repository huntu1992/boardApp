<template>
  <div class="post-edit-page">
    <h1>게시물 수정</h1>
    <post-edit-form v-if="post" :post="post" @submit="onSubmit" />
    <p v-else>게시물을 불러오고 있어요..</p>
  </div>
</template>

<script>
import { mapState } from "vuex";
import PostEditForm from "@/components/PostEditForm";
import api from "@/api";
export default {
  name: "PostEditPage",
  props: {
    postId: {
      type: String,
      required: true
    }
  },
  computed: {
    ...mapState(["post"])
  },
  components: { PostEditForm },
  methods: {
    onSubmit(payload) {
      const { title, contents } = payload;
      api
        .put(`/posts/${this.postId}`, { title, contents })
        .then(res => {
          alert("게시물이 성공적으로 수정되었습니다.");
          this.$router.push({
            name: "PostViewPage",
            params: { postId: res.data.id.toString() }
          });
        })
        .catch(err => {
          const { status, data } = err.response;
          switch (status) {
            case 401:
              alert("로그인하세요");
              this.$router.push({ name: "Singin" });
              break;
            case 403:
              alert(data.msg);
              this.$router.back();
              break;
            default:
              alert(data.msg);
              break;
          }
        });
    }
  }
};
</script>

<style>
</style>