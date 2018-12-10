<template>
  <div>
    <Test />
    <button class="bg-blue text-white p-2" @click="change()">clic</button>
    <div v-if="bool" class="absolute pin bg-grey opacity-75 text-center flex flex-col justify-center">
      <div class="mx-auto">
        <p>clique ici</p>
        <button class="bg-blue text-white p-2" @click="change()">clic</button>
      </div>
    </div>
    <!-- <input type="text" v-model="name" class="border-2 border-black">
    <p> {{ name }} </p>
    <ul>
      <li v-for="name in names" :key="name">{{ name }}</li>
    </ul> -->

  </div>
</template>

<script>
import Test from '@/components/test.vue'
export default {
  data () {
    return {
      name: '',
      bool: false,
      names: [
        'Felix',
        'Henry'
      ]
    }
  },
  components: {
    Test
  },
  methods: {
    change () {
      this.bool = !this.bool
    }
  }
}
</script>
