<template>
  <div id="app">
    <div id="header" role="banner">
      <a :href="logoLink">
        <img
          alt="Logo Groupomania"
          class="logo"
          src="./assets/icon-left-font-monochrome-white.svg"
        />
      </a>

      <template v-if="userLoggedIn">
        <div class="logOutButtons">
          <button @click="logOut">Déconnexion</button>
          <button @click="deleteAccount">Supprimer le compte</button>
        </div>
      </template>

      <div class="nav" role="navigation">
        <template v-if="!userLoggedIn">
          <router-link to="/">Connexion</router-link> |
          <router-link to="/signup">Inscription</router-link>
        </template>
        <router-link v-else to="/home">Fil d'actualité</router-link>
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
  computed: {
    logoLink() {
      return this.userLoggedIn ? "./#/home/" : "./#/";
    },
  },
  methods: {
    /**
     * Vérifie que l'utilisateur est connecté
     * @return { Boolean }
     */
    checkIfLoggedIn: function () {
      if (localStorage.getItem("token") === null) {
        return false;
      } else {
        return true;
      }
    },

    /**
     * Déconnecte l'utilisateur et renvoie à la page de connexion
     */
    logOut: () => {
      localStorage.clear();
      location.href = "./#/";
      location.reload();
    },

    /**
     * Supprime le compte de l'utilisateur connecté après confirmation
     * et redirige vers la page de connexion
     * @return { Promise }
     */
    deleteAccount: function () {
      if (
        window.confirm(
          "Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible..."
        ) === true
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
//Les style sont classés dans leur ordre d'apparition dans le
//parcours utilisateur classique:
// login, home, addPost, post, modifyPost

//Couleur de la charte graphique
$color1: #0d203e;
$font-color1: #ffffff;

$color2: #d1d1d1;
$font-color2: #091f43;

$color3: #d1515a;

//Tailles de police
$xSmall: 1.6rem;
$small: 1.9rem;
$medium: 2.2rem;
$large: 2.5rem;

$breakpoints: (
  "desktopTablet": 768px,
  "phone": 767px,
);

@mixin media-min($key) {
  @media all and (min-width: map-get($breakpoints, $key)) {
    @content;
  }
}

@mixin media-max($key) {
  @media all and (max-width: map-get($breakpoints, $key)) {
    @content;
  }
}

//Style propre à App.vue
html {
  font-size: 62.5%;
}

* {
  font-size: $small;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

.nav {
  padding: 30px;

  a {
    font-weight: bold;

    &.router-link-exact-active {
      text-decoration: underline;
    }
  }
}

.logo {
  width: 400px;
  height: auto;
  @include media-max("phone") {
    width: 280px;
    margin-bottom: 20px;
  }
}

#header {
  padding-top: 30px;
  background-color: $color1;
  color: $font-color1;
  margin-bottom: 30px;
  border-radius: 10px;
  position: relative;
  & a {
    color: $font-color1;
  }
}

.logOutButtons {
  @include media-min("desktopTablet") {
    position: absolute;
    right: 10px;
    top: 10px;
    display: flex;
    flex-direction: column;
    width: 120px;
  }
}

.hidden {
  display: none;
}

//from Login.vue
.content {
  background-color: $color2;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  padding: 20px 0;
  width: 100%;
  color: $font-color2;
}

.form {
  &Box {
    padding: 10px;
    width: auto;
    max-width: 100%;
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
  color: $font-color2;
  &:hover {
    text-shadow: 1px 2px 1px $color3;
  }
}

p {
  margin: 0;
}

button {
  font-weight: bold;
  color: $color1;
  border: solid 1px;
  border-radius: 5px;
  font-size: $xSmall;
  &:hover {
    box-shadow: 2px 2px 2px $color3;
  }
}

.errorMessage {
  color: $color3;
}

//from Home.vue
#posts {
  width: 100%;
  height: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
}

h2 {
  font-size: $large;
}

h3 {
  margin: 0px 0px 10px;
  font-size: $medium;
}

.post {
  background-color: $color2;
  padding: 10px;
  object-fit: contain;
  width: 60%;
  @include media-max("phone") {
    width: 90%;
  }
  margin: 20px;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  box-shadow: 2px 2px 10px $color1;
  &__image {
    width: 90%;
    max-height: 500px;
    object-fit: contain;
    border-radius: 5px;
    margin-bottom: 10px;
    @include media-max("phone") {
      min-width: 250px;
    }
  }
}

.likeButtons-container {
  display: flex;
  margin: 10px 0 10px;
  & button {
    margin: 0 5px 0 5px;
  }
}

.highlightButton {
  border: solid #252525 3px;
  
}

.seePostButton {
  font-size: $medium;
}

//from AddPost.vue
.formToTheLeft {
  align-items: flex-start;
}

@include media-max("phone") {
  label,
  input[type="file"] {
    font-size: $xSmall;
  }
}

//from Post.vue
.emptyCommentsMessage {
  color: $font-color1;
}

.comments {
  background-color: $color1;
  padding: 8px;
  width: 60%;
  border-radius: 10px;
  box-shadow: 2px 2px 10px $color3;
  @include media-max("phone") {
    width: 90%;
  }
}

.commentBox {
  background-color: $color2;
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
  background-color: $color1;
  color: $font-color1;
  box-shadow: 2px 2px gray;
  padding: 2px 4px;
}

.commentButton {
  margin: 5px 0;
}

.deleteButton {
  background-color: $color2;
  font-size: $xSmall;
}

.modifyButton {
  background-color: $color1;
  color: $font-color1;
  border: solid 1px $color1;
  font-size: $xSmall;
}

.deleteCommentButton {
  position: absolute;
  right: 0px;
  font-size: $xSmall;
}

.formBoxComment {
  padding: 10px;
  @include media-max("desktopTablet") {
    width: auto;
  }
  @include media-max("phone") {
    width: 100%;
    display: flex;
    justify-content: center;
    &__Text {
      width: 90%;
    }
  }
}

textarea {
  resize: none;
}

//from ModifyPost.vue
.infoTextModify {
  margin: 25px 0;
}

.modifyImage {
  margin: 20px 0;
  text-align: left;
  &__img {
    max-height: 150px;
  }
}
</style>
