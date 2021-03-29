<template>
    <div class="room">
        <div id="messages">
            <ul>
                <li
                    v-for="item in $store.state.messages"
                    v-bind:class="{ me: item.user === undefined }"
                    :key="item.id"
                >
                    <div v-if="item.user != undefined" class="user">
                        {{ item.user }}
                    </div>
                    <div class="message">
                        {{ item.message }}
                    </div>
                </li>
            </ul>
        </div>
        <form class="chat-bar" id="form-message" v-on:submit.prevent="Send">
            <v-btn icon color="grey" v-on:click="copyRoomURL">
                <v-icon>mdi-link</v-icon>
            </v-btn>
            <input
                id="message"
                autocomplete="off"
                type="text"
                placeholder="Enter message ..."
            />

            <v-btn icon color="grey" type="submit" form="form-message">
                <v-icon>mdi-send</v-icon>
            </v-btn>
        </form>
    </div>
</template>

<script>
import store from '@/store'
import router from '@/router'

export default {
    created() {
        if (!store.state.roomId) router.push('/')

        this.$socket.removeAllListeners()
        this.$socket.on('message', function(message) {
            store.commit('addMessage', message)
        })
    },
    updated() {
        var container = this.$el.querySelector('#messages')
        container.scrollTop = container.scrollHeight
    },

    data: function() {
        return {}
    },
    beforeRouteLeave(to, from, next) {
        this.$socket.emit('leave-room')
        next()
    },

    methods: {
        Send: function() {
            var message = this.$el.querySelector('#message').value
            if (!message) return

            this.$el.querySelector('#message').value = ''

            this.$socket.emit('message', message)

            store.commit('addMessage', {
                user: undefined,
                message: message
            })
        },
        copyRoomURL: function() {
            var input = document.body.appendChild(
                document.createElement('input')
            )
            input.value = `${window.location.host}/join/${store.state.roomId}`
            input.focus()
            input.select()
            document.execCommand('copy')
            input.parentNode.removeChild(input)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '@/variables.scss';

.v-text-field {
    height: 36px;
}

.room {
    background: white;

    display: flex;
    flex-direction: column;
    align-items: center;

    height: 100vh;

    #messages {
        overflow-y: visible;
        overflow-x: hidden;

        margin-bottom: $chat-bar-height + 2 * $chat-bar-margin;

        width: 100%;
        max-width: 400px;

        ul {
            padding-left: 0;
            list-style: none;
        }
        li {
            border-radius: 20px;

            width: fit-content;

            display: flex;
            flex-direction: column;

            clear: both;
            text-align: left;

            .user {
                font-size: $tiny-text;
                opacity: 0.5;
                padding: $bubble-space;
            }

            .message {
                font-size: $small-text;
                line-height: $small-text + 2px;

                padding: $bubble-padding;
                border-radius: $bubble-border-radius;
            }

            &:not(.me) {
                float: left;
                margin-right: $bubble-space-from-op;

                .message {
                    background: $dim;
                    border-bottom-left-radius: $input-border-radius;
                }
                & + .me {
                    margin-top: $bubble-space;
                }
            }

            &.me {
                float: right;
                margin-left: $bubble-space-from-op;
                margin-right: 5px;

                .message {
                    border-bottom-right-radius: $input-border-radius;
                    background: $main-color;
                    color: white;
                }

                & + .me {
                    margin-top: $bubble-space;
                }
                & + :not(.me) {
                    margin-top: $bubble-space;
                }
            }
        }
    }

    .chat-bar {
        display: flex;

        position: absolute;
        bottom: $chat-bar-margin;

        width: 100%;
        max-width: 400px;

        input {
            background: $dim;
            outline: none;

            width: 100%;
            height: $chat-bar-height;

            border-radius: 36px;
            padding: 0 16px;
        }
    }

    /* width */
    ::-webkit-scrollbar {
        width: 5px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: transparent;
    }

    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: rgba($color: #000000, $alpha: 0.1);
        border-radius: 20px;
    }

    /* Handle on hover */
    ::-webkit-scrollbar-thumb:hover {
        background: rgba($color: #000000, $alpha: 0.2);
    }
}
</style>