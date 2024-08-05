export const createStorage = <T> (key: string, defaultValue: T) => {
  const storage = window.localStorage;
  return {
    set: (value: T): void => storage.setItem(key, JSON.stringify(value)),
    get: (): T => {
      const data = storage.getItem(key);
      if (data) {
        return JSON.parse(data) as T
      }
      return defaultValue
    },
    clear: (): void => storage.setItem(key, JSON.stringify(defaultValue))
  }
}