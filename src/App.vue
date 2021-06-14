<template>
  <v-app>
    <nimuni-appbar></nimuni-appbar>
    <v-main class="grey lighten-3 main-container">
      <v-container>
        <v-card class="main-container-card">
          <v-card-text>
            <router-view style="max-height: 90vh;"></router-view>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
/* eslint-disable */
// import "@/css/reset.css";
import AppBar from './components/AppBar'
import Footer from './components/Footer'

export default {
  head: {
    link: [
      {
        rel: "icon",
        href: require("./assets/logo_icon.png")
      },
    ]
  },
  name: "App",
  components: {
    'nimuni-appbar': AppBar,
    'nimuni-footer': Footer,
  },
  data: function(){
    return {
    }
  },
  created() {
  },
};
</script>

<style>
@import "./css/default.css";
.v-application--wrap {
  background-color:#F2E291;
}
.main-container {
  margin: 0 auto;
  width: 1264px;
}
.main-container-card {
  height: 92.3vh;
}
::-webkit-scrollbar {
  background: transparent;
  width: 8px;
}
::-webkit-scrollbar-thumb {
  background-color: #A6530AAA;
  border-radius: 10px;
}
</style>
