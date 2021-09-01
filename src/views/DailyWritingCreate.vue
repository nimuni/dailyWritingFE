<template>
  <v-container fluid fill-height>
    <v-row>
      <v-col cols="12" md="2" sm="12"> </v-col>
      <v-col cols="auto" md="7" sm="12">
        <v-text-field
          label="제목"
          v-model="title"
          solo
          single-line
          dense
        ></v-text-field>
        <Tiptap v-model="content" :editable="editable" :limit="limit" />
      </v-col>
      <v-col cols="12" md="3" sm="12">
        <div class="mb-3">
          <v-card>
            <v-card-title class="justify-center">
              오늘의 주제 선택
            </v-card-title>
            <v-card-text v-show="topics.length > 0">
              <v-radio-group v-model="selectedTopic">
                <v-radio
                  v-for="topic in topics"
                  :key="topic._id"
                  :value="topic._id"
                  color="#FA8A2E"
                >
                  <template v-slot:label>
                    <div>
                      <v-tooltip bottom>
                        <template v-slot:activator="{ on }">
                          <a target="_blank" :href="topic.src" v-on="on">
                            <v-chip color="#f3d959" dark x-small>{{topic.codename}}</v-chip><br>
                            {{ topic.title }}
                          </a>
                        </template>
                        {{ topic.content }}
                      </v-tooltip>
                    </div>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-card-text>
            <v-card-text v-show="topics.length == 0">
              <div class="text-center">
                오늘의 주제 로딩중
              </div>
              <v-progress-linear
                color="primary"
                indeterminate
              ></v-progress-linear>
            </v-card-text>
          </v-card>
        </div>
        <div class="d-flex justify-space-between">
          <div class="vertical-center-div">
            <span class="text-left auto-save" 
              @click="()=>{showLoadAutoSavedDataDialog=true}" 
              v-show="checkDataOwner"
            >
              자동저장시각({{ autoSavedTime }})
            </span>
          </div>
          <v-dialog
            width="400"
            v-model="showLoadAutoSavedDataDialog"
          >
            <v-card>
              <v-card-title>
                자동저장 불러오기
              </v-card-title>
              <v-card-text>
                자동저장된 데이터를 불러오시겠습니까?<br>
                기존에 작성된 글과 선택된 주제는 <span class="warn-text">덮어쓰기</span>됩니다.<br>
                <span class="warn-text">날짜가 다른경우</span> 주제가 <span class="warn-text">자유주제</span>로 설정됩니다.<br>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn dark color="#BF7A24" @click="()=>{this.loadAutoSavedData(); this.showLoadAutoSavedDataDialog = false;}">확인</v-btn>
                <v-btn dark color="grey darken-1" @click="()=>{showLoadAutoSavedDataDialog=false}">취소</v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
        <v-row>
          <v-col align="center">
            <v-btn dark class="ma-1" color="#BF7A24" @click="save">저장</v-btn>
            <v-btn dark class="ma-1" color="grey darken-1">목록</v-btn>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import Tiptap from "@/components/Tiptap.vue";
import { exp_remove_html_tag } from "../js/common.util";
const dayjs = require("dayjs");
const _ = require("underscore");
const MILLISECOND_PER_SECOND = 1000;
const SECOND_PER_AUTOSAVE = 180;
const MAX_TITLE_LENGTH = 30;
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

export default {
  components: {
    Tiptap,
  },
  data() {
    return {
      editable: true,
      limit: 0,
      selectedTopic: "",
      topics: [],
      title: "",
      content: "",
      autoSavedTime: "",
      autoSaveInterval: null,
      showLoadAutoSavedDataDialog: false,
      type: "create",
    };
  },
  computed: {
    checkDataOwner: function(){
      return this.$store.state.userId === localStorage.getItem("autoSavedUser");
    }
  },
  created() {
    this.initPage()
    // TODO
    // 글 수정기능
    // 저장 시 주제 카운트++ 오늘의주제 카운트++
    // 글 목록기능
  },
  methods: {
    initPage: async function () {
      this.setAutoSaveInterval();
      await this.getTodaysTopics();
      if (this.checkDataOwner) {
        this.setAutoSavedDataText();
      }
    },
    setAutoSavedDataText: function(){
      this.autoSavedTime = localStorage.getItem("autoSavedTime");
    },
    setAutoSaveInterval: function () {
      if (this.autoSaveInterval === null) {
        this.autoSaveInterval = setInterval(() => {
          if (this.content !== "") {
            localStorage.setItem("autoSavedTitle", this.title)
            localStorage.setItem("autoSavedData", this.content);
            localStorage.setItem("autoSavedUser", this.$store.state.userId);
            localStorage.setItem(
              "autoSavedTime",
              dayjs().format("YYYY-MM-DDTHH:mm:ss")
            );
            localStorage.setItem("autoSavedTopicId", this.selectedTopic)
  
            this.setAutoSavedDataText();
          }
        }, SECOND_PER_AUTOSAVE * MILLISECOND_PER_SECOND);
      }
    },
    loadAutoSavedData: async function () {
      if (this.checkDataOwner) {
        this.title = localStorage.getItem("autoSavedTitle");
        this.content = localStorage.getItem("autoSavedData");
        let autoSavedTopicId = localStorage.getItem("autoSavedTopicId");
        let temp = this.topics.find(
          (value) => value._id.toString() === autoSavedTopicId.toString()
        );
        if (temp) {
          console.log("주제를 찾았습니다.");
          this.selectedTopic = temp._id
        } else {
          console.log("주제를 찾을 수 없습니다.");
          // 주제가 찾아지지 않은 경우
          this.selectedTopic = NO_ID_OF_ETC;
        };
      } else {
        alert("로그인한 사용자는 저장된 데이터의 작성자가 아닙니다.")
      }
    },
    getTodaysTopics: async function () {
      try {
        let result = await this.$http.get(`/api/dailySubject`);
        if (result) {
          // 오늘의 주제 넣는 내용
          this.topics = result.data;
          // 주제 기타는 고정값
          this.topics.push(ETC_TOPIC_OBJ)
        } else {
          console.error("no data");
        }
      } catch (err) {
        console.error(err);
      }
    },
    removeAutoSave: function () {
      clearInterval(this.autoSaveInterval);
    },
    findTitle: function () {
      const prePTag = "<p>";
      const postPTag = "</p>";
      if (this.title === "") {
        let startTitlePos = this.content.indexOf(prePTag) + prePTag.length;
        let endTitlePos = this.content.indexOf(postPTag);
        let titleWithHTML = this.content.slice(startTitlePos, endTitlePos);
        let totalTitle = exp_remove_html_tag(titleWithHTML);
        this.title = totalTitle.slice(0, MAX_TITLE_LENGTH);
      }
      return this.title;
    },
    save: function () {
      let selectTopic = this.topics.find(
        (value) => value._id.toString() === this.selectedTopic.toString()
      );
      if (!selectTopic) selectTopic = ETC_TOPIC_OBJ;
      console.log("selectTopic")
      console.log(selectTopic)

      let param = {
        userId: this.$store.state.userId,
        nickname: this.$store.state.nickname,
        title: this.findTitle(),
        content: _.escape(this.content),
        createUserId: this.$store.state.userId,
        updateUserId: this.$store.state.userId,
        subject_id: selectTopic.subject_id,
        subjectCodename: selectTopic.codename,
        dailySubject_id: selectTopic._id,
        dailySubjectCodename: selectTopic.title,
      }
      if (this.type === "create") {
        this.$http
          .post(`/api/dailyWrite`, param)
          .then((res) => {
            this.deleteCookie()
            this.$router.push({name: "DailyWritingList"});
            console.log(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      } else if (this.type === "update") {
        this.$http
          .put(`/api/dailyWrite`, param)
          .then((res) => {
            console.log(res.data);
          })
          .catch((err) => {
            console.error(err);
          });
      } else {
        return;
      }
    },
    deleteCookie: function(){
      localStorage.removeItem("autoSavedTitle");
      localStorage.removeItem("autoSavedData")
      localStorage.removeItem("autoSavedUser")
      localStorage.removeItem("autoSavedTime")
      localStorage.removeItem("autoSavedTopicId");
      localStorage.removeItem("autoSavedTime")
    },
  },
  beforeDestroy() {
    this.removeAutoSave();
  },
};
</script>

<style scoped>
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
