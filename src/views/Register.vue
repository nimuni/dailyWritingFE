<template>
  <v-container>
    <v-layout>
      <v-flex>
        <v-row>
          <v-col cols="2"></v-col>
          <v-col align="center">
            <v-card max-width="500px" elevation="10">
              <v-card-title> 회원가입 </v-card-title>
              <v-card-subtitle style="text-align: left">
                회원 가입 시 자신의 글들을 모두 조회할 수 있습니다.<br />
                비회원은 일부 기능만 사용하실 수 있습니다.
              </v-card-subtitle>
              <v-card-text>
                <v-form v-model="valid" ref="form">
                  <v-row>
                    <v-col cols="12">
                      <!-- https://vuetifyjs.com/en/components/text-fields/#password-input -->
                      <v-text-field
                        ref="userId"
                        v-model="userId"
                        label="사용자 아이디"
                        counter="14"
                        maxlength="14"
                        @blur="checkDuplicateID"
                        :rules="[
                          rules.required,
                          rules.idStr,
                          rules.idMax,
                          rules.idMin,
                        ]"
                        outlined
                        dense
                      >
                        <template>
                          <v-icon
                            slot="append"
                            :color="checkID ? '#00AA00' : '#FF0000'"
                          >
                            {{ checkID ? "mdi-check" : "mdi-minus-circle" }}
                          </v-icon>
                        </template>
                      </v-text-field>
                      <v-text-field
                        ref="nickname"
                        v-model="nickname"
                        label="닉네임"
                        counter="14"
                        maxlength="14"
                        @blur="checkDuplicateNickname"
                        :rules="[
                          rules.required,
                          rules.nicknameStr,
                          rules.nicknameMax,
                          rules.nicknameMin,
                        ]"
                        outlined
                        dense
                      >
                        <template>
                          <v-icon
                            slot="append"
                            :color="checkNickname ? '#00AA00' : '#FF0000'"
                          >
                            {{
                              checkNickname ? "mdi-check" : "mdi-minus-circle"
                            }}
                          </v-icon>
                        </template>
                      </v-text-field>
                      <v-text-field
                        v-model="password"
                        :append-icon="showP1 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showP1 ? 'text' : 'password'"
                        @click:append="showP1 = !showP1"
                        label="비밀번호"
                        counter="14"
                        maxlength="14"
                        :rules="[rules.required, rules.pwMax, rules.pwMin]"
                        outlined
                        dense
                      ></v-text-field>
                      <v-text-field
                        v-model="passwordConfirm"
                        :append-icon="showP2 ? 'mdi-eye' : 'mdi-eye-off'"
                        :type="showP2 ? 'text' : 'password'"
                        @click:append="showP2 = !showP2"
                        label="비밀번호 확인"
                        counter="14"
                        maxlength="14"
                        :rules="[
                          rules.required,
                          rules.passwordConfirm,
                          rules.pwMax,
                          rules.pwMin,
                        ]"
                        outlined
                        dense
                      ></v-text-field>
                      <v-text-field
                        v-model="email"
                        label="이메일"
                        @blur="checkDuplicateEmail"
                        :rules="[rules.required, rules.email]"
                        outlined
                        dense
                      >
                        <template>
                          <v-icon
                            slot="append"
                            :color="checkEmail ? '#00AA00' : '#FF0000'"
                          >
                            {{ checkEmail ? "mdi-check" : "mdi-minus-circle" }}
                          </v-icon>
                        </template>
                      </v-text-field>
                    </v-col>
                  </v-row>
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" :disabled="!valid" @click="register"
                  >회원가입</v-btn
                >
                <v-btn color="error" @click="()=>{this.$router.push({ name: 'Intro' })}">취소</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
          <v-col cols="2"></v-col>
        </v-row>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
/* eslint-disable no-unused-vars*/
import {
  exp_Email,
  exp_numberEnglishSmall,
  exp_koreanNumberEnglish,
} from "../js/common.util";

const ID_MINIMUM = 6;
const ID_MAXIMUM = 14;
const NICKNAME_MINIMUM = 3;
const NICKNAME_MAXIMUM = 14;
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
      rules: {
        required: (value) => !!value || "필수입력입니다.",
        idStr: (value) =>
          !!exp_numberEnglishSmall(value) ||
          "ID는 영문소문자와 숫자로만 이루어져야 합니다..",
        idMax: (value) =>
          value.length >= ID_MINIMUM ||
          `ID는 ${ID_MINIMUM}글자 이상이어야 합니다.`,
        idMin: (value) =>
          value.length <= ID_MAXIMUM ||
          `ID는 ${ID_MAXIMUM}글자 이하여야 합니다.`,
        nicknameStr: (value) =>
          !!exp_koreanNumberEnglish(value) ||
          "닉네임은 한글,영문,숫자로만 이루어져야 합니다.",
        nicknameMin: (value) =>
          value.length >= NICKNAME_MINIMUM ||
          `닉네임은 ${NICKNAME_MINIMUM}글자 이상이어야 합니다.`,
        nicknameMax: (value) =>
          value.length <= NICKNAME_MAXIMUM ||
          `닉네임은 ${NICKNAME_MAXIMUM}글자 이하여야 합니다.`,
        pwMin: (value) =>
          value.length >= PASSWORD_MINIMUM ||
          `비밀번호는 ${PASSWORD_MINIMUM}글자 이상이어야 합니다.`,
        pwMax: (value) =>
          value.length <= PASSWORD_MAXIMUM ||
          `비밀번호는 ${PASSWORD_MAXIMUM}글자 이하여야 합니다.`,
        password: (value) =>
          /(^[a-zA-Z0-9]{4,14}$)/gi.test(value) ||
          `숫자와 영문자를 이용하여 ${PASSWORD_MINIMUM}자리 이상 ${PASSWORD_MAXIMUM}자리 이하 비밀번호를 작성해야 합니다.`,
        passwordConfirm: (value) => {
          return (
            this.password === this.passwordConfirm ||
            "비밀번호가 일치하지 않습니다."
          );
        },
        email: (value) =>
          !!exp_Email(value) || "이메일 형식이 맞지 않습니다. ex)abcd@ef.gh",
      },
    };
  },
  watch: {
    password: function (newVal, oldVal) {
      this.checkPassword = newVal === this.passwordConfirm;
    },
    passwordConfirm: function (newVal, oldVal) {
      this.checkPassword = newVal === this.password;
    },
  },
  created() {},
  methods: {
    checkDuplicateID: async function () {
      if (!this.userId) {
        this.checkID = false;
        return;
      }
      if (this.userId.length < ID_MINIMUM || this.userId.length > ID_MAXIMUM) {
        this.checkID = false;
        return;
      }

      let result;
      try {
        result = await this.$http.get("/api/user/checkId/" + this.userId);
      } catch (err) {
        console.error(err);
      }
      console.log(result);
      this.checkID = !result.data;
      return result.data;
    },
    checkDuplicateNickname: async function () {
      if (!this.nickname) {
        this.checkNickname = false;
        return;
      }
      if (
        this.nickname.length < NICKNAME_MINIMUM ||
        this.nickname.length > NICKNAME_MAXIMUM
      ) {
        this.checkNickname = false;
        return;
      }

      let result;
      try {
        result = await this.$http.get(
          `/api/user/checkNickname/${this.nickname}`
        );
      } catch (err) {
        console.error(err);
      }
      this.checkNickname = !result.data;
      return result.data;
    },
    checkDuplicateEmail: async function () {
      if (!this.email) {
        this.email = false;
        return;
      }

      let result;
      try {
        result = await this.$http.get("/api/user/checkEmail/" + this.email);
      } catch (err) {
        console.error(err);
      }
      this.checkEmail = !result.data;
      return result.data;
    },
    register: async function () {
      if (!this.validation()) {
        console.error("검증실패");
        return false;
      }
      if (await this.checkDuplicateID(this.userId)) {
        this.userId = "";
        alert("중복된 아이디입니다.");
        this.$refs.userId.focus();
        return false;
      }
      if (await this.checkDuplicateNickname(this.nickname)) {
        alert("중복된 닉네임입니다.");
        this.$refs.nickname.focus();
        this.nickname = "";
        return false;
      }
      if (await this.checkDuplicateEmail(this.email)) {
        alert("중복된 이메일입니다.");
        this.$refs.email.focus();
        this.email = "";
        return false;
      }

      let data = {
        userId: this.userId,
        nickname: this.nickname,
        password: this.password,
        email: this.email,
        emailVerify: "Y",
      };
      //로딩바표시
      try {
        await this.$http.post("/api/user", data);
      } catch (err) {
        console.error(err);
      }
      //로딩바제거 후 이동
      this.$router.push({ name: 'Login' })
    },
    validation: function () {
      let valid = this.$refs.form.validate();

      if (this.password !== this.passwordConfirm) valid = false;
      return valid;
    },
  },
};
</script>

<style></style>
