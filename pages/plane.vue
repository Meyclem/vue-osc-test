<template>
  <div id="plane">
    <div id="machines">
      <div
        v-for="machine in machines"
        :key="machine.name"
        @click="selectedMachine = machine"
        class="machine-container"
        :class="machine == selectedMachine ? ' selected' : ''">
          {{ machine.name }}
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

export default {
  layout: 'default',
  name: 'Plane',
  data () {
    return {
      selectedMachine: null,
      machines: {
        bois: {
          name: 'bois',
          actions: ['Couper', 'Peindre', 'Poncer', 'Scier'],
        },
        helice: {
          name: 'helice',
          actions: ['Chauffer', 'Meuler', 'PeindreHelice', 'Plier'],
        },
        moteur: {
          name: 'moteur',
          actions: ['Percer', 'ScierMetaux', 'Souder', 'Visser'],
        }
      }
    }
  },
  methods: {
    action (tool) {
      console.log(tool)
      socket.emit('action', [this.selectedMachine.name, tool])
    }
  },
  mounted () {

  }
}
</script>

<style scoped>
#machines {
  display: flex;
  justify-content: center;
}
.machine-container {
  flex: 1 0 33.33333%;
  text-align: center;
  height: 150px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  border: 1px solid rgba(0, 0, 0, 0.4)
}
.selected {
  border: 4px solid green;
}
#tools {
}
.tool {
  width: 50%;
}
</style>
