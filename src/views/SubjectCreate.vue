<template>
  <v-container fill-height>
    <v-row>
      <v-col cols="12" md="12" sm="12">
        <v-card>
          <v-card-title>
            글 주제 {{ this.type === "create" ? "작성" : "수정" }}
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
                          <th class="text-right grey lighten-3">주제제목</th>
                          <td>
                            <v-text-field
                              class="pa-2"
                              v-model="title"
                              flat
                              solo
                              dense
                              clearable
                              hide-details
                              placeholder="주제를 한번에 알아볼 수 있는 제목을 작성해주세요."
                            ></v-text-field>
                          </td>
                          <th class="text-right grey lighten-3">범주</th>
                          <td>
                            <v-select 
                              class="pa-2" 
                              flat 
                              solo 
                              dense 
                              hide-details
                              :items="subjectCodes"
                              v-model="selectCode"
                              return-object
                              item-text="codename"
                              item-value="_id"
                            > </v-select>
                          </td>
                        </tr>
                        <tr>
                          <th class="text-right grey lighten-3">상세내용</th>
                          <td colspan="3">
                            <v-textarea
                              height="500"
                              class="pa-2"
                              counter
                              flat
                              solo
                              no-resize
                              v-model="content"
                              filled
                              placeholder="주제에 대한 상세 설명을 작성해주세요."
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
            <v-btn dark color="#BF7A24" @click="confirm">확인</v-btn>
            <v-btn dark color="grey darken-1" @click="moveSubjectList">취소</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
    <v-dialog v-model="showDialog" width="500">
      <v-card>
        <v-card-text>
          전송중...
          <v-progress-linear
            indeterminate
            color="yellow lightne-3"
          ></v-progress-linear>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      showDialog: false,
      subjectCodes: [],
      selectCode: {},
      type: "create",
      subject_id: null,
      title: "",
      content: "",
    };
  },
  created() {
    this.init();
  },
  methods: {
    init: async function () {
      // 코드세팅
      await this.getSubjectCodes();
      this.selectCode = this.subjectCodes[0];

      // 데이터조회
      let queryData = this.$route.query;
      if (queryData?._id) {
        this.type = "update"
        let subjectData = await this.getSubject(queryData._id)
        subjectData = subjectData[0];

        this.title = subjectData.title;
        this.content = subjectData.content;
        this.subject_id = subjectData._id;
        this.selectCode = this.subjectCodes.find(value => value._id === subjectData.code_id)
      } else {
        console.log("create")
        this.type = "create";
      }
    },
    getSubjectCodes: async function () {
      let getApiData;
      try {
        getApiData = await this.$http.get(`/api/code/60c7683643467d876489c880`);
        if (getApiData?.data) {
          this.subjectCodes = getApiData.data[0].childCodes;
        }
      } catch (err) {
        console.error(err)
        alert("글 주제 범주 조회가 불가능합니다.")
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
    confirm: function(){
      this.showDialog = true;
      if (!this.validCheck()) {
        alert("not valid")
        this.showDialog = false;
        return false;
      }
      this.type === "create" ? this.create() : this.update();
    },
    validCheck: function () {
      if (
        this.title === null ||
        this.content === null ||
        this.codename === null ||
        this.code_id === null
      ) {
        return false;
      }
      return true;
    },
    getParamData: function () {
      let obj = new Object();
      obj.title = this.title;
      obj.content = this.content;
      obj.codename = this.selectCode.codename;
      obj.code_id = this.selectCode._id;
      if(this.type === "create"){
        obj.createUserId = this.$store.state.userId;
      }
      obj.updateUserId = this.$store.state.userId;
      obj.nickname = this.$store.state.nickname;
      if (obj.codename === null || obj.code_id === null) {
        return false;
      }
      return obj;
    },
    create: async function () {
      let param = this.getParamData();
      if (!param) {
        alert("param 오류");
        return false;
      }
      console.log(param)
      try{
        let result = await this.$http.post(`/api/subject`, param);
        console.log("result");
        console.log(result);
        this.showDialog = false;
        this.moveSubjectList()
      } catch (err) {
        this.showDialog = false;
        alert("등록 실패")
      }
      this.showDialog = false;
      this.moveSubjectList()
    },
    update: async function () {
      let param = this.getParamData();
      if (!param) {
        alert("param 없음");
        return false;
      }
      try{
        await this.$http.put(`/api/subject/${this.subject_id}`, param);
        this.showDialog = true;
        this.moveSubjectList()
      } catch(err) {
        this.showDialog = false;
        alert("등록 실패")
      }
    },
    moveSubjectList: function () {
      this.$router.push({ name: "SubjectList" });
    },
    moveSubjectRead: function () {
      this.$router.push({ name: "SubjectRead", query: { _id: this.subject_id } });
    }
  },
};
</script>

<style></style>
