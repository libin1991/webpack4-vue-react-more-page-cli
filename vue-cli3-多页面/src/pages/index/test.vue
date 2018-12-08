<template>
    <div class="page">
        <skeleton-loading>
            <row 
                :gutter="{
                    bottom: '15px'
                }"
            >
                <square-skeleton 
                    :count="2"
                    :boxProperties="{
                        top: '10px',
                        height: '26px'
                    }"
                >
                </square-skeleton>
            </row>
            <row>
                <column :span="4">
                    <circle-skeleton></circle-skeleton>
                </column>
                <column :span="20" :gutter="20">
                    <square-skeleton 
                        :boxProperties="{
                            top: '10px',
                            width: '70px',
                            height: '15px'
                        }"
                    >
                    </square-skeleton>
                    <square-skeleton 
                        :boxProperties="{
                            width: '100px',
                            height: '15px',
                            top: '10px'
                        }"
                    >
                    </square-skeleton>
                </column>
            </row>
            <row :gutter="{top: '20px'}">
                <square-skeleton 
                    :count="4"
                    :boxProperties="{
                        bottom: '10px'
                    }" 
                >
                </square-skeleton>
            </row>
            <row>
                 <square-skeleton 
                    :boxProperties="{
                        bottom: '10px',
                        height: '200px'
                    }"    
                >
                </square-skeleton>
            </row>
        </skeleton-loading>
    </div>
</template>

<script>
    export default {}
</script>

<style lang="less">
    .page {
        padding: 15px;
    }
</style>