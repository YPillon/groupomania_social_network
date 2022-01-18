<template>
  <div class="content" role="main">
    <template v-if="this.checkIfLoggedIn() == true">
      <h2 v-if="this.posts.length !== 0">Bienvenue ! Voici les dernières publications de vos collègues !</h2>
      <h2 v-if="this.posts.length == 0">Bienvenue ! soyez le premier à poster quelque chose !</h2>
      <a id="addPostLink" href="./#/addpost">
        <button>Créer un post</button>
      </a>

      <div id="posts">
        <article v-for="post in posts" :key="post.id" class="post">
          <h3>{{ post.title }}</h3>
          <img
            :src="post.imageUrl"
            alt="L'image d'un post"
            class="post__image"
          />
          <a class="seePostButton" :href="`./#/post?id=${post.id}`"
            >Voir le post</a
          >
        </article>
      </div>
    </template>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      posts: [],
      userLoggedIn: this.checkIfLoggedIn(),
    };
  },
  methods: {
    /**
     * Vérifie qu'un utilisateur est bien connecté
     * @return { Boolean }
     */
    checkIfLoggedIn: () => {
      if (localStorage.getItem("token") === null) {
        return false;
      } else {
        return true;
      }
    },
  },

  /**
   * Récupère les posts présents dans la base de données via l'API
   * @return { Promise[posts] }
   */
  created() {
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
      })
      .catch((err) => console.log(err));
  },
};
</script>
