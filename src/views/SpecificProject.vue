<template>
    <article class="wrapper">
        
          <div class="title">
              <Back v-if="numberOfProjects > 1"></Back>
              <h1 v-if="selectedProject" class="specificClientName">Project {{selectedProject.projectName}}</h1>
          </div>

      <section v-if="!selectedProject">
          <h1>This project doesn't exist.</h1>
          <p>Maybe it got deleted.</p>
          <p>todo: put in go back button</p>
      </section>


      <section v-else>

        <progressBar :showSteps="true" :maxValue="stepsObject.total" :progress="stepsObject.done"></progressBar>


        <div class="projectView">
            <transition-group name="list-complete" tag="div">

            <div v-for="phase of selectedProject.projectPhases" :key="phase.id" :class="phase.isDone ? 'neo-up bubble projectPhase' : 'neo-down bubble projectPhase'" class="list-complete-item">
                    <div class="phaseHeader" :class="phase.isDone ? 'neo-up bubble pheaseHeader' : 'neo-down bubble phaseHeader'">
                        <h3 class="phaseName bubble">{{phase.phaseName}}</h3>
                        <p class="phasePrice bubble"> {{phase.phasePrice}}HUF </p>
                    </div>

                    <transition-group name="list-complete" tag="div">

                    <div v-for="step of phase.steps" :key="step.id" :class="step.isDone ? 'neo-up bubble projectStep' : 'neo-down bubble projectStep'" class="list-complete-item">
                        <p> {{step.stepName}}</p>
                        <div  class="imageContainer" v-for="file of step.files" :key="file.downloadUrl">
                            <div  class="downloadImageContainer">
                                <embed class="imageContainerItem" :src="file.downloadUrl" :type="file.type">
                                <a v-if="step.isDownloadable" class="primary" :href="file.downloadUrl" download target="_blank">Download</a>
                            </div>
                        </div>
                    </div>
                    </transition-group>

             </div>
            </transition-group>
        </div>

      </section>
  </article>
</template>

<script>
import Back from '../components/back';
import progressBar from '../components/progressBar';
//import MainButton from '../components/Button';
export default {
    components: {
        Back, 
        progressBar
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
        numberOfProjects: function() {
            let allProjects = this.$store.getters.getProjects;
            return allProjects.length
        },
        stepsObject: function() {
            let stepsObject = {
                total: 0,
                done: 0
            };

           for(let phase of this.selectedProject.projectPhases) {
               for (let step of phase.steps) {
                   stepsObject.total++;

                   if(step.isDone) {
                       stepsObject.done++
                   }
               }
           }
           return stepsObject
        }

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
            position: relative;
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

.imageContainer {
    width: 100%;
    overflow-x: auto;
    .imageContainerItem {
        max-width: 100%;
    }

}

.list-complete-item {
  transition: all 1s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  margin-right: 10px;
}
.list-complete-enter, .list-complete-leave-to
/* .list-complete-leave-active below version 2.1.8 */ {
  opacity: 0;
  transform: translateY(30px);
}
.list-complete-leave-active {
  position: absolute;
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