export class StorageService {
  private prefix = "app";
  private localStorage: Storage;
  private sessionStorage: Storage;

  constructor() {
    this.localStorage = window.localStorage;
    this.sessionStorage = window.sessionStorage;
  }

  // Local storage
  public set(key: string, data: string | number): void {
    this.localStorage.setItem(this.generateKey(key), data.toString());
  }

  public get(key: string): string | null {
    return this.localStorage.getItem(this.generateKey(key));
  }

  public setObject(key: string, data: ObjectOrArray): void {
    this.set(key, JSON.stringify(data));
  }

  public getObject(key: string): ObjectOrArray {
    const value = this.get(key);
    return value ? JSON.parse(value) : null;
  }

  // Session storage
  public setSession(key: string, data: string | number): void {
    this.sessionStorage.setItem(this.generateKey(key), data.toString());
  }

  public getSession(key: string): string | null {
    return this.sessionStorage.getItem(this.generateKey(key));
  }

  public setSessionObject(key: string, data: ObjectOrArray): void {
    this.setSession(key, JSON.stringify(data));
  }

  public getSessionObject(key: string): ObjectOrArray {
    const value = this.getSession(key);
    return value ? JSON.parse(value) : null;
  }

  private generateKey(key: string): string {
    return `${this.prefix}_${key}`;
  }
}

type ObjectOrArray = { [key: string]: any } | any[];

export default new StorageService();
