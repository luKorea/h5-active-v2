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
