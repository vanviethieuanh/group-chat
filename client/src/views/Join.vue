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
            <p v-if="!errorLog">
                🐟 Your nickname ?
            </p>
            <p class="error-log" v-else>
                😭 Nick name has been used!
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
import PincodeInput from 'vue-pincode-input'
import router from '@/router'

export default {
    name: 'Home',
    components: {
        PincodeInput
    },
    created() {
        this.$socket.removeAllListeners()

        this.$socket.emit('is-lock', this.id)

        this.$socket.on('is-lock', result => {
            if (result == null) {
                router.push('/room-not-found')
            }
            this.isEnteringPasscode = result
        })
        this.$socket.on('join-room-success', () => {
            router.push({
                name: 'Room',
                params: { id: this.id }
            })
        })
        this.$socket.on('join-room-error', err => {
            if (err == 'Wrong passcode!') {
                this.wasWrongPasscode = true
                this.isEnteringPasscode = true
                this.code = ''
                return
            }

            this.errorLog = err
            this.isEnteringPasscode = false
        })
    },
    props: ['id'],
    data: function() {
        return {
            code: '',
            nickname: '',
            wasWrongPasscode: false,
            isEnteringPasscode: true,
            errorLog: null
        }
    },
    watch: {
        code(val) {
            if (val.length === 4) this.isEnteringPasscode = false
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
            padding: 0px;
            color: $faded-text;

            &.error-log {
                color: tomato;
            }
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
