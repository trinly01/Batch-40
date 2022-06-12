<template>
  <div>
    <q-toolbar class="bg-primary text-white">
      <q-btn flat round dense icon="menu" class="q-mr-sm" />
      <q-avatar>
        <img src="https://cdn.quasar.dev/logo-v2/svg/logo-mono-white.svg">
      </q-avatar>

      <q-toolbar-title>Batch 40 {{ data.newTodo }}</q-toolbar-title>

      <q-btn v-if="$user.data" :label="$user.data.displayName" dense icon="logout" @click="logout" />
      <q-btn v-else flat round dense icon="login" @click="login" />
    </q-toolbar>
    <q-input @keyup.enter="add" rounded standout v-model="data.newTodo" label="Rounded standout" />
    <q-list bordered separator>
      <q-item clickable @mouseleave="data.hovering = -1" @mouseover="data.hovering = ind" v-for="(todo, ind) in todos" :key="todo._id">
        <q-item-section avatar>
          <q-checkbox @click="updateIsDone(todo)" :modelValue="todo.isDone"></q-checkbox>
        </q-item-section>
        <q-item-section :style="{
          'text-decoration': todo.isDone ? 'line-through' : '',
          'color':  todo.isDone ? 'gray' : ''
        }">
          {{ ind }} {{ todo.label }}
        </q-item-section>
        <q-item-section side v-if="data.hovering === ind">
          <q-btn @click="remove(ind, todo)" round icon="delete" color="red" size="sm" />
        </q-item-section>
      </q-item>
    </q-list>
    <pie-chart :donut="true" :data="[['Active', todos.length - completed], ['Completed', completed]]"></pie-chart>
    <h1>{{ data.initialValue }}</h1>
    <sum-component v-model="data.initialValue" @hello="checkMessage" :num1="2" :num2="3" />
  </div>
</template>

<script setup>
import SumComponent from 'src/components/SumComponent.vue'
import { ref, reactive, computed, getCurrentInstance, onMounted } from 'vue'
const app = getCurrentInstance()
const { $api, $todosService, $user, $wings4 } = app.appContext.config.globalProperties

onMounted(async () => {
  // console.log('get data from backend', await $api.get('todos'))
  // const result = await $api.get('todos')
  // todos.value = result.data.data

  $todosService.on('dataChange', (tasks) => {
    console.log(tasks)
    todos.value = [...tasks]
  })

  $todosService.init()
})

const data = reactive({
  initialValue: 0,
  hovering: -1,
  newTodo: ''
})

const updateIsDone = async (todo) => {
  await $api.patch(`todos/${todo._id}`, {
    isDone: !todo.isDone
  })
  todo.isDone = !todo.isDone
}

const checkMessage = (msg) => {
  console.log('pogi', msg)
}

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

const completed = computed(() => todos.value.filter(t => t.isDone).length)

const add = async function () {
  // await $api.post('todos', {
  //   label: data.newTodo,
  //   isDone: false
  // })
  await $todosService.create({
    label: data.newTodo,
    isDone: false
  })
  // todos.value.unshift(result.data)
  // todos.value.unshift({
  //   _id: Date.now(),
  //   label: data.newTodo,
  //   isDone: false
  // })
  data.newTodo = ''
}

async function remove (i, todo) {
  await $api.delete(`todos/${todo._id}`)
  todos.value.splice(i, 1)
}

const login = async () => {
  await $wings4.authenticate({
    email: 'timi.pogi@email.com',
    password: 'timi.pogi@email.com',
    strategy: 'local'
  })
}

const logout = async () => {
  await $wings4.logout()
}

</script>
