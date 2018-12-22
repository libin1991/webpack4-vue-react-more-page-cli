<template>
    <div class="square-list">
        <div
             class="square"
             v-for="i in count"
             :key="i"
             :style="{
                'backgroundColor': backColor,
                'width': boxProperties.width ?  boxProperties.width : '100%',
    			'height': boxProperties.height ? boxProperties.height : '16px',
                'marginTop': boxProperties.top ? boxProperties.top : '0',
                'marginBottom': boxProperties.bottom ? boxProperties.bottom : '0'
    		 }"
        >
        </div>
    </div>
</template>

<script>
    export default {
        props: {
            backColor: {
                type: String,
                default: '#e7e7e7'
            },
            boxProperties: {
                type: Object,
                default() {
                    return {
                        width: '100%',
                        height: '16px',
                        top: '0',
                        bottom: '0'
                    };
                }
            },
            count: {
                type: Number,
                default: 1
            }
        }
    }
</script>

<style lang="less">
    .square-list {
        width: 100%;
    }
</style>