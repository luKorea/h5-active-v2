/*
 * @Author: korealu
 * @Date: 2022-01-13 17:43:39
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-08 17:18:51
 * @Description: file content
 * @FilePath: /h5-active-v2/src/utils/cache.js
 */
class LocalCache {
  setCache(key, value) {
    sessionStorage.setItem(key, JSON.stringify(value));
  }

  getCache(key) {
    const value = sessionStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  deleteCache(key) {
    sessionStorage.removeItem(key);
  }

  cleanCache() {
    sessionStorage.clear();
  }
}

export default new LocalCache();
