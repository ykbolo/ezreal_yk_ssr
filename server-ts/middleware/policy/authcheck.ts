/*
 * @Author: Yang Kang
 * @Date: 2021-07-13 18:02:08
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-07-15 10:25:55
 */
import _ from 'lodash'
export default (req, res, next) => {
  if (_.includes(req.cookies.token, req.sessionID)) {
    next()
  } else {
    res.redirect('/')
    // res.send({
    //   status: 0,
    //   message: '登录失效'
    // })
  }
}
