<template>
  <div id="tutorial" class="flex justify-around flex-col">
    <h2>Aidez les lutins à construire l'avion</h2>
    <div>
      <p>Choisissez votre atelier avec les flèches!</p>
      <img class="tuto-workshop" src="/images/tutorial/atelier.png">
    </div>
    <div>
      <p>Utilisez les outils demandés!</p>
      <div class="flex justify-around">
        <img class="tuto-tool" src="/images/bois/couper.png">
        <img class="tuto-tool" src="/images/helice/meuler.png">
        <img class="tuto-tool" src="/images/moteur/percer.png">
      </div>
    </div>
    <div>
      <button class="text-white border-2 border-white p-5"
        @click="$emit('click')">
          C'est parti!
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tutorial',
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {

  }
}
</script>

<style scoped>
#tutorial {
  position: absolute;
  z-index: 1000;
  background-color: rgb(100, 100, 100);
  top: 0;
  left: 0;
  right: 0;
  height: 90vh;
}
#tutorial div {
  text-align: center;
}
#tutorial p, #tutorial h2 {
  text-align: center;
  color: white;
  margin-bottom: 10px;
}
h2 {
  margin-top: 10px;
}
#tutorial button {
  /* z-index: 1001; */
}
.tuto-tool {
  height: 90px;
  width: 90px;
}
.tuto-workshop {
  width: 80%;
}
</style>
