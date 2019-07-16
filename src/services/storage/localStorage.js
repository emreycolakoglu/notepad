export default function buildLocalStorageAdapter() {
  function set(key, value) {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch (error) {
      return false;
    }
  }
  function get(key) {
    try {
      return JSON.parse(localStorage.getItem(key));
    } catch (error) {
      return undefined;
    }
  }
  function clear() {
    try {
      localStorage.clear();
      return true;
    } catch (error) {
      return false;
    }
  }

  return Object.freeze({
    get,
    set,
    clear
  });
}
