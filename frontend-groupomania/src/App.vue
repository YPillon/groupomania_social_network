<template>
  <div id="app">
    <div id="header">
      <p>Connected: {{ userLoggedIn }}</p>

      <template v-if="userLoggedIn == true">
        <div class="logOutButtons">
          <button @click="logOut">Déconnexion</button>
          <button @click="deleteAccount">Supprimer le compte</button>
        </div>
      </template>

      <img
        alt="Logo Groupomania"
        class="logo"
        src="./assets/icon-left-font-monochrome-black.png"
      />

      <div class="nav">
        <router-link to="/">Connexion</router-link> |
        <router-link to="/signup">Inscription</router-link> |
        <router-link to="/home">Fil d'actualité</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      userLoggedIn: this.checkIfLoggedIn(),
      userId: JSON.parse(localStorage.getItem("userId")),
    };
  },
  methods: {
    checkIfLoggedIn: function () {
      if (localStorage.getItem("token") === null) {
        return false;
      } else {
        return true;
      }
    },

    logOut: () => {
      localStorage.clear();
      location.href = "./#/";
      location.reload();
    },

    deleteAccount: function () {
      if (
        window.confirm(
          "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible..."
        ) == true
      ) {
        const requestOptions = {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JSON.parse(
              localStorage.getItem("token")
            )}`,
          },
        };

        fetch(`http://localhost:3000/api/auth/${this.userId}`, requestOptions)
          .then((res) => res.json())
          .then(() => {
            localStorage.clear();
            location.href = "./#/";
            location.reload();
          })
          .catch((err) => console.log(err));
      }
    },
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

.nav {
  padding: 30px;

  a {
    font-weight: bold;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.logo {
  width: 300px;
  height: auto;
}

#header {
  background-color: #caf5e1;
  margin-bottom: 30px;
  border-radius: 10px;
  position: relative;
}

.logOutButtons {
  position: absolute;
  right: 10px;
  top: 10px;
  display: flex;
  flex-direction: column;
}
</style>
