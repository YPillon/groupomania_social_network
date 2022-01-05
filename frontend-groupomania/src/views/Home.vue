<template>
  <div class="content">
    <a id="addPostLink" href="./#/addpost">Créer un post</a>
    <p>Voici les dernières publications de vos collègues !</p>
    <div id="posts"></div>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {};
  },
  methods: {
    createPosts: function (posts) {
      for (let post of posts) {
        const $postsBox = document.getElementById("posts");

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
  },
  created() {
    return fetch("http://localhost:3000/api/posts")
      .then((res) => res.json())
      .then((postsData) => {
        this.createPosts(postsData);
      })
      .catch((err) => console.log(err));
  },
};
</script>
