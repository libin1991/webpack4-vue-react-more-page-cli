<template>
    <div class="row"
        :style="{
            'alignItems': align,
            'justifyContent': justify,
            'paddingTop': gutter.top,
            'paddingBottom': gutter.bottom
        }"
    >
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            gutter: {
                type: Object,
                default() {
                    return {
                        top: '0',
                        bottom: '0'
                    }
                }
            },
            align: {
                type: String,
                default: 'top',
                validator: function (value) {
                    return ['top', 'middle', 'bottom'].indexOf(value) >= 0;
                }
            },
            justify: {
                type: String,
                default: 'start',
                validator: function (value) {
                    return ['start', 'end', 'center', 'space-around', 'space-between'].indexOf(value) >= 0;
                }
            }
        }
    }
    
</script>

<style lang="less">
    .row {
        display: flex;
        flex-direction: row;
        justify-content: space-around;
        align-items: top;
    }
</style>