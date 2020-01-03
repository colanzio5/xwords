<template>
  <div id="toolbar">
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";

@Component({ name: "Toolbar" })
export default class Toolbar extends Vue {
  @Provide()
  foo = "foo";
}
</script>

<style lang="scss"></style>
