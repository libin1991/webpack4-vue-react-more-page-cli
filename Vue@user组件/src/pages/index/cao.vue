<template>
    <div class="list1">
        <skeleton-loading>
            <row
                    v-for="i in 6"
                    :key="i"
                    :gutter="{top: '10px', bottom: '10px'}"
            >
                <column :span="3" :gutter="10">
                    <circle-skeleton></circle-skeleton>
                </column>
                <column :span="20" :gutter="10">
                        <square-skeleton 
                            :count="2"
                            :boxProperties="{
                                bottom: '15px',
                                width: '250px',
                                height: '15px'
                            }"
                        >
                        </square-skeleton>
                </column>
            </row>
        </skeleton-loading>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="less">
    .list1 {
    }
</style>