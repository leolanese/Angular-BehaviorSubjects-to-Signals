import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class SignalService {
  private data = signal<any | null>(null);

  getUser = this.data.asReadonly();

  setUser(data: any) {
    this.data.set(data);
  }

  clearUser() {
    this.data.set(null);
  }
}