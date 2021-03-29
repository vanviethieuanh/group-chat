<template>
    <div class="select">
        <div class="no-room" v-if="rooms.length == 0">
            <h1>🚪 There is no room now</h1>
            <router-link to="/create">Create a room ?</router-link>
        </div>
        <v-list v-else flat>
            <v-subheader>ROOM</v-subheader>
            <v-list-item-group v-model="selectedRoomId" color="primary">
                <v-list-item
                    v-for="(room, i) in getRoomsAsItems"
                    :key="i"
                    v-on:click="JoinRoom(room.id)"
                >
                    <v-list-item-icon>
                        <v-icon v-text="room.icon"></v-icon>
                    </v-list-item-icon>
                    <v-list-item-content>
                        <v-list-item-title v-text="room.id"></v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list-item-group>
        </v-list>
    </div>
</template>

<script>
import router from '@/router'
export default {
    created() {
        this.$socket.removeAllListeners()

        this.$socket.emit('allRoom')
        this.$socket.on('allRoom', rooms => {
            this.rooms = rooms
        })
    },
    data: function() {
        return {
            rooms: [],
            selectedRoomId: ''
        }
    },
    computed: {
        getRoomsAsItems() {
            return this.rooms.map(room => {
                return {
                    id: room.id,
                    icon: room.isLock ? 'mdi-lock' : 'mdi-lock-open'
                }
            })
        }
    },
    methods: {
        JoinRoom(id) {
            router.push(`/join/${id}`)
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/variables.scss';

.select {
    height: 100vh;

    display: grid;
    align-items: center;
    justify-items: center;
    * {
        max-width: $max-width;
    }

    .no-room {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-items: center;

        h1 {
            color: $faded-text;
            margin: 10px;
        }

        a {
            text-decoration: none;
            color: $faded-text;
            font-weight: bold;

            opacity: 0.6;

            &:hover {
                opacity: 0.9;
            }
        }
    }
}
</style>