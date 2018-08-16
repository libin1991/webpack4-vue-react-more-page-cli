brightenKeyword(val, keyword) {
   val = val + '';
   if (val.indexOf(keyword) !== -1 && keyword !== '') {
        return val.replace(keyword, '<font color="#409EFF">' + keyword + '</font>')
   } else {
      return val
    }
}

 

<el-table-column label="维护内容">
   <template slot-scope="scope">
      <span v-html="brightenKeyword(scope.row.strContent, filters.strContent)" ></span>
   </template>
</el-table-column>

 