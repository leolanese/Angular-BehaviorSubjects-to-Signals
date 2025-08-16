import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class BehaviorService {
  private readonly userSubject = new BehaviorSubject<any | null>(null);
  readonly user$ = this.userSubject.asObservable();

  setUser(user: any): void {
    this.userSubject.next(user);
  }

  clearUser(): void {
    this.userSubject.next(null);
  }
  
}