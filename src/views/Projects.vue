<template>
   <article class="wrapper">
       <div class="title">
            <h1>Projects</h1>
      </div>
      

      <section id="projects" v-if="projects != undefined">
          <div class="card neo-up" v-for="(project, index) of projects" :key=index>
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
                return projects.sort()
              } else {
                  return undefined
              }
          },
      },
      mounted: {
          init: function() {
              if(this.projects.length == 0) {
                  fb.functions.initialFetch()
              }
          }
      },
      methods: {
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