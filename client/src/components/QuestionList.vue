<template>
    <div>
        <p>{{ direction === "VERTICAL" ? "Down" : "Across" }}</p>
        <b-collapse
            class="card"
            v-for="(question, index) of questions.filter(q => q.direction === direction)"
            :key="index"
            :open="isOpen(question)"
            @open="emitSelected(question)"
            @click="emitSelected(question)"
        >
            <div slot="trigger" slot-scope="props" class="card-header" role="button">
                <p class="card-header-title">{{ question.clue }}</p>
                <a class="card-header-icon">
                    <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
                </a>
            </div>
            <div class="card-content">
                <div class="content">
                    <input
                        type="text"
                        @update="emitUpdated()"
                        :maxlength="question.length"
                        v-model="currentAnswers[question.number]"
                    />
                </div>
            </div>
        </b-collapse>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
import {
    CrossWordQuestionDirectionEnum,
    ICrossWordQuestion
} from "../types/CrossWordQuestion";

@Component({ name: "GridCellComponent" })
export default class QuestionList extends Vue {
    @Prop()
    direction: CrossWordQuestionDirectionEnum;

    @Prop()
    questions: ICrossWordQuestion[];

    @Prop()
    selectedQuestion: ICrossWordQuestion;

    @Prop()
    currentAnswers: String[];

    isOpen(question) {
        return this.selectedQuestion && this.selectedQuestion.number
            ? this.selectedQuestion.number === question.number
            : false;
    }

    emitSelected(selectedQuestion: ICrossWordQuestion) {
        this.$emit("update:selectedQuestion", selectedQuestion);
    }

    emitUpdated() {
        this.$emit("update:questionAnswer", this.currentAnswers);
    }
}
</script>
