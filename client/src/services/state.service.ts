import Vue from "vue";
import Vuex from "vuex";
import { loginWithEmailAndPassword } from "../services/user.service";
import { fetchUserGames, fetchUserGameById } from "./game.service";
import {
    CrossWordQuestionDirectionEnum,
    ICrossWordQuestion
} from "../types/CrossWordQuestion";
import { ICoordinates } from "../types/Coordinates";
import { ICrossWordGame } from "../types/CrossWordGame";
import { User } from "../types/User";

Vue.use(Vuex);

interface RootState {
    // user state
    loggedIn: boolean;
    user: User;
    games: ICrossWordGame[];
    // active game state
    activeGameId: string;
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
        activeGameId: null,
        activeGame: null,
        selectedQuestion: null,
        selectedCells: null
    },

    getters: {
        // user getters
        user: state => state.user,
        games: state => state.games,
        // active game getters
        activeGameId: state => state.activeGameId,
        activeGame: state => state.activeGame,
        activeGameQuestions: state => {
            return direction =>
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
        SET_LOGGED_IN: (state, data) => (state.loggedIn = data),
        SET_USER: (state, data) => (state.user = data),
        SET_GAMES: (state, data) => (state.games = data),
        // active game mutations
        SET_ACTIVE_GAME_ID: (state, data) => (state.activeGameId = data),
        SET_ACTIVE_GAME: (state, data) => (state.activeGame = { ...data }),
        SET_SELECTED_QUESTION: (state, data) => (state.selectedQuestion = data),
        SET_SELECTED_CELLS: (state, data) => (state.selectedCells = data)
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
        setActiveGameId: ({ commit }, gameId) => {
            commit("SET_ACTIVE_GAME_ID", gameId);
        },
        fetchActiveGame: async ({ commit, state }) => {
            const gameId = state.activeGameId;
            const game = await fetchUserGameById(gameId);
            commit("SET_ACTIVE_GAME", game);
        },
        setActiveGameQuestion: ({ commit }, activeQuestion) => {
            commit("SET_SELECTED_QUESTION", activeQuestion);
            commit("SET_SELECTED_CELLS", _getSelectedCells(activeQuestion));
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
