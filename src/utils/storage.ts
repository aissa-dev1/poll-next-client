class StorageHandler {
  get<T>(key: string): T {
    if (typeof key === "string") return localStorage.getItem(key) as T;
    return JSON.parse(localStorage.getItem(key)!);
  }

  set<T>(key: string, value: T) {
    if (typeof value === "string") {
      localStorage.setItem(key, value);
      return;
    }
    localStorage.setItem(key, JSON.stringify(value));
  }

  clear() {
    localStorage.clear();
  }

  remove(key: string) {
    if (!this.has(key)) return;
    localStorage.removeItem(key);
  }

  has(key: string): boolean {
    return typeof localStorage.getItem(key) === "string";
  }
}

export const storage = new StorageHandler();
