<template>
  <div class="login">
         <form @submit.prevent="login" id="loginForm">
            <img id="loginImage" src="../assets/img/archimood-logo.png" alt="Archimood">
            <p class="error neo-down" v-bind="error" v-show="error"> {{error}}</p>
            <input type="email" placeholder="Email" v-model="email" /><br>
            <input type="password" placeholder="Password" v-model="password" /><br>
            <mainButton :primaryButton='true' :onClick='login'>Login</mainButton>
         </form>
  </div>
</template>

<script>
// @ is an alias to /src
import mainButton from '@/components/Button'
//import { currentUser } from '../firebaseConfig';
//import firebaseConfig from '../assets/mixins/firebaseConfig'
const fb = require('../firebaseConfig.js')

export default {
  name: "Login",
  components: {
    mainButton
  },
   // mixins: [firebaseConfig],

  data(){
    return {
      email: '',
      password: '',
      error: '',
      loginUid: this.computedUid,
      loginUserObj: this.computedUserObj
    }
  },
  computed: {
    computedUid: function () {
      return this.$store.getters.getUid
    },
    computedUserObj: function() {
      return this.$store.getters.getCurrentUser
    }
  },
  mounted: function(){
    window.alert('Email: verakovacs@notreal.com, password: 123456 or create a user from admin page')
  },
  methods: {
    testFunction: function() {
      console.log('test works')
    },
    login: function() {

    fb.auth.signInWithEmailAndPassword(this.email, this.password).then(user => {
        //let currentUser = user.user;
        let loginUser = {};
        loginUser.uid = user.user.uid;
        loginUser.name = user.user.displayName;
        loginUser.phone = user.user.phoneNumber;
        loginUser.email = user.user.email
        console.log(loginUser);
        this.$store.dispatch('setCurrentUser', loginUser);
        this.$store.dispatch('patchUid', loginUser.uid);
        this.$store.dispatch('fetchUserProfile');
        this.$router.replace('project');
    })
    .then(function() {
        fb.functions.initialFetch()
            },

    )
    .catch(err => {
        this.error = err.message;
        console.log(err);
    })



      /*
      const self = this;
      this.errorMessage = '';
      
      self.$store.dispatch('setLoadingScreen', true)

      this.auth.signInWithEmailAndPassword(this.email, this.password)
            .then(user => {
              console.log(user.user);
              if(user) {
                 self.$_fetchUserData(user.user.uid)
                .then( (doc) => {
                  console.log('userData', doc.data())
                  self.$store.dispatch('fetchUser', doc.data())
                })
              } else {
                console.log('not logged in')
              }
            })
            .catch(error => {
              console.log('error signing in: ', error)
            })
        /* .then(user => {
            console.log(user.user.uid);
            self.$store.dispatch('patchUid', user.user.uid)
            //let isAdmin = userObj.isAdmin;
         })
         .then(() => {
           self.$_fetchUserData(self.computedUid)
         })
         .then(() => {
           console.log('whaaat??')
         })
         .then(() =>{
           let isAdmin = self.computedUserObj.isAdmin;
           let uid = self.computedUid;
           console.log('isAdmin', isAdmin);

           if(isAdmin && uid) {
             self.$store.dispatch('setIsAdmin', isAdmin);
             self.$store.dispatch('setAuth', true, self.computedUserObj);
           } else {
             console.log('No premission')
           }
         })
         .then(() => {
           if(self.$store.authenticated && self.$store.isAdmin) {
           self.$router.push('projects')
           }
           else {
             console.log('no permisson to login')
           }
         })
         .catch(err => {
           console.log(err.message);
           this.errorMessage = err.message
          //this.$emit('login-error', err.message)
         });*/
    },

  }
};
</script>
<style lang="scss">
  #loginForm {
    position:relative;
    width: 90%;
    max-width: 500px;
    margin: auto;
  }
  #loginImage {
      filter: invert(1);
      max-width: 100%;
      margin: auto;   
  }
  .error {
    color: red;
    font-weight: 600;
  }
</style>