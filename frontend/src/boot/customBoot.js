import { boot } from 'quasar/wrappers'
import VueChartkick from 'vue-chartkick'
import 'chartkick/chart.js'
import axios from 'axios'
import { reactive } from 'vue'
import wings from 'wings4'
const wings4 = wings('http://localhost:3030')

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app }) => {
  // something to do
  app.use(VueChartkick)
  app.config.globalProperties.$api = axios.create({
    baseURL: 'http://localhost:3030/'
  })
  app.config.globalProperties.$todosService = wings4.wingsService('todos')
  app.config.globalProperties.$wings4 = wings4

  app.config.globalProperties.$user = reactive({
    data: null,
    jwt: null
  })

  wings4.on('login', (user) => {
    console.log(user)
    app.config.globalProperties.$user.data = user.user
    app.config.globalProperties.$user.jwt = user.accessToken
  })

  wings4.on('logout', (user) => {
    console.log(user)
    app.config.globalProperties.$user.data = null
    app.config.globalProperties.$user.jwt = null
  })
  wings4.authenticate()
})
