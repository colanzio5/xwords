import * as firebase from "firebase";
import Vue from "vue";
import Buefy from "buefy";
import "buefy/dist/buefy.css";

import store from "./services/state.service";
import router from "./router";

import App from "./App.vue";
import GamesList from "./components/GameList.vue";
import ToolBar from "./components/GameList.vue";

Vue.use(Buefy);
Vue.config.productionTip = false;

const configOptions = {
    apiKey: "AIzaSyA6eTXmJg_VyAHY6LbYfe2El8Ui6LpneQE",
    authDomain: "xwords-404.firebaseapp.com",
    databaseURL: "https://xwords-404.firebaseio.com",
    projectId: "xwords-404",
    storageBucket: "xwords-404.appspot.com",
    messagingSenderId: "199044458861",
    appId: "1:199044458861:web:7933c1c4dc1c5158639264",
    measurementId: "G-DWREF344Y1"
};

firebase.initializeApp(configOptions);
firebase.analytics();

firebase.auth().onAuthStateChanged(user => {
    const { email, emailVerified, displayName } = user;
    store.dispatch("setUser", {
        email,
        emailVerified,
        username: displayName
    });
});

new Vue({
    render: h => h(App),
    router,
    store,
    components: { App, GamesList, ToolBar }
}).$mount("#app");
