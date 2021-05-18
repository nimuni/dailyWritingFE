<template>
  <v-app>
    <div>
      <ul v-show="showTestButton">
        <li v-for="route in $router.options.routes" :key="route.path" ><router-link :to="route.path">{{ route.path }}</router-link></li>
        <v-btn color="success" @click="()=>{this.showTestButton=false}">숨김</v-btn>
      </ul>
    </div>
    <div>
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
// import "@/css/reset.css";

export default {
  name: "App",
  data: function(){
    return {
      showTestButton: true,
    }
  },
  created() {
    console.log("app.vue")
  },
};
</script>

<style scoped>
@import "./css/default.css";
</style>
