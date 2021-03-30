import { io } from 'socket.io-client'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

const SERVER_URL = process.env.NODE_ENV == 'production' ? '/' : 'localhost:5000'

Vue.config.productionTip = false
Vue.prototype.$socket = io(SERVER_URL)

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')
