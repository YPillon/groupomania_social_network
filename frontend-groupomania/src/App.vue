<template>
  <div id="app">
    <div id="header">
      <p>Connected: {{ userLoggedIn }}</p>

      <img
        alt="Logo Groupomania"
        class="logo"
        src="./assets/icon-left-font-monochrome-black.png"
      />

      <template v-if="userLoggedIn == true">
        <div class="logOutButtons">
          <button @click="logOut">Déconnexion</button>
          <button @click="deleteAccount">Supprimer le compte</button>
        </div>
      </template>

      <div class="nav">
        <router-link to="/">Connexion</router-link> |
        <router-link to="/signup">Inscription</router-link> |
        <router-link to="/home">Fil d'actualité</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

//importation de VueHead
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
  created: function () {
    const html = document.documentElement; // returns the html tag
    html.setAttribute("lang", "fr");
  },
};
</script>

<style lang="scss">

//Les style sont classés dans leur ordre d'apparition dans le
//parcours utilisateur classique

//Style propre à App.vue
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
      color: #417649;
      text-decoration: underline;
    }
  }
}

.logo {
  width: 280px;
  height: auto;
}

#header {
  background-color: #caf5e1;
  margin-bottom: 30px;
  border-radius: 10px;
  position: relative;
}

@media only all and (min-width: 768px) {
  .logOutButtons {
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    flex-direction: column;
    width: 100px;
  }
}

//from Login.vue
.content {
  background-color: #caf5e1;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  padding: 20px 0;
  width: 100%;
}

.form {
  &Box {
    padding: 10px;
    width: auto;
  }
  &Field {
    margin-bottom: 10px;
  }
}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

a {
  margin: 0;
  text-decoration: none;
  width: fit-content;
  height: fit-content;
  color: #2c3e50;
  &:hover {
    filter: brightness(150%);
  }
}

p {
  margin: 0;
}

button {
  font-weight: bold;
  &:hover {
    filter: brightness(150%);
  }
}

//from Home.vue
.hide {
  display: none;
}

#posts {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h3 {
  margin: 0px 0px 10px;
}

@media only all and (min-width: 768px) {
  .post {
    background-color: #90dfbb;
    padding: 10px;
    width: 50%;
    margin: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__image {
      width: 90%;
      max-height: 500px;
      object-fit: contain;
      border-radius: 5px;
    }
  }
}
@media only all and (max-width: 767px) {
  .post {
    background-color: #90dfbb;
    padding: 10px;
    width: 90%;
    margin: 20px;
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: center;
    &__image {
      width: 90%;
      max-height: 500px;
      object-fit: contain;
      border-radius: 5px;
    }
  }
}

//from AddPost.vue
.formToTheLeft {
  align-items: flex-start;
}

//from Post.vue
@media only all and (min-width: 768px) {
  .comments {
    background-color: #90dfbb;
    padding: 8px;
    width: 50%;
    border-radius: 10px;
  }
}

@media only all and (max-width: 767px) {
  .comments {
    background-color: #90dfbb;
    padding: 8px;
    width: 90%;
    border-radius: 10px;
  }
}

.commentBox {
  background-color: #caf5e1;
  padding: 5px 5px;
  &:not(:last-child) {
    margin-bottom: 10px;
  }
  & > p {
    text-align: left;
  }
}

.pseudoBox {
  display: flex;
  justify-content: flex-start;
  position: relative;
  margin-bottom: 25px;
  background-color: #90dfbb;
  box-shadow: 2px 2px gray;
  padding: 2px 4px;
}

.deleteCommentButton {
  position: absolute;
  right: 0px;
}

.hide {
  display: none;
}

.deleteColor {
  background-color: rgb(185, 176, 169);
}

.modifyColor {
  background-color: rgb(127, 128, 202);
}

//from AddComment.vue
@media only all and (min-width: 768px) {
  .formBoxComment {
    width: auto;
    padding: 10px;
  }
}

@media only all and (max-width: 767px) {
  .formBoxComment {
    width: 100%;
    padding: 10px;
    display: flex;
    justify-content: center;
  }

  .commentText {
    width: 90%;
  }
}

//from ModifyPost.vue
.infoTextModify {
  margin: 25px 0;
}
</style>
