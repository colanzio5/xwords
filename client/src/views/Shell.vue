<template>
    <section class="hero is-fullheight has-background-black">
        <Toolbar></Toolbar>

        <div class="hero-body">
            <div class="container has-text-centered">
                <router-view></router-view>
            </div>
        </div>

        <div class="hero-foot">
            <nav class="tabs is-boxed is-fullwidth">
                <div class="container">
                    <ul>
                        <li><a>Colin Casazza ♡ 2020</a></li>
                    </ul>
                </div>
            </nav>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
import * as firebase from "firebase";
import Toolbar from "../components/Toolbar.vue";

@Component({
    components: {
        Toolbar
    }
})
export default class Shell extends Vue {}
</script>

<style lang="scss"></style>
