<template>
  <div>
    <input type="text" v-model="userInput" name="user-input">
    <button
      id="send"
      class="p-4 bg-green"
      @click="send">
        Envoyer
    </button>
  </div>
</template>

<script>
import socket from '~/plugins/socketIo.js'

export default {
  data () {
    return {
      userInput: ''
    }
  },
  methods: {
    send() {
      console.log(this.userInput)
      console.log(socket)
      socket.emit('mouse', this.userInput)
    }
  }
}
</script>

<style>
#send {
  outline: none;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
}
</style>


