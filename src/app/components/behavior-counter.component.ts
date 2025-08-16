import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { BehaviorService } from '../services/behaviour.service';

@Component({
  selector: 'app-behavior-counter',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>BehaviorSubject User</h2>

    <div *ngIf="user$ | async as user; else guest">
      Welcome, {{ user.name ?? user }}!
      <button (click)="logout()">Logout</button>
    </div>

    <ng-template #guest>
      <button (click)="login()">Login as Carley</button>
    </ng-template>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class BehaviorCounterComponent {
  private readonly userService = inject(BehaviorService);
  readonly user$ = this.userService.user$;

  login(): void {
    this.userService.setUser({ id: 1, name: 'Carley' });
  }

  logout(): void {
    this.userService.clearUser();
  }
}