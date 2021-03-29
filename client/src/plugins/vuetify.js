import Vue from 'vue'
import Vuetify from 'vuetify/lib/framework'
import '@mdi/font/css/materialdesignicons.css' // Ensure you are using css-loader
import 'font-awesome/css/font-awesome.min.css'

Vue.use(Vuetify)

export default new Vuetify({
    icons: {
        iconfont: 'fa4' // default - only for display purposes
    }
})
