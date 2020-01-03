<template>
    <section class="hero is-fullheight is-default is-bold">
        <div class="hero-head">
            <nav class="navbar">
                <div class="container">
                    <div id="navbarMenu" class="navbar-menu">
                        <div class="navbar-end">
                            <div class="tabs is-right">
                                <ul>
                                    <li>
                                        <router-link
                                            :to="
                                                `/${this.$route.params.username}`
                                            "
                                        >
                                            Home
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link
                                            :to="
                                                `/${this.$route.params.username}/profile`
                                            "
                                        >
                                            Profile
                                        </router-link>
                                    </li>
                                    <li>
                                        <router-link to="login">
                                            Log Out
                                        </router-link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>

        <div class="hero-body">
            <div class="container has-text-centered">
                <router-view></router-view>
            </div>
        </div>

        <div class="hero-foot">
            <div class="container">
                <div class="tabs is-centered">
                    <ul>
                        <li><a>Colin Casazza ♡ 2020</a></li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
import * as firebase from "firebase";

@Component
export default class Shell extends Vue {}
</script>

<style lang="scss"></style>
