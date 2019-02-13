
import axios from 'axios'

import { constants } from '../store'

const changeDetail = (title, content) => ({
  type: constants.CHANGE_DETAIL,
  title,
  content
})

export const getDetails = (id) => {
  return (dispatch) => {
    axios.get("/api/detail.json?id=" + id).then(res => {
      let result = res.data.data;
      dispatch(changeDetail(result.title, result.content))
    })
  }
}