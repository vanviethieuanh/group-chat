import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home.vue'
import Create from '@/views/Create.vue'
import Join from '@/views/Join.vue'
import NotFound from '@/views/NotFound.vue'
import Room from '@/views/Room.vue'
import Select from '@/views/Select.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/room',
        name: 'Room',
        component: Room,
        params: true
    },
    {
        path: '/select',
        name: 'Select',
        component: Select
    },
    {
        path: '/create',
        name: 'Create',
        component: Create
    },
    {
        path: '/join/:id',
        name: 'Join',
        component: Join,
        props: true
    },
    {
        path: '*',
        name: 'NotFound',
        component: NotFound
    },
    {
        path: '/about',
        name: 'About',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () =>
            import(/* webpackChunkName: "about" */ '../views/About.vue')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router
