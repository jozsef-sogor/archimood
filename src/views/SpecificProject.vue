<template>
    <article class="wrapper">
        
          <div class="title">
              <Back></Back>
              <h1 v-if="selectedProject" class="specificClientName">Project {{selectedProject.projectName}}</h1>
          </div>

      <section v-if="!selectedProject">
          <h1>This project doesn't exist.</h1>
          <p>Maybe it got deleted.</p>
          <p>todo: put in go back button</p>
      </section>


      <section v-else>

        <div id="progressBar"></div>


        <div class="projectView">
            <div v-for="(phase, phaseIndex) of selectedProject.projectPhases" :key="phaseIndex" :class="phase.isDone ? 'neo-up bubble projectPhase' : 'neo-down bubble projectPhase'">
                    <div class="phaseHeader" :class="phase.isDone ? 'neo-up bubble pheaseHeader' : 'neo-down bubble phaseHeader'">
                        <h3 class="phaseName bubble">{{phase.phaseName}}</h3>
                        <p class="phasePrice bubble"> {{phase.phasePrice}}HUF </p>
                    </div>

                    <p v-for="(step, index) of phase.steps" :key="index" :class="step.isDone ? 'neo-up bubble projectStep' : 'neo-down bubble projectStep'">
                        {{step.stepName}}
                    </p>

             </div>
        </div>

      </section>
  </article>
</template>

<script>
import Back from '../components/back';
//import MainButton from '../components/Button';
export default {
    components: {
        Back, 
        //MainButton
    },
    data() {
        return {

        }
    },

    computed: {
        currentProjectId: function() {
            return this.$route.params.projectId
        },
        selectedProject: function() {
            let allProjects = this.$store.getters.getProjects;
            return allProjects.find(project => project.projectId == this.currentProjectId)
        },

    },
    methods: {

}
}
</script>

<style lang="scss">
@import "../assets/css/variables.scss";

.projectView {
    max-width: 700px;
    text-align: center;
    .projectPhase {
        margin: 2rem auto 3rem;
        .projectPrice {
            width: 64%;
        }
        .projectStep {
            width: 75%;
            margin: 1rem auto;
        }
        .phaseHeader {  
            box-shadow: none;
            .phaseName {
                padding-bottom: 0;
            }
            .phasePrice {
                padding-top: 0;
            }
        }
    }
}

  @media screen and (min-width: 1024px) {
      .projectView{
        max-width: 1080px;
        .projectPhase {
            position: relative;
            margin-left: 150px !important;
            .phaseHeader {
            float: left;
            transform: rotate(-90deg) translateY(-50%);
            //width: 100%;
            min-height: 60px;
            padding: 0 1rem !important;
            margin-left: -110px;
        }
        }
      }
  }
</style>