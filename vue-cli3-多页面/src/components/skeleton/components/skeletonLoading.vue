<template>
    <div class="vue-skeleton-loading">
        <div class="skeleton-bac-animation"></div>
        <slot></slot>
    </div>
</template>

<script>
    import circleSkeleton from './basic/circleSkeleton';
    import squareSkeleton from './basic/squareSkeleton';
    export default {
        data() {
            return {};
        },
        components: {
            circleSkeleton,
            squareSkeleton
        }
    }
</script>

<style lang="less">
    .vue-skeleton-loading {
        position: relative;
        width: 100%;
        @keyframes backpos {
            from {
                background-position-x: -200px;
            }

            to {
                background-position-x: calc(200px + 100%);
            }

        }
        .skeleton-bac-animation {
            position: absolute;
            z-index: auto;
            width: 100%;
            height: 100%;
            background: linear-gradient(to right, rgba(255,255,255,0), rgba(255,255,255,0.5) 50%, rgba(255,255,255,0) 80%);
            background-size: 30% 100%;
            background-repeat: no-repeat;
            -webkit-animation: backpos 0.9s ease-in-out 0s infinite;
            -o-animation: backpos 0.9s ease-in-out 0s infinite;
            animation: backpos 0.9s ease-in-out 0s infinite;
        }
    }
</style>