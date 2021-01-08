<template>
  <div>
    <button @click="changeComponent">click</button>
    testModule111
    <component :is="curr" />
  </div>
</template>

<script>
var ComponentA = { template: '<div>A</div>' }
var ComponentB = { template: '<div>B</div>' }
export default {
  data() {
    return {
      curr: 'ComponentA',
    }
  },
  components: { ComponentA, ComponentB },
  methods: {
    changeComponent() {
      this.curr = this.curr === 'ComponentA' ? 'ComponentB' : 'ComponentA'
    },
  },
}
</script>

<style scoped lang="stylus"></style>
