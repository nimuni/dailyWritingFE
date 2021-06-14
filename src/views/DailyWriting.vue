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
            <v-card-text>
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
                            {{ topic.title }}
                          </a>
                        </template>
                        {{ topic.detail }}
                      </v-tooltip>
                    </div>
                  </template>
                </v-radio>
              </v-radio-group>
            </v-card-text>
          </v-card>
        </div>
        <div class="d-flex justify-space-between">
          <div class="vertical-center-div">
            <span class="text-left auto-save">
              자동저장시각({{ autoSavedTime }})
            </span>
          </div>
        </div>
        <div>
          <div>
            <v-btn color="success" @click="save">저장하기</v-btn>
          </div>
        </div>
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

export default {
  components: {
    Tiptap,
  },
  data() {
    return {
      editable: true,
      limit: 0,
      selectedTopic: "a",
      topics: [
        {
          _id: "a",
          categoryName: "select",
          categoryId: "",
          title: "naver",
          detail: "네이버",
          src: "www.naver.com",
        },
        {
          _id: "b",
          categoryName: "word",
          categoryId: "",
          title: "google",
          detail: "구글",
          src: "www.google.com",
        },
        {
          _id: "c",
          categoryName: "noToday",
          categoryId: "",
          title: "nimuni",
          detail: "헤헤헤",
          src: "nimuni.iptime.org",
        },
      ],
      title: "",
      content: "",
      autoSavedData: "",
      autoSavedTime: "",
      autoSavedTopicId: "",
      autoSaveInterval: null,
    };
  },
  created() {
    this.initPage();
  },
  methods: {
    initPage: async function () {
      this.setAutoSave();
      // auto saved data load
      this.getTodaysTopics().then(this.loadAutoSavedData).catch(console.error);
    },
    loadAutoSavedData: async function () {
      this.autoSavedData = localStorage.getItem("autoSavedData");
      this.autoSavedTime = localStorage.getItem("autoSavedTime");
      this.autoSavedTopicId = localStorage.getItem("autoSavedTopicId");
      if (this.autoSavedData) {
        // confirm 창 열어주기, 확인 시 데이터 불러오기 취소 시 데이터 제거
        console.log(
          "confirm 창 열어주기, 확인 시 데이터 불러오기 취소 시 데이터 제거"
        );

        // 날짜가 지나서 주제가 달라진 경우, 자동으로 기타 선택 후 알림창 띄우기
        console.log(
          "날짜가 지나서 주제가 달라진 경우, 자동으로 기타 선택 후 알림창 띄우기"
        );
      }
    },
    getTodaysTopics: async function () {
      console.log("데이터 얻어오기");
      // this.$http.get('')
    },
    setAutoSave: function () {
      if (this.autoSaveInterval === null) {
        this.autoSaveInterval = setInterval(() => {
          // TODO data
          localStorage.setItem("autoSavedData", this.content);
          localStorage.setItem(
            "autoSavedTime",
            dayjs().format("YYYY-MM-DDTHH:mm:ss")
          );
        }, SECOND_PER_AUTOSAVE * MILLISECOND_PER_SECOND);
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
    },
    save: function () {
      console.log(this.content);
      console.log(_.escape(this.content));
      this.findTitle();
      // const baseURI = "http://nimuni.iptime.org:3000/api";
      // this.$http
      //   .post(`${baseURI}/dailyWrite`, { content: _.escape(this.content) })
      //   .then((res) => {
      //     console.log(res.data);
      //   })
      //   .catch((err) => {
      //     console.error(err);
      //   });
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
</style>
