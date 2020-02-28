<template>
    <section class="hero is-success is-fullheight">
        <div class="hero-body">
            <div class="container has-text-centered">
                <div class="column is-4 is-offset-4">
                    <h3 class="title">Login</h3>
                    <hr class="login-hr" />
                    <p class="subtitle">Please login to proceed.</p>
                    <div class="box">
                        <figure class="avatar">
                            <img src="../../assets/images/xwords _square.jpg" style="width: 128px;" />
                        </figure>
                        <form action="#" @submit.prevent="signInUser">
                            <div class="field">
                                <div class="control">
                                    <input
                                        class="input is-large"
                                        placeholder="Email"
                                        id="email"
                                        type="email"
                                        name="email"
                                        value
                                        required
                                        autofocus
                                        v-model="form.email"
                                    />
                                </div>
                            </div>
                            <div class="field">
                                <div class="control">
                                    <input
                                        class="input is-large"
                                        placeholder="Password"
                                        id="password"
                                        type="password"
                                        name="password"
                                        required
                                        v-model="form.password"
                                    />
                                </div>
                            </div>
                            <button class="button is-block is-info is-large is-fullwidth">
                                Login
                                <i class="fa fa-sign-in" aria-hidden="true"></i>
                            </button>
                        </form>
                    </div>
                    <p class="has-text-grey">
                        <router-link to="register">Sign Up</router-link>&nbsp;·&nbsp;
                        <router-link to="404">Lost Password</router-link>&nbsp;·&nbsp;
                        <router-link to="404">Help</router-link>
                    </p>
                </div>
            </div>
        </div>
    </section>
</template>

<script lang="ts">
import { Component, Vue, Prop, Provide } from "vue-property-decorator";
import * as firebase from "firebase";
import { loginWithEmailAndPassword } from "../services/user.service";

@Component({ name: "Login" })
export default class Login extends Vue {
    form = {
        username: "",
        email: "",
        password: ""
    };
    async signInUser() {
        const { email, password } = this.form;
        await this.$store.dispatch("logIn", { email, password });
        const username = this.$store.getters.user.username;
        this.$router.replace({
            name: "UserDashboard",
            params: { username }
        });
    }
}
</script>

<style lang="scss">
.hero.is-success {
    background: black;
    color: white;
}
.hero .nav,
.hero.is-success .nav {
    -webkit-box-shadow: none;
    box-shadow: none;
}
.box {
    margin-top: 5rem;
}
.avatar {
    margin-top: -70px;
    padding-bottom: 20px;
}
.avatar img {
    padding: 5px;
    background: #fff;
    border-radius: 50%;
    -webkit-box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1),
        0 0 0 1px rgba(10, 10, 10, 0.1);
    box-shadow: 0 2px 3px rgba(10, 10, 10, 0.1), 0 0 0 1px rgba(10, 10, 10, 0.1);
}
input {
    font-weight: 300;
}
p {
    font-weight: 700;
}
p.subtitle {
    padding-top: 1rem;
}

.login-hr {
    border-bottom: 1px solid white;
}

.field {
    padding-bottom: 10px;
}

.fa {
    margin-left: 5px;
}
</style>
