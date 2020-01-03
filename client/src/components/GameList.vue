<template>
    <div>
        <div v-if="!games || !games.length">No Games Found!</div>
        <div class="box content" v-else>
            <div v-for="game in games" v-bind:key="game.id">
                <br>
                <div class="game-row">
                    <div class="media">
                        <div class="media-left">
                            <p class="image is-32x32">
                                <img
                                    src="http://bulma.io/images/placeholders/128x128.png"
                                />
                            </p>
                        </div>
                        <div class="media-content">
                            <div class="content">
                                <h4 v-on:click="goToGame(game)">{{game.name}}</h4>
                                <p>
                                    <a href="#">{{game.owner.username}} </a> created at
                                    {{ game.createdAt }}
                                    &nbsp;
                                    <span class="tag">{{game.status}}</span>
                                </p>
                            </div>
                        </div>
                        <div class="media-right">
                            <span class="has-text-grey-light">
                                <i class="fa fa-user"></i> {{ game.members.length + 1 }}
                            </span>
                        </div>
                    </div>
                </div>
                <br>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
import * as firebase from "firebase";
import { testCrossword } from '../../assets/test.crossword'


@Component({ name: "GamesList" })
export default class GamesList extends Vue {
    // todo: replace with request to database
    games = [testCrossword];
    created() {
        console.log(this.games);
    }

    goToGame(game) {
        this.$router.replace({ name: "Game", params: { username: this.$route.params.username, gameId: game.id }});
    }
}
</script>

<style lang="scss">
.media-left img {
    border-radius: 50%;
}

h4:hover {
    color: #7957d5;
}

</style>
