<template>
    <div>
        <div v-if="!games || !games.length">No Games Found!</div>
        <div v-else class="table-container">
            <table class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Owner</th>
                        <th>Status</th>
                        <th>Date Created</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="game in games" v-bind:key="game.id" v-on:click="goToGame(game)">
                        <th>{{ game.name }}</th>
                        <td>{{ game.owner.username }}</td>
                        <td>{{ game.status }}</td>
                        <td>{{ game.createdAt }}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<style lang="scss">
tr:hover {
    cursor: pointer;
    color: #7957d5;
}
</style>


<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
import * as firebase from "firebase";
import { testCrossword } from "../../assets/test.crossword";
import { fetchUserGames, createNewGame } from "../services/game.service";
import { State, Action, Getter } from "vuex-class";
import { CrossWordGame } from "../types/CrossWordGame";

@Component({ name: "GamesList" })
export default class GamesList extends Vue {
    @Getter("games") games: CrossWordGame[];
    @Action("fetchUserGames") fetchUserGames;
    @Action("setActiveGameId") setActiveGameId;
    @Action("fetchActiveGame") fetchActiveGame: (id: string) => void;

    created() {
        this.fetchUserGames();
    }

    async goToGame(game) {
        await this.fetchActiveGame(game.id);
        this.$router.replace({
            name: "Game",
            params: { username: this.$route.params.username, gameId: game.id }
        });
    }
}
</script>

