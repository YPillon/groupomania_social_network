<template>
  <div class="content">
    <a :href="homeLink">
      <button>Retour au fil d'actualité</button>
    </a>
    <div class="formBox">
      <form class="form formToTheLeft">
        <div class="formField">
          <label for="title">Choisissez un titre </label>
          <input type="text" name="title" ref="postTitle" required />
        </div>
        <div class="formField">
          <label for="image">Téléchargez une image </label>
          <input type="file" name="image" ref="postImage" required />
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
    };
  },
  methods: {
    sendPostData: function () {
      //Création du formData
      let formData = new FormData();
      formData.append("image", this.$refs.postImage.files[0]);
      formData.append("userId", localStorage.getItem("userId"));
      formData.append("title", this.$refs.postTitle.value);

      const requestOptions = {
        method: "POST",
        body: formData,
        headers: {
          Authorization: `Bearer ${JSON.parse(localStorage.getItem("token"))}`,
        },
      };
      //Envoi de la requête à l'API
      return fetch("http://localhost:3000/api/posts", requestOptions)
        .then((res) => res.json())
        .then(() => (location.href = "./#/home"))
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss">
.formToTheLeft {
  align-items: flex-start;
}
</style>
