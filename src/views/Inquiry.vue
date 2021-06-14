<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-row>
          <v-col cols="12" align="center">
            <v-form v-model="inquiryIdValid" ref="form">
              <v-row>
                <v-col cols="12">
                  <v-card max-width="500" min-height="500">
                    <div v-show="showInquiryId">
                      <div class="inquiry-div">
                        <v-card-title>아이디 찾기</v-card-title>
                        <v-card-subtitle style="text-align: left"
                          >가입하실 때 등록했던 이메일 기반으로 아이디 정보를
                          찾습니다.</v-card-subtitle
                        >
                        <v-card-text>
                          <v-text-field
                            v-model="email"
                            label="이메일"
                            :rules="[rules.required, rules.email]"
                            hide-details
                            outlined
                          ></v-text-field>
                        </v-card-text>
                      </div>
                      <v-card-text>
                        <v-btn block @click="inquiryId" :disabled="disableInquiryId">아이디 찾기</v-btn>
                      </v-card-text>
                    </div>
                    <div class="inquiry-div" v-show="showInquiryPassword">
                      <div class="inquiry-div">
                        <v-card-title>비밀번호 초기화</v-card-title>
                        <v-card-subtitle style="text-align: left"
                          >가입하실 때 등록했던 이메일로 초기화된 비밀번호를
                          보내드립니다.</v-card-subtitle
                        >
                        <v-card-text>
                          <v-text-field
                            style="margin-bottom:10px;"
                            v-model="email"
                            label="이메일"
                            type="text"
                            :rules="[rules.required, rules.email]"
                            hide-details
                            outlined
                          ></v-text-field>
                          <v-text-field
                            v-model="userId"
                            label="아이디"
                            type="text"
                            :rules="[rules.required]"
                            hide-details
                            outlined
                          ></v-text-field>
                        </v-card-text>
                      </div>
                      <v-card-text>
                        <v-btn block @click="inquiryPassword" :disabled="disableInquiryPassword">비밀번호 초기화</v-btn>
                      </v-card-text>
                    </div>
                    <div
                      class="inquiry-div"
                      v-show="!showInquiryId && !showInquiryPassword"
                    >
                      잘못된 접근입니다.
                    </div>
                    <div>
                      <v-card-text>
                        <v-btn block @click="() => {this.$router.push({ name: 'Login' })}">로그인</v-btn>
                      </v-card-text>
                    </div>
                    <div style="padding: 10px">
                      <span>
                        <a
                          class="inquiry-string"
                          @click="
                            () => {
                              this.inquiryType = 'userId';
                            }
                          "
                          >아이디 찾기</a
                        >
                        <span> / </span>
                        <a
                          class="inquiry-string"
                          @click="
                            () => {
                              this.inquiryType = 'password';
                            }
                          "
                          >비밀번호 초기화</a
                        >
                        <span> / </span>
                        <a
                          class="inquiry-string"
                          @click="
                            () => {
                              this.$router.push({ name: 'Register' });
                            }
                          "
                          >회원가입</a
                        >
                      </span>
                    </div>
                  </v-card>
                </v-col>
              </v-row>
            </v-form>

            <v-dialog v-model="showInquiryDialog" width="400px" persistent>
              <v-card>
                <v-card-title>
                  {{ dialogTitle }}
                </v-card-title>

                <v-card-text>
                  {{ dialogText }}
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="closeInquiryDialog">close</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { exp_Email } from "../js/common.util";
export default {
  data() {
    return {
      inquiryType: null,
      inquiryIdValid: false,
      inquiryPasswordValid: false,
      disableInquiryId: false,
      disableInquiryPassword: false,
      showInquiryDialog: false,
      dialogTitle: '',
      dialogText: '',
      email: "",
      userId: "",
      rules: {
        required: (value) => !!value || "필수입력입니다.",
        email: (value) =>
          !!exp_Email(value) || "이메일 형식이 맞지 않습니다. ex)abcd@ef.gh",
      },
    };
  },
  computed: {
    showInquiryId: function () {
      return this.inquiryType === "userId";
    },
    showInquiryPassword: function () {
      return this.inquiryType === "password";
    },
  },
  created() {
    this.inquiryType = this.$route.params.inquiryType;
  },
  mounted() {},
  methods: {
    inquiryId: async function(){
      try{
        this.disableInquiryId = true;
        let result = await this.$http.get("/api/user/inquiry/id/" + this.email)
        this.disableInquiryId = false;
        this.showDialog("아이디 찾기", `아이디는 ${result.data.userId} 입니다`)
      } catch(err) {
        console.error(err)
        this.showDialog("아이디 찾기", "아이디 찾기에 실패했습니다.");
        this.disableInquiryId = false;
      }
    },
    inquiryPassword: async function(){
      try{
        this.disableInquiryPassword = true;
        let data = {
          userId: this.userId,
          email: this.email
        };
        let result = await this.$http.post("/api/user/inquiry/password", data)
        this.disableInquiryPassword = false;

        console.log(result)
        if(result.status === 201){
          this.showDialog("비밀번호 초기화", "초기화된 비밀번호가 메일로 발송되었습니다");
        } else {
          this.showDialog("비밀번호 초기화", "비밀번호 초기화에 실패했습니다.");
        }
      } catch(err) {
        console.error(err)
        this.showDialog("비밀번호 초기화", "비밀번호 초기화에 실패했습니다.");
        this.disableInquiryPassword = false;
      }
    },
    showDialog: function(title, text) {
      this.showInquiryDialog = true;
      this.dialogTitle= title;
      this.dialogText= text;
    },
    closeInquiryDialog: function(){
      this.showInquiryDialog = false;
      this.dialogTitle= '';
      this.dialogText= '';
    }
  },
};
</script>

<style scoped>
.inquiry-div {
  min-height: 250px;
}
.inquiry-textfield-margin {
  margin-bottom: 5px;
}
.inquiry-string {
  font-size: 14px;
  line-height: 14px;
  color: #8e8e8e;
}
</style>
