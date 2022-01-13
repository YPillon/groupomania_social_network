<template>
  <div class="content">
    <a :href="postLink">
      <button>Retour à la publication</button>
    </a>
    <p class="errorMessage">{{ addCommentError }}</p>

    <div class="formBoxComment">
      <form class="form">
        <div class="formField">
          <textarea
            rows="8"
            cols="50"
            placeholder="Partagez votre opinion ici..."
            name="comment"
            ref="commentText"
            class="formBoxComment__Text"
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
      addCommentError: "",
    };
  },
  methods: {
    /**
     * Envoie les données du commentaire à l'API avec l'Id du post
     * et l'Id de l'utilisateur ayant écrit le commentaire.
     * @param { Number } postId
     * @return { Promise }
     */
    sendCommentData: function (postId) {
      //Vérification des champs du formulaire
      if (this.$refs.commentText.value.trim() == "") {
        this.addCommentError = "Votre commentaire ne peut pas être vide !";
      } else {
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
      }
    },
  },
};
</script>
