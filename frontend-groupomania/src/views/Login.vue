<template>
  <div class="content">
    <div id="errorMessage"></div>
    <div class="formBox">
      <form
        method="post"
        action="http://localhost:3000/api/auth/login"
        class="form"
      >
        <div class="formField">
          <label for="email">Email </label>
          <input type="text" name="email" ref="logEmail" required />
        </div>
        <div class="formField">
          <label for="password">Mot de passe </label>
          <input type="password" name="password" ref="logPassword" required />
        </div>
        <div class="formField">
          <button v-on:click="sendLogData">Connexion</button>
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
      value: 1,
    };
  },
  methods: {
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
            document.getElementById("errorMessage").innerText =
              "L'email et le mot de passe ne correspondent pas";
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

<style lang="scss">

</style>
