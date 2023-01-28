<template>
  <vue-editor v-model="content" />
</template>

<script>
import { VueEditor } from "vue2-editor";

export default {
  props: {
    propContent: {default: ''},
  },
  components: { VueEditor },

  data: () => ({
    content: ''
  }),
  watch: {
    content() {
      this.$emit('changeContent', this.content)
    }      
  },
  mounted(){
    this.propContent != '' ? this.content = this.propContent : this.content = "<h1>Some initial content</h1>"
  }
};
</script>
