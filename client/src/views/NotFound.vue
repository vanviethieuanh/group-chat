<template>
    <div class="not-found">
        <div class="container">
            <div class="title">
                <p>4</p>
                <div class="emoji">🌑</div>
                <p>4!</p>
            </div>
            <div class="back">
                <router-link to="/home">Home</router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {}
</script>
<style lang="scss" scoped>
@import '@/variables.scss';

.not-found {
    display: flex;
    align-items: center;
    justify-content: center;

    height: 100vh;

    .title {
        padding: 4em;

        display: flex;
        flex-direction: row;
        opacity: 0.9;

        p {
            font-size: 90px;
            font-weight: bold;
            color: black;
        }
        .emoji {
            font-size: 70px;
        }
    }

    .back {
        a {
            text-decoration: none;
            color: $faded-text;
            opacity: 0.7;

            &:hover {
                opacity: 1;
            }
        }
    }
}
</style>