<template>
    <input
        v-bind:style="getStyle()"
        class="cell selected"
        :value="cellState(coordinates).letterValue"
        @click="emitSelected($event)"
    />
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
import { IGridCell } from "../types/GridCell";
import { ICoordinates } from "../types/Coordinates";
import { Action, Getter } from "vuex-class";
import { ICrossWordQuestion } from "../types/CrossWordQuestion";
import { ICrossWordGame } from "../types/CrossWordGame";

@Component({ name: "GridCellComponent" })
export default class GridCellComponent extends Vue {
    @Prop()
    coordinates: ICoordinates;

    @Getter("cellState") cellState: (coordinates: ICoordinates) => IGridCell;
    @Getter("selectedCells") selectedCells: ICoordinates[];
    @Action("setActiveGameQuestion") setActiveGameQuestion: (
        question: ICrossWordQuestion
    ) => void;

    emitSelected(event) {
        if (this.cellState(this.coordinates).parentQuestion) {
            const question: ICrossWordQuestion = this.cellState(
                this.coordinates
            ).parentQuestion as ICrossWordQuestion;
            this.setActiveGameQuestion(question);
        } else this.setActiveGameQuestion(null);
    }

    getStyle() {
        let background = "black";
        if (this.cellState(this.coordinates).isTextCell) background = "white";
        if (this.isSelected()) background = "#7957d5";
        return {
            height: "4vh",
            width: "4vh",
            background: background
        };
    }

    isSelected() {
        if (!this.selectedCells) return false;
        const matches = this.selectedCells.filter(e => {
            return e.x === this.coordinates.x && e.y === this.coordinates.y;
        });
        return matches.length > 0 ? true : false;
    }
}
</script>
