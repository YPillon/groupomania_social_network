<template>
  <div class="content">
    <h2 id="connectMessage" v-if="this.checkIfLoggedIn() == false">
      Bienvenue ! Connectez-vous pour accéder aux dernières publications de vos
      collègues !
    </h2>
    <template v-else-if="this.checkIfLoggedIn() == true">
      <h2 id="welcomeMessage">
        Bienvenue ! Voici les dernières publications de vos collègues !
      </h2>
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
          <a :href="`./#/post?id=${post.id}`">Voir le post</a>
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
  computed: {},
  methods: {
    checkIfLoggedIn: () => {
      if (localStorage.getItem("token") === null) {
        return false;
      } else {
        return true;
      }
    },
  },
  created() {
    const requestHeaders = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };

    return fetch("http://localhost:3000/api/posts", requestHeaders)
      .then((res) => res.json())
      .then((postsData) => {
        this.posts = postsData;
      })
      .catch((err) => console.log(err));
  },
};
</script>

<style lang="scss">
.hide {
  display: none;
}

#posts {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.post {
  background-color: #90dfbb;
  padding: 10px;
  width: 50%;
  margin: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  &__image {
    width: 90%;
    height: 90%;
    border-radius: 5px;
  }
}

h3 {
  margin: 0px 0px 10px;
}
</style>
