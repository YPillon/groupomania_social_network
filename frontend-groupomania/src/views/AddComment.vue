<template>
  <div class="formBox">
    <a :href="postLink">
      <button>Retour à la publication</button>
    </a>
    <form class="form">
      <div class="formField">
        <textarea
          rows="10"
          cols="50"
          placeholder="Partagez votre opinion ici..."
          name="comment"
          ref="commentText"
          required
        />
      </div>
      <div class="formField">
        <button @click.prevent="sendCommentData(this.postId)">
          Publier le commentaire
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "AddComment",
  data() {
    return {
      postId: this.$route.query.postid,
      postLink: `./#/post?id=${this.$route.query.postid}`,
    };
  },
  methods: {
    sendCommentData: function (postId) {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          text: this.$refs.commentText.value,
          userId: localStorage.getItem("userId"),
          postId: postId,
        }),
      };

      return fetch(
        `http://localhost:3000/api/posts/${postId}/comments`,
        requestOptions
      )
        .then((res) => res.json())
        .then(() => {
          location.href = this.postLink;
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
