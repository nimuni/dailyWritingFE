<template>
  <div>
    <div v-if="editor" class="editor__button">
      <v-btn
        small
        outlined
        @click="editor.chain().focus().toggleBold().run()"
        :class="{ 'is-active': editor.isActive('bold') }"
      >
        <v-icon>mdi-format-bold</v-icon>
      </v-btn>
      <v-btn
        small
        outlined
        @click="editor.chain().focus().toggleItalic().run()"
        :class="{ 'is-active': editor.isActive('italic') }"
      >
        <v-icon>mdi-format-italic</v-icon>
      </v-btn>
      <v-btn
        small
        outlined
        @click="editor.chain().focus().toggleStrike().run()"
        :class="{ 'is-active': editor.isActive('strike') }"
      >
        <v-icon>mdi-format-strikethrough-variant</v-icon>
      </v-btn>
      <v-btn
        small
        outlined
        @click="editor.chain().focus().toggleUnderline().run()"
        :class="{ 'is-active': editor.isActive('underline') }"
      >
        <v-icon>mdi-format-underline</v-icon>
      </v-btn>
      <!-- <v-btn small outlined @click="editor.chain().focus().toggleCode().run()" :class="{ 'is-active': editor.isActive('code') }">
        <v-icon>mdi-code-tags</v-icon>
      </v-btn> -->
      <!-- <v-btn small outlined @click="editor.chain().focus().unsetAllMarks().run()">
        clear marks
      </v-btn> -->
      <!-- <v-btn small outlined @click="editor.chain().focus().clearNodes().run()">
        clear nodes
      </v-btn> -->
      <!-- <v-btn small outlined @click="editor.chain().focus().setParagraph().run()" :class="{ 'is-active': editor.isActive('paragraph') }">
        paragraph
      </v-btn> -->
      <v-btn
        small
        outlined
        @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 1 }) }"
      >
        h1
      </v-btn>
      <v-btn
        small
        outlined
        @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 2 }) }"
      >
        h2
      </v-btn>
      <v-btn
        small
        outlined
        @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
        :class="{ 'is-active': editor.isActive('heading', { level: 3 }) }"
      >
        h3
      </v-btn>
      <!-- <v-btn small outlined @click="editor.chain().focus().toggleHeading({ level: 4 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 4 }) }">
        h4
      </v-btn> -->
      <!-- <v-btn small outlined @click="editor.chain().focus().toggleHeading({ level: 5 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 5 }) }">
        h5
      </v-btn> -->
      <!-- <v-btn small outlined @click="editor.chain().focus().toggleHeading({ level: 6 }).run()" :class="{ 'is-active': editor.isActive('heading', { level: 6 }) }">
        h6
      </v-btn> -->
      <v-btn
        small
        outlined
        @click="editor.chain().focus().toggleHighlight({ color: '' }).run()"
        :class="{ 'is-active': editor.isActive('highlight') }"
      >
        노랑
      </v-btn>
      <v-btn
        small
        outlined
        @click="
          editor.chain().focus().toggleHighlight({ color: '#ffc078' }).run()
        "
        :class="{ 'is-active': editor.isActive('highlight') }"
      >
        주황
      </v-btn>
      <!-- <v-btn small outlined @click="editor.chain().focus().toggleBulletList().run()" :class="{ 'is-active': editor.isActive('bulletList') }">
        <v-icon>mdi-format-list-bulleted</v-icon>
      </v-btn> -->
      <!-- <v-btn small outlined @click="editor.chain().focus().toggleOrderedList().run()" :class="{ 'is-active': editor.isActive('orderedList') }">
        <v-icon>mdi-format-list-numbered</v-icon>
      </v-btn> -->
      <!-- <v-btn small outlined @click="editor.chain().focus().toggleCodeBlock().run()" :class="{ 'is-active': editor.isActive('codeBlock') }">
        <v-icon>mdi-code-tags</v-icon>
      </v-btn> -->
      <!-- <v-btn small outlined @click="editor.chain().focus().toggleBlockquote().run()" :class="{ 'is-active': editor.isActive('blockquote') }">
        <v-icon>mdi-format-quote-close</v-icon>
      </v-btn> -->
      <v-btn
        small
        outlined
        @click="editor.chain().focus().setHorizontalRule().run()"
      >
        <v-icon>mdi-minus</v-icon>
      </v-btn>
      <!-- <v-btn small outlined @click="editor.chain().focus().setHardBreak().run()">
        hard break
      </v-btn> -->
      <v-btn small outlined @click="editor.chain().focus().undo().run()">
        <v-icon>mdi-undo</v-icon>
      </v-btn>
      <v-btn small outlined @click="editor.chain().focus().redo().run()">
        <v-icon>mdi-redo</v-icon>
      </v-btn>
    </div>
    <editor-content :editor="editor" class="editor__css" />
    <!-- <div class="character-count">
      {{ editor.getCharacterCount() }}
    </div> -->
  </div>
</template>

<script>
import { Editor, EditorContent } from "@tiptap/vue-2";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import CharacterCount from "@tiptap/extension-character-count";

export default {
  components: {
    EditorContent,
  },
  computed: {},
  props: {
    value: {
      type: String,
      default: "",
    },
    editable: {
      type: Boolean,
      default: true,
    },
    limit: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      editor: null,
    };
  },
  watch: {
    value: function (value) {
      const isSame = this.editor.getHTML() === value;
      // const isSame = this.editor.getJSON().toString() === value.toString()
      if (isSame) {
        return;
      }

      this.editor.commands.setContent(this.value, false);
    },
  },
  mounted() {
    this.editor = new Editor({
      extensions: [
        StarterKit,
        Underline,
        Highlight.configure({ multicolor: true }),
        CharacterCount.configure({
          limit: this.limit,
        }),
      ],
      editable: this.editable,
      content: this.value,
      onUpdate: () => {
        this.$emit("input", this.editor.getHTML());
        // this.$emit('input', this.editor.getJSON())
      },
    });
  },

  beforeDestroy() {
    this.editor.destroy();
  },
};
</script>

<style scoped>
.editor__button {
  text-align: center;
}
.editor__css {
  margin: 0.75em 0;
  min-height: 75vh;
  max-height: 90vh;
  overflow-y: auto;
}
.editor__css::-webkit-scrollbar {
  width: 10px;
}
.editor__css::-webkit-scrollbar-thumb {
  background-color: rgba(0, 255, 234, 0.5);
  border-radius: 10px;
}
.character-count {
  margin-top: 1rem;
  color: #868e96;
}
</style>
