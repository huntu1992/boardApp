<template>
  <div class="post-view-page">
    <post-view v-if="post" :post="post" />
    <router-link :to="{ name: 'PostListPage' }">목록</router-link>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import PostView from "@/components/PostView";
export default {
  name: "PostViewPage",
  components: { PostView },
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
    ...mapState(["post"])
  },
  methods: {
    ...mapActions(["fetchPost"])
  }
};
</script>

<style></style>
