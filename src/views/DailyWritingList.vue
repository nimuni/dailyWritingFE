<template>
  <v-container fluid fill-height>
    list
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      dailyWriteList: [],
    };
  },
  created() {
    this.initPage()
  },
  methods: {
    initPage: async function () {
      // dataload
      await this.dataLoad()
    },
    dataLoad: async function(){
      try{
        this.dailyWriteList = await this.$http.get("/api/dailyWrite");
        console.log(this.dailyWriteList)
      } catch(err) {
        console.error(err)
      }
    },
  },
};
</script>

<style scoped>

</style>
