<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-row>
          <v-col cols="12" align="center">
            <div>
              <v-img :src="logo" max-width="400" max-height="200"></v-img>
            </div>
          </v-col>
          <v-col cols="12" align="center">
            <v-form v-model="valid" ref="form">
              <v-row>
                <v-col cols="12">
                  <div style="width: 500px">
                    <div>
                      <v-text-field
                        ref="userId"
                        v-model="userId"
                        label="아이디"
                        counter="14"
                        maxlength="14"
                        type="text"
                        :rules="[rules.required]"
                        outlined
                        dense
                        autocomplete=""
                      ></v-text-field>
                      <v-text-field
                        v-model="password"
                        :append-icon="showP1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showP1 ? 'text' : 'password'"
                        @click:append="showP1 = !showP1"
                        label="비밀번호"
                        counter="14"
                        maxlength="14"
                        :rules="[rules.required]"
                        outlined
                        dense
                        @keydown.enter="login"
                      ></v-text-field>
                    </div>
                    <div>
                      <v-btn block @click="login" :disabled="disableLogin"
                        >로그인</v-btn
                      >
                    </div>
                    <div style="padding: 10px">
                      <span>
                        <a
                          class="inquiry-string"
                          @click="
                            () => {
                              this.$router.push({
                                name: 'Inquiry',
                                params: { inquiryType: 'userId' },
                              });
                            }
                          "
                          >아이디 찾기</a
                        >
                        <span> / </span>
                        <a
                          class="inquiry-string"
                          @click="
                            () => {
                              this.$router.push({
                                name: 'Inquiry',
                                params: { inquiryType: 'password' },
                              });
                            }
                          "
                          >비밀번호 찾기</a
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
                  </div>
                </v-col>
              </v-row>
            </v-form>

            <v-dialog v-model="showDialog" width="400px" persistent>
              <v-card>
                <v-card-title>
                  {{ dialogTitle }}
                </v-card-title>

                <v-card-text>
                  {{ dialogText }}
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" @click="closeDialog">close</v-btn>
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
/* eslint-disable no-unused-vars*/
import logo from "../assets/logo_transparent_1000x500.png"
const PASSWORD_MINIMUM = 4;
const PASSWORD_MAXIMUM = 14;
export default {
  data() {
    return {
      userId: "",
      checkID: false,
      nickname: "",
      checkNickname: false,
      password: "",
      passwordConfirm: "",
      checkPassword: false,
      showP1: false,
      showP2: false,
      email: "",
      checkEmail: false,
      valid: false,
      disableLogin: false,
      showDialog: false,
      dialogTitle: "",
      dialogText: "",
      rules: {
        required: (value) => !!value || "필수입력입니다.",
        password: (value) =>
          /(^[a-zA-Z0-9]{4,14}$)/gi.test(value) ||
          `숫자와 영문자를 이용하여 ${PASSWORD_MINIMUM}자리 이상 ${PASSWORD_MAXIMUM}자리 이하 비밀번호를 작성해야 합니다.`,
      },
    };
  },
  computed: {
    logo: function(){
      return logo
    }
  },
  created() {
    // TODO
    // watch에 체크값 변할때(로컬스토리지세팅), 풀릴때(저장된거제거), 페이지들어올때(로드)
    // if(localStorage.userId && localStorage.rememberId) this.userId = localStorage.userId
  },
  methods: {
    validation: function () {
      let valid = this.$refs.form.validate();
      return valid;
    },
    login: async function () {
      if (this.disableLogin) return;

      if (!this.validation()) {
        return;
      }

      try {
        this.disableLogin = true;
        let data = {
          userId: this.userId,
          password: this.password,
        };
        let result = await this.$http.post("/api/user/login", data);
        this.disableLogin = false;

        if (result.status === 201) {
          this.$store.commit("mutationLogin", {
            nickname: result.data.nickname,
            userId: result.data.userId,
            isLogin: true,
            token: result.data.token,
          });
          this.$router.push({ name: "Intro" });
        } else {
          this.openDialog("로그인 실패", "로그인에 실패했습니다.");
        }
      } catch (err) {
        if (err.response.status === 400) {
          this.openDialog("로그인 실패", "가입하지 않은 아이디이거나, 잘못된 비밀번호입니다.");
          this.disableLogin = false;
        } else {
          this.openDialog("로그인 실패", "로그인에 실패했습니다.");
          this.disableLogin = false;
        }
      }
    },
    openDialog: function (title, text) {
      this.showDialog = true;
      this.dialogTitle = title;
      this.dialogText = text;
    },
    closeDialog: function () {
      this.showDialog = false;
      this.dialogTitle = "";
      this.dialogText = "";
    },
  },
};
</script>

<style scoped>
.inquiry-string {
  font-size: 14px;
  line-height: 14px;
  color: #8e8e8e;
}
</style>
