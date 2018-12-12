<template>
  <div id="plane">
    <div id="machines">
      <div
        v-for="machine in machines"
        v-if="machine == selectedMachine"
        :key="machine.name"
        @click="selectedMachine = machine"
        class="machine-container"
        :id="machine.name"
        >
          <h1>
            {{ machine.title }}
          </h1>
      </div>
    </div>
    <div id="workshop"
      v-if="selectedMachine">
      <img :src="`/images/ateliers/${selectedMachine.name}.png`" alt="">
      <div
        v-if="selectedMachine != machines[0]"
        class="previous-workshop"
        @click="previousMachine()">
          <img src="/images/arrow.svg" alt="">
      </div>
      <div
        v-if="selectedMachine != machines[2]"
        class="next-workshop"
        @click="nextMachine()">
          <img src="/images/arrow.svg" alt="">
      </div>
    </div>
    <div id="tools" v-if="selectedMachine">
      <img
        v-for="tool in selectedMachine.actions"
        :key="tool"
        :src="`/images/${selectedMachine.name}/${tool}.png`"
        @click="action(tool)"
        class="tool">
    </div>
  </div>
</template>

<script>
import socket from '~/plugins/socketIo.js'
import { setTimeout } from 'timers';

export default {
  layout: 'default',
  name: 'Plane',
  data () {
    return {
      selectedMachine: null,
      machines: [
        {
          title: 'Travail du bois',
          name: 'bois',
          actions: ['couper', 'peindrebois', 'poncer', 'scierbois'],
        },
        {
          title: 'Fabrication de l\'hélice',
          name: 'helice',
          actions: ['chauffer', 'meuler', 'peindrehelice', 'plier'],
        },
        {
          title: 'Elaboration du moteur',
          name: 'moteur',
          actions: ['percer', 'sciermetaux', 'souder', 'visser'],
        }
      ]
    }
  },
  methods: {
    action (tool) {
      console.log(tool)
      socket.emit('action', [this.selectedMachine.name, tool])
      navigator.vibrate(200)
    },
    nextMachine () {
      const index = this.machines.indexOf(this.selectedMachine)
      this.selectedMachine = this.machines[index + 1]
      navigator.vibrate(500)
    },
    previousMachine () {
      const index = this.machines.indexOf(this.selectedMachine)
      this.selectedMachine = this.machines[index - 1]
      navigator.vibrate(500)
    },
    // flash (id) {
    //   document.getElementById(id).classList.add('flash')
    //   setTimeout(() => {
    //     document.getElementById(id).classList.add('flash')
    //   }, 800)
    // }
  },
  mounted () {
    this.selectedMachine = this.machines[1]
  }
}
</script>

<style>
body {
  background-color: rgba(0, 0, 0, 0.7) !important;
}
#plane {
  height: 100vh;
  max-height: 800px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  max-width: 500px;
  margin: auto;
}
@screen md {
  #plane {
    padding-top: 10%;
  }
}
#machines {
  display: flex;
  justify-content: center;
}
#machines h1 {
  font-family: 'SansBeamBody';
  font-size: 1.2em;
  color: white;
}
.machine-container {
  flex: 1 0 100%;
  text-align: center;
  height: 50px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  /* border: 1px solid rgba(0, 0, 0, 0.4) */
}
.selected {
  border: 4px solid green;
}
#workshop {
  height: 200px;
  background-color: white;
  width: 100%;
  position: relative;
}
#workshop > img {
  width: 100%;
}
.previous-workshop {
  left: 0;
  padding-top: 10px;
  background-color: white;
  border: 1px solid black;
  border-top-right-radius: 20px;
  border-bottom-right-radius: 20px;
  border-left: none;
  top: 65px;
  height: 70px;
  position: absolute;
}
.previous-workshop img {
  height: 50px;
  transform: rotate(180deg);
}
.next-workshop {
  right: 0px;
  padding-top: 10px;
  background-color: white;
  border: 1px solid black;
  border-top-left-radius: 20px;
  border-bottom-left-radius: 20px;
  border-right: none;
  top: 65px;
  height: 70px;
  position: absolute;
}
.next-workshop img {
  height: 50px;
}
#tools {
  width: 80%;
  margin: 0 auto;
}
.tool {
  width: 50%;
}
</style>
