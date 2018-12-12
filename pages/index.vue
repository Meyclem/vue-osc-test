<template>
  <div id="plane" @click.right.prevent>
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
      <div
        @click="action(tool)"
        v-for="tool in selectedMachine.actions"
        :key="tool"
        class="tool"
        :id="tool">
        <img
          :src="`/images/${selectedMachine.name}/${tool}.png`"
          class="tool">
      </div>
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
          title: 'Elaboration du moteur',
          name: 'moteur',
          actions: ['percer', 'sciermetaux', 'souder', 'visser'],
        },
        {
          title: 'Fabrication de l\'hélice',
          name: 'helice',
          actions: ['chauffer', 'meuler', 'peindrehelice', 'plier'],
        },
        {
          title: 'Travail du bois',
          name: 'bois',
          actions: ['couper', 'peindrebois', 'poncer', 'scierbois'],
        },
      ],
      actions: {
        meuler: true,
        chauffer: true,
        peindrehelice: true,
        plier: true,
        percer: true,
        sciermetaux: true,
        souder: true,
        visser: true,
        couper: true,
        peindrebois: true,
        poncer: true,
        scierbois: true,
      }
    }
  },
  methods: {
    action (tool) {
      if (this.actions[tool]) {
        this.actions[tool] = false
        event.stopPropagation()
        console.log(tool)
        socket.emit('action', [this.selectedMachine.name, tool])
        navigator.vibrate(200)
        const cd = `<div class="cooldown"><svg><circle r="50" cx="75" cy="75"></circle></svg></div>`
        event.target.parentNode.innerHTML += cd
        setTimeout(() => {
          const el = document.getElementById(tool)
          if (el) { el.querySelector('.cooldown').remove() }
          this.actions[tool] = true
        }, 2000)
      } else {
        event.preventDefault()
      }
    },
    nextMachine () {
      const index = this.machines.indexOf(this.selectedMachine)
      this.selectedMachine = this.machines[index + 1]
      navigator.vibrate(500)
    },
    previousMachine () {
      const index = this.machines.indexOf(this.selectedMachine)
      this.selectedMachine = this.machines[index - 1]
      navigator.vibrate([50, 50])
    }
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
  height: 90vh;
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  overflow: hidden;
}
#workshop > img {
  /* width: auto; */
  /* height: 200px; */
  /* height: 100%; */
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
  width: 100%;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.tool {
  position: relative;
}
.tool img {
  width: 150px;
  height: 150px;
  opacity: 1;
  transform: scale(1);
  transition: opacity ease 0.5s;
  transition: transform ease 0.5s;
}
.tool:active img {
  opacity: 0.7;
  transform: scale(0.9);
}

.tool svg {
  background-color: #4C4C4C;
  opacity: 0.7;
  position: absolute;
  z-index: 10;
  pointer-events: none;
  top: 0;
  right: 0;
  width: 150px;
  height: 150px;
  transform: rotateY(-180deg) rotateZ(-90deg);
}

svg circle {
  stroke-dasharray: 314px;
  stroke-dashoffset: 0px;
  /* stroke-dashoffset: 314px; */
  stroke-linecap: round;
  stroke-width: 10px;
  stroke: white;
  fill: none;
  animation: countdown 2s linear infinite forwards;
}

@keyframes countdown {
  from {
    stroke-dashoffset: 0px;
  }
  to {
    stroke-dashoffset: 314px;
  }
}
</style>
