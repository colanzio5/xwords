<template>
    <div class="columns">
        <div class="column">
            <GameBoard />
        </div>

        <div class="column">
            <!-- <QuestionList
                v-if="game && game.meta && game.meta.questions"
                :direction="`HORIZON`"
                :questions.sync="game.meta.questions"
                :selectedQuestion.sync="selectedQuestion"
                v-on:update:selectedQuestion="updateSelectedQuestion($event)"
            />-->
        </div>

        <div class="column">
            <!-- <QuestionList
                v-if="game && game.meta && game.meta.questions"
                :direction="`VERTICAL`"
                :questions.sync="game.meta.questions"
                :selectedQuestion.sync="selectedQuestion"
                v-on:update:selectedQuestion="updateSelectedQuestion($event)"
            />-->
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
// misc
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
import * as firebase from "firebase";
import { testCrossword } from "../../assets/test.crossword";

// services

// components
import QuestionList from "../components/QuestionList.vue";
import GameBoard from "../components/GameBoard.vue";

// types and classes
import { CrossWordGame, ICrossWordGame } from "../types/CrossWordGame";
import {
    ICrossWordQuestion,
    CrossWordQuestionDirectionEnum
} from "../types/CrossWordQuestion";
import { IGridCell } from "../types/GridCell";
import { ICoordinates } from "../types/Coordinates";
import { Getter, Action } from "vuex-class";

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