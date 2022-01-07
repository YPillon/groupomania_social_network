<template>
  <div class="content">
    <a :href="homeLink">
      <button>Retour</button>
    </a>
    <div id="post"></div>
    <div id="comments"></div>
  </div>
</template>

<script>
export default {
  name: "Post",
  data() {
    return {
      homeLink: "./#/home",
      postId: this.$route.query.id,
    };
  },
  methods: {
    getUserName: function (userId, pseudoSpan) {
      return fetch(`http://localhost:3000/api/users/${userId}`)
        .then((res) => res.json())
        .then((email) => {
          console.log(email);
          pseudoSpan.innerText = JSON.parse(email.email);
        })
        .catch((err) => console.log(err));
    },

    createPost: function (post, postId) {
      const $postBox = document.getElementById("post");

      const $post = document.createElement("article");

      const $title = document.createElement("h3");
      $title.innerText = post.title;

      const $image = document.createElement("img");
      $image.setAttribute("src", `${post.imageUrl}`);

      $postBox.appendChild($post);
      $post.appendChild($title);
      $post.appendChild($image);

      //Si l'utilisateur est le créateur
      if (localStorage.getItem("userId") == post.userId) {
        const $modifyLink = document.createElement("a");
        $modifyLink.setAttribute("href", "/#/modifypost");
        const $modifyButton = document.createElement("button");
        $modifyButton.innerText = "Modifier";
        const $deleteButton = document.createElement("button");
        $deleteButton.setAttribute("id", "deleteButton");
        $deleteButton.innerText = "Supprimer";

        //fonction de suppression du post
        $deleteButton.addEventListener("click", function () {
          const requestOptions = {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${JSON.parse(
                localStorage.getItem("token")
              )}`,
            },
          };
          console.log(postId);

          return fetch(
            `http://localhost:3000/api/posts/${postId}`,
            requestOptions
          )
            .then((res) => res.json())
            .then(() => {
              location.href = "./#/home";
            })
            .catch((err) => console.log(err));
        });

        //Insertion dans le DOM
        $postBox.appendChild($modifyLink);
        $modifyLink.appendChild($modifyButton);
        $postBox.appendChild($deleteButton);
      }
    },

    createComments: function (comments) {
      const $commentsBox = document.getElementById("comments");

      for (let comment of comments) {
        const $commentBox = document.createElement("div");
        $commentBox.classList.add("commentBox");

        const $pseudo = document.createElement("span");

        this.getUserName(comment.userId, $pseudo);

        const $commentText = document.createElement("p");
        $commentText.innerText = comment.text;

        $commentsBox.appendChild($commentBox);
        $commentBox.appendChild($pseudo);
        $commentBox.appendChild($commentText);
      }
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
        this.createPost(postData, this.postId);

        return fetch(
          `http://localhost:3000/api/posts/${this.postId}/comments`,
          requestHeaders
        )
          .then((res) => res.json())
          .then((commentsData) => {
            this.createComments(commentsData);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  },
};
</script>
