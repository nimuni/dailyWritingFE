<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12" md="12" sm="12">
        <div class="mb-3">
          <v-card>
            <v-card-title class="justify-center">
              오늘의 주제
            </v-card-title>
            <v-card-text>
              <v-row v-show="dailySubjects.length">
                <v-col v-for="(subject, i) in dailySubjects" :key="i" cols="4">
                  <v-card>
                    <v-card-title>
                      <v-chip class="font-weight-black" dark color="#f3d959">{{ subject.codename }}</v-chip>
                      <v-tooltip top>
                        <template v-slot:activator="{on, attrs}">
                          <span 
                            class="mx-2 text-truncate daily-subject-title"
                            v-bind="attrs"
                            v-on="on"
                          >
                            {{ subject.title }}
                          </span>
                        </template>
                        <span>{{ subject.title }}</span>
                      </v-tooltip>
                    </v-card-title>
                    <v-card-text>
                      <div class="daily-subject-content">
                        {{ subject.content }}
                      </div>
                      <div class="daily-subject-info">
                        <span>참조:{{subject.usedCount}} / {{ subject.nickname}}</span>
                      </div>
                    </v-card-text>
                  </v-card>
                </v-col>
              </v-row>
              <v-row v-show="!dailySubjects.length">
                <v-card-text>
                  오늘의 주제가 선정되지 않았습니다.
                </v-card-text>
              </v-row>
            </v-card-text>
          </v-card>
        </div>
      </v-col>
      <v-col
        align="center"
        justify="center"
        class="min-width-600"
        md="12"
        sm="12"
      >
        <v-data-table
          :headers="headers"
          :items="subjects"
          item-key="_id"
          class="elevation-1"
          :loading="showTableLoading"
          dense
          loading-text="로딩중입니다... 잠시만 기다려주세요"
          :search="search"
        >
          <template v-slot:top>
            <v-card-title>
              글 주제
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-card-actions>
                <v-text-field
                  v-model="search"
                  append-icon="mdi-magnify"
                  label="주제 검색"
                  class="mx-4"
                ></v-text-field>
              </v-card-actions>
            </v-card-title>
          </template>
          <template v-slot:item="{ item }">
            <tr @click="moveSubjectRead(item._id)">
              <td class="text-center">
                {{ item.codename }}
              </td>
              <td class="text-center">
                {{ item.title }}
              </td>
              <td class="text-center">
                {{ item.like }}
              </td>
              <td class="text-center">
                {{ item.view }}
              </td>
              <td class="text-center">
                {{ item.nickname }}
              </td>
              <td class="text-center">
                {{ exp_timezoneStrToYYYYMMDD(item.createdAt) }}
              </td>
            </tr>
          </template>
          <template slot="footer.prepend">
            <v-btn
              color="#BF7A24" 
              dark
              class="ma-2"
              @click="moveSubjectCreate"
            >
              <span style="color:white;">새 주제</span>
            </v-btn>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { exp_timezoneStrToYYYYMMDD } from "../js/common.util"
export default {
  data() {
    return {
      showNoticeLoading: false,
      showTableLoading: false,
      search: "",
      subjects: [],
      dailySubjects: [],
      headers: [
        {
          text: "특성",
          value: "codename",
          align: "center",
          width: "15%",
          sortable: false,
        },
        {
          text: "주제",
          value: "title",
          align: "center",
          width: "40%",
          sortable: false,
        },
        {
          text: "선호도",
          value: "like",
          align: "center",
          width: "10%",
          sortable: false,
        },
        {
          text: "조회",
          value: "view",
          align: "center",
          width: "10%",
          sortable: false,
        },
        {
          text: "닉네임",
          value: "nickname",
          align: "center",
          width: "10%",
          sortable: false,
        },
        {
          text: "등록일",
          value: "createdAt",
          align: "center",
          width: "15%",
          sortable: false,
        },
      ],
    };
  },
  created(){
    this.init();
  },
  methods: {
    init: function(){
      this.getDailySubject()
      this.getSubjectList();
    },
    exp_timezoneStrToYYYYMMDD: exp_timezoneStrToYYYYMMDD,
    getDailySubject: async function(){
      this.showNoticeLoading = true;
      try {
        let result = await this.$http.get(`/api/dailySubject`);
        if (result) {
          // 오늘의 주제 넣는 내용
          this.dailySubjects = result.data;
        } else {
          console.error("no data");
        }
      } catch (err) {
        console.error(err);
      }
      this.showNoticeLoading = false;
    },
    getSubjectList: async function(){
      this.showTableLoading = true;
      try {
        let result = await this.$http.get(`/api/subject`);
        if (result) {
          this.subjects = result.data;
          console.log(this.subjects)
        } else {
          console.error("no data");
        }
      } catch (err) {
        console.error(err);
      }
      this.showTableLoading = false;
    },
    moveSubjectCreate: function(){
      this.$router.push({ name: "SubjectCreate"});
    },
    moveSubjectRead: function(_id){
      this.$router.push({ name: "SubjectRead", query: { _id: _id } });
    }
  },
};
</script>

<style scoped>
.daily-subject-title {
  display: block;
  max-width: 180px;
}
.daily-subject-content {
  height: 9em; 
  overflow: auto;
}
.daily-subject-info {
  text-align: right;
}
</style>