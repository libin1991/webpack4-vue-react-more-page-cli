<template>
  <div>
    <div class="header">
     <el-dropdown trigger="click" @command="handleCommand" >
        <span class="el-dropdown-link">
          用户操作<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="a" @click.native="Logout">注销</el-dropdown-item>
          <el-dropdown-item command="b" @click.native="registry">注册</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <el-row>
      <el-col :xs="{span: 22, offset:2}" :sm="{span: 6, offset: 9}">
        <span class="title">{{ username }} 你好</span>
        <el-input v-model="event" @keyup.enter.native="addData" placeholder="请输入待办事项"></el-input>
      </el-col>

      <el-col :xs="{span: 22, offset:2}" :sm="{span: 11, offset: 7}">
        <el-tabs>
            <el-tab-pane label="待完成事项" style="width:100%">
              <el-col v-show="isTable">
                <el-table :data="tableData" @select-all="selectAll" @select="select">
                  <el-table-column type='selection' align="center">
                  </el-table-column>
                  <el-table-column label="日期" align="center">
                    <template slot-scope="scope">
                      <i class="el-icon-time"></i>
                      <span>{{ scope.row.date }}</span>
                    </template>
                  </el-table-column>
                  <el-table-column label="事件" align="center">
                    <template slot-scope="scope">{{ scope.row.event }}</template>
                  </el-table-column>
                  <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                      <el-button size="mini" type="primary" @click="handleEdit(scope.$index, scope.row)">完成</el-button>
                    </template>
                  </el-table-column>
                </el-table>
              </el-col>
              <el-button v-show="isSeleData" @click="updateDataAll" size="mini" class="wbutton" type="primary">多选完成</el-button>

              <el-col v-show="!isTable">
                暂无事件
              </el-col>
            </el-tab-pane>


          <el-tab-pane label="已完成事项" style="width:100%">
            <el-col v-show="isComplete">
              <el-table :data="completeData" style="width: 100%"  @select-all="selectfulfilAll">
                <el-table-column type='selection' align="center">
                </el-table-column>
                <el-table-column label="日期" align="center">
                  <template slot-scope="scope">
                    <i class="el-icon-time"></i>
                    <span>{{ scope.row.date }}</span>
                  </template>
                </el-table-column>
                <el-table-column label="姓名" align="center">
                  <template slot-scope="scope">{{ scope.row.event }}</template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                  <template slot-scope="scope">
                    <el-button size="mini" type="primary" @click="Cancel(scope.$index, scope.row)">撤销</el-button>
                    <el-button size="mini" type="danger" @click="Delete(scope.$index, scope.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-col>
              <el-dropdown class="wbutton" v-show="isSelefulfilData">
                  <el-button type="primary" size="mini">
                  <i class="el-icon-arrow-down el-icon--right"></i>
                  </el-button>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item @click.native="muchcancel">撤销</el-dropdown-item>
                  <el-dropdown-item @click.native="muchDalete">删除</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            <el-col v-show="!isComplete">
              暂无完成事件
            </el-col>
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import jwt from 'jsonwebtoken'
export default {
  mounted() {
    let token = localStorage.getItem('token')
    let Payload = jwt.decode(token)
    this.username = Payload.username // 解密用户名
    this._id = Payload.id
    this.getData() // 获取待完成时间
    this.getfulfilData()
  },
  data() {
    return {
      event: '', // 增加的事件
      username: '', // 用户名
      _id: '', // 用户id
      activeName: 'first', // 初始表圈
      tableData: [],// 全部事件
      completeData: [], // 已完成事件
      selectEvent: [], // 多选操作
      selectfulfilEvent: []
    }
  },
  computed: {
    isTable() { // 待完成事项的显示
      if (this.tableData.length > 0) {
        return true
      } else {
        return false
      }
    },
    isComplete() { // 已完成事项的显示
      if (this.completeData.length > 0) {
        return true
      } else {
        return false
      }
    },
    isSeleData () {
      if (this.selectEvent.length) {
        return true
      } else {
        return false
      }
    },
    isSelefulfilData () {
       if (this.selectfulfilEvent.length) {
        return true
      } else {
        return false
      }
    }
  },
  methods: {
    Logout () { // 注销
      localStorage.removeItem('token')
      this.$router.push('/login')
       this.$message({
          message: '注销成功',
          type: 'success'
        })
    },
    registry () {
      this.$router.push('/registry')
    },
    handleEdit(index, row) { // 点击完成
      this.$axios.post('/api/fulfilList', {
        id: row._id
      })
      .then((data) => {
        this.$notify({
          title: data.data.data,
          type: 'success'
        });
      })
      .catch((data) => {
        console.log(data);
      })

      // 当数据发生变化 那么又要请求数据库 每次数据变动都请求数据库这并不是好的做法
      // 所以我在前端帮它更新数据,后端同时也更新了数据 达到修改的时候只修改 不获取
      // 点击完成
      //index 表格位置  row 行信息
      this.tableData.map((element, index) => {
        if (element._id === row._id) {
          this.tableData.splice(index, 1) // 删除等待完成事项
        }
      })
      this.completeData.unshift(row) // 加入已经完成的事项
    },

    selectAll(selection) { // 全选操作
      this.selectEvent = selection
    },

    selectfulfilAll (selectfulfilEvent) {  // 全选操作
      this.selectfulfilEvent = selectfulfilEvent
    },

    select (selection, row) { // 多选操作 // 下一步 发送给后端
      this.selectEvent = selection
    },

    getData () { // 获取待完成事件
      this.$axios.get(`/api/getTodoList?id=${this._id}`)
      .then((data) => {
        this.tableData = data.data.data
      })
      .catch((data) => {
        this.$message.error(data)
      })
    },

    getfulfilData() { // 获取已完成事件
      this.$axios.get(`/api/getfulfilTodoList?id=${this._id}`)
      .then((data) => {
        this.completeData = data.data.data
      })
      .catch((data) => {
        this.$message.error(data)
      })
    },

    addData() { // 添加事件
      let event  = {
        id: this._id,
        date: this.getNowFormatDate(),
        event: this.event,
      }
      this.$axios.post('/api/addTodoList', event)
      .then((data) => {
        this.$message({
          message: data.data.data,
          type: 'success'
        })
        this.event = ''
        this.getData() // 重新更新数据
      })
      .catch((data) => {
        this.$message.error(data)
      })
    },

    Cancel (index,row) { // 撤销事件
      this.$axios.post('/api/cancelTodoList', {
        id: row._id
      })
      .then((data) => {
        this.$notify({
          title: data.data.data,
          type: 'success'
        })
        this.getfulfilData()
        this.getData()
      })
      .catch((data) => {
        this.$message.error(data)
      })
    },

    Delete (index, row) { // 删除事件
      this.$axios.post('/api/deleteTodoList', {
        id: row._id
      })
      .then((data) => {
        this.$notify({
          title: data.data.data,
          type: 'success'
        })
        this.getfulfilData()
      })
      .catch((data) => {
        console.log(data);
      })
    },
    updateDataAll () {
      this.updateAll(this.selectEvent)
      .then((id) => {
        this.$axios.post('/api/updateDatas',{
          id
        })
        .then((data) => {
          this.$notify({
            title: data.data.data,
            type: 'success'
          })

        })
        .then(() => {
          this.getfulfilData()
          this.getData()
          this.selectEvent = []
        })
        .catch((data) => {
          console.log(data);
        })
      })
    },
    muchcancel () {
      this.updateAll(this.selectfulfilEvent)
      .then((id) => {
        this.$axios.post('/api/cancelFulfilData',{
          id
        })
        .then((data) => {
          this.$notify({
            title: data.data.data,
            type: 'success'
          })
        })
        .then(() => {
          this.getfulfilData()
          this.getData()
          this.selectfulfilEvent = []
        })
        .catch((data) => {
          console.log(data);
        })
      })
    },
    muchDalete () {
      this.updateAll(this.selectfulfilEvent)
      .then((id) => {
        this.$axios.post('/api/deleteFulfilData',{
          id
        })
        .then((data) => {
          this.$notify({
            title: data.data.data,
            type: 'success'
          })
        })
        .then(() => {
          this.getfulfilData()
          this.getData()
          this.selectfulfilEvent = []
        })
        .catch((data) => {
          console.log(data);
        })
      })
    },
    async updateAll (event) {
      let todo_id = []
      await event.map((key) => {
        todo_id.push(key._id) // 获取多选的id
      })
      return todo_id
    },
    //格式化时间
    getNowFormatDate() {
      var date = new Date()
      var month = date.getMonth() + 1
      var strDate = date.getDate()
      if (month >= 1 && month <= 9) {
        month = '0' + month
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = '0' + strDate
      }
      var currentdate = `${date.getFullYear()}-${month}-${strDate}`
      return currentdate
    }
  }
}
</script>

<style scoped>
.header {
  position: absolute;
  top: 20px;
  right: 20px;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.title {
  font-size: 25px;
  line-height: 50px;
}
.el-table th {
  text-align: center;
}
.data {
  display: flex;
}
.el-tab-pane {
  display: flex;
  position: relative;
}
.wbutton {
  position: absolute;
  right:0px;
  top: 8px;
}
</style>
