<template>
  
    <button @click="likeOrDislike(this.postId, this.likeValue)">
      {{ emoji }}
    </button>
  
</template>

<script>
export default {
  props: ["postId", "likeValue", "emoji"],
  data() {
    return {};
  },
  methods: {
    likeOrDislike(postId, value) {
      const requestOptions = {
        method: "POST",
        body: JSON.stringify({
          likeValue: value,
        }),
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
          "Content-Type": "application/json",
        },
      };
      return (
        fetch(`http://localhost:3000/api/posts/${postId}/like`, requestOptions)
          .then((res) => res.json())
          .catch((err) => console.log(err))
      );
    },

    /**
     * Récupère les posts présents dans la base de données via l'API
     * @return { Promise[posts] }
     */
    getPosts() {
      const requestHeaders = {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      };

      return fetch("http://localhost:3000/api/posts", requestHeaders)
        .then((res) => res.json())
        .then((postsData) => {
          postsData.reverse();
          this.posts = postsData;
          console.log(this.posts);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
