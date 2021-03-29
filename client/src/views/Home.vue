<template>
    <div class="home">
        <div id="nav">
            <router-link tag="button" to="/create">Create</router-link>
            <router-link tag="button" to="/select">Join</router-link>
        </div>

        <div class="text-center">
            <v-dialog width="500">
                <template v-slot:activator="{ on, attrs }">
                    <v-btn icon color="blue" v-on="on" v-bind="attrs">
                        <v-icon>fa4 fa-info</v-icon>
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
                            <v-icon>{{
                                show ? 'mdi-chevron-up' : 'mdi-chevron-down'
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
    </div>
</template>

<script>
export default {
    name: 'Home',
    components: {},
    data() {
        return { show: false }
    },
    watch: {
        dialog(val) {
            if (!val) return

            setTimeout(() => (this.dialog = false), 4000)
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';

.home {
    .text-center {
        position: fixed;
        z-index: 100;
        right: 20px;
        top: 20px;
    }

    #nav {
        padding: 0;
        height: 100vh;

        display: flex;

        button {
            width: 100%;
            font-size: 70px;

            transition: $fast-transition;

            &:hover {
                width: $expand-column-width;
            }

            &:nth-child(2n + 1) {
                background: $main-color;
                color: white;
            }
        }
    }
}
</style>
