<template>
    <div
        class="col"
        :style="{
            'order': order,
            'width': perWidth,
            'padding': gutterToPadding
        }"
    >
        <slot></slot>
    </div>
</template>

<script>
    export default {
        props: {
            gutter: {
                type: Number,
                default: 0
            },
            span: {
                type: Number,
                required: true,
                validator: function (value) {
                    return value <= 24;
                }
            },
            order: {
                type: Number
            }
        },
        computed: {
            perWidth() {
                return (this.span*100/24).toFixed(2) + '%';
            },
            gutterToPadding() {
                return `0 ${this.gutter}px`
            }
        }
    }
</script>

<style lang="less">
</style>