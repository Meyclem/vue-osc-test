<template><div id="logger"></div></template>

<script>
import axios from 'axios'
export default {
  name: 'LogToLoomGame',
  props: {
    game: {
      type: String
    }
  },
  methods: {
    makeId () {
      var text = ""
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
      for (var i = 0; i < 20; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
      }
      return text
    }
  },
  mounted () {
    let gamer = JSON.parse(window.localStorage.getItem('loom-gamer'))
    if (!gamer) {
      const uid = this.makeId()
      window.localStorage.setItem('loom-gamer', JSON.stringify({ uid }))
      gamer = { uid }
      console.log('new gamer:', gamer)
    }
    console.log('gamer: ', gamer)
    console.log(navigator.userAgent)
    axios.post(`https://lgm.herokuapp.com/api/v1/sessions`, {
      game: this.game,
      gamer: gamer.uid,
      userAgent: navigator.userAgent
    })
  }
}
function makeid() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
</script>

<style scoped>
#logger { display: none; }
</style>
