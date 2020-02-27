<template>
    <div class="columns">
        <div class="column">
            <div
                class="tile is-child is-primary"
                v-if="game && game.state"
                id="game-board"
            >
                <div v-for="(row, y) in game.state">
                    <GridCellComponent
                        v-for="(cellData, x) in row"
                        :ref="_getRef(cellData)"
                        :cellData.sync="cellData"
                        v-on:update:cellData="updateGridCell($event)"
                        :selectedCells="selectedCells"
                        v-on:update:selectedQuestion="
                            updateSelectedQuestion($event)
                        "
                    ></GridCellComponent>
                </div>
            </div>
        </div>

        <div class="column">
            <QuestionList
                v-if="game && game.meta && game.meta.questions"
                :direction="`Across`"
                :questions.sync="game.meta.questions"
                :selectedQuestion.sync="selectedQuestion"
                v-on:update:selectedQuestion="updateSelectedQuestion($event)"
            ></QuestionList>
        </div>

        <div class="column">
            <QuestionList
                v-if="game && game.meta && game.meta.questions"
                :direction="`Down`"
                :questions.sync="game.meta.questions"
                :selectedQuestion.sync="selectedQuestion"
                v-on:update:selectedQuestion="updateSelectedQuestion($event)"
            ></QuestionList>
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
import {
    updateGameState,
    fetchGameSubscription,
    createNewGame
} from "../services/game.service";

// components
import GridCellComponent from "../components/GridCellComponent.vue";
import QuestionList from "../components/QuestionList.vue";

// types and interfaces
import {
    CrossWordQuestionDirectionEnum,
    CrossWordQuestion
} from "../types/CrossWordQuestion";
import { CrossWordGame, CrossWordGameState } from "../types/CrossWordGame";
import { Coordinates } from "../types/Coordinates";
import { GridCell } from "../types/GridCell";

@Component({
    name: "Game",
    components: {
        GridCellComponent,
        QuestionList
    }
})
export default class Game extends Vue {
    game: CrossWordGame;
    selectedQuestion: CrossWordQuestion;
    selectedCells: Coordinates[];
    loaded: boolean = false;

    data() {
        return {
            game: null,
            loaded: false,
            selectedQuestion: null,
            selectedCells: []
        };
    }

    private _getRef(gridCell: GridCell) {
        const { x, y } = gridCell.coordinates;
        return `${x},${y}`;
    }

    async created() {
        // this line will reset the to the test game
        // await createNewGame();
        this.game = testCrossword;
        this.game.state = this._initGameState(testCrossword);
        await updateGameState("12345", this.game.state);
        console.log(this.game.state);

        // fetch the game and start the subscription to db
        this.game = await fetchGameSubscription("12345");
        const gamesRef = firebase.database().ref(`games/12345`);
        this.game.id = "12345";
        gamesRef.on("value", this.databaseSubscriptionCallback);
    }

    databaseSubscriptionCallback = snapshot => {
        snapshot.forEach(doc => {
            if (doc.key == "state" && this.game && this.game.state)
                this.game.state = doc.val();
        });
    };

    updateGridCell(updateGridCell: GridCell) {
        const { x, y } = updateGridCell.coordinates;
        this.game.state[y][x] = updateGridCell;
        updateGameState(this.game.id, this.game.state);
    }

    updateSelectedQuestion(selectedQuestion: CrossWordQuestion) {
        console.log("question", selectedQuestion);
        this.selectedQuestion = selectedQuestion;
        this.selectedCells = this._getQuestionChildrenCoordinates(
            selectedQuestion
        );
    }

    private _initGameState(game: CrossWordGame): CrossWordGameState {
        return new Array(game.meta.dimensions.y).fill(null).map((row, y) => {
            return new Array(game.meta.dimensions.x)
                .fill(null)
                .map((col, x) => {
                    const coordinates: Coordinates = { x: x, y: y };
                    const letterValue = "";
                    const isTextCell = this._isTextCell(x, y);
                    const parentQuestion = this._isRootCell(x, y);
                    return {
                        coordinates,
                        letterValue,
                        isTextCell,
                        parentQuestion
                    };
                });
        });
    }

    private _getQuestionChildrenCoordinates(
        question: CrossWordQuestion
    ): Coordinates[] {
        console.log("QUESTION", question);
        if (question.direction === CrossWordQuestionDirectionEnum.VERTICAL) {
            const childYCords = new Array(question.length)
                .fill(0)
                .map((v, i) => i + question.coordinates.y);
            const childXCords = new Array(question.length).fill(
                question.coordinates.x
            );
            return childXCords.map((v, i) => {
                return { x: v, y: childYCords[i] };
            });
        }

        if (question.direction === CrossWordQuestionDirectionEnum.HORIZONTAL) {
            const childYCords = new Array(question.length)
                .fill(0)
                .map((v, i) => i + question.coordinates.x);
            const childXCords = new Array(question.length).fill(
                question.coordinates.y
            );
            return childYCords.map((v, i) => {
                return { x: v, y: childXCords[i] };
            });
        }
    }

    private _isRootCell(x, y): CrossWordQuestion | false {
        const matchedQuestion = this.game.meta.questions.find(
            e => e.coordinates.x == x && e.coordinates.y == y
        );

        return matchedQuestion ? matchedQuestion : false;
    }

    private _isTextCell(x, y): boolean {
        let isCharCell = false;

        for (let element of this.game.meta.questions) {
            const isVertical =
                element.direction ===
                    CrossWordQuestionDirectionEnum.HORIZONTAL &&
                element.coordinates.y == y;

            const isHorizontal =
                element.direction === CrossWordQuestionDirectionEnum.VERTICAL &&
                element.coordinates.x == x;

            if (isVertical) {
                const low = element.coordinates.x;
                const high = low + element.length;
                if (x >= low && x < high) {
                    isCharCell = true;
                }
            }

            if (isHorizontal) {
                if (element.coordinates.x == x) {
                    const low = element.coordinates.y;
                    const high = low + element.length;
                    if (y >= low && y < high) {
                        isCharCell = true;
                    }
                }
            }
        }
        return isCharCell;
    }
}
</script>
