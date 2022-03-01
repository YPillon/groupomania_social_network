<template>
  <div class="content" role="main">
    <p class="errorMessage" :class="{ hidden: !hasError }">
      L'email et le mot de passe ne correspondent pas !
    </p>

    <div class="formBox">
      <form class="form">
        <div class="formField">
          <label for="email"
            >Email
            <input type="text" name="email" ref="logEmail" required />
          </label>
        </div>

        <div class="formField">
          <label for="password"
            >Mot de passe
            <input type="password" name="password" ref="logPassword" required />
          </label>
        </div>

        <div class="formField">
          <button v-on:click.prevent="sendLogData">Connexion</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      hasError: null,
    };
  },
  methods: {
    /**
     * Envoie les données de connexion pour vérification à l'API.
     * Si la connexion est réussie, stocke les données de la réponse dans
     * le localStorage et redirige vers le fil d'actualité.
     * @return { Promise<token, userId, userRole> }
     */
    sendLogData: function () {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: this.$refs.logEmail.value,
          password: this.$refs.logPassword.value,
        }),
      };

      return fetch("http://localhost:3000/api/auth/login", requestOptions)
        .then((res) => res.json())
        .then((res) => {
          if (res.error) {
            this.hasError = true;
          } else {
            localStorage.setItem("userId", JSON.stringify(res.userId));
            localStorage.setItem("userRole", JSON.stringify(res.userRole));
            localStorage.setItem("token", JSON.stringify(res.token));
            location.href = "./#/home";
            location.reload();
          }
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
