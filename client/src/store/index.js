import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        messages: [],
        roomId: null,
        rooms: []
    },
    mutations: {
        addMessage(state, payload) {
            state.messages.push(payload)
        },
        changeRoomId(state, payload) {
            state.roomId = payload.id
        },
        addRooms(state, payload) {
            state.rooms = payload
        }
    },
    actions: {},
    modules: {}
})
