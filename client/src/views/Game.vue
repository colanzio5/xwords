<template>
    <div>
        Game View
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
import * as firebase from "firebase";
import { testCrossword } from '../../assets/test.crossword'


@Component({ name: "Game" })
export default class Game extends Vue {

    created() {
        // console.log(this.games);
    }
}
</script>

<style lang="scss"></style>
