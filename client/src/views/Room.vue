<template>
    <div class="room">
        <div class="text-center">
            <v-dialog width="500">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon color="grey" v-on="on" v-bind="attrs">
                        <v-icon small>fa4 fa-info</v-icon>
                    </v-btn>
                </template>

                <v-card>
                    <v-card-text>
                        <div
                            class="text--primary text-left text-subtitle-1 pt-6"
                        >
                            👋 Hi! This is a real-time group chat application
                            implemented using Node.js + Socket.IO and + VueJS.
                        </div>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn color="blue" @click="show = !show" text>
                            function
                        </v-btn>

                        <v-btn icon @click="show = !show">
                            <v-icon x-small>{{
                                show
                                    ? 'fa4 fa-chevron-up'
                                    : 'fa4 fa-chevron-down'
                            }}</v-icon>
                        </v-btn>
                    </v-card-actions>
                    <v-expand-transition>
                        <div v-show="show">
                            <v-divider></v-divider>

                            <v-card-text
                                class="text--primary text-left text-subtitle-1 pt-6"
                            >
                                💬 Create chat room (have passcode or not).
                                <br />🚪 Browse room in real-time for joining.
                                <br />🔗 Share room url for joining
                            </v-card-text>
                        </div>
                    </v-expand-transition>

                    <v-divider></v-divider>

                    <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    icon
                                    href="https://github.com/vanviethieuanh/group-chat"
                                    target="_blank"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-icon>fa4 fa-github</v-icon>
                                </v-btn>
                            </template>
                            <span>Repository</span>
                        </v-tooltip>

                        <v-tooltip top>
                            <template v-slot:activator="{ on, attrs }">
                                <v-btn
                                    icon
                                    href="https://vanviethieuanh.com"
                                    target="_blank"
                                    v-bind="attrs"
                                    v-on="on"
                                >
                                    <v-icon>fa4 fa-globe</v-icon>
                                </v-btn>
                            </template>
                            <span>Websites</span>
                        </v-tooltip>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </div>
        <div class="container">
            <div id="messages">
                <ul>
                    <li
                        v-for="item in messages"
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
                <v-btn class="mr-2" icon color="grey" @click="copyRoomURL">
                    <v-icon dense>fa4 fa-link</v-icon>
                </v-btn>
                <input
                    id="message"
                    autocomplete="off"
                    type="text"
                    placeholder="Enter message ..."
                />

                <v-btn
                    class="ml-2"
                    icon
                    color="grey"
                    type="submit"
                    form="form-message"
                >
                    <v-icon dense>fa4 fa-paper-plane</v-icon>
                </v-btn>
            </form>
        </div>
    </div>
</template>

<script>
import router from '@/router'

export default {
    name: 'Room',
    created() {
        if (!this.$route.params.id) router.push('/')

        this.$socket.removeAllListeners()
        this.$socket.on('message', message => {
            this.messages.push(message)
        })
    },
    data: function() {
        return {
            messages: [],
            roomId: this.$route.params.id,
            show: false
        }
    },
    updated() {
        var container = this.$el.querySelector('#messages')
        container.scrollTop = container.scrollHeight
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

            this.messages.push({
                user: undefined,
                message: message
            })
        },
        copyRoomURL: function() {
            var input = document.body.appendChild(
                document.createElement('input')
            )
            input.value = `${window.location.host}/join/${this.roomId}`
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
    background: $dim;

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    height: 100vh;

    .text-center {
        position: fixed;
        z-index: 100;
        right: 20px;
        top: 20px;
    }

    .container {
        height: 90%;
        width: auto;

        display: flex;
        flex-direction: column;

        background: white;
        border-radius: 5px;
        box-shadow: $shadow;

        #messages {
            overflow-y: visible;
            overflow-x: hidden;

            margin-bottom: $chat-bar-margin;

            width: 100%;
            max-width: 320px;

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
                        margin-top: $bubble-space-expand;
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
            margin-top: auto;

            bottom: $chat-bar-margin;

            width: 100%;

            input {
                background: $dim;
                outline: none;

                width: 100%;
                height: $chat-bar-height;

                border-radius: 36px;
                padding: 0 16px;
            }
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