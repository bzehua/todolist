/*
 * @Description:
 * @Author: Bzehua
 * @Date: 2022-05-11 00:20:29
 * @LastEditors: Bzehua
 * @LastEditTime: 2022-05-11 00:20:31
 */
import { PersistOptions } from "pinia-plugin-persist"

// pinia持久化参数配置
const piniaPersistConfig = (key: string) => {
  const persist: PersistOptions = {
    enabled: true,
    strategies: [
      {
        key,
        storage: localStorage
        // storage: sessionStorage
      }
    ]
  }
  return persist
}

export default piniaPersistConfig
