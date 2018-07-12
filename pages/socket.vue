<template>
  <section>
    <p>mouse: {{ serverTime }}</p>
  </section>
</template>

<script>
import socket from '~/plugins/socketIo.js'

export default {
  data() {
    return {
      // this get time from the server ('time' event)
      serverTime: '',
    }
  },
  beforeMount() {
    socket.on('time', (data) => {
      this.serverTime = data
    })
    socket.on('dist', (data) => {
      this.serverTime = data
    })
  },
}
</script>

<style lang="css">
</style>
