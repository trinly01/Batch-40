<template>
  <div>
    {{ num1 }} + {{ num2 }} {{ data.val<1 ? '-' : '+' }} {{ Math.abs(data.val) }} = {{ answer }}
    <button @click="data.val++">increase</button>
    <button @click="data.val--">decrease</button>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'

const data = reactive({
  val: 0
})

const props = defineProps({
  num1: {
    type: Number,
    default: 0
  },
  num2: {
    type: Number,
    default: 0
  }
})

const answer = computed(() => {
  return props.num1 + props.num2 + data.val
})

</script>
