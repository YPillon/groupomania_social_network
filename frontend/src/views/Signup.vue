<template>
  <div class="content" role="main">
    <p class="errorMessage" :class="[{ hidden: !hasError }]">
      Veuillez entrer votre email et choisir un mot de passe
    </p>

    <div class="formBox">
      <form class="form">
        <div class="formField">
          <label
            >Email
            <input type="text" name="email" ref="signUpEmail" required />
          </label>
        </div>

        <div class="formField">
          <label for="password"
            >Mot de passe
            <input
              type="password"
              name="password"
              ref="signUpPassword"
              required
            />
          </label>
        </div>

        <div class="formField">
          <button v-on:click.prevent="sendSignUpData">Inscription</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      hasError: null,
    };
  },
  methods: {
    /**
     * Envoie les données pour la création d'un compte à l'API
     * et redirige vers la page de connexion.
     * @return { Promise }
     */
    sendSignUpData: function () {
      //Vérification des champs du formulaire
      if (
        this.$refs.signUpEmail.value.trim() == "" ||
        this.$refs.signUpPassword.value.trim() == ""
      ) {
        this.hasError = true;
      } else {
        //Envoi de la requête à l'API
        const requestOptions = {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: this.$refs.signUpEmail.value,
            password: this.$refs.signUpPassword.value,
          }),
        };

        return fetch("http://localhost:3000/api/auth/signup", requestOptions)
          .then((res) => res.json())
          .then(() => {
            location.href = "./#/";
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>
