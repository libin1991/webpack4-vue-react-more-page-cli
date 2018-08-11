<template>
    <div class="drag-table">
        <div class="table">
            <div class="table-head">
                <div class="head-item" v-for="(row, i) in rowData" :key="i" v-show="i !== 0">{{row.title}}</div>
                <div class="head-item">操作</div>
            </div>
            <ul class="table-body">
                <li class="table-row text-center" v-if="!tableData.length">
                    <div class="row-item">暂无数据</div>
                </li>
                <li class="table-row" v-for="(item, index) in tableData" :key="index"
                draggable="true"
                @dragstart="dragstartEvent($event, index)"
                @dragend="dragendEvent($event, index)"
                @dragenter="dragenterEvent"
                @dragleave="dragleaveEvent"
                @dragover="dragoverEvent">
                    <div class="row-item">{{index + 1}}</div>
                    <div class="row-item" v-for="(row, i) in rowData" :key="i" v-show="i !== 0">{{item[row.value]}}</div>
                    <div class="row-item">
                        <a href="javascript:;" class="icon-btn el-icon-delete" @click="delRow(item[tablekey])"></a>
                        <a href="javascript:;" class="icon-btn el-icon-rank"></a>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    // tableData 表格数据  rowData 表头数据, 必须与表格数据的每一项对应, tableKey 表格以什么字段组成排序后的数组
    props: ['tableData', 'rowData', 'tablekey'],
    data () {
        return {
            dragElement: null,
            lock: true,
            sortArr: [] // 排序后的数组
        }
    },
    mounted () {

    },
    methods: {
        dragstartEvent (ev, index) {
            const self = this;
            let target = ev.currentTarget;
            self.dragElement = target;
            target.style.backgroundColor = '#f8f8f8';
        },
        dragendEvent (ev, index) {
            const self = this;
            let target = ev.currentTarget;
            target.style.backgroundColor = '#fff';
            let list = document.getElementsByClassName('table-row');
            list = [].slice.call(list, 0);
            this.sortArr = [];
            list.forEach(item => {
                this.tableData.forEach(i => {
                    if (+item.children[1].innerText === +i[this.tablekey]) this.sortArr.push(i[this.tablekey]);
                })
            })
            this.sortHandle();
            ev.preventDefault();
        },
        dragenterEvent (ev) {
            const self = this;
            let target = ev.currentTarget;
            if (self.dragElement !== target) {
                target.parentNode.insertBefore(self.dragElement, target);
            }
        },
        dragleaveEvent (ev) {
            const self = this;
            let target = ev.currentTarget;
            if (self.dragElement !== target) {
                if (self.lock) {
                    target.parentNode.appendChild(self.dragElement);
                    self.lock = false;
                } else {
                    self.lock = true;
                }
            }
        },
        dragoverEvent (ev) {
            ev.preventDefault();
        },
        // 排序
        sortHandle () {
            this.$emit('sortHandle', this.sortArr);
        }
    }
}
</script>

<style scoped="scoped" lang="less">
// 自定义表格
.table {
    border: 1px solid #ebeef5;
    width: 100%;
    .table-head {
        width: 100%;
        overflow: hidden;
        border-bottom: 1px solid #ebeef5;
        background: #f9f9f9;
        color: #63676b;
        display: flex;
        div {
            flex: 1;
            padding: 12px 0;
            padding-left: 30px;
            word-wrap: normal;
            text-overflow: ellipsis;
            vertical-align: middle;
            box-sizing: border-box;
            position: relative;
            width: 100%;
            font-weight: 800;
        }
    }
    .table-body {
        width: 100%;
        overflow: hidden;
        background: #fff;
        color: #63676b;
        .table-row {
            display: flex;
            border-bottom: 1px solid #ebeef5;
            padding: 12px 0;
            word-wrap: normal;
            text-overflow: ellipsis;
            vertical-align: middle;
            box-sizing: border-box;
            position: relative;
            width: 100%;
            div {
                padding-left: 30px;
                flex: 1;
            }
        }
    }
}
</style>