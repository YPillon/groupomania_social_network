<template>
  <div class="content">
    <p class="errorMessage">{{ signupError }}</p>

    <div class="formBox">
      <form class="form">
        <div class="formField">
          <label for="email">Email </label>
          <input type="text" name="email" ref="signUpEmail" required />
        </div>
        <div class="formField">
          <label for="password">Mot de passe </label>
          <input
            type="password"
            name="password"
            ref="signUpPassword"
            required
          />
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
      signupError: "",
    };
  },
  methods: {
    sendSignUpData: function () {
      //Vérification des champs du formulaire
      if (
        this.$refs.signUpEmail.value.trim() == "" ||
        this.$refs.signUpPassword.value.trim() == ""
      ) {
        this.signupError =
          "Veuillez entrer votre email et choisir un mot de passe";
      } else {
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
