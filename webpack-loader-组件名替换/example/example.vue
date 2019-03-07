<template>
    <div>
        <i-select v-model="value">
            <i-option value="beijing">北京</i-option>
            <i-option value="shanghai">上海</i-option>
        </i-select>
        <Switch></Switch>
        <Circle></Circle>
        <i-menu :active-name="activeName">
            <i-menu-item name="1"></i-menu-item>
        </i-menu>
        <i-dropdown>
            <i-dropdown-item></i-dropdown-item>
        </i-dropdown>
        <i-radio-group v-model="value">
            <i-radio name="1"></i-radio>
            <i-radio name="2"></i-radio>
        </i-radio-group>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                value: ''
            }
        }
    }
</script>