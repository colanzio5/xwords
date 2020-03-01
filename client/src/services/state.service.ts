import Vue from "vue";
import Vuex from "vuex";
import { loginWithEmailAndPassword } from "../services/user.service";
import {
    fetchUserGames,
    fetchUserGameById,
    updateGameQuestion
} from "./game.service";
import {
    CrossWordQuestionDirectionEnum,
    ICrossWordQuestion
} from "../types/CrossWordQuestion";
import { ICoordinates } from "../types/Coordinates";
import { ICrossWordGame } from "../types/CrossWordGame";
import { User } from "../types/User";
import { IGridCell } from "../types/GridCell";

Vue.use(Vuex);

interface RootState {
    // user state
    loggedIn: boolean;
    user: User;
    games: ICrossWordGame[];
    // active game state
    activeGame: ICrossWordGame;
    selectedQuestion: ICrossWordQuestion;
    selectedCells: ICoordinates[];
}

export default new Vuex.Store<RootState>({
    state: {
        // user state
        loggedIn: false,
        user: null,
        games: null,
        // active game state
        activeGame: null,
        selectedQuestion: null,
        selectedCells: null
    },

    getters: {
        // user getters
        user: state => state.user,
        games: state => state.games,
        // active game getters
        activeGame: state => state.activeGame,
        activeGameQuestions: state => {
            return direction =>
                state &&
                state.activeGame &&
                state.activeGame.meta.questions.filter(
                    q => q.direction === direction
                );
        },
        selectedQuestion: state => state.selectedQuestion,
        selectedCells: state => state.selectedCells,
        cellState: state => {
            return coordinates => {
                const { x, y } = coordinates;
                return state.activeGame.state[y][x];
            };
        }
    },

    mutations: {
        // user mutations
        SET_LOGGED_IN: (state, isloggedIn) => (state.loggedIn = isloggedIn),
        SET_USER: (state, user) => (state.user = user),
        SET_GAMES: (state, games) => (state.games = games),
        // active game mutations
        SET_ACTIVE_GAME: (state, activeGame) => (state.activeGame = activeGame),
        SET_SELECTED_QUESTION: (state, selectedQuestion) =>
            (state.selectedQuestion = selectedQuestion),
        SET_SELECTED_CELLS: (state, selectedCells) =>
            (state.selectedCells = selectedCells),
        SET_QUESTION_ANSWER: (state, { questionIndex, updatedQuestion }) => {
            state.activeGame.meta.questions[questionIndex] = updatedQuestion;
        },
        SET_ACTIVE_GAME_STATE: (state, gameState) =>
            (state.activeGame.state = gameState)
    },

    actions: {
        // user actions
        setUser: ({ commit }, user) => {
            commit("SET_LOGGED_IN", user !== null);
            if (user) commit("SET_USER", user);
            else commit("SET_USER", null);
        },
        logIn: async ({ commit }, { email, password }) => {
            const user = await loginWithEmailAndPassword(email, password);
            commit("SET_LOGGED_IN", user !== null);
            if (user) commit("SET_USER", user);
            else commit("SET_USER", null);
        },
        fetchUserGames: async ({ commit, state }) => {
            const games = await fetchUserGames(state.user);
            commit("SET_GAMES", games);
        },

        // active game actions
        fetchActiveGame: async ({ commit }, gameId: string) => {
            const game = await fetchUserGameById(gameId);
            commit("SET_ACTIVE_GAME", game);
        },
        setActiveGameQuestion: (
            { commit },
            activeQuestion: ICrossWordQuestion
        ) => {
            commit("SET_SELECTED_QUESTION", activeQuestion);
            commit("SET_SELECTED_CELLS", _getSelectedCells(activeQuestion));
        },
        updateQuestionAnswer: async (
            { commit, state },
            updatedQuestion: ICrossWordQuestion
        ) => {
            const questionIndex = state.activeGame.meta.questions.findIndex(
                q => q.number === updatedQuestion.number
            );
            commit("SET_QUESTION_ANSWER", { questionIndex, updatedQuestion });
            const newState: IGridCell[][] = _updateGridStateFromUpdatedQuestionAnswer(
                updatedQuestion,
                state.activeGame.state
            );
            commit("SET_ACTIVE_GAME_STATE", newState);
            await updateGameQuestion(
                state.activeGame.id,
                questionIndex,
                updatedQuestion
            );
        },
        firebaseUpdateCallback: ({ commit, state }, snapshot) => {
            let newState: IGridCell[][];
            for (const updatedQuestion of snapshot.val()) {
                const questionIndex = state.activeGame.meta.questions.findIndex(
                    q => q.number === updatedQuestion.number
                );
                const isChanged =
                    updatedQuestion.proposedAnswer !==
                    state.activeGame.meta.questions[questionIndex]
                        .proposedAnswer;

                if (isChanged) {
                    commit("SET_QUESTION_ANSWER", {
                        questionIndex,
                        updatedQuestion
                    });
                    newState = _updateGridStateFromUpdatedQuestionAnswer(
                        updatedQuestion,
                        state.activeGame.state
                    );
                }
            }
            commit("SET_ACTIVE_GAME_STATE", newState);
        }
    }
});

const _getSelectedCells = (question: ICrossWordQuestion): ICoordinates[] => {
    if (!question) return [];

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
};

const _updateGridStateFromUpdatedQuestionAnswer = (
    updatedQuestion: ICrossWordQuestion,
    gameState: IGridCell[][]
) => {
    const proposedAnswer: string[] = updatedQuestion.proposedAnswer;
    let { x, y } = updatedQuestion.coordinates;
    for (const char of proposedAnswer) {
        if (char != "") gameState[y][x].letterValue = char;
        updatedQuestion.direction == CrossWordQuestionDirectionEnum.HORIZONTAL
            ? x++
            : y++;
    }
    return gameState;
};
