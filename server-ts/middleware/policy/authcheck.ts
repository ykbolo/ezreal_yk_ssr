/*
 * @Author: Yang Kang
 * @Date: 2021-07-13 18:02:08
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-07-15 17:46:26
 */
import _ from 'lodash'
export default (req, res, next) => {
  console.log(req.cookies.token, req.sessionID)

  if (_.includes(req.cookies.token, req.sessionID)) {
    next()
  } else {
    res.send({
      status: 0,
      message: '该功能需要登录，请先登录',
      statusCode: '401'
    })
  }
}
