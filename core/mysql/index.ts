/*
 * @Author: Yang Kang
 * @Date: 2021-07-09 14:25:56
 * @LastEditors: Yang Kang
 * @LastEditTime: 2021-07-09 14:27:24
 */
import mysql, { Pool } from 'mysql2'
import { Pool as PoolPromise } from 'mysql2/promise'
import config from '../../config/mysql'

let pool: Pool

export async function create(): Promise<PoolPromise> {
  if (!pool) {
    pool = mysql.createPool(config)
  }
  return pool.promise()
}
