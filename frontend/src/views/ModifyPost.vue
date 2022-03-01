<template>
  <div class="content" role="main">
    <a :href="postLink">
      <button>Retour</button>
    </a>

    <p class="infoTextModify">
      Choisissez les informations que vous souhaitez modifier.
    </p>

    <p class="errorMessage">{{ modifyError }}</p>

    <div class="formBox">
      <form class="form formToTheLeft">
        <div class="formField">
          <label for="title"
            >Choisissez un nouveau titre
            <input
              type="text"
              name="title"
              ref="postTitleModify"
              :value="this.post.title"
              required
            />
          </label>
        </div>

        <div class="formField">
          <label for="image"
            >Téléchargez une nouvelle image
            <input type="file" name="image" ref="postImageModify" required />
          </label>
        </div>

        <div class="modifyImage">
          <p>Image actuelle:</p>
          <img :src="this.post.imageUrl" class="modifyImage__img" />
        </div>

        <div class="formField">
          <button @click.prevent="sendModifyData">Modifier le post</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "ModifyPost",
  data() {
    return {
      postLink: `./#/post?id=${this.$route.query.id}`,
      postId: this.$route.query.id,
      modifyError: "",
      post: {},
    };
  },
  methods: {
    /**
     * Envoie les données de modification du post à l'API
     * et redirige vers la page du post
     * @return { Promise }
     */
    sendModifyData: function () {
      //Vérification des champs du formulaire
      if (this.$refs.postTitleModify.value.trim() == "") {
        this.modifyError = "Le titre ne peut pas être vide !";
        //Si il faut modifier le titre + l'image
      } else if (this.$refs.postImageModify.files[0] !== undefined) {
        //Création du formData
        let fileFormData = new FormData();
        fileFormData.append("image", this.$refs.postImageModify.files[0]);
        fileFormData.append("title", this.$refs.postTitleModify.value);

        //Envoi de la requête
        const requestOptionsWithFile = {
          method: "Put",
          body: fileFormData,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };

        return fetch(
          `http://localhost:3000/api/posts/${this.postId}`,
          requestOptionsWithFile
        )
          .then((res) => res.json())
          .then(() => (location.href = this.postLink))
          .catch((err) => console.log(err));
      }
      //S'il faut modifier uniquement le titre
      else {
        //Création du formData
        let noFileFormData = new FormData();
        noFileFormData.append("title", this.$refs.postTitleModify.value);

        //Envoi de la requête
        const requestOptionsWithoutFile = {
          method: "Put",
          body: noFileFormData,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };

        return fetch(
          `http://localhost:3000/api/posts/${this.postId}`,
          requestOptionsWithoutFile
        )
          .then((res) => res.json())
          .then(() => (location.href = this.postLink))
          .catch((err) => console.log(err));
      }
    },
  },
  /**
   * Récupère via l'API les données du post actuel et les affiche dans le
   * formulaire pour en donner un aperçu.
   * @return { Promise } postData
   */
  created: function () {
    const requestOptionsHeader = {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
      },
    };

    return fetch(
      `http://localhost:3000/api/posts/${this.postId}`,
      requestOptionsHeader
    )
      .then((postData) => postData.json())
      .then((postaData) => {
        this.post = postaData;
      })
      .catch((err) => console.log(err));
  },
};
</script>
