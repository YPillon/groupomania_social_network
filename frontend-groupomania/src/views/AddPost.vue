<template>
  <div class="content" role="main">
    <a :href="homeLink">
      <button>Retour au fil d'actualité</button>
    </a>
    <p class="errorMessage">{{ addPostError }}</p>

    <div class="formBox">
      <form class="form formToTheLeft">
        <div class="formField">
          <label for="title"
            >Choisissez un titre
            <input type="text" name="title" ref="postTitle" required />
          </label>
        </div>

        <div class="formField">
          <label for="image"
            >Téléchargez une image
            <input type="file" name="image" ref="postImage" required />
          </label>
        </div>

        <div class="formField">
          <button @click.prevent="sendPostData">Créer le post</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "AddPost",
  data() {
    return {
      homeLink: "./#/home",
      addPostError: "",
    };
  },
  methods: {
    /**
     * Envoie les données du post à l'API (titre, image, userId)
     * @return { Promise }
     */
    sendPostData: function () {
      //Vérification des champs du formulaire
      if (
        this.$refs.postImage.files[0] === undefined ||
        this.$refs.postTitle.value.trim() == ""
      ) {
        this.addPostError = "Veuillez choisir un titre et une image";
      } else {
        //Création du formData
        let formData = new FormData();
        formData.append("image", this.$refs.postImage.files[0]);
        formData.append("userId", localStorage.getItem("userId"));
        formData.append("title", this.$refs.postTitle.value);

        //Envoi de la requête à l'API
        const requestOptions = {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };

        return fetch("http://localhost:3000/api/posts", requestOptions)
          .then((res) => res.json())
          .then(() => {
            location.href = "./#/home";
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>
