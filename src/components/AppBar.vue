<template>
  <v-app-bar
    app
    color="#D9AF62"
    flat
    dense
  > 
    <a @click="introPage" ><v-img :src="logoImg" class="mx-2" max-height="48" max-width="48"></v-img></a>
    <v-toolbar-title>
      <a @click="introPage"><span class="v-toolbar-logo-span" >DailyWriting</span></a>
    </v-toolbar-title>
    <v-row v-show="false">
      <v-col cols="12" class="pa-0">
        <v-btn v-for="route in $router.options.routes" :key="route.path" color="#BF7A24" dark text>
          <router-link :to="route.path">{{ route.path }}</router-link>
        </v-btn>
      </v-col>
    </v-row>
    <v-btn color="#BF7A24" dark text @click="dailyWritingPage">
      <v-icon>mdi-pencil</v-icon>
      <span class="appbar-menu-span">시작하기</span>
    </v-btn>
    <v-btn color="#BF7A24" dark text @click="subjectPage">
      <v-icon>mdi-playlist-edit</v-icon>
      <span class="appbar-menu-span">글주제</span>
    </v-btn>
    <v-spacer></v-spacer>
    <v-btn color="#BF7A24" dark text @click="codePage">
      <v-icon>mdi-cog</v-icon>
      <span class="appbar-menu-span">코드설정</span>
    </v-btn>
    <div class="appbar-nickname">
      <span class="appbar-nickname-span" @click="loginPage">{{ idState }}</span>
    </div>
    <v-btn v-show="isLogin" class="appbar-button" dark color="#BF7A24" @click="myPage"><v-icon>mdi-account</v-icon></v-btn>
    <v-btn v-show="!isLogin" class="appbar-button" dark color="#BF7A24" @click="loginPage"> 로그인 </v-btn>
    <v-btn v-show="isLogin" class="appbar-button" dark color="#BF7A24" @click="logout"> 로그아웃 </v-btn>
  </v-app-bar>
</template>

<script>
import logo from "../assets/logo_icon.png"
export default {
  data() {
    return {
      logoImg: logo
    }
  },
  computed: {
    idState() {
      return this.$store.state.nickname === "" ? "로그인하세요" : this.$store.state.nickname;
    },
    isLogin(){
      return this.$store.state.isLogin;
    }
  },
  mounted(){
  },
  methods: {
    myPage: function(){
      if(!this.$store.state.isLogin){
        return alert("잘못된 접근입니다.")
      }
      this.$router.push({ name: "MyPage" });
    },
    loginPage: function(){
      if(this.$store.state.isLogin){
        return
      }
      this.$router.push({ name: "Login" });
    },
    introPage: function(){
      this.$router.push({ name: "Intro" });
    },
    dailyWritingPage: function(){
      this.$router.push({ name: "DailyWriting" });
    },
    subjectPage: function(){
      this.$router.push({ name: "Subject" });
    },
    codePage: function(){
      this.$router.push({ name: "Code" });
    },
    logout: function(){
      this.$store.commit("mutationLogout")
      this.$router.push({ name: "Intro" });
    },
  },
}
</script>

<style scoped>
.appbar-nickname{
  min-width: 64px;
}
.appbar-nickname-span{
  font-size: 14px;
  color: white;
}
.appbar-button{
  margin-left: 5px;
}
.appbar-menu-span{
  font-weight:bold;
  font-size: 14px;
  color: white;
}
.v-toolbar-logo-span{
  margin-right: 10px;
  font-weight:bold;
  font-style: italic;
  color: white;
}
</style>