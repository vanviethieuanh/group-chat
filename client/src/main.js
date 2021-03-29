import { io } from 'socket.io-client'
import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import router from './router'

Vue.config.productionTip = false
Vue.prototype.$socket = io('localhost:5000')

new Vue({
    vuetify,
    router,
    render: h => h(App)
}).$mount('#app')
