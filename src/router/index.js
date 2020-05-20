import Vue from "vue";
import VueRouter from "vue-router";
import firebase from 'firebase'

import Login from "../views/Login.vue";
import Project from "../views/Projects.vue";
import SpecificProject from "../views/SpecificProject.vue";
import Settings from "../views/Settings.vue";
import Files from "../views/Files.vue";


//import { store } from "../store";

//const fbConfig = require('../firebaseConfig.js')


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Login",
    component: Login,
  },
  {
    path: "/project",
    name: "Project",
    component: Project,
    meta: {
      requiresAith: true
    }
  },
  {
    path: "/project/:projectId",
    name: "SpecificProject",
    component: SpecificProject,
    params: {id: ":projectId"},
      meta: {
        requiresAuth: true
    }
   },
  {
    path: "/files",
    name: "Files",
    component: Files,
    meta: {
      requiresAith: true
    }
  },
  {
    path: "/settings",
    name: "Setting",
    component: Settings,
    meta: {
      requiresAith: true
    }
  },

];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

router.beforeEach((to, from, next) => {
  const requiresAuth = to.matched.some(x => x.meta.requiresAuth)
  const currentUser = firebase.auth().currentUser
  if (requiresAuth && !currentUser) {
      next('/l')
  } else if (requiresAuth && currentUser) {
        next()
      
  } else if (to.name === "Login" && currentUser){

      next('/projects')
    
  } else {

      next()
    
  }
})

export default router;
