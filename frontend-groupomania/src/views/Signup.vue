<template>
  <div class="formBox">
    <form class="form">
      <div class="formField">
        <label for="email">Email</label>
        <input type="text" name="email" id="signUpEmail" required />
      </div>
      <div class="formField">
        <label for="password">Mot de passe</label>
        <input type="password" name="password" id="signUpPassword" required />
      </div>
      <div class="formField">
        <button v-on:click.prevent="sendSignUpData">Connexion</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  name: "Signup",
  data() {
    return {
      value: 1,
    };
  },
  methods: {
    sendSignUpData: function () {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: document.getElementById("signUpEmail").value,
          password: document.getElementById("signUpPassword").value,
        }),
      };
      return fetch("http://localhost:3000/api/auth/signup", requestOptions)
        .then((res) => console.log(res))
        .then(() => {
          location.href = "./#/home";
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>
