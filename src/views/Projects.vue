<template>
   <article class="wrapper">
       <div class="title">
            <h1>Projects</h1>
      </div>
      

      <section id="projects" v-if="projects != undefined" class="cardHolder">
          <div class="card neo-up" v-for="(project, index) of projects" :key="index">
              <h2>{{ project.projectName }}</h2>
          <button class="primary" @click='$router.push(`/project/${project.projectId}`)'>Open project</button>

          </div>
      </section>

      <section v-else>
          <h2>No projects to show</h2>
      </section>


   </article>
</template>

<script>

//import mainButton from '../components/Button';
const fb = require('../firebaseConfig.js');

//import {general} from '../assets/mixins/general';
   export default {
      name: 'Projects',
      components: {
         // mainButton
        },
      data() {
        return {

          }
      },
      computed: {
          projects: function() {
              let projects = this.$store.getters.getProjects
              if(projects.length > 0) {
                return projects
              } else {
                  return undefined
              }
          },
      },
      mounted: function() {
          this.init();
          this.getPermission();
          this.recieveNotification();
          this.checkProjectNumber();

      },
      updated: function() {
         this.checkProjectNumber();

      },
      methods: {
          init: function() {
              let projects = this.$store.getters.getProjects;
              if(projects.length == 0) {
                  fb.functions.initialFetch()
              }
          },

          updateToken: function(token) {
              //Making sure user is signed in

                  let uid = this.$store.getters.getUid;
   
                    const updateObj = {notificationToken: token};
                    //storing the messagin token on the user profile
                    setTimeout(() => {
                        fb.functions.setDocumentDataWithMerge('users', uid, updateObj);
                        console.log('timeout');
                    },2000) 


              
          },

          getPermission: function() {
              const self = this;
              //this asks the user to enable notifications
              fb.messaging.requestPermission()
              .then(function() {
                  console.log('Notification permission granted')
                  return fb.messaging.getToken()
              })
              .then(function(token){
                  self.updateToken(token)
                  console.log(token)
              }).catch(function(error) {
                  console.log('Error with notification: ', error)
              })
          },

        //if a notification arrives while the app is open
        //this function will fire
        //if closed the service worker takes care of it
          recieveNotification: function() {
              fb.messaging.onMessage(function(notification) {
                  console.log('new notification: ', notification)
              })
          },
          checkProjectNumber() {
              if(this.projects.length == 1 && this.projects != undefined) {
                  let projectId = this.projects[0].projectId
                  this.$router.push(`/project/${projectId}`)
              }
          }
          
        }


   }
</script>

<style lang="scss">
@import "../assets/css/variables.scss";

.projectPhase {
    margin: 2rem auto 3rem;
    .projectStep {
        width: 75%;
        margin: 1rem auto;
        .stepOptions {
            display: flex;
            justify-content: space-around;
            align-items: center;
            padding: .5rem;
            label {
                font-size: .75rem;
                display: block;
                margin: auto;
            }
            input {
                margin: 0 !important;
                background-color: transparent;
                color: $ctaColor;
            }
        }
    }

    .phaseButton {
        width: 100% !important;
    }
    .stepButton {
        width: 75%;
    }
}


</style>