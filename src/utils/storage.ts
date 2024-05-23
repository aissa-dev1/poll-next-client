class StorageHandler {
  get<T>(key: string): T | null {
    const data = localStorage.getItem(key);
    if (!data) return null;
    return JSON.parse(localStorage.getItem(key)!);
  }

  set<T>(key: string, value: T) {
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
