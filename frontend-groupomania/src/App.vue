<template>
  <div id="app">
    <div id="header">
      <img
        alt="Vue logo"
        class="logo"
        src="./assets/icon-left-font-monochrome-black.png"
      />
      <div id="nav">
        <router-link to="/">Login</router-link> |
        <router-link to="/about">About</router-link>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.logo {
  width: 300px;
  height: auto;
}
</style>
