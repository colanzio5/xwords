<template>
    <div>
        <p>{{ direction }}</p>
        <b-collapse
            class="card"
            v-for="(question, index) of activeGameQuestions(direction)"
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
                    <input type="text" :maxlength="question.length" />
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
import { Getter, Action } from "vuex-class";

@Component({ name: "GridCellComponent" })
export default class QuestionList extends Vue {
    @Prop()
    direction: CrossWordQuestionDirectionEnum;

    @Getter("activeGameQuestions") activeGameQuestions: ICrossWordQuestion[];
    @Getter("selectedQuestion") selectedQuestion: ICrossWordQuestion;
    @Action("setActiveGameQuestion") setActiveGameQuestion: (
        question: ICrossWordQuestion
    ) => void;

    isOpen(question) {
        return this.selectedQuestion && this.selectedQuestion.number
            ? this.selectedQuestion.number === question.number
            : false;
    }

    emitSelected(selectedQuestion: ICrossWordQuestion) {
        console.log(selectedQuestion);
        this.setActiveGameQuestion(selectedQuestion);
    }
}
</script>
