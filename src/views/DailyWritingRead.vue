<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col cols="12" md="2" sm="12"></v-col>
      <v-col cols="auto" md="8" sm="12">
        <v-row>
          <v-col cols="12">
            <v-chip color="#f3d959" dark small>{{ subjectCodename }}</v-chip>
            <span class="ma-2">{{ dailySubjectCodename }}</span>
          </v-col>
          <v-col cols="12">
            <div class="pa-1">
              <span class="daily-write-title">{{ title }}</span>
            </div>
          </v-col>
        </v-row>
        <Tiptap v-model="content" :editable="editable" :limit="limit" />
        <v-row>
          <v-col align="right">
            <v-btn dark class="ma-1" color="#BF7A24" @click="moveDailyWritingModify" v-if="checkDataOwner">수정</v-btn>
            <v-btn dark class="ma-1" color="error" @click="()=>{this.showDialog = true}" v-if="checkDataOwner">삭제</v-btn>
            <v-btn dark class="ma-1" color="grey darken-1" @click="moveDailyWritingList" >목록</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <v-dialog v-model="showDialog" width="500">
      <v-card>
        <v-card-title>
          글 삭제
        </v-card-title>
        <v-card-text>
          삭제하시겠습니까?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="#BF7A24" :disabled="!checkDataOwner" @click="confirm">확인</v-btn>
          <v-btn dark color="grey darken-1" :disabled="!checkDataOwner" @click="()=>{this.showDialog = false}">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import Tiptap from "@/components/Tiptap.vue";
const _ = require("underscore");
// import { exp_remove_html_tag } from "../js/common.util";
const NO_ID_OF_ETC = "no_id_of_etc";
const ETC_TOPIC_OBJ = {
  useYN: 'Y',
  language: 'KOR',
  _id: NO_ID_OF_ETC,
  title: '자유주제',
  content: '자유롭게 작성해주세요',
  codename: '기타',
  code_id: '60c7687843467d876489c887',
  subject_id: '60e9aaf14eb26a5b5c0be84f',
  nickname: '관리자',
}
console.log(ETC_TOPIC_OBJ)

export default {
  components: {
    Tiptap,
  },
  data() {
    return {
      editable: false,
      limit: 0,
      title: "",
      content: "",
      comments: [],
      like: 0,
      view: 0,
      subjectCodename: "",
      dailySubjectCodename: "",
      createUserId: null,
      dailyWrite_id: null,
      showDialog: false,
    };
  },
  computed: {
    checkDataOwner: function(){
      return this.$store.state.userId === this.createUserId;
    }
  },
  created() {
    this.initPage()
    // TODO
    // 글 수정기능
    // 저장 시 주제 카운트++ 오늘의주제 카운트++
    // 글 목록기능
    // push에 query: { _id: _id }
  },
  methods: {
    initPage: async function () {
      // dataload
      await this.dataLoad()
    },
    dataLoad: async function() {
      let getParam = this.$route.query;
      try{
        let data = await this.$http.get(`/api/dailyWrite/${getParam._id}`)
        let dailyWriteData = data.data
        console.log(dailyWriteData)
        this.title = dailyWriteData.title;
        this.content = _.unescape(dailyWriteData.content);
        this.comments = dailyWriteData.comments;
        this.subjectCodename = dailyWriteData.subjectCodename;
        this.dailySubjectCodename = dailyWriteData.dailySubjectCodename;
        this.createUserId = dailyWriteData.createUserId;
        this.dailyWrite_id = dailyWriteData._id;
      } catch(err) {
        console.error(err)
      }
    },
    moveDailyWritingModify: function(){
      this.$router.push({name: "DailyWritingCreate", query: { _id: this.dailyWrite_id }} )
    },
    moveDailyWritingList: function(){
      this.$router.push({name: "DailyWritingList"})
    },
    confirm: async function(){
      this.showDialog = false;
      try {
        await this.$http.delete(`/api/dailyWrite/${this.dailyWrite_id}`)
        this.moveDailyWritingList()
      } catch(err) {
        alert(err)
      }
    },
  },
};
</script>

<style scoped>
.daily-write-title{
  font-size: 1.3em;
  font-weight: bold;
}
.vertical-center-div {
  margin-top: auto;
  margin-bottom: auto;
}
.auto-save {
  text-decoration-color: gray;
  text-decoration: underline;
}
a:link {
  color: black;
  text-decoration: none;
}
a:visited {
  color: black;
  text-decoration: none;
}
a:hover {
  color: #d9aa55;
  text-decoration: none;
}
.warn-text {
  color: red;
}
</style>
