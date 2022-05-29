<template>
  <div>
    <q-toolbar class="bg-primary text-white">
      <q-btn flat round dense icon="menu" class="q-mr-sm" />
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar>

      <q-toolbar-title>Batch 40 {{ data.newTodo }}</q-toolbar-title>

      <q-btn flat round dense icon="whatshot" />
    </q-toolbar>
    <q-input @keyup.enter="add" rounded standout v-model="data.newTodo" label="Rounded standout" />
    <q-list bordered separator>
      <q-item clickable v-for="(todo, ind) in todos" :key="todo._id">
        <q-item-section avatar>
          <q-checkbox v-model="todo.isDone"></q-checkbox>
        </q-item-section>
        <q-item-section>
          {{ ind }} {{ todo.label }}
        </q-item-section>
        <q-item-section side>
          <q-btn @click="remove(ind)" round icon="delete" color="red" size="sm" />
        </q-item-section>
      </q-item>
    </q-list>
    <sum-component :num1="2" :num2="3" />
  </div>
</template>

<script setup>
import SumComponent from 'src/components/SumComponent.vue'
import { ref, reactive } from 'vue'

const data = reactive({
  newTodo: ''
})

// const newTodo = ref('')
const todos = ref([
  {
    _id: 1,
    label: 'Hello',
    isDone: false
  },
  {
    _id: 2,
    label: 'Hi crush!',
    isDone: false
  }
])

const add = function () {
  todos.value.unshift({
    _id: Date.now(),
    label: data.newTodo,
    isDone: false
  })
  data.newTodo = ''
}

function remove (i) {
  todos.value.splice(i, 1)
}

</script>
