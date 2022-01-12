<template>
  <div class="content">
    <a :href="postLink">
      <button>Retour à la publication</button>
    </a>
    <div class="formBoxComment">
      <form class="form">
        <div class="formField">
          <textarea
            rows="8"
            cols="50"
            placeholder="Partagez votre opinion ici..."
            name="comment"
            ref="commentText"
            class="commentText"
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

<style lang="scss">
@media only all and (min-width: 768px) {
  .formBoxComment {
    width: auto;
    padding: 10px;
  }
}

@media only all and (max-width: 767px) {
  .formBoxComment {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
  }

  .commentText {
    width: 90%;
  }
}
</style>
