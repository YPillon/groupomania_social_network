<template>
  <div class="content">
    <a :href="homeLink">
      <button>Retour</button>
    </a>

    <div id="post" class="post">
      <article>
        <h3>{{ post.title }}</h3>
        <img :src="this.post.imageUrl" class="post__image" />

        <a :href="`./#/addcomment?postid=${postId}`">
          <button class="commentButton">Écrire un commentaire</button>
        </a>

        <template v-if="this.checkIfPostCreator() === true">
          <div>
            <a :href="`/#/modifypost?id=${postId}`">
              <button class="modifyButton">Modifier</button>
            </a>
            <button @click="deletePost" class="deleteButton">Supprimer</button>
          </div>
        </template>
      </article>
    </div>

    <h3>Commentaires</h3>

    <div class="comments">
      <p v-if="comments.length == 0" class="emptyCommentsMessage">
        Soyez le premier à écrire un commentaire !
      </p>

      <article v-for="comment in comments" :key="comment.id" class="commentBox">
        <div class="pseudoBox">
          <span>{{ comment.userEmail }}</span>

          <button
            v-if="this.checkIfCommentCreator(comment) === true"
            @click="deleteComment(comment.id)"
            class="deleteButton deleteCommentButton"
            ref="deleteCommentButton"
          >
            Supprimer
          </button>
        </div>
        <p>{{ comment.text }}</p>
      </article>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  data() {
    return {
      homeLink: "./#/home",
      postId: this.$route.query.id,
      isPostCreator: null,
      post: {},
      postUserId: null,
      comments: [],
    };
  },
  methods: {
    /**
     * Vérifie que l'utilisateur connecté est bien le créateur du post
     * @return { Boolean }
     */
    checkIfPostCreator: function () {
      if (
        localStorage.getItem("userId") == this.postUserId ||
        JSON.parse(localStorage.getItem("userRole")) === "admin"
      ) {
        return true;
      } else {
        return false;
      }
    },

    /**
     * Vérifie que l'utilisateur connecté est bien le créateur
     * du commentaire
     * @return { Boolean }
     */
    checkIfCommentCreator: function (comment) {
      if (
        localStorage.getItem("userId") == comment.userId ||
        JSON.parse(localStorage.getItem("userRole")) === "admin"
      ) {
        return true;
      } else {
        return false;
      }
    },

    /**
     * Supprime le post et redirige vers le fil d'actualités
     * @return { Promise }
     */
    deletePost: function () {
      const requestOptions = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      };

      return fetch(
        `http://localhost:3000/api/posts/${this.postId}`,
        requestOptions
      )
        .then((res) => res.json())
        .then(() => {
          location.href = "./#/home";
        })
        .catch((err) => console.log(err));
    },

    /**
     * Supprime le commentaire et redirige vers le fil d'actualités
     * @param { Number } commentId
     * @return { Promise }
     */
    deleteComment: function (commentId) {
      const requestOptions = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      };

      return fetch(
        `http://localhost:3000/api/posts/${this.postId}/comments/${commentId}`,
        requestOptions
      )
        .then((res) => res.json())
        .then(() => {
          location.reload();
        })
        .catch((err) => console.log(err));
    },
  },

  /**
   * Récupération des données nécessaires pour l'affichage 
   * du post, affectation de l'objet à this.post.
   * Récupération des données nécessaires pour l'affichage 
   * des commentaires, affectation du tableau à this.comments.
   * @return { Promise{post} }
   * @return { Promise[comments] }
   */
  created: function () {
    const requestHeaders = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };

    return fetch(
      `http://localhost:3000/api/posts/${this.postId}`,
      requestHeaders
    )
      .then((res) => res.json())
      .then((postData) => {
        this.post = postData;
        this.postUserId = postData.userId;

        return fetch(
          `http://localhost:3000/api/posts/${this.postId}/comments`,
          requestHeaders
        )
          .then((res) => res.json())
          .then((commentsData) => {
            this.comments = commentsData;
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
};
</script>
