<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <v-row>
          <v-col cols="4">
            <v-btn color="success" @click="send">send</v-btn>
          </v-col>
          <v-col cols="4">
            <Tiptap v-model="content" :editable="editable" :limit="limit" />
          </v-col>
          <v-col cols="4"> </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import Tiptap from "@/components/Tiptap.vue";
const _ = require("underscore");

export default {
  components: {
    Tiptap,
  },
  data() {
    return {
      editable: true,
      limit: 0,
      content:
        '<p>A Vue.js<strong> wr</strong>ap<em>p</em>er c<s>om</s>pon<u>ent</u> f</p><h1> 1</h1><h2> 2</h2><h3>3 </h3><p> o<mark>r tip</mark>t<mark data-color="#ffc078" style="background-color: #ffc078">ap to</mark></p><p></p><hr><p></p><p> use v-model.</p>',
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    initPage: function () {},
    send: function () {
      const baseURI = "http://nimuni.iptime.org:3000/api";
      this.$http
        .post(`${baseURI}/dailyWrite`, { content: _.escape(this.content) })
        .then((res) => {
          console.log(res.data);
        })
        .catch((err) => {
          console.error(err);
        });
    },
  },
};
</script>

<style scoped></style>
