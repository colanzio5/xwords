<template>
    <div>
        <div v-if="!games || !games.length">No Games Found!</div>
        <div v-else class="table-container">
            <table
                class="table is-bordered is-striped is-narrow is-hoverable is-fullwidth"
            >
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Owner</th>
                        <th>Status</th>
                        <th>Date Created</th>
                    </tr>
                </thead>
                <tbody>
                    <tr
                        v-for="game in games"
                        v-bind:key="game.id"
                        v-on:click="goToGame(game)"
                    >
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

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
import * as firebase from "firebase";
import { testCrossword } from "../../assets/test.crossword";
import { fetchUserGames } from "../services/game.service";

@Component({ name: "GamesList" })
export default class GamesList extends Vue {
    games: any[] = null;

    data() {
        return {
            games: null
        };
    }

    async created() {
        const owner = this.$store.getters.user;
        this.games = (await fetchUserGames(owner.data)) as any[];
    }

    goToGame(game) {
        this.$router.replace({
            name: "Game",
            params: { username: this.$route.params.username, gameId: game.id }
        });
    }
}
</script>

<style lang="scss">
tr:hover {
    cursor: pointer;
    color: #7957d5;
}
</style>
