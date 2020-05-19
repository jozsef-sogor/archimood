import Vue from 'vue'
import Vuex from 'vuex'
import router from './router'
//import createPersistedState from "vuex-persistedstate";


const fb = require('./firebaseConfig.js')


Vue.use(Vuex, router)
   

export const store = new Vuex.Store({
    state: {
        authenticated: false,
        uid: undefined,
        currentUser: {},

        projects: [],

        smallLoader: false,
        loadingScreen: false
    },
    //plugins: [createPersistedState()],
    getters: {
        getUid(state) {
            return state.uid
        },
        getCurrentUser(state) {
            return state.currentUser
        },
        getAuthenticated(state) {
            return state.authenticated
        },
        getProjects(state) {
            return state.projects
        },
    },

    mutations: {
        SET_AUTHENTICATED(state, boolean) {
            state.authenticated = boolean
          },
        SET_CURRENT_USER(state, user) {
            state.currentUser = user
        },
        SET_UID(state, data) {
            state.uid = data
        },
        SET_SMALL_LOADER(state, boolean) {
            state.smallLoader = boolean
        },
        SET_LOADING_SCREEN(state, boolean) {
            state.loadingScreen = boolean
        },
        SET_PROJECTS(state, projectsArray) {
            state.projects = projectsArray
        },
    },
    actions: {
        setAuth(context, authBoolean, userObj) {
            context.commit('SET_AUTHENTICATED', authBoolean);
            context.commit('SET_CURRENT_USER', userObj);
            //context.commit('SET_IS_ADMIN', adminBoolean);
            context.commit('SET_LOADING_SCREEN', false);

        },
            fetchUserProfile({ commit, state }) {
                if(state.currentUser != null) {
                fb.usersCollection.doc(state.uid).get().then(res => {
                    commit('SET_CURRENT_USER', res.data());
                    if(state.currentUser) {
                        commit('SET_AUTHENTICATED', true)
                    }
                })
                .catch(err => {
                    console.log(err)
                })
            } else {
                commit('SET_CURRENT_USER', {});
            }
            },


        fetchUser({ commit }, user) {
            //const self = this;
            if (user) {
              commit("SET_AUTHENTICATED", user !== null);
              commit("SET_CURRENT_USER", {
                user
              });
              //router.replace('projects')

            } else {
              commit("SET_CURRENT_USER", null);
              console.log('no permission')
            }
          },
        setProjects (context, projects) {
            context.commit('SET_PROJECTS', projects)
        },
        patchUid(context, data) {
            context.commit('SET_UID', data)
        },
        setCurrentUser(context, data) {
            context.commit('SET_CURRENT_USER', data)
        },
        setLoadingScreen(context, boolean) {
            context.commit('SET_LOADING_SCREEN', boolean);
        },
        setClientSuccess (context, boolean) {
            context.commit('SET_CLIENT_SUCCESS', boolean)
        },
    }

})

export default store
