<template>
    <div class="columns">
        <div class="column is-half">
            <img
                src="../../assets/images/xwords _square.jpg"
                alt="Avatar"
                class="xwords-icon"
            />
        </div>
        <div class="column"><GamesList></GamesList></div>
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
