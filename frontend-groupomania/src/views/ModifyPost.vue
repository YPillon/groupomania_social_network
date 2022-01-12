<template>
  <div class="content">
    <div class="formBox">
      <a :href="postLink">
        <button>Retour</button>
      </a>
      <p class="infoTextModify">
        Choisissez les informations que vous souhaitez modifier.
      </p>

      <form class="form formToTheLeft">
        <p ref="errorModifyMessage" class="error"></p>
        <div class="formField">
          <label for="title">Choisissez un nouveau titre </label>
          <input type="text" name="title" ref="postTitleModify" required />
        </div>
        <div class="formField">
          <label for="image">Téléchargez une nouvelle image </label>
          <input type="file" name="image" ref="postImageModify" required />
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
    };
  },
  methods: {
    sendModifyData: function () {
      if (this.$refs.postTitleModify.value == "") {
        console.log("HAHA");
      }
      if (
        this.$refs.postImageModify.files[0] === undefined ||
        this.$refs.postTitleModify.value == ""
      ) {
        this.$refs.errorModifyMessage.innerText =
          "Veuillez choisir un nouveau titre et télcharger une nouvelle image";
      } else {
        //Création du formData
        let formData = new FormData();
        formData.append("image", this.$refs.postImageModify.files[0]);
        formData.append("title", this.$refs.postTitleModify.value);

        const requestOptions = {
          method: "Put",
          body: formData,
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };

        //Envoi de la requête à l'API
        return fetch(
          `http://localhost:3000/api/posts/${this.$route.query.id}`,
          requestOptions
        )
          .then((res) => res.json())
          .then(() => (location.href = "./#/home"))
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>

<style lang="scss">
.infoTextModify {
  margin: 25px 0;
}
</style>
