<template>
  <div class="content">
    <a id="addPostLink" href="./#/addpost">Créer un post</a>
    <p id="welcomeMessage">
      Bienvenue ! Voici les dernières publications de vos collègues !
    </p>
    <p id="connectMessage">
      Bienvenue ! Connectez-vous pour accéder aux dernières publications de vos collègues !
    </p>
    <div id="posts"></div>
  </div>
</template>

<script>
export default {
  name: "Home",
  methods: {
    createPosts: function (posts) {
      const $postsBox = document.getElementById("posts");

      for (let post of posts) {
        const $link = document.createElement("a");
        $link.setAttribute("href", `./#/post?id=${post.id}`);

        const $post = document.createElement("article");

        const $title = document.createElement("h3");
        $title.innerText = post.title;

        const $image = document.createElement("img");
        $image.setAttribute("src", `${post.imageUrl}`);

        $postsBox.appendChild($link);
        $link.appendChild($post);
        $post.appendChild($title);
        $post.appendChild($image);
      }
    },

    checkIfLogIn: function () {
      if (localStorage.getItem("token") === null) {
        document.getElementById("addPostLink").classList.add("hide");
        document.getElementById("welcomeMessage").classList.add("hide");
      } else {
        document.getElementById("connectMessage").classList.add("hide");
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
        this.createPosts(postsData);
      })
      .catch((err) => console.log(err));
  },
  mounted() {
    this.checkIfLogIn();
  },
};
</script>

<style lang="scss">
.hide {
  display: none;
}
</style>
