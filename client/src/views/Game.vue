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
import { createNewGame } from "../services/game.service";
import * as firebase from "firebase";

@Component({
    name: "Game",
    components: {
        GameBoard,
        QuestionList
    }
})
export default class Game extends Vue {
    @Action("firebaseUpdateCallback") firebaseUpdateCallback: (
        snapshot
    ) => void;

    created() {
        const ref = `games/${this.$store.getters.activeGame.id}/meta/questions/`;
        const gameStateRef = firebase.database().ref(ref);
        const firebaseUpdateCallback = snapshot =>
            this.firebaseUpdateCallback(snapshot);
        gameStateRef.on("value", firebaseUpdateCallback);
    }
}
</script>