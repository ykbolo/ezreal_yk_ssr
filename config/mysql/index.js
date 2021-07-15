/*
 * @Author: Yang Kang
 * @Date: 2021-05-12 16:03:21
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-07-15 11:48:02
 */
let config
if (__DEV__) {
  config = {
    host: 'rm-bp11694i5wj393ld5oo.mysql.rds.aliyuncs.com',
    user: 'yangkang',
    database: 'db_ezreal_yk_cn',
    password: 'Yk84732225!!'
  }
} else {
  config = {
    host: 'rm-bp11694i5wj393ld5oo.mysql.rds.aliyuncs.com',
    user: 'yangkang',
    database: 'db_ezreal_yk_cn_prod',
    password: 'Yk84732225!!'
  }
}
export default config
