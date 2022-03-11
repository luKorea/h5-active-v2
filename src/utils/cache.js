/*
 * @Author: korealu
 * @Date: 2022-01-13 17:43:39
 * @LastEditors: korealu
 * @LastEditTime: 2022-03-11 11:48:27
 * @Description: file content
 * @FilePath: /h5-active-v2/src/utils/cache.js
 */
class LocalCache {
  setCache(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }

  getCache(key) {
    const value = localStorage.getItem(key);
    if (value) {
      return JSON.parse(value);
    }
  }

  deleteCache(key) {
    localStorage.removeItem(key);
  }

  cleanCache() {
    localStorage.clear();
  }
}

export default new LocalCache();
