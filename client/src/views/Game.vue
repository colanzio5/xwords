<template>
    <div class="columns">
        <div class="column">
            <GameBoard />
        </div>
        <div class="column">
            <QuestionList :direction="`HORIZONTAL`" />
        </div>
        <div class="column">
            <QuestionList :direction="`VERTICAL`" />
        </div>
    </div>
</template>

<style lang="scss">
#game-board {
    display: inline-block;
    white-space: nowrap;
}
</style>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
import { Getter, Action } from "vuex-class";
import QuestionList from "../components/QuestionList.vue";
import GameBoard from "../components/GameBoard.vue";

@Component({
    name: "Game",
    components: {
        GameBoard,
        QuestionList
    }
})
export default class Game extends Vue {
    @Action("fetchActiveGame") fetchActiveGame: () => void;
    created() {
        this.fetchActiveGame();
    }
}
</script>