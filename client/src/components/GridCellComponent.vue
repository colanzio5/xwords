<template>
    <input
        v-bind:style="getStyle()"
        :value="cellData.letterValue"
        @input="emitInputUpdated($event)"
        @click="emitSelected($event)"
    />
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
import { GridCell } from "../types/GridCell";
import { Coordinates } from "../types/Coordinates";

@Component({ name: "GridCellComponent" })
export default class GridCellComponent extends Vue {
    @Prop()
    cellData: GridCell;

    @Prop()
    selectedCells: Coordinates[];

    @Prop()
    selectedDirection: string;

    emitInputUpdated(event) {
        const updatedGridCell: GridCell = {
            ...this.cellData,
            letterValue: event.target.value
        };
        this.$emit("update:cellData", updatedGridCell);
    }

    emitSelected(event) {
        if (this.cellData.parentQuestion)
            this.$emit("update:selectedQuestion", {
                ...this.cellData.parentQuestion
            });
    }

    getStyle() {
        let background = "black";

        if (this.cellData.isTextCell) background = "white";
        if (this.isSelected()) background = "#7957d5";

        return {
            height: "4vh",
            width: "4vh",
            background: background
        };
    }

    isSelected = () => {
        const matches = this.selectedCells.filter(e => {
            return (
                e.x === this.cellData.coordinates.x &&
                e.y === this.cellData.coordinates.y
            );
        });
        return matches.length > 0 ? true : false;
    };
}
</script>
