<template>
  <v-container>
    <div class="editor">
      <v-row>
        <v-col cols="12" style="position: fixed; z-index:1; max-width:100%">
          <div style="display:block;">
            <editor-menu-bar :editor="editor" v-slot="{ commands, isActive }">
              <div class="editor__menubar">
                <v-btn
                  shaped
                  small
                  class="menubar__button"
                  :class="{ 'is-active': isActive.bold() }"
                  @click="commands.bold"
                >
                  <v-icon>mdi-format-bold</v-icon>
                </v-btn>

                <v-btn
                  shaped
                  small
                  class="menubar__button"
                  :class="{ 'is-active': isActive.italic() }"
                  @click="commands.italic"
                >
                  <v-icon>mdi-format-italic</v-icon>
                </v-btn>

                <v-btn
                  shaped
                  small
                  class="menubar__button"
                  :class="{ 'is-active': isActive.strike() }"
                  @click="commands.strike"
                >
                  <v-icon>mdi-format-strikethrough-variant</v-icon>
                </v-btn>

                <v-btn
                  shaped
                  small
                  class="menubar__button"
                  :class="{ 'is-active': isActive.underline() }"
                  @click="commands.underline"
                >
                  <v-icon>mdi-format-underline</v-icon>
                </v-btn>

                <v-btn
                  shaped
                  small
                  class="menubar__button"
                  :class="{ 'is-active': isActive.code() }"
                  @click="commands.code"
                >
                  <v-icon>mdi-code-tags</v-icon>
                </v-btn>

                <!-- <v-btn
                  shaped
                  small
                  class="menubar__button"
                  :class="{ 'is-active': isActive.paragraph() }"
                  @click="commands.paragraph"
                >
                  <v-icon>mdi-format-paragraph</v-icon>
                </v-btn> -->
                
                <v-btn
                  shaped
                  small
                  class="menubar__button"
                  :class="{ 'is-active': isActive.heading({ level: 1 }) }"
                  @click="commands.heading({ level: 1 })"
                >
                  H1
                </v-btn>

                <v-btn
                  shaped
                  small
                  class="menubar__button"
                  :class="{ 'is-active': isActive.heading({ level: 2 }) }"
                  @click="commands.heading({ level: 2 })"
                >
                  H2
                </v-btn>

                <v-btn
                  shaped
                  small
                  class="menubar__button"
                  :class="{ 'is-active': isActive.heading({ level: 3 }) }"
                  @click="commands.heading({ level: 3 })"
                >
                  H3
                </v-btn>

                <v-btn
                  shaped
                  small
                  class="menubar__button"
                  :class="{ 'is-active': isActive.bullet_list() }"
                  @click="commands.bullet_list"
                >
                  <v-icon>mdi-format-list-bulleted</v-icon>
                </v-btn>

                <v-btn
                  shaped
                  small
                  class="menubar__button"
                  :class="{ 'is-active': isActive.ordered_list() }"
                  @click="commands.ordered_list"
                >
                  <v-icon>mdi-format-list-numbered</v-icon>
                </v-btn>

                <v-btn
                  shaped
                  small
                  class="menubar__button"
                  :class="{ 'is-active': isActive.blockquote() }"
                  @click="commands.blockquote"
                >
                  <v-icon>mdi-format-quote-close</v-icon>
                </v-btn>

                <!-- <v-btn
                  shaped
                  small
                  class="menubar__button"
                  :class="{ 'is-active': isActive.code_block() }"
                  @click="commands.code_block"
                >
                  <v-icon>mdi-code-not-equal-variant</v-icon>
                </v-btn> -->

                <!-- <v-btn
                  shaped
                  small
                  class="menubar__button"
                  @click="commands.horizontal_rule"
                >
                  <v-icon>mdi-minus</v-icon>
                </v-btn> -->

                <v-btn
                  shaped
                  small
                  class="menubar__button"
                  @click="showImagePrompt(commands.image)"
                >
                  <v-icon>mdi-image</v-icon>
                </v-btn>

                <!-- <v-btn
                  shaped
                  small
                  class="menubar__button"
                  @click="commands.undo"
                >
                  <v-icon>mdi-undo</v-icon>
                </v-btn> -->

                <!-- <v-btn
                  shaped
                  small
                  class="menubar__button"
                  @click="commands.redo"
                >
                  <v-icon>mdi-redo</v-icon>
                </v-btn> -->

              </div>
            </editor-menu-bar>
          </div>
        </v-col>
        <v-col cols="12" style="background:#ffffff;" >
          <editor-content style="padding-top:60px;"  class="editor__content" :editor="editor" :useBuiltInExtensions="true" />
        </v-col>
        <v-col cols="12">
          <div class="d-flex justify-start">
            <v-spacer></v-spacer>
            <v-btn large color="primary"><span class="h1">저장</span></v-btn>
          </div>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
// import Icon from 'Components/Icon'
import { Editor, EditorContent, EditorMenuBar } from 'tiptap'
import {
  Blockquote,
  CodeBlock,
  HardBreak,
  Heading,
  HorizontalRule,
  OrderedList,
  BulletList,
  ListItem,
  Bold,
  Code,
  Italic,
  Link,
  Strike,
  Underline,
  History,
  Image,
  Focus,
} from 'tiptap-extensions'

export default {
  components: {
    EditorContent,
    EditorMenuBar,
    // Icon,
  },
  data() {
    return {
      editor: new Editor({
        extensions: [
          new Blockquote(),
          new BulletList(),
          new CodeBlock(),
          new HardBreak(),
          new Heading({ levels: [1, 2, 3] }),
          new Image(),
          new HorizontalRule(),
          new ListItem(),
          new OrderedList(),
          new Link(),
          new Bold(),
          new Code(),
          new Italic(),
          new Strike(),
          new Underline(),
          new History(),
          new Focus({
            className: 'has-focus',
            nested: true,
          }),
        ],
        autoFocus: true,
        content: `
          <h2>
            Hi there,
          </h2>
          <p>
            this is a very <em>basic</em> example of tiptap.
          </p>
          <pre><code>body { display: none; }</code></pre>
          <ul>
            <li>
              A regular list
            </li>
            <li>
              With regular items
            </li>
          </ul>
          <blockquote>
            It's amazing 👏
            <br />
            – mom
          </blockquote>
        `,
        onUpdate: ({ getJSON, getHTML }) => {
          this.json = getJSON()
          this.html = getHTML()
        },
        json: 'Update content to see changes',
        html: 'Update content to see changes',
      }),
    }
  },
  beforeDestroy() {
    this.editor.destroy()
  },
  created() {
    this.initPage();
  },
  methods: {
    initPage: function(){

    },
    loadWritingData: function(){
      // id나 ip+기기고유번호를 기반으로하여 임시아이디를 생성하여 저장
    },
    loadContent: function(){
      // 1.load from file or db
      let data;

      // 2-1. set Editor from json
      // sample
      // this.editor.setContent({
      //   type: 'doc',
      //   content: [{
      //     type: 'paragraph',
      //     content: [
      //       {
      //         type: 'text',
      //         text: 'This is some inserted text. 👋',
      //       },
      //     ],
      //   }],
      // }, true)
      this.editor.setContent(data, true)

      // 2-2. set Editor from html
      // sample
      // this.editor.setContent('<p>This is some inserted text. 👋</p>')

      // 2-3. set textData from data
      this.json = data
      this.html = data

      // 3. set Focus
      this.editor.focus()
    },
    test: function() {
      console.log(this.json)
      console.log(this.html)
    },
    save: function() {
      /* this.$http.get('/api/dailyWrite')
        .then((response) => {
          this.movies = response.data
        }) */
      console.log("call save");
    },
    showImagePrompt(command) {
      const src = prompt('Enter the url of your image here')
      if (src !== null) {
        command({ src })
      }
    },
  },
}
</script>

<style>
/* 내용관련 css */
blockquote {
  border-left: 10px solid #ccc;
  margin: 0px 10px;
  padding: 0px 10px;
}

/* editor */
.ProseMirror{
  padding: 10px;
  background-color: rgb(250, 250, 250);
}
</style>
