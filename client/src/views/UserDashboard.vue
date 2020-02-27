<template>
    <div class="tile is-ancestor">
        <div class="tile is-parent ">
            <div class="tile is-child box has-background-black">
                <GamesList></GamesList>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
import * as firebase from "firebase";
import GamesList from "../components/GameList.vue";

@Component({
    components: {
        GamesList
    }
})
export default class UserDashboard extends Vue {}
</script>

<style lang="scss"></style>
