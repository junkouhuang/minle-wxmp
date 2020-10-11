export const SESSION_STORAGE = 1;
export const LOCAL_STORAGE = 2;
export default {
  get(key, type) {
    let value;
    if (type === LOCAL_STORAGE) {
      value = localStorage.getItem(key);
    } else {
      value = sessionStorage.getItem(key);
    }
    if (!value) {
      return null;
    }
    const json = JSON.parse(value);
    if (json.time && json.time < new Date().getTime()) {
      return null;
    }
    return json.value;
  },
  set(key, value, options) {
    const o = options || {};
    const json = {
      value,
    };
    if (o.time) {
      json.time = o.time + new Date().getTime();
    }
    if (o.type === LOCAL_STORAGE) {
      localStorage.setItem(key, JSON.stringify(json));
    } else {
      sessionStorage.setItem(key, JSON.stringify(json));
    }
  },
  remove(key, type) {
    if (type === LOCAL_STORAGE) {
      localStorage.removeItem(key);
    } else {
      sessionStorage.removeItem(key);
    }
  },
  clear(type) {
    if (type === LOCAL_STORAGE) {
      localStorage.clear();
    } else {
      sessionStorage.clear();
    }
  },
};
