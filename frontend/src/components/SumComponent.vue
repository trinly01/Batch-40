<template>
  <div>
    {{ num1 }} + {{ num2 }} {{ data.val<1 ? '-' : '+' }} {{ Math.abs(data.val) }} = {{ answer }}
    <button @click="data.val++">increase</button>
    <button @click="data.val--">decrease</button>
    <!-- <q-input v-model="data.message" /> -->
    <button @click="$emit('hello', answer)">Emit check console</button>
  </div>
</template>

<script setup>
import { computed, reactive } from 'vue'

const $emit = defineEmits(['hello', 'update:modelValue'])

const data = reactive({
  message: '',
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
  let answer = ''
  $emit('update:modelValue', answer = props.num1 + props.num2 + data.val)
  return answer
})

</script>
