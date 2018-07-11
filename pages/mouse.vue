<template>
  <div class="relative w-full h-screen">
        <div class="pad absolute pin" @touchmove="movePoint()">
          <p class="text-green">x: {{ clientX }}</p>
          <p class="text-green">y: {{ clientY }}</p>
          <div class="point"
          :style="'top: ' + (clientY - 10) + 'px; left: ' + (clientX - 10) + 'px;'">
          </div>
        </div>
      </div>
</template>

<script>
import socket from '~/plugins/socketIo.js'

export default {
  data() {
    return {
      clientX: 0,
      clientY: 0,
      text: ''
    }
  },
  methods: {
    movePoint() {
      this.clientX = Math.floor(event.touches[0].clientX);
      this.clientY = Math.floor(event.touches[0].clientY);
      // Each event throw an event in local but not in prod
      socket.emit('mouse', this.sendMouseCoords())
    },
    sendMouseCoords() {
      const text = `x: ${this.clientX} || y: ${this.clientY}`
      console.log(text)
      return text
    }
  },
  mounted() {
  }
}
</script>

<style scoped>
.pad {
  background-color: black;
  overflow: hidden;
  touch-action: none;
}
.point {
  position: absolute;
  border-radius: 50%;
  height: 20px;
  width: 20px;
  background-color: white;
}
</style>
