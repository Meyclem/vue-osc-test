<template>
  <section>
    <p>time: {{ serverTime }}</p>
  </section>
</template>

<script>
import socket from '~/plugins/socketIo.js'

export default {
  data() {
    return {
      serverTime: '',
      biteTime: ''
    }
  },
  beforeMount() {
    socket.on('time', (data) => {
      this.serverTime = data
    })
  },
}
</script>

<style lang="css">
</style>
