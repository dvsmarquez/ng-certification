import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  private storage: Storage;

  constructor() {
    this.storage = localStorage;
  }

  get(key: string): Observable<any> {
    const item = this.storage.getItem(key);
    const value = this.serialize(item);

    return of(value);
  }

  set(key: string, value: any): Observable<boolean> {
    const item = this.deserialize(value);
    let success: boolean;

    try {
      this.storage.setItem(key, item);
      success = true;
    } catch {
      success = false;
    }

    return of(success);
  }

  clear(key: string): Observable<void> {
    this.storage.removeItem(key);

    return of();
  }

  clearAll(): Observable<void> {
    this.storage.clear();

    return of();
  }

  private serialize(item: string): any {
    let value: any;

    try {
      value = JSON.parse(item);
    } catch {
      value = item;
    }

    return value;
  }

  private deserialize(item: any): string {
    return JSON.stringify(item);
  }

}
