import api from "@/api";
import {
  SET_ACCESS_TOKEN,
  FETCH_POST_LIST,
  FETCH_POST,
  SET_MY_INFO,
  DESTROY_ACCESS_TOKEN,
  DESTROY_MY_INFO,
  UPDATE_COMMENT,
  EDIT_COMMENT,
  DELETE_COMMENT
} from "./mutations-types";

export default {
  //mapDispatchToProps랑 비슷함
  fetchPostList({ commit }) {
    return api
      .get("/posts")
      .then(res => {
        commit(FETCH_POST_LIST, res.data);
      })
      .catch(err => console.log("Axios error emit: ", err));
  },
  editComment({ commit, state }, { commentId, comment }) {
    const postId = state.post.id;
    return api
      .put(`/posts/${postId}/comments/${commentId}`, {
        contents: comment
      })
      .then(res => {
        commit(EDIT_COMMENT, res.data);
      });
  },
  fetchPost({ commit }, postId) {
    return api.get(`/posts/${postId}`).then(res => {
      commit(FETCH_POST, res.data);
    });
  },
  signin({ commit }, payload) {
    const { email, password } = payload;
    return api
      .post("/auth/signin", { email, password })
      .then(res => {
        const { accessToken } = res.data;
        commit(SET_ACCESS_TOKEN, accessToken);
        return api.get("/users/me");
      })
      .then(res => {
        commit(SET_MY_INFO, res.data);
      });
  },
  signinByToken({ commit }, token) {
    commit(SET_ACCESS_TOKEN, token);
    return api.get("/users/me").then(res => {
      commit(SET_MY_INFO, res.data);
    });
  },
  signout({ commit }) {
    commit(DESTROY_MY_INFO);
    commit(DESTROY_ACCESS_TOKEN);
  },
  createComment({ commit, state }, comment) {
    const postId = state.post.id;
    return api
      .post(`/posts/${postId}/comments`, { contents: comment })
      .then(res => {
        commit(UPDATE_COMMENT, res.data);
      });
  },
  deleteComment({ commit, state }, commentId) {
    const postId = state.post.id;
    return api.delete(`/posts/${postId}/comments/${commentId}`).then(res => {
      commit(DELETE_COMMENT, commentId);
    });
  }
};
