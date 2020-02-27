<template>
    <div>
        <p>{{ direction }}</p>
        <b-collapse
            class="card"
            v-for="(question, index) of questions"
            :key="index"
            :open="isOpen(question)"
            @open="emitSelected(question)"
            @click="emitSelected(question)"
        >
            <div
                slot="trigger"
                slot-scope="props"
                class="card-header"
                role="button"
            >
                <p class="card-header-title">
                    {{ question.number }}
                </p>
                <a class="card-header-icon">
                    <b-icon :icon="props.open ? 'menu-down' : 'menu-up'">
                    </b-icon>
                </a>
            </div>
            <div class="card-content">
                <div class="content">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Porro, alias voluptatibus debitis rerum possimus ullam
                    eaque, ipsam quas quae ducimus, aliquid perferendis
                    exercitationem ut eveniet iure est nisi esse aut?
                </div>
            </div>
        </b-collapse>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
import { GridCell } from "../types/GridCell";
import { Coordinates } from "../types/Coordinates";
import { CrossWordQuestion } from "../types/CrossWordQuestion";

@Component({ name: "GridCellComponent" })
export default class QuestionList extends Vue {
    @Prop()
    direction: string;

    @Prop()
    questions: CrossWordQuestion[];

    @Prop()
    selectedQuestion: CrossWordQuestion;

    isOpen(question) {
        try {
            console.log(this.selectedQuestion.number, question.number)
        } catch (error) {
            
        }
        return this.selectedQuestion ? this.selectedQuestion.number === question.number : false;
    }

    emitSelected(selectedQuestion: CrossWordQuestion) {
        console.log("update:selectedQuestion", selectedQuestion);
        this.$emit("update:selectedQuestion", selectedQuestion);
    }
}
</script>
