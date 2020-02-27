import Vue from 'vue'
import Router from 'vue-router'
import Login from './views/Login.vue';
import Register from './views/Register.vue';
import Shell from './views/Shell.vue';
import Game from './views/Game.vue';
import Profile from './views/Profile.vue';
import UserDashboard from './views/UserDashboard.vue';
import * as firebase from 'firebase';

Vue.use(Router)

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
      meta: {
        requiresAuth: false
      }
    },
    {
      path: '/:username',
      name: 'shell',
      component: Shell,
      props: true,
      meta: {
        requiresAuth: true
      },
      children: [
        {
          path: '',
          name: "UserDashboard",
          component: UserDashboard,
          props: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: 'profile',
          name: "Profile",
          component: Profile,
          props: true,
          meta: {
            requiresAuth: true
          }
        },
        {
          path: ':gameId',
          name: "Game",
          component: Game,
          props: true,
          // meta: {
          //   requiresAuth: true
          // }
        }
      ]
    },
    {
      path: "*",
      redirect: "/login"
    }
  ]
});

// check to make sure there's a valid user
// when navigating between pages
router.beforeEach((to, from, next) => {
  // try {
  //   let currentUser = firebase.auth().currentUser
  //   let requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  //   if (requiresAuth && !currentUser) next('login')
  //   else next()
  // } catch (error) {
  //   console.error("[router auth middleware] error: ", error);
  //   next()
  // }
  next()
})

export default router;