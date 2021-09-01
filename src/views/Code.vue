<template>
  <v-container fill-height>
    <v-row>
      <v-col align="center" justify="center" class="min-width-600" >
        <div>
          <v-data-table
            :headers="headers"
            :items="codes"
            :single-expand="false"
            :expanded.sync="expanded"
            item-key="_id"
            show-expand
            class="elevation-1"
            dense
            :loading="showTableLoading"
            loading-text="로딩중입니다... 잠시만 기다려주세요"
            v-model="selectedCode"
            :single-select="true"
            :search="search"
          >
            <template v-slot:top>
              <v-card-title>
                공통코드
                <v-divider class="mx-4" inset vertical></v-divider>
                <v-spacer></v-spacer>
                <v-card-actions>
                  <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="상위코드검색"
                    class="mx-4"
                  ></v-text-field>
                </v-card-actions>
              </v-card-title>
            </template>
            <template v-slot:[`header.data-add`]>
              <v-btn icon small @click="enableCodeDialog('insertCode')"
                ><v-icon>mdi-plus</v-icon></v-btn
              >
            </template>
            <template v-slot:[`header.data-update`]> </template>
            <template v-slot:item="{ item, expand, isExpanded }">
              <tr>
                <td class="text-center">
                  {{ item.codename }}
                </td>
                <td class="text-center">
                  {{ item.useYN }}
                </td>
                <td class="text-center">
                  {{ item.language }}
                </td>
                <td class="text-center table-td-button-pa0">
                  <v-btn
                    icon
                    small
                    @click="enableCodeDialog('updateCode', item._id)"
                  >
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                </td>
                <td class="text-center table-td-button-pa0">
                  <v-btn
                    icon
                    small
                    @click="enableCodeDialog('deleteCode', item._id)"
                  >
                    <v-icon>mdi-minus</v-icon>
                  </v-btn>
                </td>
                <td class="text-center table-td-button-pa0">
                  <v-btn icon small @click="expand(!isExpanded)">
                    <v-icon v-show="!isExpanded">mdi-chevron-down</v-icon>
                    <v-icon v-show="isExpanded">mdi-chevron-up</v-icon>
                  </v-btn>
                </td>
              </tr>
            </template>

            <template v-slot:expanded-item="{ item }">
              <td :colspan="headers.length + 1" style="padding-right: 0px">
                <v-simple-table dense>
                  <template v-slot:default>
                    <thead>
                      <tr class="grey lighten-3">
                        <th class="text-center">코드명</th>
                        <th class="text-center">사용여부</th>
                        <th class="text-center">언어</th>
                        <th class="pa-0" style="width: 32px"></th>
                        <th class="pa-0" style="width: 32px">
                          <v-btn
                            icon
                            small
                            @click="
                              enableCodeDialog(
                                'insertChildCode',
                                null,
                                item._id
                              )
                            "
                          >
                            <v-icon>mdi-plus</v-icon>
                          </v-btn>
                        </th>
                        <th class="pa-0" style="width: 32px"></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr v-for="code in item.childCodes" :key="code._id">
                        <td class="text-center grey lighten-4">{{ code.codename }}</td>
                        <td class="text-center grey lighten-4">{{ code.useYN }}</td>
                        <td class="text-center grey lighten-4">{{ code.language }}</td>
                        <td class="pa-0 grey lighten-4" style="width: 32px">
                          <v-btn
                            icon
                            small
                            @click="
                              enableCodeDialog(
                                'updateChildCode',
                                code._id,
                                item._id
                              )
                            "
                          >
                            <v-icon>mdi-pencil</v-icon>
                          </v-btn>
                        </td>
                        <td class="pa-0 grey lighten-4" style="width: 32px">
                          <v-btn
                            icon
                            small
                            @click="
                              enableCodeDialog(
                                'deleteChildCode',
                                code._id,
                                item._id
                              )
                            "
                          >
                            <v-icon>mdi-minus</v-icon>
                          </v-btn>
                        </td>
                        <td class="pa-0 grey lighten-4" style="width: 32px"></td>
                      </tr>
                    </tbody>
                  </template>
                </v-simple-table>
              </td>
            </template>
          </v-data-table>
          <v-dialog persistent v-model="showCodeDialog" width="500">
            <v-card>
              <v-card-title>
                {{ codeDialogTitle }}
              </v-card-title>
              <v-card-text>
                <v-row v-show="!checkDeleteDialog">
                  <v-col cols="4">
                    <v-text-field
                      id="codenameField"
                      v-model="codeSchema.codename"
                      label="코드명"
                      @keydown.enter="confirmDialog"
                      @keydown.esc="disableCodeDialog"
                      dense
                    ></v-text-field>
                  </v-col>
                  <v-col cols="4">
                    <v-checkbox
                      v-model="codeSchema.useYN"
                      true-value="Y"
                      false-value="N"
                      dense
                    >
                      <template v-slot:label>
                        <span v-bind:class="{ 'text-bold': useYBold }"
                          >사용</span
                        >
                        /
                        <span v-bind:class="{ 'text-bold': !useYBold }"
                          >미사용</span
                        >
                      </template>
                    </v-checkbox>
                  </v-col>
                  <v-col cols="4">
                    <v-text-field
                      v-model="codeSchema.language"
                      label="언어"
                      disabled
                      dense
                    ></v-text-field>
                  </v-col>
                </v-row>
                <v-row v-show="checkDeleteDialog">
                  <v-col>
                    {{ codeDialogMessage }}
                  </v-col>
                </v-row>
              </v-card-text>
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  :disabled="!showCodeDialog"
                  @click="confirmDialog"
                >
                  확인
                </v-btn>
                <v-btn
                  color="error"
                  :disabled="!showCodeDialog"
                  @click="disableCodeDialog"
                >
                  취소
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { CodeObjectBuilder } from "../js/code.builder";
import CONST_STRING from "../string/kor.string.js";

export default {
  data: function () {
    return {
      showTableLoading: false,
      expanded: [],
      codes: [],
      selectedCode: [],
      search: "",
      headers: [
        {
          text: "코드명",
          value: "codename",
          align: "center",
          class: "yellow lighten-3",
        },
        {
          text: "사용여부",
          value: "useYN",
          align: "center",
          class: "yellow lighten-3",
        },
        {
          text: "언어",
          value: "language",
          align: "center",
          class: "yellow lighten-3",
        },
        {
          text: "",
          value: "data-update",
          sortable: false,
          class: "yellow lighten-3",
        },
        {
          text: "",
          value: "data-add",
          sortable: false,
          class: "yellow lighten-3 pa-0",
        },
        { text: "", value: "data-table-expand", class: "yellow lighten-3" },
      ],
      showCodeDialog: false,
      codeDialogTitle: "",
      codeDialogMessage: CONST_STRING.page.Code.dialogDeleteMessage,
      dialogType: "",
      p_id: null,
      codeSchema: {
        _id: null,
        codename: null,
        useYN: null,
        language: "KOR",
        isChild: null,
        createUserId: null,
        updateUserId: null,
      },
    };
  },
  computed: {
    checkDeleteDialog: function () {
      return (
        this.dialogType === "deleteChildCode" ||
        this.dialogType === "deleteCode"
      );
    },
    useYBold: function () {
      return this.codeSchema.useYN === "Y";
    },
  },
  created() {
    this.init();
  },
  methods: {
    init: function () {
      this.getCode();
    },
    getCode: async function () {
      this.showTableLoading = true;
      try {
        let result = await this.$http.get(`/api/code`);
        if (result) {
          this.codes = result.data;
        } else {
          console.error("no data");
        }
      } catch (err) {
        console.error(err);
      }
      this.showTableLoading = false;
    },
    enableCodeDialog: function (type, _id, p_id) {
      setTimeout(() => {
        let codenameField = document.getElementById("codenameField");
        codenameField.focus();
      }, 10);
      this.p_id = p_id;
      this.codeSchema._id = _id;
      this.showCodeDialog = true;
      this.dialogType = type;
      let data, childCodesData;
      switch (type) {
        case "insertCode":
          this.codeDialogTitle = CONST_STRING.page.Code.dialogTitle.insertCode;
          break;
        case "updateCode":
          this.codeDialogTitle = CONST_STRING.page.Code.dialogTitle.updateCode;
          data = this.codes.find((e) => e._id === _id);
          this.codeSchema._id = data._id;
          this.codeSchema.codename = data.codename;
          this.codeSchema.useYN = data.useYN;
          this.codeSchema.language = data.language;
          this.codeSchema.isChild = data.isChild;
          this.codeSchema.createUserId = data.createUserId;
          this.codeSchema.updateUserId = data.updateUserId;
          break;
        case "deleteCode":
          this.codeDialogTitle = CONST_STRING.page.Code.dialogTitle.deleteCode;
          break;
        case "insertChildCode":
          this.codeDialogTitle =
            CONST_STRING.page.Code.dialogTitle.insertChildCode;
          break;
        case "updateChildCode":
          this.codeDialogTitle =
            CONST_STRING.page.Code.dialogTitle.updateChildCode;
          data = this.codes.find((e) => e._id === p_id);
          childCodesData = data.childCodes.find((e) => e._id === _id);
          this.codeSchema._id = childCodesData._id;
          this.codeSchema.codename = childCodesData.codename;
          this.codeSchema.useYN = childCodesData.useYN;
          this.codeSchema.language = childCodesData.language;
          this.codeSchema.isChild = childCodesData.isChild;
          this.codeSchema.createUserId = childCodesData.createUserId;
          this.codeSchema.updateUserId = childCodesData.updateUserId;
          break;
        case "deleteChildCode":
          this.codeDialogTitle =
            CONST_STRING.page.Code.dialogTitle.deleteChildCode;
          break;
        default:
          break;
      }
    },
    disableCodeDialog: function () {
      this.showCodeDialog = false;
      this.codeDialogTitle = CONST_STRING.common.noString;
      this.dialogType = "";
      this.p_id = null;
      this.codeSchema = {
        _id: null,
        codename: null,
        useYN: null,
        language: "KOR",
        isChild: null,
        createUserId: null,
        updateUserId: null,
      };
    },
    confirmDialog: async function () {
      try {
        let codeObj, builder, result;
        switch (this.dialogType) {
          case "insertCode":
            builder = CodeObjectBuilder();
            codeObj = builder
              .setCreateUserId(this.$store.state.userId)
              .setUpdateUserId(this.$store.state.userId)
              .setCodename(this.codeSchema.codename)
              .setUseYN(this.codeSchema.useYN)
              .setLanguage(this.codeSchema.language)
              .build();
            result = await this.$http.post("/api/code", codeObj.getParamBody());
            break;
          case "updateCode":
            builder = CodeObjectBuilder();
            codeObj = builder
              .set_id(this.codeSchema._id)
              .setUpdateUserId(this.$store.state.userId)
              .setCodename(this.codeSchema.codename)
              .setUseYN(this.codeSchema.useYN)
              .setLanguage(this.codeSchema.language)
              .build();
            result = await this.$http.put(
              "/api/code/" + codeObj._id,
              codeObj.getParamBody()
            );
            break;
          case "deleteCode":
            result = await this.$http.delete(`/api/code/${this.codeSchema._id}`);
            break;
          case "insertChildCode":
            builder = CodeObjectBuilder();
            codeObj = builder
              .setCreateUserId(this.$store.state.userId)
              .setUpdateUserId(this.$store.state.userId)
              .setIsChild("Y")
              .setCodename(this.codeSchema.codename)
              .setUseYN(this.codeSchema.useYN)
              .setLanguage(this.codeSchema.language)
              .build();
            result = await this.$http.post(
              `/api/code/${this.p_id}/childCode`,
              codeObj.getParamBody()
            );
            break;
          case "updateChildCode":
            builder = CodeObjectBuilder();
            codeObj = builder
              .setUpdateUserId(this.$store.state.userId)
              .setCodename(this.codeSchema.codename)
              .setUseYN(this.codeSchema.useYN)
              .setLanguage(this.codeSchema.language)
              .build();
            result = await this.$http.put(
              `/api/code/${this.p_id}/childCode/${this.codeSchema._id}`,
              codeObj.getParamBody()
            );
            break;
          case "deleteChildCode":
            result = await this.$http.delete(
              `/api/code/${this.p_id}/childCode/${this.codeSchema._id}`
            );
            break;
          default:
            alert("dialogType이 정해지지 않았습니다.");
            break;
        }
        console.log(result);
      } catch (err) {
        console.error(err);
      }
      this.disableCodeDialog();
      this.getCode();
    },
  },
};
</script>

<style scoped>
.table-td-button-pa0 {
  width: 32px !important;
  padding: 0px !important;
}
.text-bold {
  font-size: 1.1em;
  font-weight: bold;
}
.min-width-600 {
  min-width: 600px;
}
</style>
