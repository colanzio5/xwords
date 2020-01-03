<template>
  <section class="hero is-success is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <h3 class="title">Create New Account</h3>
          <hr class="register-hr" />
          <p class="subtitle">Please register to proceed.</p>
          <div class="box">
            <figure class="avatar">
              <img src="../../assets/images/xwords _square.jpg" style="width: 128px;"/>
            </figure>
            <form action="#" @submit.prevent="createNewUser">
              <div class="field">
                <div class="control">
                  <input
                    class="input is-large"
                    id="username"
                    type="username"
                    name="username"
                    placeholder="Username"
                    value
                    required
                    autofocus
                    v-model="form.username"
                  />
                </div>
              </div>
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
                Register <i class="fa fa-sign-in" aria-hidden="true"></i>
              </button>
            </form>
          </div>
          <p class="has-text-grey">
            <router-link to="login">Log In</router-link>
            &nbsp;·&nbsp;
            <router-link to="404">Lost Password</router-link>
            &nbsp;·&nbsp;
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
import { writeUserData } from "../services/user.service";

@Component
export default class Register extends Vue {
  form = {
    username: "",
    email: "",
    password: ""
  };
  error = null;
  async createNewUser() {
    try {
      console.log("[createNewUser] creating new user: ", this.form);
      // create and update new firebase user
      const authData = await firebase
        .auth()
        .createUserWithEmailAndPassword(this.form.email, this.form.password);
      await authData.user.updateProfile({
        displayName: this.form.username
      });
      // set the user data in the store
      const userData = {
        displayName: authData.user.displayName,
        email: authData.user.email,
        emailVerified: authData.user.emailVerified
      };
      // create the user data in realtime database
      await writeUserData(
        authData.user.uid,
        authData.user.displayName,
        authData.user.email
      );
      this.$store.commit("SET_USER", userData);
      // navigate to home
      this.$router.replace({ name: "shell", params: { username: authData.user.displayName }});
      console.log("[createNewUser] registration complete: ", authData);
    } catch (error) {
      this.error = error;
      console.error(error);
      throw error;
    }
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

.register-hr {
  border-bottom: 1px solid white;
}

.field {
  padding-bottom: 10px;
}

.fa {
  margin-left: 5px;
}
</style>
