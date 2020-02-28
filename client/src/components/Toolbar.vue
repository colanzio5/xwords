<template>
    <div class="hero-head">
        <div class="container">
            <nav class="navbar">
                <div class="navbar-brand">
                    <a class="navbar-item" href="/">
                        <img
                            src="http://bulma.io/images/bulma-logo.png"
                            alt="Logo"
                        />
                    </a>
                    <div
                        class="navbar-burger"
                        @click="showNav = !showNav"
                        :class="{ 'is-active': showNav }"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
                <div class="navbar-menu is-black" :class="{ 'is-active': showNav }">
                    <div class="navbar-end">
                        <a
                            class="navbar-item"
                            v-for="e in links"
                            v-bind:key="e.text"
                        >
                            <router-link :to="{ path: e.link }">
                                {{ e.text }}
                            </router-link>
                        </a>
                    </div>
                </div>
            </nav>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";

@Component({ name: "Toolbar" })
export default class Toolbar extends Vue {
    data() {
        return {
            showNav: false,
            links: [
                { text: "Home", link: `/${this.$route.params.username}` },
                {
                    text: "Profile",
                    link: `/${this.$route.params.username}/profile`
                },
                { text: "Logout", link: `/login` }
            ]
        };
    }
}
</script>

<style lang="scss"></style>
