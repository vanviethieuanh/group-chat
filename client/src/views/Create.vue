<template>
    <div class="create" v-bind:class="{ onPasscode: isEnteringPasscode }">
        <div class="passcode">
            <p>
                Enter passcode for the room.
            </p>
            <PincodeInput v-model="code" placeholder="" length="6" /><br />
            <a v-on:click="Next">{{
                code.length !== 6 ? 'Go ahead without a passcode' : 'Continue'
            }}</a>
        </div>
        <div class="nickname">
            <p>
                🐟 Your nickname ?
            </p>
            <div class="nickname-input">
                <button v-on:click="Back">
                    <v-icon>
                        mdi-chevron-left
                    </v-icon>
                </button>
                <form v-on:submit.prevent="CreateRoom">
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

export default {
    name: 'Home',
    components: {
        PincodeInput
    },
    data: function() {
        return {
            code: '',
            nickname: '',
            isEnteringPasscode: true
        }
    },
    watch: {
        code: {
            handler: function(val) {
                if (val.length === 6) this.Next()
            },
            deep: true
        }
    },
    methods: {
        Next: function() {
            this.isEnteringPasscode = false
        },
        Back: function() {
            this.isEnteringPasscode = true
        },
        CreateRoom: function() {
            this.$router.push({
                name: 'Room',
                params: {
                    passcode: this.code,
                    nickname: this.nickname,
                    isJoin: false
                }
            })
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