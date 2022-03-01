<template>
  <div class="content" role="main">
    <a :href="homeLink">
      <button>Retour</button>
    </a>

    <article id="post" class="post">
      <h3>{{ post.title }}</h3>
      <img
        :src="this.post.imageUrl"
        alt="Image de la publication"
        class="post__image"
      />

      <!-- Like Buttons -->
      <div
        class="likeButtons-container"
        :style="{
          margin: alreadyLiked || alreadyDisliked ? marginOnHiglight : '',
        }"
      >
        <span>{{ post.likes }}</span>
        <ButtonLike
          :class="{ highlightButton: alreadyLiked }"
          v-if="alreadyLiked"
          :postId="post.id"
          :likeValue="this.unlikeValue"
          :emoji="this.likeEmoji"
          @click="triggerLike"
        />
        <ButtonLike
          v-else
          :postId="post.id"
          :likeValue="this.likeValue"
          :emoji="this.likeEmoji"
          @click="triggerLike"
        />
        <ButtonLike
          :class="{ highlightButton: alreadyDisliked }"
          v-if="alreadyDisliked"
          :postId="post.id"
          :likeValue="this.unlikeValue"
          :emoji="this.dislikeEmoji"
          @click="triggerDislike"
        />
        <ButtonLike
          v-else
          :postId="post.id"
          :likeValue="this.dislikeValue"
          :emoji="this.dislikeEmoji"
          @click="triggerDislike"
        />
        <span>{{ post.dislikes }}</span>
      </div>
      <!-- ./likeButtons-container -->

      <template v-if="this.checkIfPostCreator() === true">
        <div>
          <a :href="`/#/modifypost?id=${postId}`">
            <button class="modifyButton">Modifier</button>
          </a>
          <button @click="deletePost" class="deleteButton">Supprimer</button>
        </div>
      </template>
    </article>

    <h3>Commentaires</h3>

    <p class="errorMessage" :class="{ hidden: !hasError }">
      Votre commentaire ne peut pas être vide !
    </p>

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
            :value="emptyField"
            required
          />
        </div>

        <div class="formField">
          <button @click.prevent="sendCommentData()">
            Publier le commentaire
          </button>
        </div>
      </form>
    </div>

    <div class="comments">
      <p v-if="comments.length == 0" class="emptyCommentsMessage">
        Pas encore de commentaires ? Soyez le premier à en écrire un !
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
import ButtonLike from "../components/ButtonLike.vue";

export default {
  name: "Post",
  components: {
    ButtonLike,
  },
  data() {
    return {
      homeLink: "./#/home",
      postId: this.$route.query.id,
      isPostCreator: null,
      post: {},
      postUserId: null,
      comments: [],
      hasError: null,
      emptyField: "",

      marginOnHiglight: "8px 0 8px",

      unlikeValue: 0,
      likeValue: 1,
      likeEmoji: "👍",
      dislikeValue: -1,
      dislikeEmoji: "👎",
      alreadyLiked: "",
      alreadyDisliked: "",
    };
  },
  methods: {
    /**
     * Vérifie si l'utilisateur connecté a déja
     * liké le post et en informe le frontend
     * @return { Promise[association] }
     */
    checkLikeOrDislike() {
      const requestHeaders = {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      };

      return fetch(
        `http://localhost:3000/api/posts/${this.postId}/like`,
        requestHeaders
      )
        .then((res) => res.json())
        .then((association) => {
          for (let instance of association) {
            if (instance.value === 1) {
              this.alreadyLiked = true;
            } else if (instance.value === -1) {
              this.alreadyDisliked = true;
            }
          }
        })
        .catch((err) => console.log(err));
    },

    /**
     * Recharge les données du post après un like et indique
     * au frontend que l'utilisateur a liké
     */
    triggerLike() {
      setTimeout(() => {
        this.getPost();
      }, 200);
      this.alreadyLiked !== true
        ? (this.alreadyLiked = true)
        : (this.alreadyLiked = false);
      this.alreadyDisliked = false;
    },

    /**
     * Recharge les données du post après un dislike et indique
     * au frontend que l'utilisateur a disliké
     */
    triggerDislike() {
      setTimeout(() => {
        this.getPost();
      }, 200);
      this.alreadyDisliked !== true
        ? (this.alreadyDisliked = true)
        : (this.alreadyDisliked = false);
      this.alreadyLiked = false;
    },

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
     * Envoie les données du commentaire à l'API avec l'Id du post
     * et l'Id de l'utilisateur ayant écrit le commentaire.
     * @param { Number } postId
     * @return { Promise }
     */
    sendCommentData: function () {
      //Vérification des champs du formulaire
      if (this.$refs.commentText.value.trim() == "") {
        this.hasError = true;
      } else {
        this.hasError = null;
        const requestOptions = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
          body: JSON.stringify({
            text: this.$refs.commentText.value,
            userId: localStorage.getItem("userId"),
            postId: this.postId,
          }),
        };

        return fetch(
          `http://localhost:3000/api/posts/${this.postId}/comments`,
          requestOptions
        )
          .then((res) => res.json())
          .then(() => {
            //Vide le champ de saisie du formulaire de commentaires
            this.emptyField = "";
            this.retrieveCommentData();
          })
          .catch((err) => console.log(err));
      }
    },

    /**
     * Supprime le commentaire
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
          this.retrieveCommentData();
        })
        .catch((err) => console.log(err));
    },

    /**
     * Récupère les commentaires dans la base de données et les
     * stocke dans le tableau this.comments
     * @return { Promise[comments] }
     */
    retrieveCommentData: function () {
      const requestHeaders = {
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      };

      return fetch(
        `http://localhost:3000/api/posts/${this.postId}/comments`,
        requestHeaders
      )
        .then((res) => res.json())
        .then((commentsData) => {
          this.comments = commentsData;
        })
        .catch((err) => console.log(err));
    },

    /**
     * Récupère le post dans la base de données et le
     * stocke dans this.post
     * @return { Promise{post} }
     */
    getPost: function () {
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
    this.getPost();
    this.retrieveCommentData();
    this.checkLikeOrDislike();
  },
};
</script>
