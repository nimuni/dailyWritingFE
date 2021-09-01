<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12" md="12" sm="12">
        <v-card>
          <v-card-title>
            글 주제 상세
          </v-card-title>
          <v-card-text>
            <v-form>
              <v-row>
                <v-col cols="12">
                  <v-simple-table
                    class="elevation-1"
                  >
                    <template v-slot:default>
                      <colgroup>
                        <col width="15%" />
                        <col/>
                        <col width="10%" />
                        <col width="20%" />
                      </colgroup>
                      <tbody>
                        <tr>
                          <th class="text-right grey lighten-3">조회수</th>
                          <td>
                            <span style="font-size:12pt; padding-left:20px;">{{ view+1 }}</span>
                          </td>
                          <th class="text-right grey lighten-3">선호도</th>
                          <td>
                            <span style="font-size:12pt;">{{ like }}</span>
                          </td>
                        </tr>
                        <tr>
                          <th class="text-right grey lighten-3">주제제목</th>
                          <td>
                            <span style="font-size:12pt; padding-left:20px;">{{ title }}</span>
                          </td>
                          <th class="text-right grey lighten-3">
                            범주
                          </th>
                          <td>
                            <span>{{ codename }}</span>
                          </td>
                        </tr>
                        <tr>
                          <th class="text-right grey lighten-3">상세내용</th>
                          <td colspan="3">
                            <v-textarea
                              height="500"
                              class="pa-2"
                              flat
                              solo
                              no-resize
                              readonly
                              v-model="content"
                              filled
                            ></v-textarea>
                          </td>
                        </tr>
                      </tbody>
                    </template>
                  </v-simple-table>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn dark color="#BF7A24" :disabled="!checkOwner" @click="moveSubjectUpdate">수정</v-btn>
            <v-btn dark color="#BF7A24" :disabled="!checkOwner" @click="()=>{this.showDialog = true}">삭제</v-btn>
            <v-btn dark color="grey darken-1" @click="moveSubjectList">목록</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="showDialog" width="500">
      <v-card>
        <v-card-title>
          글 주제 삭제
        </v-card-title>
        <v-card-text>
          삭제하시겠습니까?
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn dark color="#BF7A24" :disabled="!checkOwner" @click="confirm">확인</v-btn>
          <v-btn dark color="grey darken-1" :disabled="!checkOwner" @click="()=>{this.showDialog = false}">취소</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false,
      subject_id: null,
      subjectData: null,
      view: 0,
      like: 0,
      title: null,
      codename: null,
      content: null,
      updateUserId: null,
    };
  },
  computed: {
    checkOwner: function(){
      if(this.updateUserId === this.$store.state.userId){
        return true;
      } else {
        return false;
      }
    }
  },
  created() {
    this.init();
  },
  methods: {
    init: async function () {
      let queryData = this.$route.query;
      if (queryData?._id) {
        this.subject_id = queryData._id;
        this.subjectData = await this.getSubject(queryData._id)
        this.subjectData = this.subjectData[0]
        this.view = this.subjectData.view;
        this.like = this.subjectData.like;
        this.title = this.subjectData.title;
        this.codename = this.subjectData.codename;
        this.content = this.subjectData.content;
        this.updateUserId = this.subjectData.updateUserId;
        await this.incrementSubjectView(queryData._id)
      } 
    },
    incrementSubjectView: function (_id) {
      try {
        this.$http.put(`/api/subject/count/${_id}`);
      } catch (err) {
        alert("글 조회수가 불가능합니다.")
        throw err;
      }
    },
    getSubject: async function (_id) {
      let getApiData;
      try {
        getApiData = await this.$http.get(`/api/subject/${_id}`)
        return getApiData.data;
      } catch (err) {
        console.error(err)
        alert("글 주제 조회가 불가능합니다.")
        throw err
      }
    },
    confirm: async function(){
      this.showDialog = false;
      try {
        await this.delete()
        this.moveSubjectList()
      } catch(err) {
        alert(err)
      }
    },
    delete: async function () {
      await this.$http.delete(`/api/subject/${this.subject_id}`)
    },
    moveSubjectList: function () {
      this.$router.push({ name: "SubjectList" });
    },
    moveSubjectUpdate: function () {
      this.$router.push({ name: "SubjectCreate", query: { _id: this.subject_id } });
    }
  },
};
</script>

<style>

</style>