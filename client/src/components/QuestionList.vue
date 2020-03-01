<template>
    <div v-if="activeGameQuestions(direction)">
        <!-- <p>{{ direction }}</p> -->
        <b-collapse
            class="card"
            v-for="(question, index) of activeGameQuestions(direction)"
            :key="index"
            :open="isOpen(question)"
            @open="setActiveGameQuestion(question)"
            @close="setActiveGameQuestion(null)"
        >
            <div slot="trigger" slot-scope="props" class="card-header" role="button">
                <p class="card-header-title">{{ question.clue }}</p>
                <a class="card-header-icon">
                    <b-icon :icon="props.open ? 'menu-down' : 'menu-up'"></b-icon>
                </a>
            </div>
            <div class="card-content">
                <div class="content" style="display: flex;">
                    <input
                        v-for="(_, index) of question.proposedAnswer"
                        :key="index"
                        class="character-input"
                        type="text"
                        :maxlength="1"
                        v-model="question.proposedAnswer[index]"
                        @input="updateQuestionAnswer(question)"
                    />
                </div>
            </div>
        </b-collapse>
    </div>
</template>

<style lang="scss" scoped>
.character-input {
    border: 1px solid black;
    width: 3vw;
    height: 3vw;
}
</style>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
import {
    CrossWordQuestionDirectionEnum,
    ICrossWordQuestion
} from "../types/CrossWordQuestion";
import { Getter, Action } from "vuex-class";

@Component({ name: "QuestionList" })
export default class QuestionList extends Vue {
    @Prop()
    direction: CrossWordQuestionDirectionEnum;

    @Getter("activeGameQuestions") activeGameQuestions: ICrossWordQuestion[];
    @Getter("selectedQuestion") selectedQuestion: ICrossWordQuestion;
    @Action("setActiveGameQuestion") setActiveGameQuestion: (
        question: ICrossWordQuestion
    ) => void;

    @Action("updateQuestionAnswer") updateQuestionAnswer: (
        updatedQuestion: ICrossWordQuestion
    ) => void;

    isOpen(question) {
        return this.selectedQuestion && this.selectedQuestion.number
            ? this.selectedQuestion.number === question.number
            : false;
    }
}
</script>
