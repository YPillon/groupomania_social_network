<template>
  <div class="content">
    <p>postUserId: {{ postUserId }}</p>
    <p>isPostCreator: {{ isPostCreator }}</p>
    <a :href="homeLink">
      <button>Retour</button>
    </a>
    <div id="post" class="post">
      <article>
        <h3>{{ post.title }}</h3>
        <img :src="this.post.imageUrl" class="post__image" />
        <a :href="`./#/addcomment?postid=${postId}`">
          <button>Écrire un commentaire</button>
        </a>
        <template v-if="isPostCreator === true">
          <div>
            <a :href="`/#/modifypost?id=${postId}`">
              <button class="modifyColor">Modifier</button>
            </a>
            <button @click="deletePost" class="deleteColor">Supprimer</button>
          </div>
        </template>
      </article>
    </div>
    <h3>Commentaires</h3>
    <div class="comments">
      <p v-if="comments.length == 0">
        Soyez le premier à écrire un commentaire !
      </p>
      <article v-for="comment in comments" :key="comment.id" class="commentBox">
        <div class="pseudoBox">
          <span>{{ this.getUserName(comment.userId) }}</span>
          <!--!!!!!!  Le resultat affiche "[object Promise]" !!!!!!-->
          <button
            v-if="isPostCreator === true"
            @click="deleteComment(comment.id)"
            class="deleteColor deleteCommentButton"
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
      isPostCreator: this.checkIfPostCreator(),
      post: {},
      postUserId: 0,
      comments: [],
    };
  },
  methods: {
    checkIfPostCreator: function () {
      console.log(localStorage.getItem("userId"));
      console.log(JSON.parse(localStorage.getItem("userRole")));
      console.log(this.postUserId);
      // !!!!! This.postUserId n'est pas défini ici, mais il est défini lorsqu'on l'utilise danns le HTML ==> problème dans le timing !!!!!!!
      if (
        localStorage.getItem("userId") == this.postUserId ||
        JSON.parse(localStorage.getItem("userRole")) === "admin"
      ) {
        return true;
      } else {
        return false;
      }
    },

    getUserName: function (userId) {
      return fetch(`http://localhost:3000/api/users/${userId}`)
        .then((res) => res.json())
        .then((email) => {
          const userEmail = JSON.parse(email.email);
          console.log(userEmail);
          return userEmail;
        })
        .catch((err) => console.log(err));
    },

    deletePost: function () {
      const requestOptions = {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      };
      console.log(this.postId);

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
          //location.reload();
          //!!!!!!! Problème de rendu visuel du post après reload !!!!!!
        })
        .catch((err) => console.log(err));
    },
  },

  created() {
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

<style lang="scss">
.comments {
  background-color: #90dfbb;
  padding: 8px;
  width: 50%;
  border-radius: 10px;
}

.commentBox {
  background-color: #caf5e1;
  padding: 5px 5px;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  & > p {
    text-align: left;
  }
}

.pseudoBox {
  display: flex;
  justify-content: flex-start;
  position: relative;
  margin-bottom: 25px;
  background-color: #90dfbb;
  box-shadow: 2px 2px gray;
  padding: 2px 4px;
}

.deleteCommentButton {
  position: absolute;
  right: 0px;
}

.hide {
  display: none;
}

.deleteColor {
  background-color: rgb(202, 174, 174);
}

.modifyColor {
  background-color: rgb(127, 128, 202);
}
</style>
