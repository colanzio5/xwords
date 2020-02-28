<template>
    <div class="tile is-child is-primary" id="game-board" v-if="activeGame && activeGame.state">
        <div v-for="(row, y) in activeGame.state" :key="y">
            <GridCellComponent v-for="(col, x) in row" :key="x" :coordinates="getCoordinates(x,y)"></GridCellComponent>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
import GridCellComponent from "../components/GridCellComponent.vue";

import { IGridCell } from "../types/GridCell";
import {
    ICrossWordQuestion,
    CrossWordQuestionDirectionEnum
} from "../types/CrossWordQuestion";
import { CrossWordGame } from "../types/CrossWordGame";
import { ICoordinates } from "../types/Coordinates";
import { testCrossword } from "../../assets/test.crossword";
import { Getter } from "vuex-class";

@Component({
    name: "GameBoard",
    components: {
        GridCellComponent
    }
})
export default class GameBoard extends Vue {
    @Getter("activeGame") activeGame: CrossWordGame;

    private getCoordinates(x, y) {
        return { x, y } as ICoordinates;
    }
}
</script>
