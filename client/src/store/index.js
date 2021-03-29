import Vue from 'vue'
import Vuex from 'vuex'
// import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

function initialState() {
    return {
        roomId: null,
        rooms: []
    }
}

export default new Vuex.Store({
    state: initialState,
    mutations: {
        addMessage(state, payload) {
            state.messages.push(payload)
        },
        changeRoomId(state, payload) {
            state.roomId = payload.id
        },
        addRooms(state, payload) {
            state.rooms = payload
        },
        resetState(state) {
            // Merge rather than replace so we don't lose observers
            // https://github.com/vuejs/vuex/issues/1118
            Object.assign(state, initialState())
        }
    },
    actions: {},
    modules: {},
    getters: {
        getRoomsAsItems: state => {
            return state.rooms.map(r => {
                return {
                    id: r.id,
                    icon: r.isLock ? 'mdi-lock' : 'mdi-lock-open'
                }
            })
        },
        isRoomLock: state => roomId => {
            return state.rooms.find(r => r.id == roomId).isLock
        }
    }
    // plugins: [createPersistedState()]
})
