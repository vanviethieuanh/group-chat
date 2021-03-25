<template>
    <div class="home">
        <div id="nav">
            <router-link tag="button" to="/create">Create</router-link>
            <router-link tag="button" to="/select">Join</router-link>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Home',
    components: {}
}
</script>

<style lang="scss" scoped>
@import '../variables.scss';

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
</style>
