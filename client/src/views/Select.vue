

<template>
    <div class="select">
        <v-list flat>
            <v-subheader>ROOM</v-subheader>
            <v-list-item-group v-model="selectedRoomId" color="primary">
                <v-list-item v-for="(room, i) in $store.state.rooms" :key="i">
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
import store from '@/store'
export default {
    created() {
        this.$socket.emit('allRoom')
        this.$socket.on('allRoom', function(rooms) {
            console.log(rooms)
            store.commit('addRooms', rooms)
        })
    },
    data: function() {
        return {
            selectedRoomId: ''
        }
    }
}
</script>
<style lang="scss" scoped>
@import '@/variables.scss';

.select {
    display: grid;
    height: 100vh;
    justify-items: center;
    * {
        max-width: $max-width;
    }
}
</style>