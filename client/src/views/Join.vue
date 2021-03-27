<template>
    <div class="create" v-bind:class="{ onPasscode: isEnteringPasscode }">
        <div class="passcode">
            <p>
                {{
                    wasWrongPasscode
                        ? 'Wrong passcode!'
                        : 'Enter passcode for the room.'
                }}
            </p>
            <PincodeInput v-model="code" placeholder="" /><br />
        </div>
        <div class="nickname">
            <p>
                🐟 Your nickname ?
            </p>
            <div class="nickname-input">
                <form v-on:submit.prevent="Join">
                    <input
                        v-model="nickname"
                        type="text"
                        placeholder="Nick name required"
                    />
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import store from '@/store'
import PincodeInput from 'vue-pincode-input'
import router from '@/router'

export default {
    name: 'Home',
    components: {
        PincodeInput
    },
    created() {
        this.$socket.emit('allRoom')
        this.$socket.on('allRoom', function(rooms) {
            store.commit('addRooms', rooms)
        })
        this.$socket.on('join-room-success', function() {
            store.state.roomId = this.id
            router.push('/room')
        })
        this.$socket.on('join-room-error', function(err) {
            console.error(err)
        })
    },
    props: ['id'],
    data: function() {
        return {
            code: '',
            nickname: '',
            wasWrongPasscode: false,
            isEnteringPasscode: store.getters.isRoomLock(this.id)
        }
    },
    watch: {
        code: {
            handler: function(val) {
                if (val.length === 4) this.isEnteringPasscode = false
            },
            deep: true
        }
    },
    methods: {
        Join: function() {
            this.$socket.emit('join-room', this.id, this.code, this.nickname)
        }
    }
}
</script>
<style lang="scss">
@import '@/variables.scss';

.create {
    display: grid;
    grid-template-columns: 1fr 1fr;

    justify-content: center;
    align-items: center;

    background: $main-color;
    height: 100vh;
    width: 200vw;

    transition: $medium-transition;

    a {
        cursor: pointer;
    }

    &:not(.onPasscode) {
        transform: translateX(-50%);
    }
    .passcode {
        p {
            color: white;
            font-size: 20px;
        }
        a {
            font-size: 14px;
            color: white;
        }

        div.vue-pincode-input-wrapper {
            padding: 20px;
            // any styles you want for wrapper
            input.vue-pincode-input {
                background: white;
                box-shadow: none;

                font-size: 18px;
                line-height: $passcode-size;
                height: $passcode-size;
                width: $passcode-size;
            }
        }
    }

    .nickname {
        background: white;
        height: 100vh;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        p {
            padding: 20px;
            color: $faded-text;
        }

        input {
            background: $dim;
            border-radius: $input-border-radius;
            height: $passcode-size;

            outline: none;

            color: $faded-text;
            text-align: center;
            font-size: $medium-text;

            margin-left: 7px;
        }

        .nickname-input {
            display: flex;
        }
    }
}
</style>